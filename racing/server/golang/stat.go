package main

import (
	"time"

	"github.com/qiniu/db/mgoutil.v3"
	"github.com/qiniu/log.v1"
	"gopkg.in/mgo.v2/bson"
)

type StatMgr struct {
	cfg   Config
	colls Collections
	trys  int
}

func NewStatMgr(cfg Config) *StatMgr {
	var colls Collections
	_, err := mgoutil.Open(&colls, &cfg.Mgo)
	for err != nil {
		log.Warnf("Open mongodb failed: %v", err)
		_, err = mgoutil.Open(&colls, &cfg.Mgo)
		time.Sleep(time.Second * 1)
	}
	return &StatMgr{cfg, colls, 0}
}

type Quiz struct {
	Openid   string `json:"openid" bson:"openid"`
	No       int64  `json:"no" bson:"no"`
	Nickname string `json:"nickname" bson:"nickname"`
	Avatar   string `json:"avatar" bson:"avatar"`
	Choice   string `json:"choice" bson:"choice"`
	Income   int64  `json:"income" bson:"income"`
	Outlay   int64  `json:"outlay" bson:"outlay"`
	Worth    int64  `json:"worth" bson:"worth"`
	Opentime string `json:"opentime" bson:"opentime"`
}
type UserStatRecord struct {
	Openid   string `json:"openid" bson:"openid"`
	DateNo   string `json:"dateNo" bson:"dateNo"`
	Nickname string `json:"nickname" bson:"nickname"`
	Avatar   string `json:"avatar" bson:"avatar"`
	Income   int64  `json:"income" bson:"income"`
	Outlay   int64  `json:"outlay" bson:"outlay"`
	Worth    int64  `json:"worth" bson:"worth"`
}

type TerraceStatRecord struct {
	DateNo string `json:"dateNo" bson:"dateNo"`
	Income int64  `json:"income" bson:"income"`
	Outlay int64  `json:"outlay" bson:"outlay"`
	Worth  int64  `json:"worth" bson:"worth"`
}

func (m *StatMgr) statByDay() {
	var err error
	var qzs []Quiz
	yesDay := time.Now().AddDate(0, 0, -1)
	dateNo := yesDay.Format("2006-01-02")
	userStatRecords := make(map[string]UserStatRecord)
	if err = m.colls.QuizColl.Find(M{"opentime": bson.RegEx{dateNo, ""}}).All(&qzs); err != nil {
		log.Errorf("获取竞猜记录失败")
	}
	for i, v := range qzs {
		log.Infof("%d => %#v", i, v)
		if kv, ok := userStatRecords[v.Openid]; ok {
			kv.Income += v.Income
			kv.Outlay += v.Outlay
			kv.Worth += v.Worth
			userStatRecords[v.Openid] = kv
		} else {
			userStatRecords[v.Openid] = UserStatRecord{
				Openid:   v.Openid,
				DateNo:   dateNo,
				Nickname: v.Nickname,
				Avatar:   v.Avatar,
				Income:   v.Income,
				Outlay:   v.Outlay,
				Worth:    v.Worth,
			}
		}
	}

	for k, v := range userStatRecords {
		if _, err = m.colls.UserStatColl.Upsert(M{"openid": k}, v); err != nil {
			log.Errorf("保存用户统计失败：%v err ~ %v", v, err)
		}
	}

	terraceStatRecords := TerraceStatRecord{DateNo: dateNo}
	for _, v := range userStatRecords {
		terraceStatRecords.Income += v.Income
		terraceStatRecords.Outlay += v.Outlay
		terraceStatRecords.Worth += v.Worth
	}

	if _, err = m.colls.TerraceStatColl.Upsert(M{"dateNo": dateNo}, terraceStatRecords); err != nil {
		log.Errorf("保存平台统计失败：%v err ~ %v", terraceStatRecords, err)
	}
}
