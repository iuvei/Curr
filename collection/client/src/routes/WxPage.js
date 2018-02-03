import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {parse, stringify} from 'qs';
import {connect} from 'dva';
import '../assets/backend/css/common.css';
import {getConfig, getUserInfo} from '../services/wxEnd';
import '../assets/wx/css/common.css';
import * as p from './wx/ConstantsPath';

class WxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
    }
  }

  componentDidMount() {
    if (!this.props.wx.logged) {
        this.gotoLogin();
        return
    }
    getUserInfo()
      .then(data => {
        if (data.success) {
          this.props.dispatch({
            type: 'wx/updateState',
            payload: {userinfo: data.result.userinfo},
          })
        } else {
          //   getConfig()
          //     .then(data => {
          //       if (data.success) {
          //         const HOME_PAGE = `http://${document.domain}/wx.html`
          //         const params = {
          //           appid: data.result.appid,
          //           redirect_uri: `http://${document.domain}/m/api/auth${location.search === "" ? "?hash=123" : location.search}&callback=${HOME_PAGE}`,
          //           response_type: 'code',
          //           scope: 'snsapi_userinfo',
          //           state: '1',
          //         }
          //         window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?${stringify(params)}#wechat_redirect`;
          //       }
          //     });
        }
      });
  }

  alterMessage = (message) => {
    this.props.dispatch({
      type: "wx/updateState",
      payload: {message}
    })
  }

  gotoIndex = () => {
    hashHistory.push({pathname: p.PATH_INDEX});
  }

  gotoMemberCenter = () => {
    // if (!this.props.wx.logged) {
    //   this.gotoLogin();
    //   return
    // }
    hashHistory.push({pathname: p.PATH_MemberCenter});
  }

  gotoOpenRecord = () => {
    hashHistory.push({pathname: p.PATH_OpenRecord});
  }

  gotoDrawMoney = () => {
    hashHistory.push({pathname: p.PATH_DrawMoney});
  }


  gotoGameGuide = () => {
    hashHistory.push({pathname: p.PATH_GameGuide});
  }

  gotoUnRead = () => {
    hashHistory.push({pathname: p.PATH_UnRead});
  }

  gotoLogin = () => {
    hashHistory.push({pathname: p.PATH_Login});
  }

  gotoSign = () => {
    hashHistory.push({pathname: p.PATH_Sign});
  }

  render() {
    const {userinfo} = this.props.wx;
    return (
      <div>
        <div className="comTopDiv clf">
          {
            this.props.wx.logged ?
              <div className="w">
                <div className="fl">
                  <a href="javascript:;" onClick={this.gotoIndex}>首页</a>
                  <a href="javascript:;" className="membercolor" onClick={this.gotoMemberCenter}>会员中心</a>
                  <a href="javascript:;" onClick={this.gotoDrawMoney}>{`￥ ${userinfo.balance || 0.00}`}</a>
                </div>
                <div className="fr">
                  <a href="javascript:;" className="message" onClick={this.gotoGameGuide}>玩法</a>
                  <a href="javascript:;" className="message" onClick={this.gotoUnRead}>信息(1)</a>
                </div>
              </div>
              :
              <div className="w">
                <div className="fl">
                  <a href="javascript:;" className="logo">
                    <img src={require('../assets/wx/images/logo.png')}/></a>
                </div>
                <div className="fr">
                  <a href="javascript:;" className="login" onClick={this.gotoLogin}>登录</a>
                  <a href="javascript:;" className="signIn" onClick={this.gotoSign}>注册</a>
                </div>
              </div>
          }
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <div className="comBotDiv">&copy;2018凤凰娱乐Casino版权所有</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(WxPage);
