import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/login.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <form action="" className="signIn">
          <h1>会员注册</h1>
          <div className="item">
            <span className="fl">会员账号：</span>
            <input type="text" placeholder="您在网站的登录账户，5-12个英文数字"/>
            {/*<p className="fr">*您在网站的登录账户，5-12个英文数字</p>*/}
          </div>
          <div className="item">
            <span className="fl">会员密码：</span>
            <input type="text" placeholder=""/>
            <p className="fr">*由6-12位任意字符组成</p>
          </div>
          <div className="item">
            <span className="fl">确认密码：</span>
            <input type="text" placeholder=""/>
            <p className="fr">*由6-12位任意字符组成</p>
          </div>
          <div className="item">
            <span className="fl">手机号码：</span>
            <input type="text" placeholder=""/>
            <p className="fr">填写您的手机获取验证码</p>
          </div>
          <div className="item">
            <span className="fl">验证码：</span>
            <input type="text" placeholder="" className="authCodeInput"/>
            <a href="javascript:;" className="authCode">获取手机验证码</a>
            <p className="fr">*请填写验证码</p>
          </div>
          <div className="item">
            <span className="fl">&nbsp;</span>
            <button>提交</button>
          </div>
        </form>
      </div>
    );
  }
}


