import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/index.css';
/**
 * Created by sven on 2018/1/7.
 */

const PATH_Deposit = "/deposit";
const PATH_DrawMoney = "/drawMoney";

const PATH_YOUXI_CQSSC = "/youxi/cqssc";
const PATH_YOUXI_BJPK10 = "/youxi/bjpk10";
const PATH_YOUXI_JSK3 = "/youxi/jsk3";

export default class Index extends Component {
  constructor(props) {
    super(props);
  }


  gotoDeposit = () => {
    hashHistory.push({pathname: PATH_Deposit});
  }

  gotoDrawMoney = () => {
    hashHistory.push({pathname: PATH_DrawMoney});
  }

  gotoYouXi_CQSSC = () => {
    hashHistory.push({pathname: PATH_YOUXI_CQSSC});
  }

  gotoYouXi_BJPK10 = () => {
    hashHistory.push({pathname: PATH_YOUXI_BJPK10});
  }

  gotoYouXi_JSK3 = () => {
    hashHistory.push({pathname: PATH_YOUXI_JSK3});
  }


  render() {
    return (
      <div>
        <div className="banner"><img src={require("../../assets/wx/images/banner_1.jpg")}/></div>
        <div className="notice"><a href="javascript:;">尊敬的各位会员请注意尊敬的各位会员请注意</a></div>
        <div className="function clf">
          <ul>
            <li><a href="javascript:;"><img src={require("../../assets/wx/images/icon_function_1.png")}/>客服</a></li>
            <li><a href="javascript:;" onClick={this.gotoDeposit}><img
              src={require("../../assets/wx/images/icon_function_2.png")}/>存款</a></li>
            <li><a href="javascript:;" onClick={this.gotoDrawMoney}><img
              src={require("../../assets/wx/images/icon_function_2.png")}/>提款</a></li>
            <li><a href="javascript:;" onClick={this.gotoYouXi_CQSSC}><img
              src={require("../../assets/wx/images/icon_function_3.png")}/>重庆时时彩</a></li>
            <li><a href="javascript:;" onClick={this.gotoYouXi_BJPK10}><img
              src={require("../../assets/wx/images/icon_function_4.png")}/>北京赛车</a></li>
            <li><a href="javascript:;" onClick={this.gotoYouXi_JSK3}><img
              src={require("../../assets/wx/images/icon_function_3.png")}/>江苏快3</a></li>
          </ul>
        </div>
        <div className="other clf">
          <ul>
            <li>
              <a href="javascrit:;">
                <img src={require("../../assets/wx/images/icon_other_1.png")} className="fl"/>
                <h2>福利说明</h2>
                <p>首次充值100以上首次充值100以上</p>
              </a>
            </li>
            <li>
              <a href="javascrit:;">
                <img src={require("../../assets/wx/images/icon_other_2.png")} className="fl"/>
                <h2>下注记录</h2>
                <p>我的下注历史</p>
              </a>
            </li>
            <li>
              <a href="javascrit:;">
                <img src={require("../../assets/wx/images/icon_other_3.png")} className="fl"/>
                <h2>下级统计</h2>
                <p>统计下级会员的下注历史</p>
              </a>
            </li>
            <li>
              <a href="javascrit:;">
                <img src={require("../../assets/wx/images/icon_other_4.png")} className="fl"/>
                <h2>邀请/统计</h2>
                <p>发送邀请链接给好友</p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}


