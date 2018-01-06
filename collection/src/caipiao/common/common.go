package common

import (
	"github.com/qiniu/db/mgoutil.v3"
)

type M map[string]interface{}

type CaiConf struct {
	Name string `json:"name"`
	Type string `json:"type"`
	Cron string `json:"cron"`
	Urls string `json:"urls"`
}

type Job interface {
	Run()
	Fetch() (Lottery, error)
	Store(Lottery) error
	Cron() string
	Name() string
	Type() string
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
	SettingsColl    mgoutil.Collection `coll:"settings"`
	UserColl        mgoutil.Collection `coll:"users"`
	LotteryColl     mgoutil.Collection `coll:"lotterys"`
	BetColl         mgoutil.Collection `coll:"bets"`
	QuizColl        mgoutil.Collection `coll:"quizs"`
	TerraceStatColl mgoutil.Collection `coll:"terrace_stats"`
	UserStatColl    mgoutil.Collection `coll:"users_stats"`
}
