package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/log.v1"
)

type PhoneReq struct {
	Phone string `json:"phone"`
}

func (m *Service) PutUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) DeleteUser(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) GetUser(c *gin.Context) {
	var req PhoneReq
	if err := c.BindJSON(&req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}

	var user User
	if err := m.colls.UserColl.Find(M{"phone": req.Phone}).One(&user); err != nil {
		log.Error(err)
		c.JSON(http.StatusInternalServerError, gin.H{"message": "内部错误"})
		return
	}
	c.JSON(http.StatusOK, user)
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
