package pk10

import (
	"fmt"
	"strconv"
)

var (
	METHOD_1  = 1
	METHOD_2  = 2
	METHOD_3  = 3
	METHOD_4  = 4
	METHOD_5  = 5
	METHOD_6  = 6
	METHOD_7  = 7
	METHOD_8  = 8
	METHOD_9  = 9
	METHOD_10 = 10

	METHOD_21 = 21 //1V龙虎
	METHOD_22 = 22 //冠亚和
	//METHOD_1 ~ METHOD_10
	peiLue1 = map[string]float32{
		"大":  1.995,
		"小":  1.995,
		"单":  1.995,
		"双":  1.995,
		"1":  1.995,
		"2":  1.995,
		"3":  1.995,
		"4":  1.995,
		"5":  1.995,
		"6":  1.995,
		"7":  1.995,
		"8":  1.995,
		"9":  1.995,
		"10": 1.995,
	}

	//METHOD_21
	peiLue2 = float32(1.995) //1V龙虎

	// METHOD_22 = 22 //冠亚和
	peiLue3 = map[string]float32{
		"大":  2.4,
		"小":  1.88,
		"单":  2.4,
		"双":  1.88,
		"3":  45,
		"4":  45,
		"5":  23,
		"6":  23,
		"7":  15,
		"8":  15,
		"9":  10.8,
		"10": 10.8,
		"11": 8.8,
		"12": 10.8,
		"13": 10.8,
		"14": 15,
		"15": 15,
		"16": 23,
		"17": 23,
		"18": 45,
		"19": 45,
	}
)

// OpenCode = "02,09,10,06,07,03,05,08,01,04"
//  数组下标为名词

func calculate(input map[string]int, method int, opencode []string) (amount float32, err error) {
	if len(opencode) != 10 {
		return 0, fmt.Errorf("param opencode invalid")
	}

	code := make([]int, 10)
	for i, v := range opencode {
		code[i], err = strconv.Atoi(v)
		if err != nil {
			return 0, fmt.Errorf("param opencode invalid")
		}
	}
	amount = float32(0.0)
	switch method {
	case METHOD_1, METHOD_2, METHOD_3, METHOD_4, METHOD_5, METHOD_6, METHOD_7, METHOD_8, METHOD_9, METHOD_10:
		num := code[0]
		switch method {
		case METHOD_1:
			num = code[0]
		case METHOD_2:
			num = code[1]
		case METHOD_3:
			num = code[2]
		case METHOD_4:
			num = code[3]
		case METHOD_5:
			num = code[4]
		case METHOD_6:
			num = code[5]
		case METHOD_7:
			num = code[6]
		case METHOD_8:
			num = code[7]
		case METHOD_9:
			num = code[8]
		case METHOD_10:
			num = code[9]
		}
		m := map[string]bool{
			"单": num%2 != 0,
			"双": num%2 == 0,
			"大": num >= 6,
			"小": num <= 5,
		}
		for k, v := range input {
			if m[k] || strconv.Itoa(num) == k {
				amount += peiLue1[k] * float32(v)
			}
		}
	case METHOD_21:
		m := map[string]bool{
			"1V10龙": code[0] > code[9],
			"1V10虎": code[0] < code[9],
			"2V9龙":  code[1] > code[8],
			"2V9虎":  code[1] < code[8],
			"3V8龙":  code[2] > code[7],
			"3V8虎":  code[2] < code[7],
			"4V7龙":  code[3] > code[6],
			"4V7虎":  code[3] < code[6],
			"5V6龙":  code[4] > code[5],
			"5V6虎":  code[4] < code[5],
		}

		for k, v := range input {
			if m[k] {
				amount += peiLue2 * float32(v)
			}
		}

	case METHOD_22:
		sum := code[0] + code[1]
		m := map[string]bool{
			"单": sum%2 != 0,
			"双": sum%2 == 0,
			"大": sum > 11,
			"小": sum <= 11,
		}
		for k, v := range input {
			if k == strconv.Itoa(sum) || m[k] {
				amount += peiLue3[k] * float32(v)
			}
		}

	default:
		return 0, fmt.Errorf("choice {%s} unexpected", input)
	}
	return
}
