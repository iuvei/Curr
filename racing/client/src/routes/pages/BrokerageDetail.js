import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';

import Paging from '../../components/paging/Paging'
import {getAllBrokerages} from '../../services/stat';
/**
 * Created by sven on 2017/8/7.
 */

//  未完成
export default class  extends Component {
    constructor(props) {
        super(props);
      this.state = {
        brokerages: {data: []}
      }
    }

  componentDidMount() {
    this.queryBrokerageRecords(1, 10)
  }

  queryBrokerageRecords(currPage, pageSize) {
    getAllBrokerages({pageSize, currPage, createdAt: this.state.createdAt})
      .then(data => {
        if (data.success) {
          this.setState({
            brokerages: data.result,
          });
        } else {
          this.setState({})
        }
      })
  }

  queryBrokerageRecordsByDate() {
    this.queryBrokerageRecords(1, 10)
  }

  onTimeInputChange(e) {
    this.setState({
      createdAt: e.target.value.trim(),
    })
  }

    render() {
        return (
          <div className="r_aside">
            <div className="position">
              <span><Link to="/brokerage">会员返水</Link></span>
              &nbsp;&gt;&nbsp;
              <span>查看明细</span>
            </div>
            <section className="mainBox clearfloat">
              <div className="search">
                <input type="text" placeholder="请输入用户名"/>
                  <button type="button">搜索</button>
              </div>
              <table cellSpacing="0" cellPadding="0">
                <thead>
                <tr>
                  <th width="80">头像</th>
                  <th width="170">用户名</th>
                  <th width="130">下注金额</th>
                  <th width="130">返点比例</th>
                  <th width="130">返点金额</th>
                  <th width="260">开奖时间</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                  <td><img src="images/userImg.jpg" alt=""/></td>
                  <td>jingjiang1920</td>
                  <td>30</td>
                  <td>0.005</td>
                  <td>0.15</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                </tr>
                </tbody>
              </table>
              <Paging
                currPage={this.state.brokerages.currPage}
                pageSize={this.state.brokerages.pageSize}
                total={this.state.brokerages.total}
                callBack={this.queryBrokerageRecords.bind(this)}
              />
            </section>
          </div>

    );
    }
}


