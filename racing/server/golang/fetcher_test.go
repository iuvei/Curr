package main

import (
	"fmt"
	//	"regexp"
	//	"strings"
	"testing"
)

//func TestReg(t *testing.T) {
//	//	fmt.Println(string("123456"[1]))
//	//	fmt.Println(len("123456"))                  // ASCII only
//	//	fmt.Println(string([]rune("Hello, 世界")[1])) // UTF-8
//	//	for _, v := range "123456世界" {
//	//		fmt.Println("==>", string(v))
//	//	}

//	fmt.Println("01" > "02")
//}

func TestReg2(t *testing.T) {
	//	codes := strings.Split("02,09,10,06,07,03,05,08,01,04", ",")
	//	var r int64
	//	var err error
	//Rule1
	//fmt.Println(Rule1.MatchString("1/2/10"))
	//r, err = calculate("2/0/10", 1, codes)
	//t.Log("Rule1结果：", r, err)

	//Rule2
	//	fmt.Println(Rule2.MatchString("2/大/10"))
	//	r, err = calculate("1/双/10", 1, codes)
	//	t.Log("Rule2结果：", r, err)

	//Rule3
	//	fmt.Println(Rule3.MatchString("2/大单/10"))
	//	r, err = calculate("21/大单/10", 1, codes)
	//	t.Log("Rule3结果：", r, err)

	//Rule4
	// // /^[1-5]{1,5}\/[龙虎]\/[1-9][0-9]{1,3}$/
	//	fmt.Println(Rule4.MatchString("1/龙/10"))
	//	r, err = calculate("1/虎/10", 1, codes)
	//	t.Log("Rule4结果：", r, err)

	//Rule5
	//	fmt.Println(Rule5.MatchString("闲/10"))
	//	r, err = calculate("庄/10", 1, codes)
	//	t.Log("Rule5结果：", r, err)

	//Rule6
	// /^组\/([0-9]-[0-9].){0,10}[0-9]-[0-9]\/[0-9]{1,3}$/
	//	fmt.Println(Rule6.MatchString("组/0-9/10"))
	//	r, err = calculate("组/2-9.2-0/10", 1, codes)
	//	t.Log("Rule6结果：", r, err)

	//Rule7
	// /^和\/[大小单双]\/[1-9][0-9]{1,3}$/
	//	fmt.Println(Rule7.MatchString("和/大/10"))
	//	r, err = calculate("和/单/10", 1, codes)
	//	t.Log("Rule7结果：", r, err)

	//Rule8
	// /^特\/(\d+.)*\d+\/[1-9][0-9]{1,3}$/  还需要处理
	//	fmt.Println(Rule8.MatchString("特/11/10"))
	//	r, err = calculate("特/14,11/10", 1, codes)
	//	t.Log("Rule8结果：", r, err)

	//Rule9
	// /^[ABC]{1,3}\/[1-9][0-9]{1,3}$/
	//	fmt.Println(Rule9.MatchString("A/10"))
	//	r, err = calculate("BAB/10", 1, codes)
	//	t.Log("Rule9结果：", r, err)
	// codes := strings.Split("02,09,10,06,07,03,05,08,01,04", ",")
	//	var d int64
	//	fmt.Println("01" < "02", d)
	mgr := NewLotteryMgr(cfg)
	//	mgr.calculate()

	var config Settings
	if err := mgr.colls.SettingsColl.Find(M{"type": "betting"}).One(&config); err != nil {
		fmt.Printf("failed to get rules settings, error: %v\n", err)
	}
	rules := config.Rules
	fmt.Printf("%#v \n %d \n %d", config.Rules, rules.Rule01, rules.Rule09)

}

func TestStat(t *testing.T) {
	runStat()
	fmt.Println("=")
}
