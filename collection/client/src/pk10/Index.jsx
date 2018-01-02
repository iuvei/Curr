var React = require('react')

require('./requestAnimationFrame')
// require('./scss/index.scss');
import './index.css'

/* import */
import Head from './Head.jsx'
import Footer from './Footer.jsx'
import Meterial from './Meterial.jsx'
import Car from './Car.jsx'
import ReadyPanel from './ReadyPanel.jsx'
import ResultPanel from './ResultPanel.jsx'
import AudioMp3 from './Audio.jsx'

class GamePk10 extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      positon: {
        min: 142,
        max: 810
      },
      ranking: [2, 3, 1, 6, 9, 8, 4, 10, 5, 7], // 排名
      oldRanking: [],// 旧排名，不用管，方便计算排名变更之后汽车加速的状态
      preRanking: [2, 3, 1, 6, 9, 8, 4, 10, 5, 7], // 上轮排名
      status: 'ready',// ready run end
      updateRanking: true,    // 是否自动刷新排名【随机刷新】，但获取到中奖结果后，就不需要随机更新排名
      minScale: 5,    // 分布范围 1 - 5 | 1全范围 5右边起步范围
      nextid: -1,    // 下一场ID
      periodNumber: -1, // 当前ID
      goTime: null, // 运动的time时间
      countDown: 0, // 倒計時數量
      voice: false

    }
    this.fetchFirst = this.fetchFirst.bind(this)
    this.fetchInterval = this.fetchInterval.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    let ranking = this.state.ranking // 排名
    let oldRanking = this.state.oldRanking // 旧排名
    let min = this.state.positon.min, max = this.state.positon.max
    let configCars = {}

    // 现在的状态有三种 准备 跑 结束
    if (this.state.status === 'ready') {
      for (let i = 0; i < ranking.length; i++) {
        configCars['car' + (i + 1)] = {
          paddingLeft: (max - 13 * i) + 'px',
          _speed: false
        }
      }
    } else {
      // run
      ranking.forEach(function (item, index) {
        // item 汽车编号 index 排名
        let _item = parseInt(item)
        let step = Math.floor((max - min * this.state.minScale) / ranking.length / 3) // 分体阶段
        configCars['car' + _item] = {
          paddingLeft: (min * this.state.minScale + (3 * index + Math.floor(Math.random() * 3)) * step) + 'px'
        }
        let _old = oldRanking.indexOf(item) > 0 ? oldRanking.indexOf(item) : 9
        /*
        * 下方为判断加速特效
        * */
        // end 不显示加速特效
        if (this.state.status === 'end') {
          configCars['car' + _item]._speed = false
          return
        }
        // 判断加速特效
        if ((index < _old ) && (_old != 0)) {
          // console.log(item + '加速' + _old + '===>' + index);
          configCars['car' + _item]._speed = true
        } else {
          configCars['car' + _item]._speed = false
        }
      }.bind(this))
    }
    return (
      // http://static.host19.com/static/mp3/ready.mp3
      // http://static.host19.com/static/mp3/run.mp3
      // http://static.host19.com/static/mp3/result.mp3
      /* 游戏页面*/
      <div className="pk10">
        <div className="panel">
          <AudioMp3 voice={this.state.voice} countDown={this.state.countDown}
                    status={this.state.status}></AudioMp3>
          {/* 头部 */}
          <Head nextid={this.state.nextid} ranking={this.state.ranking}
                voice={this.state.voice} handleClickVoice={this.handleClickVoice.bind(this)}/>
          {/* 活动主页面 */}
          <div className="trackes">
            {/* 背景素材 */}
            <Meterial sceneryType={this.props.sceneryType}/>
            <ul>
              {/* 跑道 + 汽车 */}
              {
                this.state.ranking.map(function (car, index) {
                  /* index+1 排名 car汽车id */
                  return (
                    <li className="track" style={configCars['car' + (index + 1)]} key={index}>
                      <Car order={index + 1} speed={configCars['car' + (index + 1)]._speed}
                           status={this.state.status}/>
                    </li>
                  )
                }.bind(this))
              }
            </ul>
            {/* ready页面 */}
            <ReadyPanel countDown={this.state.countDown}/>
            {/* 结果页面 */}
            <ResultPanel ranking={this.state.ranking} show={this.state.status === 'end'}/>
          </div>
          <Footer periodNumber={this.state.periodNumber} ranking={this.state.preRanking}/>
          {/*<button onClick={this.handleClick}>开始</button>*/}
        </div>
      </div>

    )
  }

  handleClick () {
    this.setState({
      status: 'run',// ready run end
      updateRanking: true,    // 是否自动刷新排名【随机刷新】，但获取到中奖结果后，就不需要随机更新排名
      minScale: 5,    // 分布范围 1 - 5 | 1全范围 5右边起步范围
    })
  }

  // 进入页面第一次获取状态
  fetchFirst () {
    console.log('fetchFirst')
    fetch(this.props.requestUrl + '?code=pk10&t=' + Date.now()).then(function (response) {
      return response.json()
    }).then((jsonData) => {
      console.log(jsonData)
      let _goTime = Date.now() + parseInt(jsonData.next.awardTimeInterval)
      this.setState({
        ranking: jsonData.current.awardNumbers.split(','), // 排名
        preRanking: jsonData.current.awardNumbers.split(','), // 上轮排名
        nextid: jsonData.next.periodNumber,    // 下一场ID
        periodNumber: jsonData.current.periodNumber,
        goTime: _goTime
      })
      /* 只存在两种阶段  运行阶段 |　倒计时阶段 */
      if (jsonData.next.awardTimeInterval > 0) {
        // 倒计时阶段
        //      【1】循环遍历 每次剩余时间减1
        //      【2】但时间小于0（比赛开始） 更新状态变为运行状态 ，调用run阶段的迭代函数
        var interval = setInterval(function () {
          // 【1】
          var _countDown = Math.floor((_goTime - Date.now()) / 1000)

          this.setState({
            countDown: _countDown
          })
          // 【2】
          if (_countDown < 0) {
            console.log('开始跑')
            this.setState({
              status: 'run',// ready run end
              updateRanking: true,    // 是否自动刷新排名【随机刷新】，但获取到中奖结果后，就不需要随机更新排名
              minScale: 5,    // 分布范围 1 - 5 | 1全范围 5右边起步范围
            })
            // 设置起步缓冲
            var minScaleInterval = setInterval(function () {
              var _minScale = this.state.minScale - 0.5
              if (_minScale < 1) {
                this.setState({
                  minScale: 1,    // 分布范围 1 - 5 | 1全范围 5右边起步范围
                })
                clearInterval(minScaleInterval)
              } else {
                this.setState({
                  minScale: _minScale,    // 分布范围 1 - 5 | 1全范围 5右边起步范围
                })
              }
            }.bind(this), 500)
            // 调用循环遍历
            this.fetchInterval()
            clearInterval(interval)
          }
          else {
            if (this.state.status != 'ready') {
              this.setState({
                status: 'ready',// ready run end
                updateRanking: true,
                minScale: 5,
              })
            }
          }
        }.bind(this), 1000)
      } else {
        // 汽车运行阶段
        this.setState({
          status: 'run',// ready run end
          updateRanking: true,    // 是否自动刷新排名【随机刷新】，但获取到中奖结果后，就不需要随机更新排名
          minScale: 1,    // 分布范围 1 - 5 | 1全范围 5右边起步范围
          nextid: jsonData.next.periodNumber,    // 下一场ID
          periodNumber: jsonData.current.periodNumber,
          countDown: -1
        })
        // 调用循环遍历
        this.fetchInterval()
      }
    }).catch(() => {
      // alert('请求失败');
      setTimeout(function () {
        console.log('请求失败');
        this.fetchFirst();
      }.bind(this), 1000);


    })
  }

  // run 阶段遍历
  fetchInterval () {
    fetch(this.props.requestUrl + '?code=pk10&t=' + Date.now()).then(function (response) {
      return response.json()
    }).then((jsonData) => {
      console.log(jsonData)
      // 判断id
      if (parseInt(jsonData.current.periodNumber) == parseInt(this.state.nextid)) {
        console.log('获取开奖信息')
        // 设置最终排名 禁止随机排名
        this.setState({
          ranking: jsonData.current.awardNumbers.split(','), // 排名
          preRanking: jsonData.current.awardNumbers.split(','),
          updateRanking: false,
        })
        // 切换结束状态
        setTimeout(function () {
          this.setState({
            status: 'end',// ready run end
          })
          // 展示排名
          setTimeout(function () {
            this.setState({
              status: 'ready',// ready run end
              updateRanking: true,
              minScale: 5,
            })
            this.fetchFirst()
          }.bind(this), 5000)
        }.bind(this), 1000)
      }
      else if (parseInt(jsonData.current.periodNumber) > parseInt(this.state.nextid)) {
        // alert('后台返回的当前期数：' + jsonData.current.periodNumber + ';页面记录的下一场期数：' + this.state.nextid);
        this.fetchFirst()
      }
      else {
        setTimeout(function () {
          this.fetchInterval()
        }.bind(this), 1000)
      }
    }).catch(() => {
      // alert('请求失败');
      setTimeout(function () {
        console.log('请求失败');
        this.fetchFirst();
      }.bind(this), 1000);
    })
  }

  handleClickVoice () {
    if (this.state.voice) {
      this.setState({
        voice: false
      })
    } else {
      this.setState({
        voice: true
      })
    }
  }

  componentDidMount () {
    setInterval(function () {
      // 更新排名  status run的是时候才会更新排名
      if (this.state.status === 'run' && this.state.updateRanking) {
        let ranking = this.state.ranking
        let oldRanking = ranking.slice(0)
        let len = Math.ceil(Math.random() * 4) + 2
        let i = 0
        while (i < len) {
          let s = Math.floor(Math.random() * (ranking.length - 2))
          //let e = Math.floor(Math.random() * ranking.length);
          let e = s + 2
          let temp = ranking[s]
          ranking[s] = ranking[e]
          ranking[e] = temp
          i++
        }
        this.setState({
          ranking: ranking,
          oldRanking: oldRanking
        })
      }
    }.bind(this), 1000)

    // 背景  status run的是时候才会更新背景
    let road = document.getElementsByClassName('road')[0]
    let finisher = document.getElementsByClassName('finisher')[0]
    let scenery = document.getElementsByClassName('scenery')[0]
    road.style.height = this.state.ranking.length * 42 + 'px'
    let roadRight = 0
    let sceneryRight = 0

    var _gameback = function () {
      if (this.state.status === 'run') {
        // 栏标
        finisher.style.display = 'none'
        // 公路
        if (roadRight < -1000) {
          roadRight = 0
        }
        // 风景
        if (sceneryRight < -2628) {
          sceneryRight = 0
        }
        road.style.right = roadRight + 'px'
        roadRight = roadRight - 10
        scenery.style.right = sceneryRight + 'px'
        sceneryRight = sceneryRight - 3
        // 风景
      } else if (this.state.status === 'ready') {
        finisher.style.right = '138px'
        finisher.style.display = 'block'
      } else if (this.state.status === 'end') {
        /*var _s = setTimeout(function () {*/
        finisher.style.right = '700px'
        finisher.style.display = 'block'
        /*    clearTimeout(_s);
        },500)*/
      }
      requestAnimationFrame(_gameback)
    }.bind(this)
    requestAnimationFrame(_gameback)
    this.fetchFirst()

    document.getElementsByClassName('panel')[0].style.cssText =
      `transform:scale(${document.documentElement.clientWidth / 960});
             -ms-transform:scale(${document.documentElement.clientWidth / 960});
             -moz-transform:scale(${document.documentElement.clientWidth / 960});
             -webkit-transform:scale(${document.documentElement.clientWidth / 960}); 
             -o-transform:scale(${document.documentElement.clientWidth / 960});`

  }
}

export default GamePk10