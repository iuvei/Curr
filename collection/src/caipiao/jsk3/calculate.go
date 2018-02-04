package jsk3

import (
	"fmt"
	"sort"
	"strconv"
	"strings"
)

var (
	METHOD_1 = 1
	METHOD_2 = 2
	METHOD_3 = 3

	//METHOD_1 和值 大小单双
	peiLue1 = map[string]float64{
		"大":  1.995,
		"小":  1.995,
		"单":  1.995,
		"双":  1.995,
		"3":  1.995,
		"4":  1.995,
		"5":  1.995,
		"6":  1.995,
		"7":  1.995,
		"8":  1.995,
		"9":  1.995,
		"10": 1.995,
		"11": 1.995,
		"12": 1.995,
		"13": 1.995,
		"14": 1.995,
		"15": 1.995,
		"16": 1.995,
		"17": 1.995,
		"18": 1.995,
	}

	//METHOD_2 三号
	peiLue2 = 1.995

	// METHOD_3 //冠亚和
	peiLue3 = 1.995
)

// OpenCode = "2,5,5"
//  数组下标为名词

func calculate(input map[string]int, method int, opencode []string) (amount float64, err error) {
	if len(opencode) != 3 {
		return 0, fmt.Errorf("param opencode invalid")
	}

	code := make([]int, 3)
	for i, v := range opencode {
		code[i], err = strconv.Atoi(v)
		if err != nil {
			return 0, fmt.Errorf("param opencode invalid")
		}
	}
	sort.Ints(code)
	amount = 0.0
	switch method {
	case METHOD_1:
		sum := code[0] + code[1] + code[2]
		m := map[string]bool{
			"单": sum%2 != 0,
			"双": sum%2 == 0,
			"大": sum >= 11,
			"小": sum <= 10,
		}
		for k, v := range input {
			if m[k] || strconv.Itoa(sum) == k {
				amount += peiLue1[k] * float64(v)
			}
		}
	case METHOD_2:
		s := strconv.Itoa(code[0]*100 + code[1]*10 + code[2])
		m := map[string]bool{
			"111": s == "111",
			"222": s == "222",
			"333": s == "333",
			"444": s == "444",
			"555": s == "555",
			"666": s == "666",
		}
		for k, v := range input {
			if m[k] {
				amount += peiLue2 * float64(v)
			}
		}

	case METHOD_3:
		s := strconv.Itoa(code[0]*100 + code[1]*10 + code[2])
		m := map[string]bool{
			"11": strings.Contains(s, "11"),
			"22": strings.Contains(s, "22"),
			"33": strings.Contains(s, "33"),
			"44": strings.Contains(s, "44"),
			"55": strings.Contains(s, "55"),
			"66": strings.Contains(s, "66"),
		}
		for k, v := range input {
			if m[k] {
				amount += peiLue3 * float64(v)
			}
		}

	default:
		return 0, fmt.Errorf("choice {%s} unexpected", input)
	}
	return
}

func changLong(opencode []string) (long map[string]int, err error) {
	long = make(map[string]int)
	if len(opencode) != 3 {
		return long, fmt.Errorf("param opencode invalid")
	}
	code := make([]int, 3)
	for i, v := range opencode {
		code[i], err = strconv.Atoi(v)
		if err != nil {
			return long, fmt.Errorf("param opencode invalid")
		}
	}
	sum := 0
	for _, v := range code {
		sum += v
	}
	if sum%2 == 0 {
		long["和值-双"] = 1
		long["和值-单"] = 0
	} else {
		long["和值-双"] = 0
		long["和值-单"] = 1
	}
	if sum >= 11 {
		long["和值-大"] = 1
		long["和值-小"] = 0
	} else {
		long["和值-大"] = 0
		long["和值-小"] = 1
	}
	return long, nil
}
