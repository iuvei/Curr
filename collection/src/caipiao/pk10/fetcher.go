package pk10

//import (
//	"gopkg.in/robfig/cron.v2"

//	"github.com/qiniu/log.v1"
//	"qbox.us/cc/config"
//)

//var NowNo = int64(0)

//func main() {
//	config.Init("f", "fetcher", "fetcher.json")
//	if err := config.Load(&cfg); err != nil {
//		log.Warn("Load fetch config file failed\n Use default config:")
//	}
//	runtime.GOMAXPROCS(cfg.MaxProcs)
//	log.SetOutputLevel(cfg.DebugLevel)
//	c := cron.New()
//	//c.AddFunc("", func() { fetcher(cfg) })
//	c.AddFunc("0 0 2 * * ?", runStat)
//	c.AddFunc("20 2-59/5 9-23 * * ?", run)
//	c.Start()
//	//	r, err := fetcher(cfg)
//	//	fmt.Printf("%#v\n, %v", r, err)
//	sigs := make(chan os.Signal, 1)
//	signal.Notify(sigs, os.Interrupt, os.Kill, syscall.SIGTERM)
//	<-sigs
//	os.Exit(0)
//}

//func testCron2() {
//	fmt.Printf("==> Run at \t%v \n", time.Now())
//}
//func run() {
//	start := time.Now()
//	mgr := NewLotteryMgr(cfg)
//	log.Infof(">>>>>>>>start to fetch lottery<<<<<<<<<")
//	lt, err := mgr.fetcher()
//	if err != nil {
//		log.Error(err)
//	}
//	nowMin := time.Now().Minute()
//	for time.Unix(lt.Opentimestamp, 0).Minute() != nowMin {
//		log.Infof("get old lottery record [no:%d], try again", lt.No)
//		lt, err = mgr.reTry()
//		if err != nil {
//			log.Error(err)
//		}
//	}

//	if err = mgr.store(lt); err != nil {
//		log.Error(err)
//		return
//	}
//	mgr.trys = 0
//	NowNo = lt.No
//	mgr.currLottery = lt

//	log.Infof("Cost: %v", time.Since(start))
//	log.Infof(">>>>>>>>finish fetching lottery<<<<<<<<<")

//	log.Infof(">>>>>>>>start to calculate lottery<<<<<<<<<")
//	start2 := time.Now()
//	mgr.calculate()
//	log.Infof("Cost: %v", time.Since(start2))
//	log.Infof(">>>>>>>>>finish calculate lottery<<<<<<<<<<")

//}

////func (m *LotteryMgr) reTry() (lt Lottery, err error) {
////	m.trys += 1
////	log.Infof("retry to fetch lottery %d ...", m.trys)
////	time.Sleep(time.Second * 3)
////	return m.fetcher()
////}
