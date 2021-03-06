package pk10

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
	"gopkg.in/mgo.v2/bson"
)

var log = qlog.New(os.Stderr, "BJPK10", qlog.Ldefault)

type BJPK10 struct {
	cfg         CaiConf
	colls       *Collections
	currLottery Lottery
}

func NewBJPK10(conf CaiConf, colls *Collections) *BJPK10 {
	log.SetPrefix(fmt.Sprintf("[%s] ", strings.ToUpper(conf.Type)))
	return &BJPK10{conf, colls, Lottery{}}
}

func (m *BJPK10) Name() string {
	return CAI_BJPK10
}

func (m *BJPK10) Cron() string {
	return m.cfg.Cron
}

func (m *BJPK10) Type() string {
	return CAI_BJPK10
}

func (m *BJPK10) Run() {
	trys := 0
	start := time.Now()
	log.Infof(">>>>>>>>start to fetch lottery<<<<<<<<<")
	lt, err := m.Fetch()
	if err != nil {
		log.Warnf("try to get lottery failed, error: %v", err)
	}

	nowMin := time.Now().Minute()
	openMin := time.Unix(lt.Opentimestamp, 0).Minute()
	//重试 逻辑：开奖时间和当前时间不一样，开奖时间距离当前时间5分钟以上。
	//5分钟内说明是当前期，不必再取。
	for openMin != nowMin && nowMin-openMin >= 5 {
		trys += 1
		log.Infof("get old lottery record [no:%d], try again %d ...", lt.No+1, trys)
		if trys < 100 {
			time.Sleep(time.Second * 3)
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

	log.Infof("获取结果：%#v", lt)

	if err = m.Store(lt); err != nil {
		log.Error("存储彩票记录[%v]失败：%v", lt, err)
		return
	}

	m.currLottery = lt

	//log.Infof("Cost: %v", time.Since(start))
	log.Infof("Cost: %v >>>>>>>>finish fetching lottery<<<<<<<<<", time.Since(start))

	//	log.Infof(">>>>>>>>start to calculate lottery<<<<<<<<<")
	//	start2 := time.Now()
	//	m.calculate()
	//	log.Infof("Cost: %v", time.Since(start2))
	//	log.Infof(">>>>>>>>>finish calculate lottery<<<<<<<<<<")

}

func (m *BJPK10) Fetch() (lt Lottery, err error) {
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

func (m *BJPK10) Store(lt Lottery) error {
	selector := M{"no": lt.No, "type": strings.ToUpper(m.cfg.Type)}
	update := M{"no": lt.No, "type": strings.ToUpper(m.cfg.Type), "code": lt.Opencode, "opentime": lt.Opentime}
	_, err := m.colls.LotteryColl.Upsert(selector, update)
	if err != nil {
		return fmt.Errorf("failed to persist lottery record, error: %v", err)
	}
	return nil
}

func (m *BJPK10) calculate() {

	var settings Settings
	if err := m.colls.SettingsColl.Find(M{"type": "betting"}).One(&settings); err != nil {
		log.Errorf("failed to get rules settings, error: %v", err)
	}

	log.Infof("rules %#v", settings.Rules)

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
			win, err = calculate(v.Choice, settings.Rules, strings.Split(lt.Opencode, ","))
			if err != nil {
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, NowNo, err)
				continue
			}

		} else {
			win, err = calculate(v.Choice, settings.Rules, opencode)
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

type RuleConfig struct {
	Rule01 int `json:"rule01" bson:"rule01"`
	Rule02 int `json:"rule02" bson:"rule02"`
	Rule03 int `json:"rule03" bson:"rule03"`
	Rule04 int `json:"rule04" bson:"rule04"`
	Rule05 int `json:"rule05" bson:"rule05"`
	Rule06 int `json:"rule06" bson:"rule06"`
	Rule07 int `json:"rule07" bson:"rule07"`
	Rule08 int `json:"rule08" bson:"rule08"`
	Rule09 int `json:"rule09" bson:"rule09"`
}

type Settings struct {
	Type  string     `json:"type" bson:"type"`
	Rules RuleConfig `json:"config" bson:"config"`
}
