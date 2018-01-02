import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/my.css';
import Footer from './comm/footer'
import {getAccount} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */


export default class MyHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {balance: '-', lossToday: '-', rebate: '-'}
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
      {this.props.children}
      <Footer/>
    </div>);
  }
}


