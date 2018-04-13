package main

import (
	"github.com/qiniu/db/mgoutil.v3"
	//	"gopkg.in/mgo.v2/bson"
)

type M map[string]interface{}

type User struct {
	UserId    string `json:"userId" bson:"_id"`
	Phone     string `json:"phone" bson:"phone"`   //用户ID
	Name      string `json:"name" bson:"name"`     //用户名
	LCount    int    `json:"lcount" bson:"lcount"` //有多少次抽奖次数
	Dealed    bool   `json:"dealed" bson:"dealed"`
	CreatedAt string `json:"createdAt" bson:"createdAt"`
}

type ZuoPin struct {
	Id       string   `json:"id" bson:"_id"`
	UserId   string   `json:"userId" bson:"userId"` //用户ID
	Status   bool     `json:"status" bson:"status"` //审核状态
	Name     string   `json:"name" bson:"name"`
	Num      string   `json:"num" bson:"num"`
	ZPName   string   `json:"zpName" bson:"zpName"`
	Stars    int      `json:"stars" bson:"stars"`
	Pv       int      `json:"pv" bson:"pv"`
	Images   []string `json:"images" bson:"images"`
	CreateAt string   `json:"createAt" bson:"createAt"`
}

type TouPiao struct {
	ZpId     string `json:"zpId" bson:"zpId"`
	UserId   string `json:"userId" bson:"userId"`
	UpdateAt string `json:"updateAt" bson:"updateAt"`
}

type Lottery struct {
	Id       string `json:"id" bson:"_id"`
	UserId   string `json:"userId" bson:"userId"`
	Result   string `json:"result" bson:"result"`
	Name     string `json:"name" bson:"name"`
	Phone    string `json:"phone" bson:"phone"`
	Addr     string `json:"addr" bson:"addr"`
	CreateAt string `json:"createAt" bson:"createAt"`
}

type CurrNum struct {
	Type string `json:"type" bson:"type"`
	Num  int    `json:"num" bson:"num"`
}

type Collections struct {
	CurrNumColl  mgoutil.Collection `coll:"currNum"`
	UserColl     mgoutil.Collection `coll:"users"`
	ZuoPinColl   mgoutil.Collection `coll:"zuopins"`
	TouPiaoColl  mgoutil.Collection `coll:"toupiaos"`
	LotterysColl mgoutil.Collection `coll:"lotterys"`
}

func (db *Collections) EnsureIndex() {
}
