import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/memberCenter.css';
import {delCookie, getCookie} from '../../utils/cookies';
import {getUserDetail} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/7.
 */

const PATH_Login = "/login";
const PATH_Sign = "/sign";

const PATH_Account = "/account";
const PATH_Deposit = "/deposit";
const PATH_DrawMoney = "/drawMoney";
const PATH_XiaZhuJiLu = "/xiazhujilu";
const PATH_FinanceRecords = "/finance";
const PATH_Statistics = "/statistics";
const PATH_UnRead = "/unread";
class MemberCenter extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getUserDetail({userid: getCookie("userid")})
      .then(data => {
        if (data.success) {
          this.props.dispatch({
            type: 'wx/updateState',
            payload: {userinfo: data.result.userinfo},
          })
        }
      });
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

  gotoLogin = () => {
    delCookie("logged");
    this.props.dispatch({
      type: 'wx/updateState',
      payload: {userinfo: {}, logged: false},
    });
    hashHistory.push({pathname: "/login"});
  }

  render() {
    const {userinfo} = this.props.wx;
    console.log(userinfo)
    return (
      <div className="w">
        <div className="memberCenter">
          <a href="javascript:;" className="link clf" onClick={this.gotoBindingAccout}>
            <img src={require("../../assets/wx/images/icon_user.png")} className="fl"/>
            <div className="fl">
              <p>ID：VIP{userinfo._id}</p>
              <p>昵称：{userinfo.nickname|| userinfo.username}</p>
              <p>余额：<span className="red">{userinfo.balance || 0.00}</span></p>
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
        <button type="submit" onClick={this.gotoLogin}>退出当前账号</button>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(MemberCenter);


