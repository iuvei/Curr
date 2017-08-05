import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/upDownReview.css';
/**
 * Created by sven on 2017/8/4.
 */

export default class UpDownReview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <form action="">
              <div className="review">
                <div className="top">审核操作记录</div>
                <div className="bottom">
                  <form action="">
                    <div className="search clearfloat">
                      <input type="text" placeholder="起始时间" className="ip1 ip2"/>
                        <input type="text" placeholder="结束时间" className="ip1 ip2"/>
                          <input type="text" placeholder="请输入用户名" className="ip1"/>
                            <input type="submit" value="搜索" className="ip3"/>
                              <input type="submit" value="昨天" className="ip3"/>
                                <input type="submit" value="今天" className="ip3"/>
                                  <input type="submit" value="最近一周" className="ip3"/>
                                    <input type="submit" value="最近一月" className="ip3"/>


                    </div>
                    <div className="tab">
                      <table style={{border:1}}>
                        <tr>
                          <th width="80">头像</th> <th width="160">用户名</th> <th width="150">上分金额</th>
                          <th width="150">下分金额</th> <th width="150">操作后余额</th> <th width="200">审核通过时间</th>
                          <th width="150">审核管理员</th>
                        </tr>
                        <div className="">
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td className="up">2000.00</td>
                            <td>00.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td className="up">2000.00</td>
                            <td>00.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td className="up">2000.00</td>
                            <td>00.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td>00.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td className="down">41000.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td className="down">41000.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td className="down">41000.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td>00.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td className="down">41000.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td> <td>jingjiang1920</td> <td>00.00</td>
                            <td className="down">41000.00</td> <td>2000.00</td> <td>2017-07-18   17:42:57</td>
                            <td>老板</td>
                          </tr>
                        </div>
                      </table>

                      <div className="page">
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


