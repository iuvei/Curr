package main

import (
	"fmt"
	"os"
	"runtime"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/qiniu/log"

	"github.com/qiniu/db/mgoutil.v3"
	"qbox.us/cc/config"
)

func main() {
	config.Init("f", "service", "service.conf")
	var cfg Config
	if err := config.Load(&cfg); err != nil {
		log.Warn("Load report config file failed\n Use default config:")
		cfg = Config{
			Env{Dev: true},
			mgoutil.Config{Host: "127.0.0.1", DB: "zuopin_dev"},
			EndPoint{"localhost", "8005", runtime.NumCPU()/2 + 1, 1, "./"},
		}
		log.Infof("%+v", cfg)
	}

	log.SetOutputLevel(cfg.S.DebugLevel)
	if cfg.S.MaxProcs > runtime.NumCPU() || cfg.S.MaxProcs <= 0 {
		runtime.GOMAXPROCS(runtime.NumCPU()/2 + 1)
	} else {
		runtime.GOMAXPROCS(cfg.S.MaxProcs)
	}

	var colls Collections
	session, err := mgoutil.Open(&colls, &cfg.M)
	for err != nil {
		log.Warnf("Open mongodb failed: %v", err)
		session, err = mgoutil.Open(&colls, &cfg.M)
		time.Sleep(time.Second * 1)
	}
	colls.EnsureIndex()
	go func() {
		session.SetSocketTimeout(time.Second * 5)
		session.SetSyncTimeout(time.Second * 5)
		for {
			err := session.Ping()
			if err != nil {
				session.Refresh()
				session.SetSocketTimeout(time.Second * 5)
				session.SetSyncTimeout(time.Second * 5)
			} else {
				time.Sleep(time.Second * 5)
			}
		}
	}()

	// Disable Console Color
	if !cfg.E.Dev {
		gin.DisableConsoleColor()
	}

	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	r.Use(cors.New(config))
	r.Use(gin.Recovery())
	log.Info(cfg.S.StaticPath)
	r.Use(static.Serve("/", static.LocalFile(cfg.S.StaticPath, true)))
	r.Use(static.Serve("/images", static.LocalFile("images", true)))

	ImageDir := "./images"
	fileinfo, err := os.Stat(ImageDir)
	if os.IsNotExist(err) {
		os.Mkdir(ImageDir, 0777)
	}
	log.Infof("%#v", fileinfo)
	rootApi := r.Group("/v1")

	// Ping test
	rootApi.GET("ping", func(c *gin.Context) {
		c.String(200, "pong")
	})

	//获取版本信息
	CurrVersion := "1.0.0"
	rootApi.GET("version", func(c *gin.Context) {
		c.JSON(200, gin.H{"version": CurrVersion, "forceUpdate": false})
	})

	srv, err := NewService(&ApiConfig{cfg: cfg}, colls)
	if err != nil {
		log.Fatal(err)
	}

	usersGroup := rootApi.Group("users")
	{
		usersGroup.POST("/:userId", srv.PostUser)
		usersGroup.PUT("/:userId/zp", srv.UploadImage)
		usersGroup.PUT("/:userId/choujiang", srv.PutChoujiang)
		usersGroup.GET("/:userId", srv.GetUser)
		usersGroup.GET("/:userId/zps", srv.GetUsersZuoPins)
		usersGroup.DELETE("/:userId", srv.DeleteUser)
	}

	zpsGroup := rootApi.Group("zps")
	{
		zpsGroup.GET("", srv.GetZuoPins)
		zpsGroup.GET("/:id", srv.GetUsersZuoPinById)
		zpsGroup.PUT("/:id/toupiao", srv.PutZuoPinTouPiao)
		zpsGroup.PUT("/:id/pv", srv.PutPvCount)

		//zpsGroup.DELETE("/:userId", srv.DeleteUser)
	}

	rootApi.PUT("lottery", srv.PutLotteryResult)

	// Listen and Server in 0.0.0.0:8008
	if cfg.E.Dev {
		log.Infof("listening on :%s use http", cfg.S.Port)
		log.Fatal(r.Run(fmt.Sprintf("0.0.0.0:%s", cfg.S.Port)))
		//log.Fatal(endless.ListenAndServe(fmt.Sprintf("0.0.0.0:%s", cfg.S.Port), r))
	}
}

type EndPoint struct {
	Domain     string `json:"domain"`
	Port       string `json:"port"`
	MaxProcs   int    `json:"max_procs"`
	DebugLevel int    `json:"debug_level"`
	StaticPath string `json:"static_file_path"`
}

type Env struct {
	Dev bool `json:"dev"`
}

type Config struct {
	E Env            `json:"env"`
	M mgoutil.Config `json:"mgo"`
	S EndPoint       `json:"service"`
}
