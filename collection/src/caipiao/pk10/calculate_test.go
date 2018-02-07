package pk10

import (
	"caipiao/common"
	"strings"
	"testing"
	"time"
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

func TestChanglong(t *testing.T) {
	openCode := strings.Split("1,2,3,4,5,6,7,8,9,10", ",")
	res, err := changLong(openCode)
	if err != nil {
		t.Fail()
	}
	log.Infof("%#v", res)

	v := 100.326344
	log.Info(common.Round(v, 2))

	tt, err := time.Parse("2006-01-02 15:04:05", "2018-02-07 11:22:36")
	if err != nil {
		t.Error(err)
	}

	t.Log(tt.String())
}
