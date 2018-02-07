package cqssc

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

var log = qlog.New(os.Stderr, "CQSSC", qlog.Ldefault)

type CQSSC struct {
	cfg         CaiConf
	colls       *Collections
	currLottery Lottery
}

func NewCQSSC(conf CaiConf, colls *Collections) *CQSSC {
	log.SetPrefix(fmt.Sprintf("[%s] ", strings.ToUpper(conf.Type)))
	return &CQSSC{conf, colls, Lottery{}}
}

func (m *CQSSC) Name() string {
	return CAI_CQSSC
}

func (m *CQSSC) Cron() string {
	return m.cfg.Cron
}

func (m *CQSSC) Type() string {
	return CAI_CQSSC
}

func (m *CQSSC) Run() {
	trys := 0
	start := time.Now()
	log.Infof(">>>>>>>>start to fetch lottery<<<<<<<<<")
	for {
		lt, err := m.Fetch()
		nowMin := time.Now().Minute()
		openTime, err1 := ParseTimeString(lt.Opentime)
		if err != nil || err != nil || (openTime.Minute() != nowMin && nowMin-openTime.Minute() >= 10) {
			trys += 1
			if err != nil {
				log.Warnf("try to get lottery failed, error: %v try again %d", err, trys)
			} else {
				if err1 != nil {
					log.Warnf("try to parse lottery failed, error: %v try again %d", err, trys)
				} else {
					//重试 逻辑：开奖时间和当前时间不一样，开奖时间距离当前时间10分钟以上。
					//10分钟内说明是当前期，不必再取。
					if openTime.Minute() != nowMin && nowMin-openTime.Minute() >= 10 {
						log.Debugf("get old lottery record [no:%d], try again %d ...", lt.No+1, trys)
					}
				}
			}
			if trys < 100 {
				time.Sleep(time.Second * 5)
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

	log.Infof(">>>>>>>>finish fetching lottery<<<<<<<<<Cost: %v", time.Since(start))

	log.Infof(">>>>>>>>start to calculate lottery<<<<<<<<<")
	m.calculate()
	log.Infof(">>>>>>>>>finish calculate lottery<<<<<<<<<<")

	log.Infof(">>>>>>>>start to eval changlong <<<<<<<<<")
	m.StatChangLong()
	log.Infof(">>>>>>>>>finish eval changlong<<<<<<<<<<")

}

func (m *CQSSC) Fetch() (lt Lottery, err error) {
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
	var lts map[string]LotteryItem
	if err = json.Unmarshal(b, &lts); err != nil {
		err = fmt.Errorf("parse resp body error: %v", err)
		return
	}
	for k, v := range lts {
		lt.No, err = strconv.ParseInt(k, 10, 64)
		if err != nil {
			err = fmt.Errorf("failed to convent string to int, except=%s, error: %v", lt.Expect, err)
			return
		}

		lt.Opencode = v.Number
		lt.Opentime = v.Dateline
	}

	return
}

func (m *CQSSC) Store(lt Lottery) error {
	selector := M{"no": lt.No, "type": strings.ToUpper(m.cfg.Type)}
	update := M{"no": lt.No, "type": strings.ToUpper(m.cfg.Type), "code": lt.Opencode, "opentime": lt.Opentime}
	_, err := m.colls.LotteryColl.Upsert(selector, update)
	if err != nil {
		return fmt.Errorf("failed to persist lottery record, error: %v", err)
	}
	return nil
}

func (m *CQSSC) calculate() {
	//	var settings Settings
	//	if err := m.colls.SettingsColl.Find(M{"type": "betting"}).One(&settings); err != nil {
	//		log.Errorf("failed to get rules settings, error: %v", err)
	//	}

	//	log.Infof("rules %#v", settings.Rules)

	var bets []Bet
	err := m.colls.BetColl.Find(M{"from": 1, "game": "CQSSC", "dealed": false}).All(&bets)
	if err != nil {
		log.Errorf("failed to get bets, error: %v", err)
		return
	}
	opencode := strings.Split(m.currLottery.Opencode, ",")
	for _, v := range bets {
		var win float64
		if v.No != m.currLottery.No { //处理当前获取到了历史未处理的下注
			var lt Lottery
			err = m.colls.LotteryColl.Find(M{"no": v.No}).One(&lt)
			if err != nil {
				log.Errorf("failed tp get Lottery[%d] from mongo, error: %v", v.No, err)
				continue
			}

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

func (m *CQSSC) StatChangLong() {
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
	if _, err = m.colls.ChangLongColl.Upsert(M{"day": GetCurrDay(), "type": "CQSSC"}, M{"$inc": updateInc, "$set": updateSet}); err != nil {
		log.Errorf("failed to update changlong, error: %v", err)
	}
}
