import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../../assets/wx/css/chongqingshishicai.css';
import '../../../assets/wx/css/kaijianglishi.css';
/**
 * Created by sven on 2018/1/7.
 */

const PATH_HISTORY = "/kaijianglishi"

export default class CQSSC extends Component {
  constructor(props) {
    super(props);
  }

  gotoKaijiangHISTORY = () => {
    hashHistory.push({pathname: PATH_HISTORY});
  }


  render() {
    return (
      <div className="w">
        <div className="result">
          <div className="clf periods">
            <div className="fl name">北京赛车</div>
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
              <div className="fr btn"><a onClick={this.gotoKaijiangHISTORY}>开奖历史</a></div>

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
            <span>冠军</span>
            <span>亚军</span>
            <span>季军</span>
            <span>四名</span>
            <span>五名</span>
            <span>六名</span>
            <span>七名</span>
            <span>八名</span>
            <span>九名</span>
            <span>十名</span>
            <span>1V龙虎</span>
            <span>冠亚和</span>
          </div>

          <div id="ctb">
            {/*<!--0-->*/}
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
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>

                  <li className="li1">小</li>
                  <li className="li2">1.980</li>
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>

                  <li className="li1">单</li>
                  <li className="li2">1.980</li>
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>

                  <li className="li1">双</li>
                  <li className="li2">1.980</li>
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>

                  <li className="li1">龙</li>
                  <li className="li2">1.980</li>
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>

                  <li className="li1">虎</li>
                  <li className="li2">1.980</li>
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>

                  <li className="li1">和</li>
                  <li className="li2">9.000</li>
                  <li className="li3">
                    <select>
                      <option value="volvo">0</option>
                      <option value="saab">2</option>
                      <option value="opel">3</option>
                      <option value="audi">4</option>
                      <option value="audi">5</option>
                    </select>
                  </li>
                </ul>
              </div>

            </div>
            {/*<!--1-->*/}
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
                  <li className="li1"><img src={require("../../../assets/wx/images/h-0.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-5.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-1.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-6.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-2.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-7.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-3.png")}/></li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-8.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-4.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-9.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

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
                </ul>
              </div>

            </div>
            {/*<!--2-->*/}
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
                  <li className="li1"><img src={require("../../../assets/wx/images/h-0.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-5.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-1.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-6.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-2.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-7.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-3.png")}/></li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-8.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-4.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-9.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

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
                </ul>
              </div>

            </div>
            {/*<!--3-->*/}
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
                  <li className="li1"><img src={require("../../../assets/wx/images/h-0.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-5.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-1.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-6.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-2.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-7.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-3.png")}/></li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-8.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-4.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-9.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

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
                </ul>
              </div>

            </div>
            {/*<!--4-->*/}
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
                  <li className="li1"><img src={require("../../../assets/wx/images/h-0.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-5.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-1.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-6.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-2.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-7.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-3.png")}/></li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-8.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-4.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-9.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

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
                </ul>
              </div>

            </div>
            {/*<!--5-->*/}
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
                  <li className="li1"><img src={require("../../../assets/wx/images/h-0.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-5.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-1.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-6.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-2.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-7.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-3.png")}/></li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-8.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-4.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"><img src={require("../../../assets/wx/images/h-9.png")}/></li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

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
                </ul>
              </div>
            </div>
            {/*<!--斗牛-->*/}
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
                  <li className="li1">没牛</li>
                  <li className="li2">1.960</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛5</li>
                  <li className="li2">9.600</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛一</li>
                  <li className="li2">9.600</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛六</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛二</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛七</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛三</li>
                  <li className="li2">9.000</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛八</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛4</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛九</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛牛</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1"></li>
                  <li className="li2"></li>
                  <li className="li3"></li>

                  <li className="li1">牛大</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛小</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛单</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">牛双</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>
            </div>
            {/*<!--前三-->*/}
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
                  <li className="li1">豹子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">顺子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">对子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">半顺</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">杂六</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>
            </div>
            {/*<!--中三-->*/}
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
                  <li className="li1">豹子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">顺子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">对子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">半顺</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">杂六</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>
            </div>
            {/*<!--后三-->*/}
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
                  <li className="li1">豹子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">顺子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">对子</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">半顺</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>

                  <li className="li1">杂六</li>
                  <li className="li2">1.980</li>
                  <li className="li3"><input type="text"/></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="clf btns">
            <form action="">
              <input type="submit" className="ip1" value="投注"/>
              <input type="submit" className="ip2" value="重填"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


