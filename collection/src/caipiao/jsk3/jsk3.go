package jsk3

import (
	. "caipiao/common"
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	qlog "github.com/qiniu/log"
	//	"gopkg.in/mgo.v2/bson"
)

var log = qlog.New(os.Stderr, "JSK3", qlog.Ldefault)

type JSK3 struct {
	cfg         CaiConf
	colls       *Collections
	currLottery Lottery
}

func NewJSK3(conf CaiConf, colls *Collections) *JSK3 {
	log.SetPrefix(fmt.Sprintf("[%s] ", strings.ToUpper(conf.Type)))
	return &JSK3{conf, colls, Lottery{}}
}

func (m *JSK3) Name() string {
	return CAI_JSK3
}

func (m *JSK3) Cron() string {
	return m.cfg.Cron
}

func (m *JSK3) Type() string {
	return CAI_JSK3
}

func (m *JSK3) Run() {
	//10分钟一期，返奖率59%　销售时间：8:30～22:10
	now := time.Now()
	h := now.Hour()
	mm := now.Minute()
	if h < 8 || h > 22 || (h == 8 && mm < 30) || (h == 22 && mm > 10) {
		return
	}
	trys := 0
	start := time.Now()
	log.Infof(">>>>>>>>start to fetch lottery<<<<<<<<<")
	lt, err := m.Fetch()
	if err != nil {
		log.Warnf("try to get lottery failed, error: %v", err)
	}

	nowMin := now.Minute()
	openMin := time.Unix(lt.Opentimestamp, 0).Minute()
	//重试 逻辑：开奖时间和当前时间不一样，开奖时间距离当前时间10分钟以上。
	//10分钟内说明是当前期，不必再取。
	for openMin != nowMin && nowMin-openMin >= 10 {
		log.Info(openMin, nowMin)
		trys += 1
		log.Infof("get old lottery record [no:%d], try again %d ...", lt.No+1, trys)
		if trys < 100 {
			time.Sleep(time.Second * 5)
		} else {
			log.Errorf("第[%d]重试次数超过100次，放弃！请手动补齐", lt.No+1)
			return
		}
		lt, err = m.Fetch()
		if err != nil {
			log.Warnf("try to get lottery failed, error: %v", err)
			continue
		}
		nowMin = time.Now().Minute()
		openMin = time.Unix(lt.Opentimestamp, 0).Minute()
	}

	if lt.No == m.currLottery.No {
		log.Warnf("当前期[%d]已处理，忽略", lt.No)
		return
	}

	//log.Infof("获取结果：%#v", lt)

	if err = m.Store(lt); err != nil {
		log.Error("存储彩票记录[%v]失败：%v", lt, err)
		return
	}

	m.currLottery = lt

	log.Infof(">>>>>>>>finish fetching lottery<<<<<<<<<Cost: %v", time.Since(start))

	log.Infof(">>>>>>>>start to calculate lottery<<<<<<<<<")
	start2 := time.Now()
	m.Calculate()
	log.Debugf("Cost: %v", time.Since(start2))
	log.Infof(">>>>>>>>>finish calculate lottery<<<<<<<<<<")

	log.Infof(">>>>>>>>start to eval changlong <<<<<<<<<")
	m.StatChangLong()
	log.Infof(">>>>>>>>>finish eval changlong<<<<<<<<<<")

}

func (m *JSK3) Fetch() (lt Lottery, err error) {
	resp, err := http.Get(m.cfg.Urls)
	if err != nil {
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
		err = fmt.Errorf("read resp body error: %v", err)
		return
	}
	var lts Lotterys
	if err = json.Unmarshal(b, &lts); err != nil {
		err = fmt.Errorf("parse resp body error: %v", err)
		return
	}
	lt = lts.Data[0]
	no, err := strconv.ParseInt(lt.Expect, 10, 64)
	if err != nil {
		err = fmt.Errorf("failed to convent string to int, except=%s, error: %v", lt.Expect, err)
		return
	}
	lt.No = no
	return
}

func (m *JSK3) Store(lt Lottery) error {
	selector := M{"no": lt.No, "type": strings.ToUpper(m.cfg.Type)}
	update := M{"no": lt.No, "type": strings.ToUpper(m.cfg.Type), "code": lt.Opencode, "opentime": lt.Opentime}
	_, err := m.colls.LotteryColl.Upsert(selector, update)
	if err != nil {
		return fmt.Errorf("failed to persist lottery record, error: %v", err)
	}
	return nil
}

func (m *JSK3) Calculate() {
	var bets []Bet
	err := m.colls.BetColl.Find(M{"from": 1, "game": "JSK3", "dealed": false}).All(&bets)
	if err != nil {
		log.Errorf("failed to get bets, error: %v", err)
		return
	}
	opencode := strings.Split(m.currLottery.Opencode, ",")
	for _, v := range bets {
		var win float32
		fmt.Printf("%#v\n", v)
		if v.No != m.currLottery.No { //处理当前获取到了历史未处理的下注
			var lt Lottery
			err = m.colls.LotteryColl.Find(M{"no": v.No}).One(&lt)
			if err != nil {
				log.Errorf("failed tp get Lottery[%d] from mongo, error: %v", v.No, err)
				continue
			}
			log.Info(lt, v.No)
			win, err = calculate(v.Choice, v.Method, strings.Split(lt.Opencode, ","))
			if err != nil {
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, NowNo, err)
				continue
			}

		} else {
			win, err = calculate(v.Choice, v.Method, opencode)
			if err != nil {
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, NowNo, err)
				continue
			}
		}

		if win != 0 {
			if err = m.colls.UserColl.Update(M{"_id": v.UserId}, M{"$inc": M{"balance": win}}); err != nil {
				log.Errorf("failed to update user's balance, error: %v", err)
				continue
			}
		}

		if err = m.colls.BetColl.Update(M{"_id": v.Id}, M{"$set": M{"dealed": true}}); err != nil {
			log.Errorf("failed to change bets's state[dealed:true], error: %v", err)
		}
		update := M{
			"userid":   v.UserId,
			"no":       v.No,
			"nickname": v.Nickname,
			"avatar":   v.Avatar,
			"game":     v.Game,
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

func (m *JSK3) StatChangLong() {
	long, err := changLong(strings.Split(m.currLottery.Opencode, ","))
	update := M{}
	for k, v := range long {
		update[fmt.Sprintf("m.%s", k)] = v
	}
	if _, err = m.colls.ChangLongColl.Upsert(M{"day": GetCurrDay(), "type": "JSK3"}, M{"$inc": update}); err != nil {
		log.Errorf("failed to update changlong, error: %v", err)
	}
}
