import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';

import '../../assets/backend/css/member.css'
/**
 * Created by sven on 2017/8/3.
 */

export default class Member extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

          <div className="r_aside">
            <form action="">
              <div className="member">
                <div className="top">会员管理</div>
                <div className="bottom">
                  <form action="">
                    <div className="search">
                      <input type="text" placeholder="请输入用户名" className="ip1"/>
                        <input type="submit" value="搜索" className="ip2"/>
                    </div>
                    <div className="tab">
                      <table style={{border:"1"}}>
                        <tr>
                          <th width="58">ID</th> <th width="84">头像</th> <th width="108">昵称</th> <th width="140">用户名</th>
                          <th width="60">性别</th> <th width="120">备注</th> <th width="120">注册时间</th>
                          <th width="112">游戏点数</th> <th width="90">返水点数</th> <th width="312">操作</th>
                        </tr>
                        <div className="">
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="启用" className="ip5"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="启用" className="ip5"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                          <tr>
                            <td>0121</td>
                            <td><img src="images/1.jpg" alt=""/></td>
                            <td>深不可测</td>
                            <td>jingjiang1920</td>
                            <td>男</td>
                            <td>测试账号啊</td>
                            <td>2017-07-18</td>
                            <td>1101440.52</td>
                            <td>502.50</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                                <input type="submit" value="下分" className="ip2"/>
                                  <input type="submit" value="禁用" className="ip3"/>
                                    <input type="submit" value="编辑" className="ip4"/>
                            </td>
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


