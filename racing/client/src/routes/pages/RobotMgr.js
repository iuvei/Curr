import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/robotMgr.css'
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {message, Input} from 'antd';
import {addRobot, getAllRobots} from '../../services/robots';
/**
 * Created by sven on 2017/8/4.
 */

export default class RobotMgr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {data: []},
    }
  }

  componentDidMount() {
    this.queryRobots(10, 1)
  }

  queryRobots(pageSize, currPage) {
    getAllRobots({pageSize, currPage, username: this.state.keyWord})
      .then(data => {
        if (data.success) {
          this.setState({
            users: data.result,
          });
        }
      })
  }

  queryRobotByName() {
    this.queryRobots(10, 1)
  }

  onSearchInputChange(e) {
    this.setState({
      keyWord : e.target.value.trim(),
    })
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
              <input type="text" placeholder="请输入用户名" value={this.state.keyWord||''} onChange={this.onSearchInputChange.bind(this)}/>
                <button type="submit" className="searchBtn" onClick={this.queryRobotByName.bind(this)}>搜索</button>
                <button type="button" className="addBtn">增加机器人</button>
                <button type="button" className="delBtn">删除</button>
            </div>
            <table cellPadding="0" cellSpacing="0">
              <thead>
              <tr>
                <th width="80">选择</th>
                <th width="100">头像</th>
                <th width="160">用户名</th>
                <th width="560">操作</th>
              </tr>
              </thead>
              <tbody>
              {
                this.state.users.data.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td><input type="checkbox" title=""/></td>
                      <td><img src={item.avatar || require("../../assets/backend/images/1.jpg")} alt=""/></td>
                      <td>{item.username}</td>
                      <td>
                        <button type="button" className="edit">编辑</button>
                        <button type="button" className="del">删除</button>
                      </td>
                    </tr>
                  );
                })
              }
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
            <Paging
              currPage={this.state.users.currPage}
              pageSize={this.state.users.pageSize}
              total={this.state.users.total}
              callBack={this.queryRobots.bind(this)}
            />
          </section>
        </div>
          );
    }
}


