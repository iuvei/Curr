import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {parse, stringify} from 'qs';
import {connect} from 'dva';
import io from 'socket.io-client';
import '../assets/backend/css/common.css';
import {getConfig, getUserInfo, getCurrLottery} from '../services/mobile';
const socket = io('', {path: '/ws/chat'});
const adminSocket = io('', {path: '/ws/admin'});
import '../assets/wx/css/common.css';

const PATH_INDEX = "/index";
const PATH_MemberCenter = "/memberCenter";
const PATH_FinanceRecords = "/finance";
const PATH_OpenRecord = "/openRecord";
const PATH_GameGuide = "/gameGuide";
const PATH_UnRead = "/unread";

class WxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no: 0,
    }
  }


  componentDidMount() {
    getUserInfo()
      .then(data => {
        if (data.success) {
          this.props.dispatch({
            type: 'wx/updateState',
            payload: {userinfo: data.result.userinfo},
          })
        } else {
          getConfig()
            .then(data => {
              if (data.success) {
                const HOME_PAGE = `http://${document.domain}/wx.html`
                const params = {
                  appid: data.result.appid,
                  redirect_uri: `http://${document.domain}/m/api/auth${location.search===""?"?hash=123":location.search}&callback=${HOME_PAGE}`,
                  response_type: 'code',
                  scope: 'snsapi_userinfo',
                  state: '1',
                }
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?${stringify(params)}#wechat_redirect`;
              }
            });
        }
      });
    //this.getOpenNo();

    //socket.emit('chat mounted', "--");
  }

  alterMessage = (message) => {
    this.props.dispatch({
      type: "wx/updateState",
      payload: {message}
    })
  }

  gotoIndex = () => {
    hashHistory.push({pathname: PATH_INDEX});
  }

  gotoMemberCenter = () => {
    hashHistory.push({pathname: PATH_MemberCenter});
  }

  gotoOpenRecord = () => {
    hashHistory.push({pathname: PATH_OpenRecord});
  }

  gotoFinanceRecords = () => {
    hashHistory.push({pathname: PATH_FinanceRecords});
  }

  gotoGameGuide = () => {
    hashHistory.push({pathname: PATH_GameGuide});
  }

  gotoUnRead = () => {
    hashHistory.push({pathname: PATH_UnRead});
  }


  render() {
    const {userinfo} = this.props.wx;
    return (
      <div>
        <div className="comTopDiv clf">
          <div className="fl">
            <a href="javascript:;" onClick={this.gotoIndex}>首页</a>
            <a href="javascript:;" className="membercolor" onClick={this.gotoMemberCenter}>会员中心</a>
            <a href="javascript:;" onClick={this.gotoFinanceRecords}>￥:0.00</a>
          </div>
          <div className="fr">
            <a href="javascript:;" onClick={this.gotoOpenRecord}>未结注单</a>
            <a href="javascript:;" className="message" onClick={this.gotoGameGuide}>玩法</a>
            <a href="javascript:;" className="message" onClick={this.gotoUnRead}>信息(1)</a>
          </div>
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <div className="comBotDiv">&copy;2018捷胜娱乐Casino版权所有</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(WxPage);
