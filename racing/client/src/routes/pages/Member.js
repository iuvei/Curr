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
                  <table style={{border: "1"},{width: "100%"}}>
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
                            <td>{item.gender==="2" ? "女" : "男"}</td>
                            <td>{item.profile}</td>
                            <td>{moment(item.createdAt).format('YYYY-MM-DD')}</td>
                            <td>{item.balance}</td>
                            <td>{item.rebate}</td>
                            <td>
                              <input type="submit" value="上分" className="ip1"/>
                              <input type="submit" value="下分" className="ip2"/>
                              {/*<input type="submit" value={!item.enable ? "启用" : "禁用"}*/}
                                {/*className={!item.enable ? "ip5" : "ip3"}/>*/}
                              {/*<input type="submit" value="编辑" className="ip4"/>*/}
							                <input type="submit" value="设为推广" className="ip3"/>
                            </td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>


<div className="t-1" id="t-1" style={{display: "none"}}>
    <div className="title"><span>编辑会员</span> <a href="#">关闭</a></div>
    <div className="content">
        <div className="dv1 clearfloat">
            <div className="left fl"><span>昵称：</span></div>
            <div className="right fl"><input type="text" placeholder="你是牛逼哥" /></div>
        </div>
        <div className="dv2 clearfloat">
            <div className="left fl"><span>用户名：</span></div>
            <div className="right fl"><input type="text" placeholder="fsafsdfsd" /></div>
        </div>
        <div className="dv3 clearfloat">
            <div className="left fl"><span>密码：</span></div>
            <div className="right fl"><input type="password" /> <p>留空则不修改</p></div>
        </div>
        <div className="dv4 clearfloat">
            <div className="left fl"><span>备注：</span></div>
            <div className="right fl"><input type="text" /></div>
        </div>
        <div className="dv5">
            <input type="button" value="确认" />
        </div>
    </div>
</div>

<div className="t-2" style={{display: "none"}}>
    <div className="title"><span>禁用会员</span> <a href="#">关闭</a></div>
    <div className="content">
        <p>确定要禁用吗？禁用后用户将不能登录</p>
        <div className="btn">
            <input type="button" value="确认" className="ip1" />
            <input type="button" value="取消" className="ip2" />
        </div>
    </div>
</div>

<div className="t-2 t-3" style={{display: "none"}}>
    <div className="title"><span>启用会员</span> <a href="#">关闭</a></div>
    <div className="content">
        <p>确定启用该用户吗？</p>
        <div className="btn">
            <input type="button" value="确认" className="ip1" />
            <input type="button" value="取消" className="ip2" />
        </div>
    </div>
</div>

<div className="t-4 t-5" style={{display: "none"}}>
    <div className="title"><span>会员下分</span> <a href="#">关闭</a></div>
    <div className="content">
        <div className="name">
            <span className="sp1">会员名：</span><span className="sp2">slkdjskld</span>
        </div>
        <div className="inp">
            <span className="sp1">下分点数：</span><input type="text" />
            <p>当前最高下分点数为：65470.00</p>
        </div>
        <div className="btn">
            <input type="button" value="确认" className="ip1" />
        </div>
    </div>
</div>

<div className="t-4" style={{display: "block"}}>
    <div className="title"><span>会员上分</span> <a href="#">关闭</a></div>
    <div className="content">
        <div className="name">
            <span className="sp1">会员名：</span><span className="sp2">slkdjskld</span>
        </div>
        <div className="inp">
            <span className="sp1">上分点数：</span><input type="text" />
            <p>积分点数充值为整数</p>
        </div>
        <div className="btn">
            <input type="button" value="确认" className="ip1" />
        </div>
    </div>
</div>


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


