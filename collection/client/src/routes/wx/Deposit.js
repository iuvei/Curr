import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/deposit.css';
import {message} from 'antd';
import {getPayment, addUpReq} from '../../services/wxEnd';
import {getCookie} from '../../utils/cookies';
/**
 * Created by sven on 2018/1/7.
 */

class Deposit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      money: 10,
      config: {type: 'WXPAY', img: ''},
      backup: '',
    }
  }

  componentDidMount() {
    getPayment({type: "WXPAY"})
      .then(data => {
        if (data.success) {
          this.setState({
            config: data.result.config,
          });
        }
      });
  }

  onSubmit = (e) => {
    const money = this.refs.moneyInput.value;
    const profile = this.refs.backUpInput.value;
    var re = /^[1-9][0-9]+$/;
    if (!re.test(money)) {
      message.error("请输入大于10的金额")
      return
    }
    const {userinfo} = this.props.wx;
    const params = {
      userid: userinfo._id,
      nickname: userinfo.nickname || userinfo.username,
      avatar: userinfo.avatar,
      payMethod: this.state.config.type,
      payNo: '',
      profile: profile,
      amount: money,
    }

    addUpReq(params)
      .then(data => {
        if (data.success) {
          message.success("充值成功！")
          const that = this
          setTimeout(function () {
            that.gotoIndex();
          }, 2000)
        } else {
          message.error("充值失败，请重试")
        }
      })
  }

  gotoIndex = () => {
    hashHistory.push({pathname: '/', state: {from: "deposit"}});
  }

  onPayMentChange = (event) => {
    getPayment({type: event.target.value})
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            config: data.result.config,
          });
        }
      })
  };

  onMoneyChange = (event) => {
    this.setState({money: event.target.value});
  };

  onBackUpChange = (event) => {
    this.setState({backup: event.target.value});
  };

  render() {
    const {userinfo} = this.props.wx;
    return (
      <div className="w">
        <div className="receipts">
          <h1>充值</h1>
          <div className="mainDiv">
            <div>充值渠道：<select onChange={this.onPayMentChange}>
              <option value="WXPAY">微信</option>
              <option value="ALIPAY">支付宝</option>
            </select></div>
            <div>充值金额： <input type="number" ref="moneyInput" value={this.state.money || ''} onChange={this.onMoneyChange} placeholder="1元=1分（请扫码输入对应金额）"/>
            </div>
            <div>账号备注： <input type="text" ref="backUpInput" placeholder="填写你的支付账号或姓名" value={this.state.backup || userinfo.username} onChange={this.onBackUpChange}/>
            </div>
            <div className="ewm">
              <img src={this.state.config.img}/>
            </div>
            <div style={{margin: 'auto', textAlign: 'center'}}>
              <p className="tip">请使用另外一台手机微信/支付宝扫码</p>
              <p className="tip">支付或截屏保存后用微信扫一扫识别支付</p>
            </div>
            <a href="javascript:;" className="payButton" onClick={this.onSubmit}>我已转账</a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}

export default connect(mapStateToProps)(Deposit);


