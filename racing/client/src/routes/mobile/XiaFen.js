import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/xiafen.css';
import {addDownReq, getAccount} from '../../services/mobile';
import Footer from './comm/footer';
import {message} from 'antd';
/**
 * Created by sven on 2017/8/12.
 */

export default class XiaFen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      payMothed: 'WXPAY',
      payNo: '',
      account: {balance: 0.00, lossToday: 0.00, rebate: 0.00}
    }
  }

  componentDidMount() {
    const {userinfo} = this.props.location.state;
    getAccount({openid: userinfo.openid})
      .then(data => {
        if (data.success) {
          this.setState({
            account: data.result.account,
          });
        }
      })
  }

  onSubmit = (e) => {
    const money = this.refs.moneyInput.value
    const payNo = this.refs.payNoInput.value
    var re = /^[1-9][0-9]+$/;
    if (!re.test(money)) {
      message.error("请输入大于10的金额")
      return
    }

    if (money > this.state.account.balance) {
      message.error("提现金额不能大于账户余额")
      return
    }

    if (payNo.length < 1) {
      message.error("请输入返款账号")
      return
    }
    const {userinfo} = this.props.location.state;
    const params = {
      openid: userinfo.openid,
      nickname: userinfo.nickname,
      avatar: userinfo.avatar,
      payMethod: this.state.payMothed,
      payNo: payNo,
      profile: '提现',
      amount: money,
    }

    addDownReq(params)
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success("已发送下分请求！！！")
          const that = this
          setTimeout(function () {
            that.gotoIndex();
          }, 2000)
        } else {
          message.error("发送下分请求失败，请重试")
        }
      })
  }

  gotoIndex = () => {
    hashHistory.push({pathname: '/', state: {from: "index"}});
  }

  onPayMentChange = (event) => {
    this.setState({
      payMothed: event.target.value
    });
  }

  onMoneyChange = (event) => {
    this.setState({money: event.target.value});
  }

  onPayNoChange = (event) => {
    this.setState({payNo: event.target.value});
  }

  render() {
    const {userinfo} = this.props.location.state;
    return (<div>
      <header>
        <div className="user clearfix">
          <img src={userinfo.avatar}/>
          <div className="text fl">
            <p>{userinfo.nickname}</p>
            <p>距离致富之路还差1秒</p>
          </div>
        </div>
        <div className="wallet clearfix">
          <div className="fl">
            <p>{this.state.account.balance}</p>
            <span>我的钱包</span>
          </div>
          <div className="fl">
            <p>{this.state.account.lossToday}</p>
            <span>今日盈亏</span>
          </div>
          <div className="fl">
            <p>{this.state.account.rebate}</p>
            <span>推广盈利</span>
          </div>
        </div>
      </header>
      <div className="info">
        <div className="line clearfix">
          <span className="fl">昵称：</span>
          <div className="fl">{userinfo.nickname}</div>
        </div>
        <div className="line clearfix">
          <span className="fl">提现金额：</span>
          <div className="fl">
            <input type="number" ref="moneyInput" value={this.state.money || ''}
                   onChange={this.onMoneyChange}/></div>
        </div>
        <div className="line clearfix">
          <span className="fl">收款类型：</span>
          <div className="fl">
            <select onChange={this.onPayMentChange}>
              <option value="WXPAY">微信支付</option>
              <option value="ALIPAY">支付宝</option>
            </select>
          </div>
        </div>
        <div className="line clearfix">
          <span className="fl">收款账号：</span>
          <div className="fl">
            <input type="text" ref="payNoInput" value={this.state.payNo || ""} onChange={this.onPayNoChange}/>
          </div>
        </div>
      </div>
      <div className="btns">
        <button type="submit" onClick={this.onSubmit}>提交申请</button>
      </div>
      <Footer/>
    </div>);
  }
}
