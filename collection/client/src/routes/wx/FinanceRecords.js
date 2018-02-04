import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/financeRecord.css';
import {getCookie} from '../../utils/cookies';
import {getRechargeRecords} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/7.
 */

export default class FinanceRecords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
      type: true,
    }
  }

  componentDidMount() {
    getRechargeRecords({userid: getCookie("userid")})
      .then(data => {
        if (data.success) {
          this.setState({
            records: data.result.upDowns,
          });
        }
      });
  }


  onTypeChange = (type) => {
    this.setState({type})
  }


  render() {
    const records = this.state.records.filter(e => e.type == this.state.type);
    return (
      <div className="w">
        <div className="financeRecord">
          <div className="tabOption clf">
            <span className={this.state.type ? "curTab" : ""} onClick={() => this.onTypeChange(true)}>在线充值记录</span>
            <span className={this.state.type ? "" : "curTab"} onClick={() => this.onTypeChange(false)}>取款记录</span>
            {/*<span onChange={()=>this.onTypeChange(3)}>福利记录</span>*/}
          </div>
          <div className="tabDiv">
            <div className="tabCont">
              <table cellSpacing="0" cellPadding="0">
                <tbody>
                <tr>
                  <td>时间</td>
                  <td>金额</td>
                  <td>状态</td>
                  <td>备注</td>
                </tr>
                {
                  records.length == 0 ?
                    <tr>
                      <td colSpan="4" style={{textAlign: 'center'}}>暂时没有下注。</td>
                    </tr>
                    :
                    records.map((e, i) => {
                      return (
                        <tr key={i}>
                          <td>{e.createdAt.substr(0, 10)}</td>
                          <td>{e.amount}</td>
                          {e.ignore === 0 ? <td className="shz">审核中</td> : e.ignore === 1 ? <td className="tg">通过</td> :
                              <td className="wtg">未通过</td>}
                          <td></td>
                        </tr>
                      )
                    })
                }
                <tr>
                  <td colSpan="4">
                    <div className="paging clf">
                      <a className="cur">1</a>
                      <span>1/1</span>
                    </div>
                  </td>
                </tr>
                </tbody>

              </table>
            </div>
            <div className="tabCont">2222</div>
            <div className="tabCont">3333</div>
            <div className="tabCont">4444</div>
          </div>
        </div>
      </div>
    );
  }
}


