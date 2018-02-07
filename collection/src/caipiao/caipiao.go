package main

import (
	"os"
	"os/signal"
	"runtime"
	"syscall"
	"time"

	. "caipiao/common"

	"github.com/qiniu/db/mgoutil.v3"
	"github.com/qiniu/log.v1"
	"gopkg.in/robfig/cron.v2"
	"qbox.us/cc/config"

	"caipiao/cqssc"
	"caipiao/jsk3"
	"caipiao/pk10"
)

type Config struct {
	MaxProcs   int            `json:"max_procs"`
	DebugLevel int            `json:"debug_level"`
	Mgo        mgoutil.Config `json:"mgo"`
	CaiPiaos   []CaiConf      `json:"caipiaos"`
}

var cfg Config

func main() {
	config.Init("f", "fetcher", "fetcher.json")
	if err := config.Load(&cfg); err != nil {
		log.Fatalf("Load fetch config file failed\n Use default config: %v", err)
	}
	log.Infof("Config:\n%#v", cfg)
	runtime.GOMAXPROCS(cfg.MaxProcs)
	log.SetOutputLevel(cfg.DebugLevel)
	//c := cron.New()
	//c.AddFunc("", func() { fetcher(cfg) })
	//c.AddFunc("0 0 2 * * ?", runStat)
	//	c.AddFunc("20 2-59/5 9-23 * * ?", run)
	//c.Start()

	var colls Collections
	session, err := mgoutil.Open(&colls, &cfg.Mgo)
	for err != nil {
		log.Warnf("Open mongodb failed: %v", err)
		session, err = mgoutil.Open(&colls, &cfg.Mgo)
		time.Sleep(time.Second * 1)
	}
	defer session.Close()

	s := NewScheduler(&colls)

	for _, v := range cfg.CaiPiaos {
		if v.Disable {
			continue
		}
		switch v.Type {
		case CAI_BJPK10:
			log.Infof("添加彩种[%s] ~ %v", v.Name, v)
			r := pk10.NewBJPK10(v, &colls)
			r.Run()
			s.AddJob(r)

		case CAI_CQSSC:
			log.Infof("添加彩种[%s] ~ %v", v.Name, v)
			r := cqssc.NewCQSSC(v, &colls)
			r.Run()
			s.AddJob(r)

		case CAI_JSK3:
			log.Infof("添加彩种[%s] ~ %v", v.Name, v)
			r := jsk3.NewJSK3(v, &colls)
			r.Run()
			s.AddJob(r)
		default:
			log.Fatalf("unexcepted caipiao : %v", v)
		}
	}
	s.Start()
	sigs := make(chan os.Signal, 1)
	signal.Notify(sigs, os.Interrupt, os.Kill, syscall.SIGTERM)
	<-sigs
	os.Exit(0)
}

type Scheduler struct {
	cron  *cron.Cron
	colls *Collections
}

func NewScheduler(colls *Collections) *Scheduler {
	c := cron.New()
	c.Start()
	sched := &Scheduler{c, colls}
	sched.recoverJobs()
	return sched
}

func (s *Scheduler) recoverJobs() {}

func (s *Scheduler) AddJob(job Job) (int, error) {
	id, err := s.cron.AddJob(job.Cron(), job)
	return int(id), err
}

func (s *Scheduler) RemoveJob(id int) {
	s.cron.Remove(cron.EntryID(id))
}

func (s *Scheduler) Start() {
	s.cron.Start()
}

func (s *Scheduler) Stop() {
	s.cron.Stop()
}

func runStat() {
	start := time.Now()
	mgr := NewStatMgr(cfg)
	log.Infof("=========================== start to stat lottery ===========================")
	mgr.statByDay()
	log.Infof("Cost: %v", time.Since(start))
	log.Infof("=========================== finish stat lottery =========================== ")

}
