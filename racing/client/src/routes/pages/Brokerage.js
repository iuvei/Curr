import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/brokerage.css'
import Paging from '../../components/paging/Paging'
import {getAllBrokerages} from '../../services/stat';
/**
 * Created by sven on 2017/8/4.
 */
const PATH_BROKERAGE = "/brokerage";
export default class Brokerage extends Component {
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

  gotoBrokerageDetailList = (createdAt) => {
    hashHistory.push({pathname: `${PATH_BROKERAGE}/${createdAt}`, state: {from: "index", createdAt}});
  }

  render() {
    return (
      <div className="r_aside">
        <div className="position">
          <span>会员返水</span>
        </div>
        <section className="mainBox clearfloat">
          <div className="search">
            <input type="date" placeholder="请输入查询日期"
                   value={this.state.createdAt} onChange={this.onTimeInputChange.bind(this)}/>
            <button type="button" onClick={this.queryBrokerageRecordsByDate.bind(this)}>搜索</button>
          </div>
          <table cellSpacing="0" cellPadding="0" style={{ width:"100%"}}>
            <thead>
            <tr>
              <th width="150">返水日期</th>
              <th width="150">当前总流水</th>
              <th width="150">当前返水金额</th>
              <th width="450">操作</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.brokerages.data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.createdAt}</td>
                    <td>{item.volume}</td>
                    <td>{item.brokerage}</td>
                    <td>
                      <button type="button" onClick={() => this.gotoBrokerageDetailList(item.createdAt)}>查看明细</button>
                    </td>
                  </tr>
                );
              })
            }
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


