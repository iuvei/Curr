import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/bindingAccount.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class Account extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="bindingAccount">
          <h1>绑定会员号</h1>
          <div className="mainDiv">
            <p className="tip">温馨提示：此（绑定会员号）是可以在网页版登录。</p>
            <table cellPadding="0" cellSpacing="0">
              <tr>
                <td><span>*</span>用户名：<br/>（非会员编号）</td>
                <td><input type="text" title="userName"/></td>
              </tr>
              <tr>
                <td>微信号：</td>
                <td><input type="text" title="WeChatNumber"/></td>
              </tr>
              <tr>
                <td><span>*</span>会员密码：</td>
                <td><input type="text" title="password"/></td>
              </tr>
              <tr>
                <td><span>*</span>密码强度：</td>
                <td>
                  <div className="intensity clf">
                    <span>弱</span>
                    <span>中</span>
                    <span>强</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td><span>*</span>确认密码：</td>
                <td><input type="text" title="affirmPassword"/></td>
              </tr>
              <tr>
                <td><span>*</span>验证码：</td>
                <td>
                  <input type="text" title="security"/>
                  <img src={require("../../assets/wx/images/img_security.jpg")}/>
                </td>
              </tr>
            </table>
            <button type="submit">提交信息</button>
          </div>
        </div>
      </div>
    );
  }
}


