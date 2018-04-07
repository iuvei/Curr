import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/login.css';
import {setCookie} from '../../utils/cookies';
import {Toast} from 'antd-mobile';
/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks"

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    }
  }

  onPhoneChange = (e) => {
    this.setState({phone: e.target.value})
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.phone == '') {
      Toast.show("请输入手机号码");
      return;
    }
    setCookie('userId', this.state.phone);
    hashHistory.push({pathname: PATH_MyWorks, state: {from: "login"}});
  }

  render() {
    return (
      <div>
        <div className="title"><a href="javascript:void(0)" onClick={()=>this.props.history.goBack()}></a>登录</div>
        <div className="logo">
          <img src={require("../../assets/images/logo.png")} alt=""/>
          <div>地球日绘画大赛</div>
        </div>

        <div className="login">
          <form action="" onSubmit={this.onSubmit}>
            <div className="text"><span></span>
              <input type="text" placeholder="请输入手机号登录" value={this.state.phone} onChange={this.onPhoneChange}/></div>
            <input type="submit" value="登录"/>
          </form>
        </div>

        <div className="clf subtitle">
          <span className="s_left"></span> <h5>活动介绍</h5>
          <span className="s_right"></span></div>
        <div className="content">
          <div className="time">4月9日到5月4日</div>
          <p>活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍活动介绍</p>
        </div>
      </div>
    );
  }
}


