import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {connect} from 'dva';
import {getCookie} from '../../../utils/cookies';
import '../../../assets/wx/css/chongqingshishicai.css';
import {Icon, Spin, message} from 'antd';
import {getLive, bet} from '../../../services/wxEnd';
import CountDown from '../../../components/mobile/CountDown';
import * as p from '../ConstantsPath';
/**
 * Created by sven on 2018/1/7.
 */

const METHOD_1 = 1; //冠军
const METHOD_2 = 2; //亚军
const METHOD_3 = 3; //季军
const METHOD_4 = 4; //四名
const METHOD_5 = 5; //五名
const METHOD_6 = 6; //六名
const METHOD_7 = 7; //七名
const METHOD_8 = 8; //八名
const METHOD_9 = 9; //九名
const METHOD_10 = 10; //十名


const METHOD_21 = 21; //1V龙虎
const METHOD_22 = 22; //冠亚和

const methodM = {
  1: "冠军",
  2: '亚军',
  3: '季军',
  4: '四名',
  5: '五名',
  6: '六名',
  7: '七名',
  8: '八名',
  9: '九名',
  10: '十名',
  21: '1V龙虎',
  22: '冠亚和'
};


class BJPK10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
      opening: true,
      lottery: {time: '', current: {}, next: {}},
      method: METHOD_1,
      choice: {},
      historyChoices: {},
    };
    this.getLiveLottery();
  }

  componentDidMount() {
    this.getLiveLottery();
    const ticker = setInterval(this.getLiveLottery, 10000);
    this.setState({ticker});
  }

  getLiveLottery = () => {
    getLive({type: "BJPK10"})
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
    hashHistory.push({pathname: p.PATH_HISTORY, state: {type: "BJPK10"}});
  }

  gotoRanking = () => {
    hashHistory.push({pathname: p.PATH_Ranking, state: {type: "BJPK10"}});
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
    const req = {userid, no, game: "BJPK10", method, choice, avatar, nickname: nickname || username}
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
    const {method, historyChoices, opening} = this.state;
    const {no, type, code, opentime} = this.state.lottery.current;
    var n1 = 0;
    var n2 = 0;
    var n3 = 0;
    var n4 = 0;
    var n5 = 0;
    var n6 = 0;
    var n7 = 0;
    var n8 = 0;
    var n9 = 0;
    var n10 = 0;
    if (code !== undefined && code.split(",").length == 10) {
      const nums = code.split(",")
      n1 = parseInt(nums[0])
      n2 = parseInt(nums[1])
      n3 = parseInt(nums[2])
      n4 = parseInt(nums[3])
      n5 = parseInt(nums[4])
      n6 = parseInt(nums[5])
      n7 = parseInt(nums[6])
      n8 = parseInt(nums[7])
      n9 = parseInt(nums[8])
      n10 = parseInt(nums[9])
    }

    console.log(this.state.opening, '=============================================', this.state.lottery.next.leftTime)

    return (
      <div className="w">
        <div className="result">
          <div className="clf periods">
            <div className="fl name">北京赛车</div>
            <div className="fl number">第 <span>{this.state.lottery.next.no || '--'}</span> 期</div>
            <div className="fr time" id="time">
              <CountDown start={'9:00'} end={'23:55'}
                         interval={40}
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
                <div>{opening}</div>
                <Spin/>
                <a href="https://www.66icp.com/pk10/shipin" target="_blank">赛车直播</a>
                <a onClick={this.gotoRanking}>两面长龙</a>
                <a onClick={this.gotoKaijiangHISTORY}>开奖历史</a></div>
            </div>
            <div className="center">
              <span
                className="sp1">冠亚和：<i>{n1 + n2 || '-'} {n1 + n2 > 11 ? "大" : "小"} {(n1 + n2) % 2 == 0 ? "双" : "单"}</i></span>
            </div>
            {
              code !== undefined && code.split(",").length == 10 ?
                <div className="bottom clf">
                  <span className="sp2">1V10:<i>{n1 > n10 ? " 龙" : " 虎"}</i></span>
                  <span className="sp1">2V9：<i>{n2 > n9 ? "龙" : "虎"}</i></span>
                  <span className="sp1">3V8：<i>{n3 > n8 ? "龙" : "虎"}</i></span>
                  <span className="sp1">4V7：<i>{n4 > n7 ? "龙" : "虎"}</i></span>
                  <span className="sp1">5V6：<i>{n5 > n6 ? "龙" : "虎"}</i></span>
                </div>
                :
                <div className="bottom clf">
                  <span className="sp2">1V10：<i>-</i></span>
                  <span className="sp1">2V9：<i>-</i></span>
                  <span className="sp1">3V8：<i>-</i></span>
                  <span className="sp1">4V7：<i>-</i></span>
                  <span className="sp1">5V6：<i>-</i></span>
                </div>
            }

          </div>

          <div className="clf button">
            <form action="">
              <input type="submit" value="刷新" onClick={this.getLiveLottery}/>
            </form>
          </div>
        </div>
        <div>{opening}</div>
        <Spin/>
        <Spin size="large" spinning={opening}>
          <div id="betting">
            <div className="top" id="btn">
            <span onClick={() => this.onMethodChange(METHOD_1)}
                  className={method == METHOD_1 ? 'redBG' : ''}>冠军</span>
              <span onClick={() => this.onMethodChange(METHOD_2)}
                    className={method == METHOD_2 ? 'redBG' : ''}>亚军</span>
              <span onClick={() => this.onMethodChange(METHOD_3)}
                    className={method == METHOD_3 ? 'redBG' : ''}>季军</span>
              <span onClick={() => this.onMethodChange(METHOD_4)}
                    className={method == METHOD_4 ? 'redBG' : ''}>四名</span>
              <span onClick={() => this.onMethodChange(METHOD_5)}
                    className={method == METHOD_5 ? 'redBG' : ''}>五名</span>
              <span onClick={() => this.onMethodChange(METHOD_6)}
                    className={method == METHOD_6 ? 'redBG' : ''}>六名</span>
              <span onClick={() => this.onMethodChange(METHOD_7)}
                    className={method == METHOD_7 ? 'redBG' : ''}>七名</span>
              <span onClick={() => this.onMethodChange(METHOD_8)}
                    className={method == METHOD_8 ? 'redBG' : ''}>八名</span>
              <span onClick={() => this.onMethodChange(METHOD_9)}
                    className={method == METHOD_9 ? 'redBG' : ''}>九名</span>
              <span onClick={() => this.onMethodChange(METHOD_10)}
                    className={method == METHOD_10 ? 'redBG' : ''}>十名</span>
              <span onClick={() => this.onMethodChange(METHOD_21)}
                    className={method == METHOD_21 ? 'redBG' : ''}>1V龙虎</span>
              <span onClick={() => this.onMethodChange(METHOD_22)}
                    className={method == METHOD_22 ? 'redBG' : ''}>冠亚和</span>
            </div>

            <div id="ctb">
              <form id="form">
                <div className={method >= METHOD_1 && method <= METHOD_10 ? "bottom" : "bottom hidden"}>
                  <div className="clf title">
                    <span className="sp1">玩法</span>
                    <span className="sp2">赔率</span>
                    <span className="sp3">金额</span>
                    <span className="sp1">玩法</span>
                    <span className="sp2">赔率</span>
                    <span className="sp3">金额</span>
                  </div>
                  {/*<!--1--10->*/}
                  <div className="types">
                    <ul className="clf">
                      {
                        [1, 6, 2, 7, 3, 8, 4, 9, 5, 10].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1"><img src={require(`../../../assets/wx/images/h-${i}.png`)}/></li>
                            <li className="li2">1.995</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      <li className="li1">大</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='大'/>
                      </li>

                      <li className="li1">小</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='小'/>
                      </li>

                      <li className="li1">单</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='单'/>
                      </li>

                      <li className="li1">双</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='双'/>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={method == METHOD_21 ? "bottom beijing" : "bottom beijing hidden"}>
                  <div className="clf title">
                    <span className="sp0">类型</span>
                    <span className="sp1">玩法</span>
                    <span className="sp2">赔率</span>
                    <span className="sp3">金额</span>
                    <span className="sp1">玩法</span>
                    <span className="sp2">赔率</span>
                    <span className="sp3">金额</span>
                  </div>
                  {/*<!--1V龙虎->*/}
                  <div className="types">
                    <ul className="clf">
                      <li className="li0">1V10</li>
                      <li className="li1">龙</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="1V10龙"/>
                      </li>

                      <li className="li1">虎</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="1V10虎"/>
                      </li>

                      <li className="li0">2V9</li>
                      <li className="li1">龙</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="2V9龙"/>
                      </li>

                      <li className="li1">虎</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="2V9虎"/>
                      </li>

                      <li className="li0">3V8</li>
                      <li className="li1">龙</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="3V8龙"/>
                      </li>

                      <li className="li1">虎</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="3V8双虎"/>
                      </li>

                      <li className="li0">4V7</li>
                      <li className="li1">龙</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="4V7龙"/>
                      </li>

                      <li className="li1">虎</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="4V7双虎"/>
                      </li>

                      <li className="li0">5V6</li>
                      <li className="li1">龙</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="5V6龙"/>
                      </li>

                      <li className="li1">虎</li>
                      <li className="li2">1.995</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id="5V6虎"/>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={method == METHOD_22 ? "bottom" : "bottom hidden"}>
                  <div className="clf title">
                    <span className="sp1">玩法</span>
                    <span className="sp2">赔率</span>
                    <span className="sp3">金额</span>
                    <span className="sp1">玩法</span>
                    <span className="sp2">赔率</span>
                    <span className="sp3">金额</span>
                  </div>
                  {/*<!--1--10->*/}
                  <div className="types">
                    <ul className="clf">
                      {
                        [3, 4].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">45</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      {
                        [5, 6].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">23</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      {
                        [7, 8].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">15</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      {
                        [9, 10].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">10.8</li>
                            <li className="li3">
                             <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      <li className="li1">11</li>
                      <li className="li2">8.8</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='11'/>
                      </li>

                      {
                        [12, 13].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">10.8</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      {
                        [14, 15].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">15</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      {
                        [16, 17].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">23</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      {
                        [18, 19].map(i => {
                          return (
                            <span key={i}>
                            <li className="li1">{i}</li>
                            <li className="li2">45</li>
                            <li className="li3">
                              <input type="number" onChange={this.onValueChange} id={`${i}`}/>
                            </li>
                          </span>
                          )
                        })
                      }

                      <li className="li1"></li>
                      <li className="li2"></li>
                      <li className="li3"></li>

                      <li className="li1">大</li>
                      <li className="li2">2.4</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='大'/>
                      </li>

                      <li className="li1">小</li>
                      <li className="li2">1.88</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='小'/>
                      </li>

                      <li className="li1">单</li>
                      <li className="li2">1.88</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='单'/>
                      </li>

                      <li className="li1">双</li>
                      <li className="li2">2.4</li>
                      <li className="li3">
                        <input type="number" onChange={this.onValueChange} id='双'/>
                      </li>
                    </ul>
                  </div>
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
        </Spin>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(BJPK10);

