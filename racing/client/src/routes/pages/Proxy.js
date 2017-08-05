import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/proxy.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class Proxy extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <form action="">
              <div className="proxy">
                <div className="top">代理推广</div>
                <div className="bottom">
                  <form action="">
                    <div className="search">
                      <input type="text" placeholder="请输入用户名" className="ip1"/>
                        <input type="submit" value="搜索" className="ip2"/>
                    </div>
                    <div className="tab">
                      <table border="1">
                        <tr>
                          <th width="80">头像</th> <th width="160">用户名</th> <th width="90">推广人数</th> <th width="130">所得总佣金</th>
                          <th width="120">推广二维码</th> <th width="110">状态</th> <th width="260">操作</th>
                        </tr>
                        <div className="">
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td>
                            <td>65</td>
                            <td>168400.00</td>
                            <td><img src="images/erweima-1.jpg" alt=""/></td>
                            <td>正常</td>
                            <td><input type="submit" value="看下下线"/><span>无上限</span></td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td>
                            <td>65</td>
                            <td>168400.00</td>
                            <td><img src="images/erweima-1.jpg" alt=""/></td>
                            <td>正常</td>
                            <td><input type="submit" value="看下下线"/><span>无上限</span></td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td>
                            <td>65</td>
                            <td>168400.00</td>
                            <td><img src="images/erweima-1.jpg" alt=""/></td>
                            <td>正常</td>
                            <td><input type="submit" value="看下下线"/><span>无上限</span></td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td>
                            <td>65</td>
                            <td>168400.00</td>
                            <td><img src="images/erweima-1.jpg" alt=""/></td>
                            <td>正常</td>
                            <td><input type="submit" value="看下下线"/><span>无上限</span></td>
                          </tr>
                          <tr>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>jingjiang1920</td>
                            <td>65</td>
                            <td>168400.00</td>
                            <td><img src="images/erweima-1.jpg" alt=""/></td>
                            <td>正常</td>
                            <td><input type="submit" value="看下下线"/><span>无上限</span></td>
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


