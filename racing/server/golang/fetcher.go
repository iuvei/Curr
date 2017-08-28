package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"strconv"
	"strings"

	"syscall"
	"time"

	"gopkg.in/mgo.v2/bson"
	"gopkg.in/robfig/cron.v2"

	"github.com/qiniu/db/mgoutil.v3"
	"github.com/qiniu/log.v1"
	"qbox.us/cc/config"
)

type M map[string]interface{}
type Config struct {
	MaxProcs   int            `json:"max_procs"`
	DebugLevel int            `json:"debug_level"`
	Mgo        mgoutil.Config `json:"mgo"`
	Urls       []string       `json:"urls"`
}

var NowNo = int64(0)
var cfg = Config{
	MaxProcs:   1,
	DebugLevel: 1,
	Mgo:        mgoutil.Config{Host: "127.0.0.1", DB: "racing_dev2"},
	Urls:       []string{"http://d.apiplus.net/newly.do?token=t31ca37cd375be4b4k&code=bjpk10&rows=1&format=json"},
}

func main() {
	config.Init("f", "fetcher", "fetcher.json")
	if err := config.Load(&cfg); err != nil {
		log.Warn("Load fetch config file failed\n Use default config:")
	}
	runtime.GOMAXPROCS(cfg.MaxProcs)
	log.SetOutputLevel(cfg.DebugLevel)
	c := cron.New()
	//c.AddFunc("", func() { fetcher(cfg) })
	//c.AddFunc("0 * * * * ?", testCron)
	c.AddFunc("20 2-59/5 9-23 * * ?", run)
	c.Start()
	//	r, err := fetcher(cfg)
	//	fmt.Printf("%#v\n, %v", r, err)
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt, os.Kill, syscall.SIGTERM)
	<-sigs
	os.Exit(0)
}

func testCron2() {
	fmt.Printf("==> Run at \t%v \n", time.Now())
}
func run() {
	start := time.Now()
	mgr := NewLotteryMgr(cfg)
	log.Infof(">>>>>>>>start to fetch lottery<<<<<<<<<")
	lt, err := mgr.fetcher()
	if err != nil {
		log.Error(err)
	}
	nowMin := time.Now().Minute()
	for time.Unix(lt.Opentimestamp, 0).Minute() != nowMin {
		log.Infof("get old lottery record [no:%d], try again", lt.No)
		lt, err = mgr.reTry()
		if err != nil {
			log.Error(err)
		}
	}

	if err = mgr.store(lt); err != nil {
		log.Error(err)
		return
	}
	mgr.trys = 0
	NowNo = lt.No
	mgr.currLottery = lt

	log.Infof("Cost: %v", time.Since(start))
	log.Infof(">>>>>>>>finish fetching lottery<<<<<<<<<")

	log.Infof(">>>>>>>>start to stat lottery<<<<<<<<<")
	start2 := time.Now()
	mgr.stat()
	log.Infof("Cost: %v", time.Since(start2))
	log.Infof(">>>>>>>>>finish stat lottery<<<<<<<<<<")

}

type LotteryMgr struct {
	cfg         Config
	colls       Collections
	trys        int
	currLottery Lottery
}

func NewLotteryMgr(cfg Config) *LotteryMgr {
	var colls Collections
	_, err := mgoutil.Open(&colls, &cfg.Mgo)
	for err != nil {
		log.Warnf("Open mongodb failed: %v", err)
		_, err = mgoutil.Open(&colls, &cfg.Mgo)
		time.Sleep(time.Second * 1)
	}
	return &LotteryMgr{cfg, colls, 0, Lottery{}}
}

type Bet struct {
	Id       bson.ObjectId `json:"id" bson:"_id"`
	No       int64         `json:"no" bson:"no"`
	Nickname string        `json:"nickname" bson:"nickname"`
	Openid   string        `json:"openid" bson:"openid"`
	Choice   string        `json:"choice" bson:"choice"`
	Amount   int64         `json:"amount" bson:"amount"`
	Avatar   string        `json:"avatar" bson:"avatar"`
	Dealed   bool          `json:"dealed" bson:"dealed"`
}

