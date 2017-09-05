package main

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"

	"github.com/qiniu/log.v1"
)

var (
	//  /^[0-9]{1,10}\/[0-9]{1,10}\/[1-9][0-9]{1,3}$/
	Rule1, _ = regexp.Compile(`(^[0-9]{1,10})\/([0-9]{1,10})\/([1-9][0-9]{1,3}$)`)

	//  /^[0-9]{1,10}\/[大小单双]\/[1-9][0-9]{1,3}$/
	Rule2, _ = regexp.Compile(`^[0-9]{1,10}\/[大小单双]\/[1-9][0-9]{1,3}$`)

	// /^[0-9]{1,10}\/[大小][单双]\/[1-9][0-9]{1,3}$/
	Rule3, _ = regexp.Compile(`^[0-9]{1,10}\/[大小][单双]\/[1-9][0-9]{1,3}$`)

	// /^[1-5]{1,5}\/[龙虎]\/[1-9][0-9]{1,3}$/
	Rule4, _ = regexp.Compile(`^[1-5]{1,5}\/[龙虎]\/[1-9][0-9]{1,3}$`)

	// /^[庄闲]\/[1-9][0-9]{1,3}$/
	Rule5, _ = regexp.Compile(`^[庄闲]\/[1-9][0-9]{1,3}$`)

	// /^组\/([0-9]-[0-9].){0,10}[0-9]-[0-9]\/[0-9]{1,3}$/
	Rule6, _ = regexp.Compile(`^组\/([0-9]-[0-9].){0,10}[0-9]-[0-9]\/[0-9]{1,3}$`)

	// /^和\/[大小单双]\/[1-9][0-9]{1,3}$/
	Rule7, _ = regexp.Compile(`^和\/[大小单双]\/[1-9][0-9]{1,3}$`)

	// /^特\/(\d+.)*\d+\/[1-9][0-9]{1,3}$/  还需要处理
	Rule8, _ = regexp.Compile(`^特\/(\d+.)*\d+\/[1-9][0-9]{1,3}$`)

	// /^[ABC]{1,3}\/[1-9][0-9]{1,3}$/
	Rule9, _ = regexp.Compile(`^[ABC]{1,3}\/[1-9][0-9]{1,3}$`)
)

// OpenCode = "02,09,10,06,07,03,05,08,01,04"
//  数组下标为名词

