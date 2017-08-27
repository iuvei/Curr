package main

import (
	"fmt"
	"regexp"
	"testing"
)

var (
	Rule1, _ = regexp.Compile(`^[0-9]{1,10}\/[0-9]{1,10}\/[1-9][0-9]{1,3}$`)
)

func TestReg(t *testing.T) {
	fmt.Println(Rule1.MatchString("1/9/10"))
}
