import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/deposit.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class Deposit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="receipts">
          <h1>充值</h1>
          <div className="mainDiv">
            <h1>充值金额：<input type="text" title="sum"/></h1>
            <h1>会员账号：<input type="text" title="sum"/></h1>
            <h1>微信账号：<input type="text" title="sum"/></h1>
            <a href="javascript:;" className="payButton">提交</a>
            <a href="javascript:;" className="payButton">重置</a>
          </div>
        </div>
        <div className="ewm">
          <img src={require("../../assets/wx/images/ewm.jpg")}/>
        </div>
      </div>
    );
  }
}


