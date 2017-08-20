import React, {Component} from 'react';
import {parse, stringify} from 'qs';
import {connect} from 'dva';
import io from 'socket.io-client';
import KeyBoard from '../components/mobile/KeyBoard/KeyBoard'
import MessageBox from './mobile/comm/MessageBox'
import '../assets/backend/css/common.css';
import {getConfig, getUserInfo} from '../services/mobile';
const socket = io('', {path: '/ws/chat'});


class MobilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getUserInfo()
      .then(data => {
        if (data.success) {
          this.props.dispatch({
            type: 'mobile/updateState',
            payload: {userinfo: data.result.userinfo},
          })
        } else {
          getConfig()
            .then(data => {
              if (data.success) {
                const HOME_PAGE = `http://${document.domain}/mobile.html`
                const params = {
                  appid: data.result.appid,
                  redirect_uri: `http://${document.domain}/m/api/auth?callback=${HOME_PAGE}`,
                  //redirect_uri: `http://${document.domain}/mobile.html`,
                  response_type: 'code',
                  scope: 'snsapi_userinfo',
                  state: '1',
                }
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?${stringify(params)}#wechat_redirect`;
              }
            });
        }
      });

    socket.emit('chat mounted', "--");
  }

  handleOk = (data) => {
    dispatch({
      type: 'app/sign_in',
      payload: data,
    })
  }

  render() {
    const {no, userinfo} = this.props.mobile
    return (
      <div>
        {this.props.children}
        <div className="text">
          <span>剩余积分：0.00分</span>
          <span>在线人数：217人</span>
        </div>
        <KeyBoard socket={socket} userinfo={userinfo}/>
        <MessageBox socket={socket} no={no} userinfo={userinfo}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {mobile: state.mobile};
}


export default connect(mapStateToProps)(MobilePage);
