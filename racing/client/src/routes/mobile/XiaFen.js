import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/xiafen.css';
import Footer from './footer'
/**
 * Created by sven on 2017/8/12.
 */

export default class XiaFen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
          <div className="balance clearfix">
            <span className="fl">账户余额：</span>
            <span className="fr">0.00</span>
          </div>
          <div className="info">
            <div className="line clearfix">
              <span className="fl">昵称：</span>
              <div className="fl">用户昵称</div>
            </div>
            <div className="line clearfix">
              <span className="fl">提现金额：</span>
              <div className="fl"><input type="text" title=""/></div>
            </div>
            <div className="line clearfix">
              <span className="fl">收款类型：</span>
              <div className="fl">
                <select title="">
                  <option value="">支付宝</option>
                  <option value="">微信支付</option>
                </select>
              </div>
            </div>
            <div className="line clearfix">
              <span className="fl">收款账号：</span>
              <div className="fl"><input type="text" title=""/></div>
            </div>
          </div>
          <div className="btns">
            <button type="submit">提交申请</button>
          </div>
          <Footer/>
        </div>);
    }
}


