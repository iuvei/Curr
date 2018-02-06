import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import '../../assets/wx/css/login.css';
import {message} from 'antd';
import {registerUser} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/7.
 */


export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      checkNum: '',
    };
  }

  componentDidMount() {
    if (this.state.username.length) {
      this.refs.passwordInput.focus();
    } else {
      this.refs.usernameInput.focus();
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({username: event.target.value});
    }
    if (event.target.name === 'password') {
      this.setState({password: event.target.value});
    }
    if (event.target.name === 'password2') {
      this.setState({password2: event.target.value});
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username.length < 1) {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }

    if (this.state.username.length < 5 || this.state.username.length > 12) {
      message.error("账户名必须是5-12个英文字母或数字");
      return
    }

    if (this.state.password.length < 6) {
      message.error("密码由6-12位任意字符数字组成");
      return
    }

    if (this.state.password !== this.state.password2) {
      message.error("两次密码不一致");
      return
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      registerUser({
        username: this.state.username,
        password: this.state.password,
        password2: this.state.password2
      }).then(data => {
        if (data.success) {
          message.success("注册成功，请登录")
          hashHistory.push({pathname: "/login"});
        } else {
          message.error(`${data.message}`)
        }
      });
    }
  }

  render() {
    return (
        <div className="login_bg">
          <div className="w">
        <form action="" className="signIn" onSubmit={this.handleSubmit}>
          <h1>会员注册</h1>
          <div className="item">
            <span className="fl">会员账号：</span>
            <input ref="usernameInput" type="text" name='username'
                   value={this.state.username} placeholder="登录用户名" onChange={this.handleChange}/>
            <p className="fr">*您在网站的登录账户，5-12个英文字母或数字</p>
          </div>
          <div className="item">
            <span className="fl">会员密码：</span>
            <input type="password" placeholder="输入密码" value={this.state.password}
                   ref="passwordInput" name='password' onChange={this.handleChange}/>
            <p className="fr">*由6-12位任意字符组成</p>
          </div>
          <div className="item">
            <span className="fl">确认密码：</span>
            <input type="password" placeholder="再次输入密码" value={this.state.password2}
                   ref="password2Input" name='password2' onChange={this.handleChange}/>
            <p className="fr">*由6-12位任意字符组成</p>
          </div>
          {/*<div className="item">*/}
          {/*<span className="fl">手机号码：</span>*/}
          {/*<input type="text" placeholder=""/>*/}
          {/*<p className="fr">填写您的手机获取验证码</p>*/}
          {/*</div>*/}
          <div className="item">
            <span className="fl">邀请码：</span>
            <input type="text" ref="checkNumInput" className="authCodeInput" name="checkNum"
                   onChange={this.handleChange} placeholder="邀请码"/>
            {/*<a href="javascript:;" className="authCode">获取手机验证码</a>*/}
            <p className="fr">*请填写验证码</p>
          </div>
          <div className="item">
            <span className="fl">&nbsp;</span>
            <button>提交</button>
          </div>
        </form>
      </div>
        </div>
    );
  }
}


