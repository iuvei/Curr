package main

import (
	"database/sql"
	"fmt"
	"time"

	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

var db *sql.DB

func init() {
	var err error
	db, err = sql.Open("sqlite3", "./database.db")
	checkErr(err)
	createTable := `
	create table if not exists register (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tjName VARCHAR(64) NULL,
	classRoom VARCHAR(32) NULL,
	name VARCHAR(64) NULL,
    title VARCHAR(64) NULL,
	phone VARCHAR(20) NULL,
	co VARCHAR(64) NULL,
    createAt VARCHAR(20) NULL
	);
	`
	_, err = db.Exec(createTable)
	checkErr(err)
}
func main() {
	r := gin.Default()
	r.Use(gin.Recovery())
	r.Use(static.Serve("/", static.LocalFile("public", true)))
	rootApi := r.Group("/api")
	rootApi.GET("ping", func(c *gin.Context) {
		c.String(200, "pong")
	})
	rootApi.POST("registe", PostRegister)
	rootApi.GET("stat", GetStat)
	rootApi.GET("all", GetAll)
	rootApi.GET("delete/all/done", DeleteAll)

	r.Run(fmt.Sprintf("0.0.0.0:%d", 8090))

}

type Register struct {
	TjName    string `json:"tjName"`    //推荐人
	ClassRoom string `json:"classRoom"` //所属班级
	Name      string `json:"name"`      //姓名
	Title     string `json:"title"`     //职位
	Phone     string `json:"phone"`     //电话
	Co        string `json:"co"`        //所在公司
	CreateAt  string `json:"createAt"`  //时间
}

func PostRegister(c *gin.Context) {
	var req Register
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(400, gin.H{"message": fmt.Sprintf("参数有误 %v", err)})
		return
	} else {
		if req.Name != "" {
			insertSql := fmt.Sprintf("INSERT INTO register(tjName, classRoom, name, title, phone,co, createAt) values('%s','%s','%s','%s','%s','%s','%s')",
				req.TjName, req.ClassRoom, req.Name, req.Title, req.Phone, req.Co, time.Now().Format("2006-01-02 15:04:05"))
			fmt.Println(insertSql)
			_, err := db.Exec(insertSql)
			if err != nil {
				c.JSON(400, gin.H{"message": fmt.Sprintf("保存错误 %v", err)})
				return
			}
		}
		c.JSON(200, req)
	}
}

func DeleteAll(c *gin.Context) {
	sql := fmt.Sprintf("DELETE FROM register")
	fmt.Println(sql)
	_, err := db.Exec(sql)
	if err != nil {
		c.JSON(400, gin.H{"message": fmt.Sprintf("错误 %v", err)})
		return
	}
	c.JSON(200, gin.H{"message": "全删了，无法恢复了"})
}

func GetAll(c *gin.Context) {
	res := make([]map[string]interface{}, 0)
	selectSQL := fmt.Sprintf(`
		select tjName,classRoom,name,title,phone,createAt from register order by createAt DESC;
		`)
	rows, err := db.Query(selectSQL)
	if err != nil {
		c.JSON(400, gin.H{"message": fmt.Sprintf("错误 %v", err)})
		return
	}
	defer rows.Close()
	for rows.Next() {
		tmp := make(map[string]interface{})
		var tjName string
		var classRoom string
		var name string
		var title string
		var phone string
		var createAt string
		err = rows.Scan(&tjName, &classRoom, &name, &title, &phone, &createAt)
		if err != nil {
			fmt.Println(err)
		}
		tmp["tjName"] = tjName
		tmp["classRoom"] = classRoom
		tmp["name"] = name
		tmp["title"] = title
		tmp["phone"] = phone
		tmp["createAt"] = createAt

		res = append(res, tmp)
	}
	c.JSON(200, res)
}

func GetStat(c *gin.Context) {
	_type := c.DefaultQuery("type", "1")
	res := make([]map[string]interface{}, 0)
	if _type == "1" || _type == "" {
		selectSQL := fmt.Sprintf(`
		select classRoom, count(classRoom) as amount from register group by classRoom order by amount DESC limit 3;
		`)
		rows, err := db.Query(selectSQL)
		if err != nil {
			c.JSON(400, gin.H{"message": fmt.Sprintf("错误 %v", err)})
			return
		}
		defer rows.Close()
		for rows.Next() {
			tmp := make(map[string]interface{})
			var classRoom string
			var amount int64
			err = rows.Scan(&classRoom, &amount)
			if err != nil {
				fmt.Println(err)
			}
			tmp["key"] = classRoom
			tmp["value"] = amount
			res = append(res, tmp)
			fmt.Println(classRoom, amount)
		}
	} else {
		selectSQL := fmt.Sprintf(`
		select tjName, count(tjName) as amount from register group by tjName order by amount DESC limit 3;
		`)
		rows, err := db.Query(selectSQL)
		if err != nil {
			c.JSON(400, gin.H{"message": fmt.Sprintf("错误 %v", err)})
			return
		}
		defer rows.Close()
		for rows.Next() {
			tmp := make(map[string]interface{})
			var tjName string
			var amount int64
			err = rows.Scan(&tjName, &amount)
			if err != nil {
				fmt.Println(err)
			}
			tmp["key"] = tjName
			tmp["value"] = amount
			res = append(res, tmp)
			fmt.Println(tjName, amount)
		}
	}

	c.JSON(200, res)
}
