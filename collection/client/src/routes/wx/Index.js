import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/index.css';
import {getAllMessages, getCustomerImg, getAnnouncement} from '../../services/wxEnd';
import * as p from './ConstantsPath';
import Marquee from "react-smooth-marquee"
/**
 * Created by sven on 2018/1/7.
 */

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kefuDisplay: false,
      announcement: '',
      config: {},
    }
  }

  componentDidMount() {
    getAnnouncement()
      .then(data => {
        if (data.success) {
          this.setState({
            announcement: data.result.config.announcement,
          });
        }
      })
  }

  getCustomerService = () => {
    getCustomerImg()
      .then(data => {
        this.setState({
          kefuDisplay: true,
          config: data.result.data.config,
        });
      })
  }

  closeKefu = () => {
    this.setState({
      kefuDisplay: false,
    })
  }

  gotoLogin = () => {
    hashHistory.push({pathname: p.PATH_Login});
  }

  gotoSign = () => {
    hashHistory.push({pathname: p.PATH_Sign});
  }

  gotoDeposit = () => {
    hashHistory.push({pathname: p.PATH_Deposit});
  }

  gotoDiscounts = () => {
    hashHistory.push({pathname: p.PATH_Discounts});
  }

  gotoAgency = () => {
    hashHistory.push({pathname: p.PATH_Agency});
  }

  gotoDrawMoney = () => {
    hashHistory.push({pathname: p.PATH_DrawMoney});
  }

  gotoXiaZhuJiLu = () => {
    hashHistory.push({pathname: p.PATH_XiaZhuJiLu});
  }

  gotoStatistics = () => {
    hashHistory.push({pathname: p.PATH_Statistics});
  }

  gotoYouXi_CQSSC = () => {
    hashHistory.push({pathname: p.PATH_YOUXI_CQSSC});
  }

  gotoYouXi_BJPK10 = () => {
    hashHistory.push({pathname: p.PATH_YOUXI_BJPK10});
  }

  gotoYouXi_JSK3 = () => {
    hashHistory.push({pathname: p.PATH_YOUXI_JSK3});
  }


  render() {
    const {announcement} = this.state;
    return (
      <div>
        <div className="banner"><img src={require("../../assets/wx/images/banner.jpg")}/></div>
        <div className="w">
          <div className="notice"><Marquee><span style={{color:'#1ec7ff'}}>{announcement || ''}</span></Marquee></div>
          <div className="function clf">
            <ul>
              <li><a href="javascript:;" onClick={this.gotoYouXi_CQSSC}><img
                src={require("../../assets/wx/images/icon_function_3.png")}/>重庆时时彩</a></li>
              <li><a href="javascript:;" onClick={this.gotoYouXi_BJPK10}><img
                src={require("../../assets/wx/images/icon_function_4.png")}/>北京赛车</a></li>
              <li><a href="javascript:;" onClick={this.gotoYouXi_JSK3}><img
                src={require("../../assets/wx/images/icon_function_jsk3.png")}/>江苏快3</a></li>
              <li><a href="javascript:;" onClick={this.getCustomerService}>
                <img src={require("../../assets/wx/images/icon_function_1.png")}/>客服</a></li>
              <li><a href="javascript:;" onClick={this.gotoDeposit}><img
                src={require("../../assets/wx/images/icon_function_2.png")}/>存款</a></li>
              <li><a href="javascript:;" onClick={this.gotoDrawMoney}><img
                src={require("../../assets/wx/images/icon_function_2.png")}/>提款</a></li>
            </ul>
          </div>

          <div className="layer" id="servicePopup"
               style={this.state.kefuDisplay ? {display: 'block'} : {display: 'none'}}>
            <div className="servicePopup">
              <img src={this.state.config.service}/>
              <a href="javascript:;" className="closeBtn" onClick={this.closeKefu}></a>
            </div>
          </div>

          <div className="other clf">
            <ul>
              <li>
                <a onClick={this.gotoDiscounts}>
                  <img src={require("../../assets/wx/images/icon_other_1.png")} className="fl"/>
                  <h2>优惠活动</h2>
                  <p>首次充值100以上首次充值100以上</p>
                </a>
              </li>
              <li>
                <a href="javascript:;" onClick={this.gotoXiaZhuJiLu}>
                  <img src={require("../../assets/wx/images/icon_other_2.png")} className="fl"/>
                  <h2>下注记录</h2>
                  <p>我的下注历史</p>
                </a>
              </li>
              <li>
                <a href="javascript:;" onClick={this.gotoStatistics}>
                  <img src={require("../../assets/wx/images/icon_other_3.png")} className="fl"/>
                  <h2>下级统计</h2>
                  <p>统计下级会员的下注历史</p>
                </a>
              </li>
              <li>
                <a onClick={this.gotoAgency}>
                  <img src={require("../../assets/wx/images/icon_other_4.png")} className="fl"/>
                  <h2>邀请/统计</h2>
                  <p>发送邀请链接给好友</p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(Index);


