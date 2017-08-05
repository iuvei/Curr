import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/brokerage.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class Brokerage  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <div className="position">
              <span>会员返水</span>
            </div>
            <section className="mainBox clearfloat">
              <div className="search">
                <input type="text" placeholder="请输入查询日期"/>
                  <button type="button">搜索</button>
              </div>
              <table cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                  <th width="150">返水日期</th>
                  <th width="150">当前总流水</th>
                  <th width="150">当前返水金额</th>
                  <th width="450">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                <tr>
                  <td>2017-07-18</td>
                  <td>99030.00</td>
                  <td>990.30</td>
                  <td><button type="button">查看明细</button></td>
                </tr>
                </tbody>
              </table>
              <div className="paging">
                <a href="javascript:;" className="prev">&lt;&lt;</a>
                <a href="javascript:;">1</a>
                <a href="javascript:;" className="cur">2</a>
                <a href="javascript:;">3</a>
                <a href="javascript:;">4</a>
                <a href="javascript:;">5</a>
                <a href="javascript:;">6</a>
                <a href="javascript:;">7</a>
                <a href="javascript:;">8</a>
                <a href="javascript:;">9</a>
                <a href="javascript:;">10</a>
                <a href="javascript:;" className="next">&gt;&gt;</a>
              </div>
            </section>
          </div>
    );
    }
}