func calculate(input string, odds int, opencode []string) (int64, error) {
	if len(opencode) != 10 {
		return 0, fmt.Errorf("param opencode invalid")
	}
	var d = int64(odds)
	if odds < 1 {
		d = 1
	}
	if Rule1.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule1.String())
		inputs := strings.Split(input, "/")
		ranks := inputs[0]
		roads := inputs[1]
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		for _, rk := range ranks {
			for _, rd := range roads {
				if opencode[ranksIndex[string(rk)]] == roadFormat[string(rd)] {
					count += 1
				}
			}
		}
		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule2.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule2.String())
		//  /^[0-9]{1,10}\/[大小单双]\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		ranks := inputs[0]
		road := inputs[1] //one
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		for _, rk := range ranks {
			no := opencode[ranksIndex[string(rk)]]
			fmt.Println("===>", bigOrSmall(opencode[ranksIndex[string(rk)]]), road)
			if bigOrSmall(no) == road || oddOrEven(no) == road {
				count += 1
			}
		}
		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule3.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule3.String())
		// /^[0-9]{1,10}\/[大小][单双]\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		ranks := inputs[0]
		roads := inputs[1]
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		for _, rk := range ranks {
			for _, rd := range []rune(roads) {
				no := opencode[ranksIndex[string(rk)]]
				fmt.Println("===>", bigOrSmall(opencode[ranksIndex[string(rk)]]), oddOrEven(opencode[ranksIndex[string(rk)]]), string(rd))
				if bigOrSmall(no) == string(rd) || oddOrEven(no) == string(rd) {
					count += 1
				}
			}
		}
		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule4.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule4.String())
		// /^[1-5]{1,5}\/[龙虎]\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		ranks := inputs[0]
		road := inputs[1]
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		for _, rk := range ranks {
			startIndex := ranksIndex[string(rk)]
			endIndex := 9 - startIndex
			first := opencode[startIndex]
			second := opencode[endIndex]

			fmt.Println("===>", first, second, road)
			if first > second && road == "龙" {
				count += 1
			}
			if first < second && road == "虎" {
				count += 1
			}
		}
		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule5.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule5.String())
		// /^[庄闲]\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		rank := inputs[0]
		unit, err := strconv.ParseInt(inputs[1], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		first := opencode[0]
		second := opencode[1]
		if first > second && rank == "庄" {
			count += 1
		}
		if first < second && rank == "闲" {
			count += 1
		}
		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule6.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule6.String())
		// /^组\/([0-9]-[0-9].){0,10}[0-9]-[0-9]\/[0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		roads := inputs[1]
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		first := opencode[0]
		second := opencode[1]
		for _, rd := range strings.Split(roads, ".") {
			rds := strings.Split(rd, "-")
			a := roadFormat[rds[0]]
			b := roadFormat[rds[1]]
			fmt.Println("===>", first, second, a, b)
			if (first == a || first == b) && (second == a || second == b) {
				count += 1
			}
		}

		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule7.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule7.String())
		// /^和\/[大小单双]\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		road := inputs[1]
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		firstNum := strNumToInt[opencode[0]]
		secondNum := strNumToInt[opencode[1]]

		fmt.Println("===>", firstNum, secondNum, firstNum+secondNum)
		sum := firstNum + secondNum
		if sum >= 12 && road == "大" {
			count += 1
		}
		if sum <= 11 && road == "小" {
			count += 1
		}
		if sum%2 != 0 && road == "单" {
			count += 1
		}
		if sum%2 == 0 && road == "双" {
			count += 1
		}

		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	if Rule8.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule8.String())
		// /^特\/(\d+.)*\d+\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		roads := inputs[1]
		unit, err := strconv.ParseInt(inputs[2], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		firstNum := strNumToInt[opencode[0]]
		secondNum := strNumToInt[opencode[1]]
		sum := firstNum + secondNum

		fmt.Println("===>", firstNum, secondNum, firstNum+secondNum, roads)

		for _, rd := range strings.Split(roads, ".") {
			if strconv.Itoa(sum) == rd {
				count += 1
				break
			}
		}
		if count == 1 {
			switch sum {
			case 3, 4, 18, 19:
				return unit * count * d * 5, nil
			case 5, 6, 16, 17:
				return unit * count * d * 4, nil
			case 7, 8, 14, 15:
				return unit * count * d * 3, nil
			case 9, 10, 12, 13:
				return unit * count * d * 2, nil
			case 11:
				return unit * count * d, nil
			}
		}

		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return 0, nil
	}

	if Rule9.MatchString(input) {
		log.Infof("choice{%s} match %v", input, Rule9.String())
		// /^[ABC]{1,3}\/[1-9][0-9]{1,3}$/
		inputs := strings.Split(input, "/")
		roads := inputs[0]
		unit, err := strconv.ParseInt(inputs[1], 10, 64)
		if err != nil {
			return 0, err
		}
		count := int64(0)
		firstNum := strNumToInt[opencode[0]]
		secondNum := strNumToInt[opencode[1]]
		sum := firstNum + secondNum

		for _, rd := range roads {
			fmt.Println("===>", firstNum, secondNum, firstNum+secondNum, string(rd))

			//特码3~7为A段，8~14为B段，15~19为C段。
			if (sum >= 3 && sum <= 7) && string(rd) == "A" {
				count += 1 * 3 //基础倍率的3倍
			}
			if (sum >= 8 && sum <= 14) && string(rd) == "B" {
				count += 1
			}
			if (sum >= 15 && sum <= 19) && string(rd) == "C" {
				count += 1 * 3
			}
		}
		fmt.Printf("count=>%d  unit=>%f odds=>%f\n", count, unit, d)
		return unit * count * d, nil
	}

	return 0, fmt.Errorf("choice {%s} unexpected", input)
}

var ranksIndex = map[string]int{
	"1": 0,
	"2": 1,
	"3": 2,
	"4": 3,
	"5": 4,
	"6": 5,
	"7": 6,
	"8": 7,
	"9": 8,
	"0": 9,
}

var roadFormat = map[string]string{
	"1": "01",
	"2": "02",
	"3": "03",
	"4": "04",
	"5": "05",
	"6": "06",
	"7": "07",
	"8": "08",
	"9": "09",
	"0": "10",
}

var strNumToInt = map[string]int{
	"01": 1,
	"02": 2,
	"03": 3,
	"04": 4,
	"05": 5,
	"06": 6,
	"07": 7,
	"08": 8,
	"09": 9,
	"10": 10,
}

func bigOrSmall(road string) string {
	switch road {
	case "06", "07", "08", "09", "10":
		return "大"
	default:
		return "小"
	}
}

func oddOrEven(road string) string {
	switch road {
	case "01", "03", "05", "07", "09":
		return "单"
	default:
		return "双"
	}
}
