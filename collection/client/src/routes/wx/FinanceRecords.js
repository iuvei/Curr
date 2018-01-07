import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/financeRecord.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class FinanceRecords extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="financeRecord">
          <div className="tabOption clf">
            <span className="curTab">在线充值记录</span>
            <span>汇款记录</span>
            <span>取款记录</span>
            <span>福利记录</span>
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
                <tr>
                  <td colSpan="4" style={{textAlign: 'center'}}>暂时没有下注。</td>
                </tr>
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


