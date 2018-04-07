package main

import (
	"github.com/qiniu/db/mgoutil.v3"
	"gopkg.in/mgo.v2/bson"
)

type M map[string]interface{}

type User struct {
	UserId    bson.ObjectId `json:"userId" bson:"_id"`
	Phone     string        `json:"phone" bson:"phone"` //用户ID
	Name      string        `json:"name" bson:"name"`   //用户名
	Avatar    string        `json:"avatar" bson:"avatar"`
	Dealed    bool          `json:"dealed" bson:"dealed"`
	CreatedAt string        `json:"createdAt" bson:"createdAt"`
}

type ZuoPin struct {
	Id       string   `json:"id" bson:"_id"`
	UserId   string   `json:"userId" bson:"userId"` //用户ID
	Name     string   `json:"name" bson:"name"`
	Num      string   `json:"num" bson:"num"`
	ZPName   string   `json:"zpName" bson:"zpName"`
	Stars    int      `json:"stars" bson:"stars"`
	Images   []string `json:"images" bson:"images"`
	CreateAt string   `json:"createAt" bson:"createAt"`
}

type Lottery struct {
	Id       string `json:"id" bson:"_id"`
	Name     string `json:"name" bson:"name"`
	Phone    string `json:"phone" bson:"phone"`
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
	LotterysColl mgoutil.Collection `coll:"lotterys"`
}

func (db *Collections) EnsureIndex() {
}
