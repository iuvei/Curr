import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/upDownApplication.css';
/**
 * Created by sven on 2017/8/4.
 */

export default class UpDownApplication extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <form action="">
              <div className="application">
                <div className="top">下分申请</div>
                <div className="bottom">
                  <form action="">
                    <div className="search">
                      <input type="text" placeholder="请输入用户名" className="ip1"/>
                        <input type="submit" value="搜索" className="ip2"/>
                    </div>
                    <div className="tab">
                      <table style={{border:1}}>
                        <tr>
                          <th width="80">头像</th> <th width="160">用户名</th> <th width="150">下分金额</th> <th width="150">当前余额</th>
                          <th width="200">申请时间</th> <th width="110">提现方式</th> <th width="200">账号</th>
                          <th width="200">备注</th> <th width="190">操作</th>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">2000.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">微信</td>
                          <td width="200">jingjiang1920</td>
                          <td width="200"></td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">1500.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">微信</td>
                          <td width="200">dfjkhdf500</td>
                          <td width="200"></td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">60000.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">支付宝</td>
                          <td width="200">562451255@qq.com</td>
                          <td width="200"></td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">900.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">银行卡</td>
                          <td width="200">6228453226701589170</td>
                          <td width="200">农业银行深圳坂田支行 冷运江</td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">750.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">支付宝</td>
                          <td width="200">12121212@qq.com</td>
                          <td width="200"></td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">2800.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">微信</td>
                          <td width="200">dkfsdfkl255</td>
                          <td width="200"></td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>
                        <tr>
                          <td width="80"><img src="images/1.jpg" alt=""/></td>
                          <td width="160">jingjiang1920</td>
                          <td width="150">9457.00</td>
                          <td width="150">00.00</td>
                          <td width="200"><span className="sp1">2017-07-18 </span>   <span className="sp2">17:42:57</span></td>
                          <td width="110">银行卡</td>
                          <td width="200">6228453226701589170</td>
                          <td width="200">农业银行深圳坂田支行 冷运江</td>
                          <td width="190">
                            <input type="submit" value="通过" className="ip1"/>
                              <input type="submit" value="忽略" className="ip2"/>
                          </td>
                        </tr>

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


