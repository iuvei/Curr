import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/proxy.css'
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {message, Input} from 'antd';
import {getAllAgents} from '../../services/users';
/**
 * Created by sven on 2017/8/4.
 */

export default class Proxy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agents: {data: []},
    }
  }

  componentDidMount() {
    this.queryAgents(1, 10)
  }

  queryAgents(currPage, pageSize) {
    getAllAgents({pageSize, currPage, username: this.state.keyWord})
      .then(data => {
        if (data.success) {
          this.setState({
            agents: data.result,
          });
        }
      })
  }

  queryAgentsByName() {
    this.queryAgents(1, 10)
  }

  onSearchInputChange(e) {
    this.setState({
      keyWord: e.target.value.trim(),
    })
  }

  render() {
    return (
      <div className="r_aside">
        <form action="">
          <div className="proxy">
            <div className="top">代理推广</div>
            <div className="bottom">
              <form action="">
                <div className="search">
                  <input type="text" placeholder="请输入用户名" className="ip1"
                         value={this.state.keyWord || ''} onChange={this.onSearchInputChange.bind(this)}/>
                  <input type="submit" value="搜索" className="ip2"
                         onClick={this.queryAgentsByName.bind(this)}/>
                </div>
                <div className="tab">
                  <table style={{border: "1"},{width: "100%"}}>
                    <tr>
                      <th width="80">头像</th>
                      <th width="160">用户名</th>
                      <th width="90">推广人数</th>
                      <th width="130">所得总佣金</th>
                      <th width="120">推广二维码</th>
                      <th width="110">状态</th>
                      <th width="260">操作</th>
                    </tr>
                    <tbody className="">
                    {
                      this.state.agents.data.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td><img src={item.avatar || require("../../assets/backend/images/1.jpg")}/></td>
                            <td>{item.username}</td>
                            <td>{item.numUsers}</td>
                            <td>{item.brokerage}</td>
                            <td><img src={item.proxyImg}/></td>
                            <td>{item.status ? "正常" : "取消"}</td>
                            <td><input type="submit" value="看下下线"/><span>无上限</span></td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>
                  <Paging
                    currPage={this.state.agents.currPage}
                    pageSize={this.state.agents.pageSize}
                    total={this.state.agents.total}
                    callBack={this.queryAgents.bind(this)}
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


