import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/common.css';
import '../../assets/wx/css/kaijianglishi.css';
/**
 * Created by sven on 2018/1/14.
 */

export default class KaiJiangLiShi extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div id="betting">
          <div className="clf top" id="btn">
            <span>北京赛车</span>
            <span>重庆时时彩</span>
            <span>江苏快三</span>

          </div>

          <div className="time">
            <span>开奖历史：</span>
            <select>
              <option value="a">2018-01-01</option>
              <option value="b">2018-01-02</option>
              <option value="c">2018-01-03</option>
              <option value="d">2018-01-04</option>
              <option value="e">2018-01-05</option>
              <option value="f">2018-01-06</option>
            </select>
          </div>
          <div id="ctb">
            {/*<!--北京赛车-->*/}
            <div className="bottom">
              <div className="clf title">
                <span className="sp1">期数</span>
                <span className="sp2">开奖号码</span>
              </div>
              <div className="types">
                <ul>
                  <li className="clf">
                    <div className="dv1">661099</div>
                    <div className="dv2">
                      <img src={require("../../assets/wx/images/h-0.png")}/>
                      <img src={require("../../assets/wx/images/h-1.png")}/>
                      <img src={require("../../assets/wx/images/h-2.png")}/>
                      <img src={require("../../assets/wx/images/h-3.png")}/>
                      <img src={require("../../assets/wx/images/h-4.png")}/>
                      <img src={require("../../assets/wx/images/h-5.png")}/>
                      <img src={require("../../assets/wx/images/h-6.png")}/>
                      <img src={require("../../assets/wx/images/h-7.png")}/>
                      <img src={require("../../assets/wx/images/h-8.png")}/>
                      <img src={require("../../assets/wx/images/h-9.png")}/>
                    </div>
                    <div className="dv3"></div>
                  </li>
                  <li className="clf">
                    <div className="dv1">661099</div>
                    <div className="dv2">
                      <img src={require("../../assets/wx/images/h-0.png")}/>
                      <img src={require("../../assets/wx/images/h-1.png")}/>
                      <img src={require("../../assets/wx/images/h-2.png")}/>
                      <img src={require("../../assets/wx/images/h-3.png")}/>
                      <img src={require("../../assets/wx/images/h-4.png")}/>
                      <img src={require("../../assets/wx/images/h-5.png")}/>
                      <img src={require("../../assets/wx/images/h-6.png")}/>
                      <img src={require("../../assets/wx/images/h-7.png")}/>
                      <img src={require("../../assets/wx/images/h-8.png")}/>
                      <img src={require("../../assets/wx/images/h-9.png")}/>
                    </div>
                    <div className="dv3"></div>
                  </li>
                  <li className="clf">
                    <div className="dv1">661099</div>
                    <div className="dv2">
                      <img src={require("../../assets/wx/images/h-0.png")}/>
                      <img src={require("../../assets/wx/images/h-1.png")}/>
                      <img src={require("../../assets/wx/images/h-2.png")}/>
                      <img src={require("../../assets/wx/images/h-3.png")}/>
                      <img src={require("../../assets/wx/images/h-4.png")}/>
                      <img src={require("../../assets/wx/images/h-5.png")}/>
                      <img src={require("../../assets/wx/images/h-6.png")}/>
                      <img src={require("../../assets/wx/images/h-7.png")}/>
                      <img src={require("../../assets/wx/images/h-8.png")}/>
                      <img src={require("../../assets/wx/images/h-9.png")}/>
                    </div>
                    <div className="dv3"></div>
                  </li>
                  <li className="clf">
                    <div className="dv1">661099</div>
                    <div className="dv2">
                      <img src={require("../../assets/wx/images/h-0.png")}/>
                      <img src={require("../../assets/wx/images/h-1.png")}/>
                      <img src={require("../../assets/wx/images/h-2.png")}/>
                      <img src={require("../../assets/wx/images/h-3.png")}/>
                      <img src={require("../../assets/wx/images/h-4.png")}/>
                      <img src={require("../../assets/wx/images/h-5.png")}/>
                      <img src={require("../../assets/wx/images/h-6.png")}/>
                      <img src={require("../../assets/wx/images/h-7.png")}/>
                      <img src={require("../../assets/wx/images/h-8.png")}/>
                      <img src={require("../../assets/wx/images/h-9.png")}/>
                    </div>
                    <div className="dv3"></div>
                  </li>
                </ul>
              </div>

            </div>
            {/*<!--重庆时时彩-->*/}
            <div className="bottom hidden">
              <div className="clf title">
                <span className="sp1">期数</span>
                <span className="sp2">开奖号码</span>
                <span className="sp3">和值</span>
              </div>
              <div className="types">
                <ul>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                </ul>
              </div>

            </div>
            {/*<!--2-->*/}
            <div className="bottom hidden">
              <div className="clf title">
                <span className="sp1">期数</span>
                <span className="sp2">开奖号码</span>
                <span className="sp3">和值</span>

              </div>
              <div className="types">
                <ul>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


