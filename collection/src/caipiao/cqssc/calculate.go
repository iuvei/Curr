package cqssc

import (
	"fmt"
	"sort"
	"strconv"
)

type PeiLue map[string]float32

var (
	METHOD_1  = 1
	METHOD_21 = 21
	METHOD_22 = 22
	METHOD_23 = 23
	METHOD_24 = 24
	METHOD_25 = 25
	METHOD_3  = 3
	METHOD_4  = 4
	METHOD_5  = 5
	METHOD_6  = 6
	//METHOD_01
	peiLue1 = map[string]float32{
		"大": 1.995,
		"小": 1.995,
		"单": 1.995,
		"双": 1.995,
		"龙": 1.995,
		"虎": 1.995,
		"和": 9.95,
	}
	//METHOD_21 METHOD_22 METHOD_23 METHOD_24 METHOD_25
	peiLue2 = map[string]float32{
		"大": 1.995,
		"小": 1.995,
		"单": 1.995,
		"双": 1.995,
		"0": 1.995,
		"1": 1.995,
		"2": 1.995,
		"3": 1.995,
		"4": 1.995,
		"5": 1.995,
		"6": 1.995,
		"7": 1.995,
		"8": 1.995,
		"9": 1.995,
	}
	//METHOD_3 牛牛
	peiLue3 = map[string]float32{
		"无牛": 1.995,
		"牛一": 9.95,
		"牛二": 9.95,
		"牛三": 9.95,
		"牛四": 9.95,
		"牛五": 9.95,
		"牛六": 9.95,
		"牛七": 9.95,
		"牛八": 9.95,
		"牛九": 9.95,
		"牛牛": 9.95,
		"牛大": 9.95,
		"牛小": 9.95,
		"牛双": 9.95,
		"牛单": 9.95,
	}
	// METHOD_4 METHOD_5 METHOD_6 前三中三后三
	peiLue456 = map[string]float32{
		"豹子": 75,
		"顺子": 18,
		"对子": 3.5,
		"半顺": 2.8,
		"杂六": 3.2,
	}

	niuStrMap = map[int]string{
		-1: "无牛",
		0:  "牛牛",
		1:  "牛一",
		2:  "牛二",
		3:  "牛三",
		4:  "牛四",
		5:  "牛五",
		6:  "牛六",
		7:  "牛七",
		8:  "牛八",
		9:  "牛九",
	}
)

// OpenCode = "7,5,4,5,7"

func sanFa(a, b, c int) string {
	m := []int{a, b, c}
	sort.Ints(m)
	if m[0] == m[1] && m[1] == m[2] {
		return "豹子"
	}
	//019, 089 特殊判断
	if (m[1]-m[0] == 1 && m[2]-m[1] == 1) || (m[0] == 0 && m[1] == 1 && m[2] == 9) || (m[0] == 0 && m[1] == 8 && m[2] == 9) {
		return "顺子"
	}
	if m[0] == m[1] || m[0] == m[2] || m[1] == m[2] {
		return "对子"
	}

	//半顺里面包含了全顺，但是前面return全顺，没有问题。
	if m[1]-m[0] == 1 || m[2]-m[1] == 1 {
		return "半顺"
	}
	return "杂六"
}

//斗牛的判断 arr.length=5
func niu(a, b, c, d, e int) int {
	sum3 := a + b + c
	sum2 := d + e
	if sum3%10 == 0 {
		return sum2 % 10
	}
	return -1
}

func calculate(input map[string]int, method int, opencode []string) (amount float32, err error) {
	if len(opencode) != 5 {
		return 0, fmt.Errorf("param opencode invalid")
	}
	code := make([]int, 6)
	for i, v := range opencode {
		code[i], err = strconv.Atoi(v)
		if err != nil {
			return 0, fmt.Errorf("param opencode invalid")
		}
	}
	amount = float32(0.0)
	switch method {
	case METHOD_1:
		sum := code[0] + code[1] + code[2] + code[3] + code[4]
		m := map[string]bool{
			"龙": code[0] > code[4],
			"虎": code[0] < code[4],
			"和": code[0] == code[4],
			"单": sum%2 != 0,
			"双": sum%2 == 0,
			"大": sum >= 23,
			"小": sum <= 22,
		}
		for k, v := range input {
			if m[k] {
				amount += peiLue1[k] * float32(v)
			}
		}
	case METHOD_21, METHOD_22, METHOD_23, METHOD_24, METHOD_25:
		first := code[0]
		switch method {
		case METHOD_21:
			first = code[0]
		case METHOD_22:
			first = code[1]
		case METHOD_23:
			first = code[2]
		case METHOD_24:
			first = code[3]
		case METHOD_25:
			first = code[4]
		}
		for k, v := range input {
			if k == strconv.Itoa(first) {
				amount += peiLue2[k] * float32(v)
			}
			if first >= 5 && k == "大" || first <= 4 && k == "小" {
				amount += peiLue2[k] * float32(v)
			}
			if first%2 == 0 && k == "双" || first%2 != 0 && k == "单" {
				amount += peiLue2[k] * float32(v)
			}
		}
	case METHOD_3:
		n := niu(code[0], code[1], code[2], code[3], code[4])
		str := niuStrMap[n]
		m := map[string]bool{
			"牛单": n%2 != 0,
			"牛双": n%2 == 0,
			"牛大": n == 0 || n >= 6,
			"牛小": n >= 1 && n <= 5,
		}
		for k, v := range input {
			if k == str || m[k] {
				amount += peiLue3[k] * float32(v)
			}
		}

	case METHOD_4, METHOD_5, METHOD_6:
		san := ""
		switch method {
		case METHOD_4:
			san = sanFa(code[0], code[1], code[2])
		case METHOD_5:
			san = sanFa(code[1], code[2], code[3])
		case METHOD_6:
			san = sanFa(code[2], code[3], code[4])
		}

		for k, v := range input {
			if san == k {
				amount += peiLue456[k] * float32(v)
			}
		}
	default:
		return 0, fmt.Errorf("method[%s] invalid", method)
	}
	return amount, nil
}
