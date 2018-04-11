package main

import (
	"crypto/sha1"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sort"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/log.v1"
)

type PhoneReq struct {
	Phone string `json:"phone"`
}

func (m *Service) PostUser(c *gin.Context) {
	var req User
	if err := c.BindJSON(&req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}
	if n, err := m.colls.UserColl.Find(M{"phone": req.Phone}).Count(); err != nil {
		log.Error(err)
		c.JSON(http.StatusConflict, gin.H{"message": "用户已存在"})
		return
	} else {
		if n != 0 {
			c.JSON(http.StatusConflict, gin.H{"message": "用户已存在"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) DeleteUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) GetUser(c *gin.Context) {
	userId := c.Param("userId")
	if userId == "" {
		c.JSON(http.StatusBadRequest, ErrBadRequest(fmt.Errorf("用户ID不能为空")))
		return
	}

	var user User
	if err := m.colls.UserColl.FindId(userId).One(&user); err != nil {
		log.Error(err)
		c.JSON(http.StatusNotFound, ErrUserNotFound(user.UserId))
		return
	}
	c.JSON(http.StatusOK, user)
}

type UploadToken struct {
	Region          string `json:"region"`
	Domain          string `json:"domain"`
	Endpoint        string `json:"endpoint"`
	AccessKeyId     string `json:"accessKeyId"`
	AccessKeySecret string `json:"accessKeySecret"`
	Bucket          string `json:"bucket"`
}

func (m *Service) GetUploadToken(c *gin.Context) {
	ret := UploadToken{
		Region:          m.cfg.Storage.Region,
		Domain:          m.cfg.Storage.Domain,
		Endpoint:        m.cfg.Storage.Endpoint,
		AccessKeyId:     m.cfg.Storage.AccessKey,
		AccessKeySecret: m.cfg.Storage.SecretKey,
		Bucket:          m.cfg.Storage.Bucket,
	}
	c.JSON(http.StatusOK, ret)
}

func (m *Service) PutLotteryResult(c *gin.Context) {
	var req Lottery
	if err := c.BindJSON(&req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}
	id := GenId()
	req.Id = id
	req.CreateAt = GetCurrTime()
	if _, err := m.colls.LotterysColl.UpsertId(id, req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}
	c.JSON(http.StatusOK, req)
}

type Signature struct {
	AppId     string `json:"appId"`
	Timestamp int64  `json:"timestamp"`
	NonceStr  string `json:"nonceStr"`
	Signature string `json:"signature"`
}

type TicketCache struct {
	AccessToken string    `json:"accessToken"`
	JSApiTicket string    `json:"jsapiTicket"`
	Expires     float64   `json:"expires"`
	Time        time.Time `json:"time"`
}

var ticketCache = TicketCache{"", "", 7200, time.Now()}

func (m *Service) GetWxSign(c *gin.Context) {
	url := c.Query("url")
	if url == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "URL不能为空"})
		return
	}
	var err error
	//log.Debug("=======", url, strings.Index(url, "#"))
	if strings.Index(url, "#") > 0 {
		url = url[0 : strings.Index(url, "#")+1]
	}
	//log.Debug(url)
	signature := Signature{}
	signature.AppId = m.wx.Appid
	signature.Timestamp = time.Now().Unix()
	signature.NonceStr = GenNonceStr()

	signMap := make(map[string]interface{})
	signMap["timestamp"] = signature.Timestamp
	signMap["noncestr"] = signature.NonceStr
	signMap["url"] = url
	signMap["jsapi_ticket"], err = m.getJsapiTicket()
	if err != nil {
		fmt.Errorf("获取微信JSAPI Ticket失败：%v", err)
		c.JSON(http.StatusForbidden, gin.H{"message": "获取微信JSAPI Ticket失败"})
		return
	}
	//log.Debugf("%#v", signMap)
	signature.Signature = wxSign(signMap)
	c.JSON(http.StatusOK, signature)
}

type JSApiTicket struct {
	ErrCode   int    `json:"errcode"`
	ErrMsg    string `json:"errmsg"`
	Ticket    string `json:"ticket"`
	ExpiresIn int    `json:"expires_in"`
}

func (m *Service) getJsapiTicket() (jsapiTicket string, err error) {
	//log.Debug(ticketCache.AccessToken != "" && ticketCache.JSApiTicket != "")
	//log.Debug(ticketCache.Expires, ",", time.Now().Sub(ticketCache.Time).Seconds(), "===", ticketCache.Expires > time.Now().Sub(ticketCache.Time).Seconds())

	if ticketCache.AccessToken != "" && ticketCache.JSApiTicket != "" && ticketCache.Expires > time.Now().Sub(ticketCache.Time).Seconds() {
		return ticketCache.JSApiTicket, nil
	}
	accessToken, err := m.getAccessToken()
	if err != nil {
		fmt.Errorf("获取微信Access Token失败：%v", err)
	}
	getticket_url := fmt.Sprintf("https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=%s&type=jsapi", accessToken)

	resp, err := m.client.Get(getticket_url)
	if err != nil {
		log.Error(err)
		return
	}

	if resp != nil {
		defer resp.Body.Close()
	}
	rb1, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Errorf("Error: %v \nBody: %v", err, string(rb1))
		return
	}

	var ticket JSApiTicket
	err = json.Unmarshal(rb1, &ticket)
	if err != nil {
		log.Error(err)
		return
	}
	if ticket.ErrCode != 0 {
		log.Errorf("%#v", ticket)
		err = fmt.Errorf(ticket.ErrMsg)
		return
	}
	ticketCache.JSApiTicket = ticket.Ticket
	ticketCache.Time = time.Now()
	jsapiTicket = ticket.Ticket
	return
}

type AccessToken struct {
	AccessToken string `json:"access_token"`
	ExpiresIn   int    `json:"expires_in"`
}

func (m *Service) getAccessToken() (accessToken string, err error) {
	access_token_url := fmt.Sprintf("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s", m.wx.Appid, m.wx.Secret)
	resp, err := m.client.Get(access_token_url)
	if err != nil {
		log.Error(err)
		return
	}

	if resp != nil {
		defer resp.Body.Close()
	}
	rb1, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Errorf("Error: %v \nBody: %s", err, string(rb1))
		return
	}
	var at AccessToken
	err = json.Unmarshal(rb1, &at)
	if err != nil {
		log.Error(err)
		return
	}
	ticketCache.AccessToken = at.AccessToken
	accessToken = at.AccessToken
	//log.Debug("==accessToken=", accessToken)
	//leftTime = urlResp['expires_in']
	return
}

//微信jsapi 签名
func wxSign(mReq map[string]interface{}) string {
	//STEP 1, 对key进行升序排序.
	sorted_keys := make([]string, 0)
	for k, _ := range mReq {
		sorted_keys = append(sorted_keys, k)
	}

	sort.Strings(sorted_keys)
	//STEP2, 对key=value的键值对用&连接起来
	kvArr := make([]string, len(sorted_keys))
	for i, k := range sorted_keys {
		kvStr := fmt.Sprintf("%s=%v", strings.ToLower(k), mReq[k])
		kvArr[i] = kvStr
	}

	signStrings := strings.Join(kvArr, "&")

	sha1Ctx := sha1.New()
	sha1Ctx.Write([]byte(signStrings))
	cipherStr := sha1Ctx.Sum(nil)
	upperSign := hex.EncodeToString(cipherStr)

	return upperSign
}
