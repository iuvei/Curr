package cqssc

import (
	"strings"
	"testing"
)

func Test_Calculate(t *testing.T) {
	openCode := strings.Split("5,2,3,4,5", ",")
	//choice := map[string]int{"大": 10, "小": 10, "单": 10, "双": 10, "和": 10}
	choice := map[string]int{"和": 10}
	res, err := calculate(choice, 1, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)
	//"大","小","单","双","0","1","2","3","4","5","6","7","8","9"
	choice = map[string]int{"2": 10}
	res, err = calculate(choice, 22, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)

	//豹子,顺子，对子，半顺，杂六  5,2,3,4,5
	choice = map[string]int{"顺子": 10}
	res, err = calculate(choice, 6, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)
}
