import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/quiz.css';
/**
 * Created by sven on 2017/8/4.
 */

export default class Quiz  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <form action="">
              <div className="quiz">
                <div className="top">竞猜记录</div>
                <div className="bottom">
                  <form action="">
                    <div className="search clearfloat">
                      <input type="text" placeholder="请输入开奖期号" className="ip1"/>
                        <input type="text" placeholder="请输入用户ID" className="ip1 ip2"/>
                          <input type="submit" value="搜索" className="ip3"/>
                    </div>
                    <div className="tab">
                      <table style={{border:1}}>
                        <tr>
                          <th width="110">期号</th> <th width="180">时间</th> <th width="90">头像</th>
                          <th width="150">用户名</th> <th width="180">竞猜选择</th> <th width="120">进项</th>
                          <th width="120">出项</th> <th width="120">输赢</th> <th width="130">余额</th>
                        </tr>
                        <div className="">
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="win">600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="win">600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="lose">-600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="lose">-600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="win">600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="lose">-600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="win">600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="win">600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="lose">-600.00</td> <td>19730.40</td>
                          </tr>
                          <tr>
                            <td>628810</td> <td>2017-07-18  10:26:06</td> <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td> <td>和5.6.16.17/10</td> <td>3000.00</td>
                            <td>3600.00</td> <td className="win">600.00</td> <td>19730.40</td>
                          </tr>
                        </div>
                      </table>

                      <div className="page clearfloat">
                        <a href="#" className="a1"></a>
                        <a href="#" className="a2" style={{background:'#19B293', color:'#fff', borderRadius:'5px'}}>1</a>
                        <a href="#" className="a2">2</a>
                        <a href="#" className="a2">3</a>
                        <a href="#" className="a2">4</a>
                        <a href="#" className="a2">5</a>
                        <a href="#" className="a2">6</a>
                        <a href="#" className="a2">7</a>
                        <a href="#" className="a2">8</a>
                        <a href="#" className="a2">9</a>
                        <a href="#" className="a2">10</a>
                        <a href="#" className="a1"></a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </form>
          </div>
        );
    }
}


