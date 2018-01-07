import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/xiazhujilu.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class XiaZhuJiLu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="clf time">
          <span className="fl title">交易日期：</span>
          <div className="fl choose"><a href="javascript:;">2017-10-26</a></div>
        </div>
        <div className="dbox">
          <div className="clf title">
            <span>游戏类型</span>
            <span>下注金额</span>
            <span>未结算金额</span>
            <span>结果</span>
          </div>
          <div className="types">
            <ul>
              <li className="clf">
                <span>重庆时时彩</span>
                <span>0.00</span>
                <span>0.00</span>
                <span>0</span>
              </li>
              <li className="clf">
                <span>北京赛车</span>
                <span>0.00</span>
                <span>0.00</span>
                <span>0</span>
              </li>

              <li className="clf">
                <span>江苏快3</span>
                <span>0.00</span>
                <span>0.00</span>
                <span>0</span>
              </li>

              <li className="clf">
                <span>总计</span>
                <span>0</span>
                <span>0</span>
                <span>0</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


