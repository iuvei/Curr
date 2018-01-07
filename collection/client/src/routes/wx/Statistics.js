import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/statistics.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class Statistics extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="statistics">
          <p>下线会员的交易流水，您可从中获得<span className="red">0.5%</span>的返利。（应得福利需次日9点到账）</p>
          <div className="tabOption clf">
            <span className="curTab">今天</span>
            <span>昨天</span>
            <span>前天</span>
          </div>
          <div className="tabDiv">
            <div className="tabCont">
              <table className="brief" cellPadding="0" cellSpacing="0">
                <tr>
                  <td>下线总交易</td>
                  <td>应得福利</td>
                  <td>新增下级</td>
                  <td>下级总数</td>
                </tr>
                <tr>
                  <td>0元</td>
                  <td>0元</td>
                  <td>0元</td>
                  <td>0元</td>
                </tr>
              </table>
              <table className="details" cellPadding="0" cellSpacing="0">
                <tr>
                  <td>编号</td>
                  <td>头像</td>
                  <td>昵称</td>
                  <td>交易流水</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td><img src={require("../../assets/wx/images/icon_1.png")}/></td>
                  <td>和尚</td>
                  <td>123456</td>
                </tr>
                <tr>
                  <td colSpan="4">暂无下级</td>
                </tr>
              </table>
            </div>
            <div className="tabCont">222</div>
            <div className="tabCont">333</div>
          </div>
        </div>
      </div>

    );
  }
}


