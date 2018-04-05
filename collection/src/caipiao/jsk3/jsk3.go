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
	"gopkg.in/mgo.v2/bson"
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
	for {
		lt, err := m.Fetch()
		//pt, err1 := ParseTimeString(lt.Opentime)
		if err != nil || lt.No == m.currLottery.No { //|| err1 != nil  || time.Now().Minute()-pt.Minute() >= 2
			trys += 1
			if err != nil { //|| err1 != nil
				log.Warnf("try to get lottery failed, error: %v, try again %d", err, trys)
			} else {
				if lt.No != m.currLottery.No {
					log.Debugf("get old lottery record [no:%d], try again %d ...", lt.No, trys)
				}
			}

			if trys < 100 {
				time.Sleep(time.Second * 6)
				continue
			} else {
				log.Errorf("第[%d]重试次数超过100次，放弃！请手动补齐", lt.No+1)
				return
			}
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
		break
	}

	log.Infof(">>>>>>>>finish fetching lottery<<<<<<<<<", time.Since(start))

	log.Infof(">>>>>>>>start to calculate lottery<<<<<<<<<")
	m.Calculate()
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
	//	var lts map[string]LotteryItem
	//	if err = json.Unmarshal(b, &lts); err != nil {
	//		err = fmt.Errorf("parse resp body error: %v", err)
	//		return
	//	}
	//	for k, v := range lts {
	//		lt.No, err = strconv.ParseInt(k, 10, 64)
	//		if err != nil {
	//			err = fmt.Errorf("failed to convent string to int, except=%s, error: %v", lt.Expect, err)
	//			return
	//		}

	//		lt.Opencode = v.Number
	//		lt.Opentime = v.Dateline
	//	}

	var lts Lotterys
	if err = json.Unmarshal(b, &lts); err != nil {
		err = fmt.Errorf("parse resp body error: %v", err)
		return
	}
	for _, v := range lts.Data {
		lt.No, err = strconv.ParseInt(v.Expect, 10, 64)
		if err != nil {
			err = fmt.Errorf("failed to convent string to int, except=%s, error: %v", lt.Expect, err)
			return
		}
		lt.Expect = v.Expect
		lt.Opencode = v.Opencode
		lt.Opentime = v.Opentime
	}

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
		var win float64
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
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, v.No, err)
				continue
			}

		} else {
			win, err = calculate(v.Choice, v.Method, opencode)
			if err != nil {
				log.Errorf("failed to calculate %v at no[%v], error: %v", v.Choice, v.No, err)
				continue
			}
		}

		if win != 0 {
			if err = m.colls.UserColl.UpdateId(bson.ObjectIdHex(v.UserId), M{"$inc": M{"balance": Round(win, 2)}}); err != nil {
				log.Errorf("failed to update user's balance, error: %v", err)
				continue
			}
		}

		if err = m.colls.BetColl.UpdateId(v.Id, M{"$set": M{"dealed": true}}); err != nil {
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
	updateInc := M{}
	updateSet := M{}
	for k, v := range long {
		if v == 1 {
			updateInc[fmt.Sprintf("m.%s", k)] = v
		} else {
			updateSet[fmt.Sprintf("m.%s", k)] = v
		}
	}
	if _, err = m.colls.ChangLongColl.Upsert(M{"day": GetCurrDay(), "type": "JSK3"}, M{"$inc": updateInc, "$set": updateSet}); err != nil {
		log.Errorf("failed to update changlong, error: %v", err)
	}
}
