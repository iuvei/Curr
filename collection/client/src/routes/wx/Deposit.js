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
              <h1>公司入款</h1>
              <div className="mainDiv">
                <h2>通过银行转账、支付宝或微信扫码汇款充值</h2>
                <h3>请每次入款前登录会员核对银行账号是否变更 ！</h3>
                <a href="javascript:;" className="payButton">微信扫码充值</a>
                <a href="javascript:;" className="payButton">支付宝扫码充值</a>
                <a href="javascript:;" className="payButton">银行转账充值</a>
                <p className="tip">【特别提示】</p>
                <div className="tip">请每次入款前登录会员核对银行账号是否变更 ！</div>
              </div>
            </div>
            {/*<div className="receipts">
              <h1>充值金额：<input type="text" title="sum"/></h1>
              <div className="mainDiv">
                <h3>用网银，微信，支付宝在线支付；免手续费；及时到账 ！</h3>
                <a href="javascript:;" className="payButton">微信扫码充值</a>
                <a href="javascript:;" className="payButton">支付宝扫码充值</a>
                <a href="javascript:;" className="payButton">银行转账充值</a>
              </div>
            </div>
             */}
          </div>
        );
    }
}


