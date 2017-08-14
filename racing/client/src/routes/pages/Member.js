import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {message, Input} from 'antd';
import {addUser, getAllUsers} from '../../services/users';

import '../../assets/backend/css/member.css'
/**
 * Created by sven on 2017/8/3.
 */

export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {data: []},
    }
  }

  componentDidMount() {
    getAllUsers({pageSize: 10, currPage: 1})
      .then(data => {
        if (data.success) {
          this.setState({
            users: data.result,
          });
        }
      })
  }

  queryUsers(currPage, pageSize) {
    getAllUsers({pageSize, currPage, })
      .then(data => {
        if (data.success) {
          this.setState({
            users: data.result,
          });
        }
      })
  }

  queryUsersByName() {
    getAllUsers({pageSize: 10, currPage: 1, username: this.state.keyWord})
      .then(data => {
        if (data.success) {
          this.setState({
            users: data.result,
          });
        }
      })
  }

  onSearchInputChange(e) {
    this.setState({
      keyWord : e.target.value.trim(),
    })
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
                  <input type="text" placeholder="请输入用户名" value={this.state.keyWord||''} onChange={this.onSearchInputChange.bind(this)} className="ip1"/>
                  <input type="submit" onClick={this.queryUsersByName.bind(this)} value="搜索" className="ip2"/>
                </div>
                <div className="tab">
                  <table style={{border: "1"}}>
                    <tr>
                      <th width="58">ID</th>
                      <th width="84">头像</th>
                      <th width="108">昵称</th>
                      <th width="140">用户名</th>
                      <th width="60">性别</th>
                      <th width="120">备注</th>
                      <th width="120">注册时间</th>
                      <th width="112">游戏点数</th>
                      <th width="90">返水点数</th>
                      <th width="312">操作</th>
                    </tr>
                    <tbody className="">
                    {
                      this.state.users.data.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td>{item._id}</td>
                            <td><img src={item.avatar || require("../../assets/backend/images/1.jpg")} alt=""/></td>
                            <td>{item.nickname || "无"}</td>
                            <td>{item.username}</td>
                            <td>{item.gender ? "女" : "男"}</td>
                            <td>{item.profile}</td>
                            <td>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                            <td>{item.playpoint}</td>
                            <td>{item.rebatepoint}</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                              <input type="submit" value="下分" className="ip2"/>
                              <input type="submit" value={!item.enable ? "启用" : "禁用"}
                                     className={!item.enable ? "ip5" : "ip3"}/>
                              <input type="submit" value="编辑" className="ip4"/>
                            </td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>
                  <Paging
                    currPage={this.state.users.currPage}
                    pageSize={this.state.users.pageSize}
                    total={this.state.users.total}
                    callBack={this.queryUsers.bind(this)}
                  />
                </div>
              </form>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


