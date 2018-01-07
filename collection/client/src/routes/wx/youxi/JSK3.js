import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../../assets/wx/css/chongqingshishicai.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class JSK3 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="box">
        <div className="result">
          <div className="clf periods">
            <div className="fl name">重庆时时彩</div>
            <div className="fl number">第 <span>20171027265</span> 期</div>
            <div className="fr time" id="time"></div>
          </div>

          <div className="lottery">
            <div className="clf top">
              <div className="fl qishu">20171027265</div>
              <div className="fl clf haoma">
                <img src={require("../../../assets/wx/images/q-7.png")}/>
                <img src={require("../../../assets/wx/images/q-3.png")}/>
                <img src={require("../../../assets/wx/images/q-6.png")}/>
                <img src={require("../../../assets/wx/images/q-6.png")}/>
                <img src={require("../../../assets/wx/images/q-8.png")}/>
              </div>
              <div className="fr btn"><a href="javascript:;">开奖历史</a></div>

            </div>
            <div className="center">
              <span className="sp1">总和：<i>30总和大</i> <i>总和双</i></span>
              <span className="sp2">牛牛：<i>牛牛</i> <i>牛双</i> <i>牛大</i></span>
            </div>
            <div className="bottom clf">
              <span className="sp1">龙虎：<i>龙 </i></span>
              <span className="sp2">前三：<i>对子</i> </span>
              <span className="sp2">中三：<i>对子</i> </span>
              <span className="sp2">后三：<i>半顺</i> </span>
            </div>
          </div>

          <div className="clf button">
            <form action="">
              {/*<!--<input type="submit" value="珠子/总和龙虎">-->*/}
              {/*<!--<input type="submit" value="斗牛/梭哈/组合">-->*/}
              <input type="submit" value="刷新"/>
            </form>
          </div>
        </div>

        <div id="betting">
          <div className="top" id="btn">
            <span>和值</span>
            <span>选三号</span>
            <span>选二号</span>
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
              <div className="types">
                <ul className="clf">
                  <li className="li1">大</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">小</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">单</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">双</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">3</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">4</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">5</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">6</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">7</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">8</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">9</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">10</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">11</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">12</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">13</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">14</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">15</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">16</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">17</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">18</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>

            </div>
            {/*<!--选三号-->*/}
            <div className="bottom hidden">
              <div className="clf title">
                <span className="sp1">玩法</span>
                <span className="sp2">赔率</span>
                <span className="sp3">金额</span>
                <span className="sp1">玩法</span>
                <span className="sp2">赔率</span>
                <span className="sp3">金额</span>
              </div>
              <div className="types">
                <ul className="clf">
                  <li className="li1">111</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">222</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">333</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">444</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">555</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">666</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">1</li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">2</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">3</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">4</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">5</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">6</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">123</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">234</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">345</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">456</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>

            </div>
            {/*<!--选二号-->*/}
            <div className="bottom hidden">
              <div className="clf title">
                <span className="sp1">玩法</span>
                <span className="sp2">赔率</span>
                <span className="sp3">金额</span>
                <span className="sp1">玩法</span>
                <span className="sp2">赔率</span>
                <span className="sp3">金额</span>
              </div>
              <div className="types">
                <ul className="clf">
                  <li className="li1">11</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">22</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">33</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">44</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">55</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">66</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">1</li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">2</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">3</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">4</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">5</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">6</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>
            </div>

            <div className="amount">
              <span>快捷金额：</span>
              <input type="text" placeholder="请输入快捷金额"/>
            </div>
            <div className="clf btns">
              <form action="">
                <input type="submit" className="ip1" value="投注"/>
                <input type="submit" className="ip2" value="重填"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


