package pk10

import (
	"strings"
	"testing"
)

func Test_Calculate(t *testing.T) {
	openCode := strings.Split("1,2,3,4,5,6,7,8,9,10", ",")
	choice := map[string]int{"9": 10}
	res, err := calculate(choice, 10, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)

	choice = map[string]int{"5V6龙": 10}
	res, err = calculate(choice, 21, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)

	choice = map[string]int{"小": 10}
	res, err = calculate(choice, 22, openCode)
	if err != nil {
		t.Fatal(err)
	}
	t.Log(res)
}
