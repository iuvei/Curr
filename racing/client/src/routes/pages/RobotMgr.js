import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/robotMgr.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class RobotMgr extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="r_aside">
          <div className="position">
            <span>机器人管理</span>
            &nbsp;&gt;&nbsp;
            <span>机器人管理</span>
          </div>
          <section className="mainBox clearfloat">
            <div className="search">
              <input type="text" placeholder="请输入用户名" title=""/>
                <button type="submit" className="searchBtn">搜索</button>
                <button type="button" className="addBtn">增加机器人</button>
                <button type="button" className="delBtn">删除</button>
            </div>
            <table cellpadding="0" cellspacing="0">
              <thead>
              <tr>
                <th width="80">选择</th>
                <th width="100">头像</th>
                <th width="160">用户名</th>
                <th width="560">操作</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
                <td>
                  <button type="button" className="edit">编辑</button>
                  <button type="button" className="del">删除</button>
                </td>
              </tr>
              <tr>
                <td><input type="checkbox" title=""/></td>
                <td><img src="images/userImg.jpg" alt=""/></td>
                <td>jingjiang1920</td>
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


