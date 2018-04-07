package main

import (
	"fmt"
	"math/rand"
	"regexp"
	"strings"
	"time"
)

const (
	timeLayout = "2006-01-02 15:04:05"
)

func GetCurrTime() string {
	return time.Now().Format(timeLayout)
}

func GetCurrTimeByCustomFormat(timeLayout string) string {
	return time.Now().Format(timeLayout)
}

func GetTimeString(t time.Time) string {
	return t.Format(timeLayout)
}

func ParseTime2String(t time.Time) string {
	return t.Format(timeLayout)
}

func ParseString2Time(timeString string) (time.Time, error) {
	return time.ParseInLocation(timeLayout, timeString, time.Local)
}

func ParseString2TimeUsingTimeLayOut(timeLayout, timeString string) (time.Time, error) {
	return time.ParseInLocation(timeLayout, timeString, time.Local)
}

func GenId() string {
	return GetRandomString(20)
}

func GenTradeNo() string {
	return fmt.Sprintf("HEHUI%s%s", GetCurrTimeByCustomFormat("20060102150405"), GetRandomString(13))
}

func GenNonceStr() string {
	return fmt.Sprintf("NONCESTR%s%s", GetCurrTimeByCustomFormat("20060102150405"), GetRandomString(10))
}

//生成随机字符串
func GetRandomString(l int) string {
	str := "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	bytes := []byte(str)
	result := make([]byte, l)
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for i := 0; i < l; i++ {
		result[i] = bytes[r.Intn(len(bytes))]
	}
	return string(result)
}

func GetMineTypeFromBase64Image(src string) string {
	splits := strings.Split(src, ",")
	if len(splits) == 2 {
		mineStr := splits[0]
		return strings.Trim(strings.Split(mineStr, ";")[0], "data:")
	}
	return ""
}

func IsPhoneNoValid(phoneNo string) bool {
	reg, _ := regexp.Compile(`^1[3-8][0-9]{9}$`)
	return reg.MatchString(phoneNo)
}
