package main

import (
	"fmt"
	"net/http"

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
