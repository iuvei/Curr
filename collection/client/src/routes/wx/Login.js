import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/login.css';
import {message} from 'antd';
import {loginUser} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/7.
 */

const suanMap = [
  {val: "4", img: require('../../assets/wx/images/sig/cod1.jpg')},
  {val: "9", img: require('../../assets/wx/images/sig/cod2.jpg')},
  {val: "3", img: require('../../assets/wx/images/sig/cod3.jpg')},
  {val: "7", img: require('../../assets/wx/images/sig/cod4.jpg')},
  {val: "10", img: require('../../assets/wx/images/sig/cod5.jpg')},
  {val: "4", img: require('../../assets/wx/images/sig/cod6.jpg')},
  {val: "14", img: require('../../assets/wx/images/sig/cod7.jpg')},
  {val: "1", img: require('../../assets/wx/images/sig/cod8.jpg')},
  {val: "16", img: require('../../assets/wx/images/sig/cod9.jpg')},
  {val: "5", img: require('../../assets/wx/images/sig/cod10.jpg')},
  {val: "11", img: require('../../assets/wx/images/sig/suan-1.jpg')},
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      suan: suanMap[Math.floor(Math.random() * 11)],
      username: '',
      password: '',
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

  handleChangeCode = () => {
    this.setState({
      suan: suanMap[Math.floor(Math.random() * 11)],
    })
  };

  handleChange = (event) => {
    if (event.target.name === 'username') {
      this.setState({username: event.target.value});
    }
    if (event.target.name === 'password') {
      this.setState({password: event.target.value});
    }
    if (event.target.name === 'checkNum') {
      this.setState({checkNum: event.target.value});
    }
  };
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username.length < 1) {
      this.refs.usernameInput.getInputDOMNode().focus();
    }
    if (this.state.username.length > 0 && this.state.password.length < 1) {
      this.refs.passwordInput.getInputDOMNode().focus();
    }

    if (this.state.suan.val !== this.state.checkNum) {
      alert("验证码错误");
      this.setState({checkNum: ''});
      return
    }
    if (this.state.username.length > 0 && this.state.password.length > 0) {
      loginUser({
        username: this.state.username,
        password: this.state.password
      }).then(data => {
        if (data.success) {
          hashHistory.push({pathname: "/"});
          this.props.dispatch({
            type: 'wx/updateState',
            payload: {userinfo: {...data.result.data, userid: data.result.data._id}, logged: true}
          });
        } else {
          message.error(`${data.message}`)
        }
      });
    }
  };

  render() {
    return (
        <div className="login_bg">
          <div className="w">
            <form onSubmit={this.handleSubmit} className="login">
              <h1>会员登录</h1>
              <div className="item">
                <p>用户名</p>
                <div>
                  <img src={require("../../assets/wx/images/icon_userName.png")} className="icon"/>
                  <input ref="usernameInput" type="text" name='username'
                         value={this.state.username} placeholder="请输入登录用户名" onChange={this.handleChange}/>

                </div>
              </div>
              <div className="item">
                <p>密码</p>
                <div>
                  <img src={require("../../assets/wx/images/icon_passwork.png")} className="icon"/>
                  <input type="password" placeholder="请输入密码" value={this.state.password}
                         ref="passwordInput" name='password' onChange={this.handleChange}/>
                </div>
              </div>
              <div className="item clf">
                <p>验证码</p>
                <div className="w75 fl">
                  <img src={require("../../assets/wx/images/icon_authCode.png")} className="icon"/>
                  <input type="text" ref="checkNumInput" name="checkNum" onChange={this.handleChange} placeholder="请输入验证码"/>
                </div>
                <a href="javascript:;" className="authCode" onClick={this.handleChangeCode}><img src={this.state.suan.img}
                                                                                                 alt="计算码"/></a>
                {/*<a href="javascript:;" className="authCode"><img src={require("../../assets/wx/images/yzm.png")}/></a>*/}
              </div>
              <button htmlFor="submit">登录</button>
            </form>
          </div>
        </div>
    );
  }
}


function mapStateToProps(state) {
  return {wx: state.wx};
}


export default connect(mapStateToProps)(Login);

