import React, {Component} from 'react';
import { parse, stringify } from 'qs';
import { connect } from 'dva';
import io from 'socket.io-client';
import KeyBoard from '../components/mobile/KeyBoard/KeyBoard'
import MessageBox from './mobile/comm/MessageBox'
import '../assets/backend/css/common.css';
import {getWxInfo,  getUserInfo} from '../services/mobile';
const socket = io('', {path: '/ws/chat'});



class MobilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getUserInfo({appid: 'wxae7b22aef13e165b'})
      .then(data => {
        if (data.success) {
          console.log(data)
        }else{
          const params = {
            appid:'wx8bba1ed01651ed81',
            //redirect_uri: `http://${document.domain}/m/api/auth`,
            redirect_uri: `http://${document.domain}/mobile.html`,
            response_type: 'code',
            scope: 'snsapi_userinfo',
            state: '1',
          }
          //window.location.href=`https://open.weixin.qq.com/connect/oauth2/authorize?${stringify(params)}#wechat_redirect`;
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

  render () {
    const {no} = this.props.mobile

    return (
      <div>
        {this.props.children}
        <div className="text">
          <span>剩余积分：0.00分</span>
          <span>在线人数：217人</span>
        </div>
        <KeyBoard socket={socket}/>
        <MessageBox socket={socket} no={no}/>
        <div className="layer" id="servicePopup">
          <div className="servicePopup">
            <img src="images/servicePopup.jpg"/>
            <a href="javascript:;" className="closeBtn"></a>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {mobile: state.mobile};
}


export default connect(mapStateToProps)(MobilePage);
