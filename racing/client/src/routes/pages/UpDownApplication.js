import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/upDownApplication.css';
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {updateUpDown, getAllUpDowns, getUserAccount} from '../../services/updowns';
import {message, Popconfirm, notification} from 'antd';
import io from 'socket.io-client';
const socket = io('', {path: '/ws/admin'});
/**
 * Created by sven on 2017/8/4.
 */

export default class UpDownApplication extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upDowns: {data: []},
      type: this.props.location.state.type,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.type !== this.state.type) {
      this.queryUpdowns(1, 10, nextProps.location.state.type);
    }
  }

  componentDidMount() {
    this.queryUpdowns(1, 10, this.props.location.state.type);
    socket.emit('chat mounted', "from admin");
  }

  queryUpdowns(currPage, pageSize, type) {
    type = type === undefined ? this.state.type : type
    getAllUpDowns({pageSize, currPage, type: type === undefined ? this.state.type : type, nickname: this.state.keyWord})
      .then(data => {
        if (data.success) {
          this.setState({
            upDowns: data.result,
            type,
          });
        } else {
          this.setState({
            type,
          })
        }
      })
  }

  queryUpdownsByName() {
    this.queryUpdowns(1, 20, this.state.type)
  }

  onSearchInputChange(e) {
    this.setState({
      keyWord: e.target.value.trim(),
    })
  }

  onConfirm = (ignore, id, nickname) => {
    const type = this.props.location.state.type
    updateUpDown({id, type, byWho: "管理员", ignore})
      .then(data => {
        if (data.success) {
          message.success('操作成功');
          this.queryUpdowns(1, 10, type);
        } else {
          console.log(data)
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
        //from: 2, nickname: "客服", choice: `@${nickname} 下注失败`}
        const action = {
          from: 2,
          nickname: "管理员",
          status: ignore === 1,
          choice: `@${nickname} ${type ? "上分" : "下分"}${data.success ? "成功!" : "失败！<br/>信息：${data.message}}"}`,
        }
        socket.emit('admin', action); //转向后端，然后后端广播到微信端
      })
  }

  render() {
    return (
      <div className="r_aside">
        <div className="application">
          <div className="top">{this.state.type ? "上分申请" : "下分申请"}</div>
          <div className="bottom">
            <form action="">
              <div className="search">
                <input type="text" placeholder="请输入用户名" className="ip1"
                       value={this.state.keyWord || ''} onChange={this.onSearchInputChange.bind(this)}/>
                <input type="submit" value="搜索" className="ip2" onClick={this.queryUpdownsByName.bind(this)}/>
              </div>
              <div className="tab">
                <table style={{border: "1"},{width: "100%"}}>
                  <tbody>
                  <tr>
                    <th width="80">头像</th>
                    <th width="160">用户名</th>
                    <th width="100">{this.state.type ? "上分金额" : "下分金额"}</th>
                    <th width="100">当前余额</th>
                    <th width="150">申请时间</th>
                    <th width="110">支付方式</th>
                    <th width="200">账号</th>
                    <th width="200">备注</th>
                    <th width="290">操作</th>
                  </tr>

                  {
                    this.state.upDowns.data.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td width="80"><img src={item.avatar} alt=""/></td>
                          <td width="160">{item.nickname}</td>
                          <td width="100">{item.amount}</td>
                          <td width="100">{item.balance}</td>
                          <td width="200">
                            <span className="sp1">{moment(item.createdAt).format('YYYY-MM-DD')}</span>
                            <br/>
                            <span className="sp2">{moment(item.createdAt).format('HH:mm:ss')}</span></td>
                          <td
                            width="110">{item.payMethod === "WXPAY" ? "微信支付" : item.payMethod === "ALIPAY" ? "支付宝支付" : "未知"}</td>
                          <td width="150">{item.payNo}</td>
                          <td width="200">{item.profile}</td>
                          <td width="290">
                            <Popconfirm title="确定通过吗?" onConfirm={() => this.onConfirm(1, item._id, item.nickname)}
                                        okText="确定"
                                        cancelText="取消">
                              <input type="submit" value="通过" className="ip1"/>
                            </Popconfirm>
                            <Popconfirm title="确定忽略吗?" onConfirm={() => this.onConfirm(2, item._id, item.nickname)}
                                        okText="确定"
                                        cancelText="取消">
                              <input type="submit" value="忽略" className="ip2"/>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })
                  }
                  </tbody>
                </table>
                <Paging
                  currPage={this.state.upDowns.currPage}
                  pageSize={this.state.upDowns.pageSize}
                  total={this.state.upDowns.total}
                  callBack={this.queryUpdowns.bind(this)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


