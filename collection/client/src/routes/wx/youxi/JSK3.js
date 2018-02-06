import React, {Component} from 'react';
import {connect} from 'dva';
import {getCookie} from '../../../utils/cookies';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../../assets/wx/css/chongqingshishicai.css';
import {Icon, Spin, message} from 'antd';
import {getCurrLottery, getLive, bet} from '../../../services/wxEnd';
import CountDown from '../../../components/mobile/CountDown';
import * as p from '../ConstantsPath';
/**
 * Created by sven on 2018/1/7.
 */

const PATH_HISTORY = "/kaijianglishi"

const METHOD_1 = 1; //和值
const METHOD_2 = 2; //选三
const METHOD_3 = 3; //选二

const methodM = {
  1: "和值",
  2: '选三',
  3: '选二',
}


const options = [<option key="0" value="0">0</option>,
  <option key="2" value="2">2</option>,
  <option key="5" value="5">5</option>,
  <option key="10" value="10">10</option>,
  <option key="20" value="20">20</option>,
  <option key="50" value="50">50</option>,
  <option key="100" value="100">100</option>
];

class JSK3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
      opening: false,
      lottery: {time: '', current: {}, next: {}},
      method: METHOD_1,
      choice: {},
      historyChoices: {},
    }
    this.getLiveLottery();
  }

  componentDidMount() {
    this.getLiveLottery();
    const ticker = setInterval(this.getLiveLottery, 15000);
    this.setState({ticker});
  }

  getLiveLottery = () => {
    getLive({type: "JSK3"})
      .then(data => {
        if (data.success) {
          this.setState({
            opening: this.state.lottery.next.leftTime > 0 ? false : true,
            lottery: data.result.lottery,
          });
        }
      });
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  gotoKaijiangHISTORY = () => {
    hashHistory.push({pathname: PATH_HISTORY, state: {type: "JSK3"}});
  }

  gotoRanking = () => {
    hashHistory.push({pathname: p.PATH_Ranking, state: {type: "JSK3"}});
  }

  onMethodChange = (method) => {
    if (this.state.method !== method) {
      this.onRest();
      this.setState({
        method,
        choice: {},
      })
    }
  }


  onSend = () => {
    const {userid, username, nickname, avatar} = this.props.wx.userinfo;
    if (userid == undefined || userid == "") {
      hashHistory.push({pathname: p.PATH_Login});
      return
    }
    const {no, type} = this.state.lottery.next;
    const {method, choice} = this.state;
    if (Object.keys(choice).length == 0) {
      message.warn("您没有下注哦");
      return
    }
    const req = {userid, no, game: "JSK3", method, choice, avatar, nickname: nickname || username}
    bet(req).then(data => {
      if (data.success) {
        const historyChoices = this.state.historyChoices;
        const c = historyChoices[this.state.method];
        if (c) {
          historyChoices[this.state.method] = {...c, ...choice}
        } else {
          historyChoices[this.state.method] = choice
        }
        this.setState({choice: {}, historyChoices});
        this.onRest();
        this.props.dispatch({ //更新当前显示金额
          type: 'wx/getUserInfo',
          payload: {userid: getCookie("userid")}
        })
        message.success("下注成功")
      } else {
        message.error(data.message)
      }
    });
  }

  onRest = () => {
    document.getElementById("form").reset();
  }

  onValueChange = (e) => {
    const choice = this.state.choice;
    if (e.target.value < 0) {
      this.onRest();
      message.warn("输入无效")
      return
    }
    if (e.target.value == 0) {
      delete(choice[e.target.id])
    } else {
      choice[e.target.id] = parseInt(e.target.value);
    }
    this.setState({choice});
  }

  onCallBack = () => {
    this.setState({opening: true})
  }


  render() {
    const {method, historyChoices} = this.state;
    const {no, type, code, opentime} = this.state.lottery.current;
    var sum = 0;
    if (code !== undefined && code.split(",")) {
      const nums = code.split(",")
      sum = parseInt(nums[0]) + parseInt(nums[1]) + parseInt(nums[2])
    }
    return (
      <div className="w">
        <div className="result">
          <div className="clf periods">
            <div className="fl name">江苏快三</div>
            <div className="fl number">第 <span>{this.state.lottery.next.no || '--'}</span> 期</div>
            <div className="fr time" id="time">
              <CountDown start={'10:30'} end={'22:10'}
                         interval={80}
                         time={this.state.lottery.next.leftTime}
                         callBack={this.onCallBack.bind(this)}/>
            </div>
          </div>

          <div className="lottery">
            <div className="clf top">
              <div className="fl qishu">{no || '--'}</div>
              <div className="fl clf haoma">
                {
                  code !== undefined && code !== "" ?
                    code.split(",").map((item, i) => {
                      return <img key={i} src={require(`../../../assets/wx/images/h-${item}.png`)}/>;
                    })
                    : ""
                }
              </div>
              <div className="fr btn">
                <a onClick={this.gotoRanking}>两面长龙</a>
                <a onClick={this.gotoKaijiangHISTORY}>开奖历史</a>
              </div>
            </div>
            <div className="center">
                  <span
                    className="sp1">和值：<i>{sum > 0 ? sum : ""} {sum >= 11 ? "大" : "小"} {sum % 2 == 0 ? "双" : "单"}</i></span>
            </div>
          </div>

          <div className="clf button">
            <form action="">
              <input type="submit" value="刷新" onClick={this.getLiveLottery}/>
            </form>
          </div>
        </div>
        <Spin size="large" spinning={this.state.opening}>
          <div id="betting">
            <div className="top" id="btn">
            <span onClick={() => this.onMethodChange(METHOD_1)}
                  className={method == METHOD_1 ? 'redBG' : ''}>和值</span>
              <span onClick={() => this.onMethodChange(METHOD_2)}
                    className={method == METHOD_2 ? 'redBG' : ''}>选三号</span>
              <span onClick={() => this.onMethodChange(METHOD_3)}
                    className={method == METHOD_3 ? 'redBG' : ''}>选二号</span>
            </div>

            <div id="ctb">
              {/*<!--和值-->*/}
              <div className="bottom">
                <div className="clf title">
                  <span className="sp1">玩法</span>
                  <span className="sp2">赔率</span>
                  <span className="sp3">金额</span>
                  <span className="sp1">玩法</span>
                  <span className="sp2">赔率</span>
                  <span className="sp3">金额</span>
                </div>
                <form id="form">
                  <div className={this.state.method == METHOD_1 ? "types" : "types hidden"}>
                    <ul className="clf">
                      {
                        ['大', '小', '单', '双', 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(i => {
                          return (
                            <span key={i}>
                              <li className="li1">{i}</li>
                              <li className="li2">1.995</li>
                              <li className="li3">
                                <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                    </ul>
                  </div>

                  <div className={this.state.method == METHOD_2 ? "types" : "types hidden"}>
                    <ul className="clf">
                      {
                        [111, 222, 333, 444, 555, 666].map(i => {
                          return (
                            <span key={i}>
                              <li className="li1">{i}</li>
                              <li className="li2">1.995</li>
                              <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }
                    </ul>
                  </div>

                  <div className={this.state.method == METHOD_3 ? "types" : "types hidden"}>
                    <ul className="clf">
                      {
                        [11, 22, 33, 44, 55, 66].map(i => {
                          return (
                            <span key={i}>
                              <li className="li1">{i}</li>
                              <li className="li2">1.995</li>
                              <li className="li3">
                             <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }
                    </ul>
                  </div>
                </form>
              </div>

              <div className="xiazhu">
                <div className="title">下注结果</div>
                <ul>
                  {
                    Object.keys(historyChoices).map(method => {
                      return Object.keys(historyChoices[method]).map(e => {
                        return (
                          <li className="clf">
                            <div className="fl left">{methodM[method]}： <span>{e}</span></div>
                            <div className="fl right">下注金额： <span>{historyChoices[method][e]}</span></div>
                          </li>
                        );
                      });
                    })
                  }
                </ul>
              </div>

              <div className="clf btns">
                <input type="submit" className="ip1" value="投注" onClick={this.onSend}/>
                <input type="submit" className="ip2" value="重填" onClick={this.onRest}/>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(JSK3);



