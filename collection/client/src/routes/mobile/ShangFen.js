import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/shangfen.css';
import {getPayment, addUpReq, getAccount} from '../../services/mobile';
import Footer from './comm/footer'
import {message} from 'antd'
/**
 * Created by sven on 2017/8/12.
 */

export default class ShangFen extends Component {

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
        console.log(data)
        if (data.success) {
          this.setState({
            config: data.result.config,
          });
        }
      });
  }

  onSubmit = (e) => {
    const money = this.refs.moneyInput.value
    const profile = this.refs.backUpInput.value
    var re = /^[1-9][0-9]+$/;
    if (!re.test(money)) {
      message.error("请输入大于10的金额")
      return
    }
    const {userinfo} = this.props.location.state;
    const params = {
      openid: userinfo.openid,
      nickname: userinfo.nickname,
      avatar: userinfo.avatar,
      payMethod: this.state.config.type,
      payNo: '',
      profile: profile,
      amount: money,
    }

    addUpReq(params)
      .then(data => {
        console.log(data)
        if (data.success) {
          message.success("上分成功！！！")
          const that = this
          setTimeout(function () {
            that.gotoIndex();
          }, 2000)
        } else {
          message.error("上分失败，请重试")
        }
      })
  }

  gotoIndex = () => {
    hashHistory.push({pathname: '/', state: {from: "index"}});
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
  }

  onMoneyChange = (event) => {
    this.setState({money: event.target.value});
  }

  onBackUpChange = (event) => {
    this.setState({backup: event.target.value});
  }


  render() {
    const {userinfo} = this.props.location.state;
    return (<div>
      <section className="main">
        <div className="line clearfix">
          <span className="fl">充值渠道</span>
          <div className="fl">
            <select onChange={this.onPayMentChange}>
              <option value="WXPAY">微信</option>
              <option value="ALIPAY">支付宝</option>
            </select>
          </div>
        </div>
        <div className="line clearfix">
          <span className="fl">上分数量</span>
          <div className="fl">
            <input type="number" ref="moneyInput" value={this.state.money || ''}
                   onChange={this.onMoneyChange}
                   placeholder="1元=1分（请扫码输入对应金额）"/>
          </div>
        </div>
        <div className="line clearfix">
          <span className="fl">请扫右码</span>
          <div className="fl">
            <img src={this.state.config.img}/>
            <p className="tip">请使用另外一台手机微信扫码支付</p>
            <p className="tip">或截屏保存后用微信扫一扫识别支付</p>
          </div>
        </div>
        <div className="line clearfix">
          <span className="fl">留言备注</span>
          <div className="fl">
            <input type="text" ref="backUpInput"
                   placeholder="填写你的支付账号或姓名" value={this.state.backup || userinfo.nickname}
                   onChange={this.onBackUpChange}/>
          </div>
        </div>
        <div className="line clearfix">
          <span className="fl">&nbsp;</span>
          <div className="fl">
            <button type="submit" onClick={this.onSubmit}>我已转账</button>
          </div>
        </div>
      </section>
    </div>);
  }
}


