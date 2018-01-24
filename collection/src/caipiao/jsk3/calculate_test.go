package jsk3

import (
	"strings"
	"testing"
)

func Test_Calculate(t *testing.T) {
	openCode := strings.Split("5,5,5", ",")
	//choice := map[string]int{"大": 10, "小": 10, "单": 10, "双": 10, "和": 10}
	choice := map[string]int{"13": 10}
	res, err := calculate(choice, 1, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)

	choice = map[string]int{"545": 10}
	res, err = calculate(choice, 2, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)

	choice = map[string]int{"15": 10}
	res, err = calculate(choice, 3, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)
}
