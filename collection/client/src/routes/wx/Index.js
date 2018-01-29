import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/index.css';
import {getAllMessages, getCustomerImg, getAnnouncement} from '../../services/wxEnd';
import * as p from './ConstantsPath';
/**
 * Created by sven on 2018/1/7.
 */

// const PATH_Login = "/login";
// const PATH_Sign = "/sign";
//
// const PATH_Deposit = "/deposit";
// const PATH_DrawMoney = "/drawMoney";
// const PATH_XiaZhuJiLu = "/xiazhujilu";
// const PATH_Statistics = "/statistics";
//
// const PATH_YOUXI_CQSSC = "/youxi/cqssc";
// const PATH_YOUXI_BJPK10 = "/youxi/bjpk10";
// const PATH_YOUXI_JSK3 = "/youxi/jsk3";

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
    if (!this.props.wx.logged) {
      this.gotoLogin();
      return
    }
    hashHistory.push({pathname: p.PATH_Deposit});
  }

  gotoDrawMoney = () => {
    if (!this.props.wx.logged) {
      this.gotoLogin();
      return
    }
    hashHistory.push({pathname: p.PATH_DrawMoney});
  }

  gotoXiaZhuJiLu = () => {
    if (!this.props.wx.logged) {
      this.gotoLogin();
      return
    }
    hashHistory.push({pathname: p.PATH_XiaZhuJiLu});
  }

  gotoStatistics = () => {
    if (!this.props.wx.logged) {
      this.gotoLogin();
      return
    }
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
        <div className="banner"><img src={require("../../assets/wx/images/banner_1.jpg")}/></div>
        <div className="w">
          <div className="notice"><a href="javascript:;">{announcement || ''}</a></div>
          <div className="function clf">
            <ul>
              <li><a href="javascript:;" onClick={this.gotoYouXi_CQSSC}><img
                src={require("../../assets/wx/images/icon_function_3.png")}/>重庆时时彩</a></li>
              <li><a href="javascript:;" onClick={this.gotoYouXi_BJPK10}><img
                src={require("../../assets/wx/images/icon_function_4.png")}/>北京赛车</a></li>
              <li><a href="javascript:;" onClick={this.gotoYouXi_JSK3}><img
                src={require("../../assets/wx/images/icon_jsk3.png")}/>江苏快3</a></li>
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
                <a href="javascript:;">
                  <img src={require("../../assets/wx/images/icon_other_1.png")} className="fl"/>
                  <h2>福利说明</h2>
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
                <a href="javascript:;">
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


