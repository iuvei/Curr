import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/qianbao.css';
import Footer from './comm/footer'
/**
 * Created by sven on 2017/8/12.
 */

export default class QianBao extends Component {
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
              <div className="fl">
                <p>&nbsp;</p>
                <span>今日盈亏</span>
              </div>
              <div className="fr">
                <p>0.00</p>
                <span>推广盈利</span>
              </div>
            </div>
          </header>
          <section className="main">
            <div className="part">
              <a href="javascript:;" className="clearfix a1">
                <span className="fl sp1">佣金转入钱包</span>
                <span className="fr">共<span>0.00</span>元</span>
              </a>
            </div>
            <div className="part">
              <a href="javascript:;" className="clearfix a2">
                <span className="fl sp2">我的下线</span>
                <span className="fr">共<span>0</span>人</span>
              </a>
              <a href="javascript:;" className="clearfix">
                <span className="fl sp3">充值记录</span>
                <span className="fr">查看</span>
              </a>
            </div>
            <div className="part">
              <a href="javascript:;" className="clearfix a3">
                <span className="fl sp4">交易明细</span>
                <span className="fr">查看</span>
              </a>
            </div>
          </section>
          <Footer/>
        </div>);
    }
}


