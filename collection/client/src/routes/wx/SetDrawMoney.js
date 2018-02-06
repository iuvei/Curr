import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/setDrawMoney.css';
import {message} from 'antd';
import {getAccount, addDownReq} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/7.
 */

class SetDrawMoney extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 0,
      payMothed: 'WXPAY',
      payNo: '',
      account: {balance: 0},
    }
  }

  componentDidMount() {
    const {userinfo} = this.props.wx;
    getAccount({userid: userinfo._id})
      .then(data => {
        if (data.success) {
          this.setState({
            account: data.result.account,
          });
        }
      })
  }

  onSubmit = (e) => {
    const money = this.refs.moneyInput.value;
    const payNo = this.refs.payNoInput.value;
    var re = /^[1-9][0-9]+$/;
    if (!re.test(money)) {
      message.error("请输入大于10的金额");
      return
    }

    if (money > this.state.account.balance) {
      message.error("提现金额不能大于账户余额");
      return
    }

    if (payNo.length < 1) {
      message.error("请输入返款账号");
      return
    }
    const {userinfo} = this.props.wx;
    const params = {
      userid: userinfo._id,
      nickname: userinfo.nickname || userinfo.username,
      avatar: userinfo.avatar,
      payMethod: this.state.payMothed,
      payNo: payNo,
      profile: '提现',
      amount: money,
    };

    addDownReq(params)
      .then(data => {
        console.log(data);
        if (data.success) {
          message.success("已发送提取请求！");
          const that = this;
          setTimeout(function () {
            that.gotoIndex();
          }, 2000)
        } else {
          message.error("发送提取请求失败，请重试")
        }
      })
  };

  gotoIndex = () => {
    hashHistory.push({pathname: '/', state: {from: "index"}});
  };

  onPayMentChange = (event) => {
    this.setState({
      payMothed: event.target.value
    });
  };

  onMoneyChange = (event) => {
    this.setState({money: event.target.value});
  };

  onPayNoChange = (event) => {
    this.setState({payNo: event.target.value});
  };


  render() {
    const {money, account} = this.state;

    return (
      <div className="w">
        <div className="receipts">
          <h1>提现</h1>
          <div className="mainDiv">
            <div>提现金额：
              <input type="number" ref="moneyInput" value={money == 0 ? account.balance : money} onChange={this.onMoneyChange}/>
            </div>
            <div>收款方式：
              <select onChange={this.onPayMentChange}>
                <option value="WXPAY">微信支付</option>
                <option value="ALIPAY">支付宝</option>
              </select>
            </div>
            <div>收款账号：
              <input type="text" ref="payNoInput" value={this.state.payNo || ""} onChange={this.onPayNoChange}/>
            </div>
            {/*<h1>提现微信：<input type="text" title="sum"/></h1>*/}
            <a href="javascript:;" className="payButton" onClick={this.onSubmit}>提交申请</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}

export default connect(mapStateToProps)(SetDrawMoney);



