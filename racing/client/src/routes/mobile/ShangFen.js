import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/shangfen.css';
import Footer from './comm/footer'
/**
 * Created by sven on 2017/8/12.
 */

export default class ShangFen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
          <header>
            <div className="user clearfix">
              <img src="images/man.png" className="fl"/>
                <div className="fl">
                  <p>用户名</p>
                  <p>距离致富之路还差1秒</p>
                </div>
            </div>
            <div className="wallet clearfix">
              <div className="fl">
                <p>0.00</p>
                <span>我的钱包</span>
              </div>
              <div className="fr">
                <p>0.00</p>
                <span>推广盈利</span>
              </div>
            </div>
          </header>
          <section className="main">
            <div className="line clearfix">
              <span className="fl">充值渠道</span>
              <div className="fl">
                <select title="">
                  <option value="">微信</option>
                  <option value="">支付宝</option>
                </select>
              </div>
            </div>
            <div className="line clearfix">
              <span className="fl">上分数量</span>
              <div className="fl">
                <input type="text" placeholder="1元=1分（请扫码输入对应金额）"/>
              </div>
            </div>
            <div className="line clearfix">
              <span className="fl">请扫右码</span>
              <div className="fl">
                <img src={require("../../assets/mobile/images/wechatPay.jpg")} />
                  <p className="tip">请使用另外一台手机微信扫码支付</p>
                  <p className="tip">或截屏保存后用微信扫一扫识别支付</p>
              </div>
            </div>
            <div className="line clearfix">
              <span className="fl">留言备注</span>
              <div className="fl">
                <input type="text" placeholder="防护乳你的支付账号或姓名"/>
              </div>
            </div>
            <div className="line clearfix">
              <span className="fl">&nbsp;</span>
              <div className="fl">
                <button type="submit">我已转账</button>
              </div>
            </div>
          </section>
         <Footer/>
        </div>);
    }
}


