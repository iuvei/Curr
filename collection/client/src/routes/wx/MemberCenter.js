import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/memberCenter.css';
/**
 * Created by sven on 2018/1/7.
 */

const PATH_Account = "/account";
const PATH_Deposit = "/deposit";
const PATH_DrawMoney = "/drawMoney";
const PATH_XiaZhuJiLu = "/xiazhujilu";
const PATH_FinanceRecords = "/finance";
const PATH_Statistics = "/statistics";
const PATH_UnRead = "/unread";
export default class MemberCenter extends Component {
  constructor(props) {
    super(props);
  }

  gotoBindingAccout = () => {
    hashHistory.push({pathname: PATH_Account});
  }

  gotoDeposit = () => {
    hashHistory.push({pathname: PATH_Deposit});
  }

  gotoDrawMoney = () => {
    hashHistory.push({pathname: PATH_DrawMoney});
  }

  gotoXiaZhuJiLu = () => {
    hashHistory.push({pathname: PATH_XiaZhuJiLu});
  }

  gotoFinanceRecords = () => {
    hashHistory.push({pathname: PATH_FinanceRecords});
  }

  gotoStatistics = () => {
    hashHistory.push({pathname: PATH_Statistics});
  }

  gotoUnRead = () => {
    hashHistory.push({pathname: PATH_UnRead});
  }

  render() {
    return (
      <div className="w">
        <div className="memberCenter">
          <a href="javascript:;" className="link clf" onClick={this.gotoBindingAccout}>
            <img src={require("../../assets/wx/images/icon_user.png")} className="fl"/>
            <div className="fl">
              <p>ID：45944</p>
              <p>昵称：Lee</p>
              <p>余额：<span className="red">0.00</span></p>
              <p>下注待收返水：<span className="green">0</span></p>
              <p>拉人待收返水：<span className="green">0</span></p>
            </div>
          </a>
          <a href="javascript:;" className="link clf" onClick={this.gotoDeposit}><img
            src={require("../../assets/wx/images/icon_deposit.png")}/>充值</a>
          <a href="javascript:;" className="link clf" onClick={this.gotoDrawMoney}><img
            src={require("../../assets/wx/images/icon_withdrawal.png")}/>提现</a>
          <a href="javascript:;" className="link clf" onClick={this.gotoXiaZhuJiLu}><img
            src={require("../../assets/wx/images/icon_record.png")}/>下注记录</a>
          <a href="javascript:;" className="link clf" onClick={this.gotoFinanceRecords}><img
            src={require("../../assets/wx/images/icon_record.png")}/>财务记录</a>
        </div>
        <div className="memberCenter">
          <a href="javascript:;" className="link clf" onClick={this.gotoStatistics}><img
            src={require("../../assets/wx/images/icon_statistics.png")}/>下级统计</a>
          <a href="javascript:;" className="link clf" onClick={this.gotoUnRead}><img
            src={require("../../assets/wx/images/icon_unread.png")}/>未读信息</a>
        </div>
        <button type="submit">退出当前账号</button>
      </div>
    );
  }
}


