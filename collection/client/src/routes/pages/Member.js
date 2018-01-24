import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {message, notification} from 'antd';
import {updateUserBalanceByAdmin, setProxy, getAllUsers} from '../../services/users';

import '../../assets/backend/css/member.css'
/**
 * Created by sven on 2017/8/3.
 */

export default class Member extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpDownModel: false,
      type: true, // true:上分  false:下分
      currItem : {},
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

  onHideUpDownModel = () => {
    this.setState({
      showUpDownModel: false,
    })
  }

  onUpDownModalShow = (item, type)=>{
    this.setState({
      currItem: item,
      type,
      showUpDownModel: true,
    })
  }

  onUpDonwConfirm = () => {
    const type = this.state.type;
    const amount = this.refs.numberInput.value;
    updateUserBalanceByAdmin({userid: this.state.currItem._id, type, byWho: "管理员", amount: parseInt(amount)})
      .then(data => {
        if (data.success) {
          message.success('操作成功');
          this.onHideUpDownModel();
          this.queryUsersByName();
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
  }

  onProxySet =(item, proxy)=> {
    setProxy({userid: item._id, proxy})
      .then(data => {
        if (data.success) {
          message.success('设置成功');
          this.queryUsersByName();
        } else {
          notification.error({
            message: '设置失败',
            description: data.message,
          });
        }
      })
  }

  render() {
    return (
      <div className="r_aside">
          <div className="member">
            <div className="top">会员管理</div>
            <div className="bottom">
              <form action="">
                <div className="search">
                  <input type="text" placeholder="请输入用户名" value={this.state.keyWord||''} onChange={this.onSearchInputChange.bind(this)} className="ip1"/>
                  <input type="submit" onClick={this.queryUsersByName.bind(this)} value="搜索" className="ip2"/>
                </div>
                <div className="tab">
                  <table style={{border: 1, width: "100%"}}>
                    <tbody className="">
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
                              <input type="submit" value="上分" className="ip1" onClick={()=>this.onUpDownModalShow(item, true)}/>
                              <input type="submit" value="下分" className="ip2" onClick={()=>this.onUpDownModalShow(item, false)}/>
                              {/*<input type="submit" value={!item.enable ? "启用" : "禁用"}*/}
                                {/*className={!item.enable ? "ip5" : "ip3"}/>*/}
                              {/*<input type="submit" value="编辑" className="ip4"/>*/}
                              {
                                !item.proxy? <input type="submit" value="设为推广" className="ip1" onClick={()=>this.onProxySet(item, true)}/>
                                  :
                                  <input type="submit" value="取消推广" className="ip3" onClick={()=>this.onProxySet(item, false)}/>
                              }

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

                  <div className="t-4 t-5" style={this.state.showUpDownModel?{display: "block"}:{display: "none"}}>
                      <div className="title"><span>会员{this.state.type?"上分":"下分"}</span> <a href="javascript:void(0)" onClick={this.onHideUpDownModel}>关闭</a></div>
                      <div className="content">
                          <div className="name">
                              <span className="sp1">会员名：</span><span className="sp2">{this.state.currItem.nickname||this.state.currItem.username||''}</span>
                          </div>
                          <div className="inp">
                              <span className="sp1">{this.state.type?"上分":"下分"}点数：</span><input type="number" ref="numberInput"/>
                            {this.state.type?<p>积分点数充值为整数</p>:<p>当前最高下分点数为：{this.state.currItem.balance}.00</p>}
                          </div>
                          <div className="btn">
                              <input type="button" value="确认" className="ip1" onClick={this.onUpDonwConfirm} />
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
      </div>
    );
  }
}


