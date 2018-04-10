package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/qiniu/log"
	//	"gopkg.in/mgo.v2"
)

type ApiConfig struct {
	cfg Config
}

type Service struct {
	*ApiConfig
	wx     WX
	colls  Collections
	client *http.Client
}

//初始化
func NewService(cfg *ApiConfig, colls Collections) (*Service, error) {
	wx := WX{
		Appid:  "wx34cd993710628c13",
		Secret: "eede7d32677e4bdc923e71603978983d",
	}
	client := http.DefaultClient
	return &Service{cfg, wx, colls, client}, nil
}

func (m *Service) genUrl(path string) string {
	if path == "" {
		return ""
	}

	return fmt.Sprintf("//%s/%s", m.cfg.S.Domain, path)
}

func (m *Service) GetUsersZuoPins(c *gin.Context) {
	userId := c.Param("userId")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "用户ID不能为空"})
		return
	}
	zps := make([]ZuoPin, 0)
	if err := m.colls.ZuoPinColl.Find(M{"userId": userId}).All(&zps); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "内部错误"})
		return
	}
	for i, v := range zps {
		images := make([]string, len(v.Images))
		for j, vv := range v.Images {
			images[j] = m.genUrl(vv)
		}
		v.Images = images
		zps[i] = v
	}
	c.JSON(http.StatusOK, gin.H{"zps": zps})
}

func (m *Service) GetUsersZuoPinById(c *gin.Context) {
	zpId := c.Param("id")
	if zpId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "作品ID不能为空"})
		return
	}
	var zp ZuoPin
	if err := m.colls.ZuoPinColl.FindId(zpId).One(&zp); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "内部错误"})
		return
	}
	c.JSON(http.StatusOK, zp)
}

func (m *Service) PutZuoPinTouPiao(c *gin.Context) {
	zpId := c.Param("id")
	if zpId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "作品ID不能为空"})
		return
	}

	var req TouPiao
	if err := c.BindJSON(&req); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}
	nowDay := GetCurrDay()
	if n, err := m.colls.TouPiaoColl.Find(M{"userId": req.UserId, "updateAt": nowDay}).Count(); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	} else {
		if n != 0 {
			c.JSON(http.StatusBadRequest, ErrBadRequest(fmt.Errorf("一天只能投票一次")))
			return
		}
		if _, err = m.colls.TouPiaoColl.Upsert(M{"userId": req.UserId}, M{"$set": M{"zpId": zpId, "updateAt": nowDay}}); err != nil {
			log.Error(err)
			c.JSON(http.StatusBadRequest, ErrBadRequest(err))
			return
		}
	}

	if err := m.colls.ZuoPinColl.UpdateId(zpId, M{"$inc": M{"stars": 1}}); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "内部错误"})
		return
	}
	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) PutPvCount(c *gin.Context) {
	zpId := c.Param("id")
	if zpId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "作品ID不能为空"})
		return
	}

	if err := m.colls.ZuoPinColl.UpdateId(zpId, M{"$inc": M{"pv": 1}}); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "内部错误"})
		return
	}
	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) UploadImage(c *gin.Context) {
	userId := c.Param("userId")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "用户ID不能为空"})
		return
	}
	form, _ := c.MultipartForm()
	name := c.PostForm("name")
	zuoPinName := c.PostForm("zpName")
	id := GenId()
	zp := ZuoPin{
		Id:       id,
		UserId:   userId,
		Name:     name,
		ZPName:   zuoPinName,
		Images:   make([]string, 0),
		CreateAt: GetCurrTime(),
	}

	var num CurrNum
	if _, err := m.colls.CurrNumColl.Upsert(M{"type": "CURRNUM"}, M{"$inc": M{"num": 1}}); err != nil {
		log.Error(err)
	}
	if err := m.colls.CurrNumColl.Find(M{"type": "CURRNUM"}).One(&num); err != nil {
		log.Error(err)
	}

	zp.Num = fmt.Sprintf("%d", num.Num)

	files := form.File["image[]"]
	for _, file := range files {
		key := fmt.Sprintf("images/%s-%s", userId, file.Filename)
		zp.Images = append(zp.Images, key)
		if err := c.SaveUploadedFile(file, key); err != nil {
			log.Error(err)
			c.JSON(http.StatusBadRequest, ErrBadRequest(err))
			return
		}
	}

	if err := m.colls.ZuoPinColl.Insert(zp); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}

	if _, err := m.colls.UserColl.UpsertId(userId, M{"$set": M{"name": zp.Name, "phone": userId}, "$inc": M{"lcount": 1}}); err != nil {
		log.Error(err)
	}

	c.JSON(http.StatusOK, zp)
}

func (m *Service) PutChoujiang(c *gin.Context) {
	userId := c.Param("userId")
	if userId == "" {
		c.JSON(http.StatusBadRequest, gin.H{"message": "用户ID不能为空"})
		return
	}
	if _, err := m.colls.UserColl.UpsertId(userId, M{"$inc": M{"lcount": -1}}); err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, ErrBadRequest(err))
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func (m *Service) GetZuoPins(c *gin.Context) {
	sorted := c.DefaultQuery("sorted", "")

	var zps []ZuoPin
	var err error
	query := m.colls.ZuoPinColl.Find(M{})
	if sorted == "" {
		err = query.Sort("-createAt").All(&zps)
	}
	if sorted == "stars" {
		err = query.Sort("-stars").All(&zps)
	}

	if sorted == "pv" {
		err = query.Sort("-pv").All(&zps)
	}
	if err != nil {
		log.Error(err)
		c.JSON(http.StatusBadRequest, gin.H{"message": "内部错误"})
		return
	}
	for i, v := range zps {
		images := make([]string, len(v.Images))
		for j, vv := range v.Images {
			images[j] = m.genUrl(vv)
		}
		v.Images = images
		zps[i] = v
	}
	c.JSON(http.StatusOK, gin.H{"zps": zps})
}
