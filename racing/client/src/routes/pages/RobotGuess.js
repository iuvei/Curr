import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/robotGuess.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class RobotGuess extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <div className="position">
              <span>机器人管理</span>
              &nbsp;&gt;&nbsp;
              <span>机器人竞猜</span>
            </div>
            <section className="mainBox clearfloat">
              <div className="btns">
                <button type="button" className="addBtn">增加</button>
              </div>
              <table>
                <thead>
                <tr>
                  <th width="80">ID</th>
                  <th width="200">竞猜设置</th>
                  <th width="620">操作</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>和3、5、11/200</td>
                  <td>
                    <button type="button" className="edit">编辑</button>
                    <button type="button" className="del">删除</button>
                  </td>
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