func (m *LotteryMgr) stat() {
	var bets []Bet
	err := m.colls.BetColl.Find(M{"from": 1, "dealed": false}).All(&bets)
	if err != nil {
		log.Errorf("failed to get bets, error: %v", err)
	}
	opencode := strings.Split(m.currLottery.Opencode, ",")
	for _, v := range bets {
		var win int64
		fmt.Printf("%#v\n", v)
		if v.No != m.currLottery.No {
			var lt Lottery
			err = m.colls.LotteryColl.Find(M{"no": v.No}).One(&lt)
			if err != nil {
				log.Errorf("failed tp get Lottery[%d] from mongo, error: %v", v.No, err)
				continue
			}
			log.Info(lt, v.No)
			win, err = calculate(v.Choice, 1, strings.Split(lt.Opencode, ","))
			if err != nil {
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, NowNo, err)
				continue
			}

		} else {
			win, err = calculate(v.Choice, 1, opencode)
			if err != nil {
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, NowNo, err)
				continue
			}
		}

		if win != 0 {
			if err = m.colls.UserColl.Update(M{"openid": v.Openid}, M{"$inc": M{"balance": win}}); err != nil {
				log.Errorf("failed to update user's balance, error: %v", err)
				continue
			}
		}

		if err = m.colls.BetColl.Update(M{"_id": v.Id}, M{"$set": M{"dealed": true}}); err != nil {
			log.Errorf("failed to change bets's state[dealed:true], error: %v", err)
		}
		update := M{
			"openid":   v.Openid,
			"no":       v.No,
			"nickname": v.Nickname,
			"avatar":   v.Avatar,
			"choice":   v.Choice,
			"income":   v.Amount,
			"outlay":   win,
			"worth":    win - v.Amount,
			"opentime": m.currLottery.Opentime,
		}

		if _, err = m.colls.QuizColl.UpsertId(v.Id, M{"$set": update}); err != nil {
			log.Errorf("failed to change bets's state[dealed:true], error: %v", err)
		}

	}
}

func (m *LotteryMgr) store(lt Lottery) error {
	selector := M{"no": lt.No}
	update := M{"no": lt.No, "code": lt.Opencode, "opentime": lt.Opentime}
	_, err := m.colls.LotteryColl.Upsert(selector, update)
	if err != nil {
		log.Errorf("failed to persist lottery record, error: %v", err)
		return err
	}
	log.Infof("success to get lottery[%#v]", lt)
	return nil
}

func (m *LotteryMgr) reTry() (lt Lottery, err error) {
	m.trys += 1
	log.Infof("retry to fetch lottery %d ...", m.trys)
	time.Sleep(time.Second * 3)
	return m.fetcher()
}

func (m *LotteryMgr) fetcher() (lt Lottery, err error) {
	resp, err2 := http.Get(m.cfg.Urls[0])
	if err2 != nil {
		log.Warnf("try to get lottery failed, error: %v", err2)
		//m.reTry()
		return
	}
	if resp != nil {
		defer func() {
			io.Copy(ioutil.Discard, resp.Body)
			resp.Body.Close()
		}()
	}
	var b []byte
	if b, err = ioutil.ReadAll(resp.Body); err != nil {
		log.Errorf("read resp body error: %v", err)
		//m.reTry()
		return
	}
	var lts Lotterys
	if err = json.Unmarshal(b, &lts); err != nil {
		log.Errorf("parse resp body error: %v", err)
		//m.reTry()
		return
	}
	lt = lts.Data[0]
	no, err := strconv.ParseInt(lt.Expect, 10, 64)
	if err != nil {
		log.Errorf("failed to convent string to int, except=%s, error: %v", lt.Expect, err)
		return
	}
	lt.No = no
	return
}

type Lottery struct {
	No            int64  `json:"no" bson:"no"`
	Expect        string `json:"expect"`
	Opencode      string `json:"opencode" bson:"code"`
	Opentime      string `json:"opentime" bson:"opentime"`
	Opentimestamp int64  `json:"opentimestamp"`
}
type Lotterys struct {
	Rows int       `json:"rows"`
	Code string    `json:"code"`
	Data []Lottery `json:"data"`
}
type Collections struct {
	UserColl    mgoutil.Collection `coll:"users"`
	LotteryColl mgoutil.Collection `coll:"lotterys"`
	BetColl     mgoutil.Collection `coll:"bets"`
	QuizColl    mgoutil.Collection `coll:"quizs"`
}
