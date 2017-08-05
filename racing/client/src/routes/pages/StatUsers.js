import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/statUsers.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class StatUsers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <div className="position">
              <span>输赢统计</span>
              &nbsp;&gt;&nbsp;
              <span>客户输赢</span>
            </div>
            <section className="mainBox clearfloat">
              <div className="search">
                <div className="date fl"><input type="text" value="2017-07-09" readonly/></div>
                <div className="date fl"><input type="text" value="2017-07-18" readonly/></div>
                <button type="button">搜索</button>
                <button type="button">昨天</button>
                <button type="button">今天</button>
                <button type="button">最近一周</button>
                <button type="button">最近一月</button>
              </div>
              <table>
                <thead>
                <tr>
                  <th width="80">头像</th>
                  <th width="160">用户名</th>
                  <th width="150">客户进项流水</th>
                  <th width="150">客户出项流水</th>
                  <th width="360">客户输赢统计</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
                </tr>
                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>5000.00</td>
                  <td>800.00</td>
                  <td>4200.00</td>
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


