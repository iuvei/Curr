package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

var (
	ErrInternalServer = func(err error) map[string]interface{} {
		return gin.H{"code": "E500", "message": fmt.Sprintf("服务器内部错误：%v", err)}
	}

	ErrBadRequest = func(err error) map[string]interface{} {
		return gin.H{"code": "E400", "message": fmt.Sprintf("请求错误：%v", err)}
	}

	ErrUserNotFound = func(user string) map[string]interface{} {
		return gin.H{"code": "E4010", "message": fmt.Sprintf("用户 %s 不存在", user)}
	}

	ErrUserWhenUpdate = func(err error) map[string]interface{} {
		return gin.H{"code": "E4011", "message": fmt.Sprintf("修改用户%s失败: %v", err)}
	}

	ErrClassNotFound = func(class string) map[string]interface{} {
		return gin.H{"code": "E4020", "message": fmt.Sprintf("课程%s不存在", class)}
	}

	ErrUploadImage = func(err error) map[string]interface{} {
		return gin.H{"code": "E4011", "message": fmt.Sprintf("上传失败: %v", err)}
	}
)
