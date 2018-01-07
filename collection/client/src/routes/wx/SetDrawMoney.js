import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/setDrawMoney.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class  extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="setDrawMoney">
          <h1>设置提款信息</h1>
          <div className="mainDiv">
            <p className="tip">设置提款密码</p>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
              <tr>
                <td><span>*</span>会员账号：</td>
                <td><input type="text" title="memberAccount"/></td>
              </tr>
              <tr>
                <td><span>*</span>提款密码：</td>
                <td><input type="text" title="drawMoneyPassword"/></td>
              </tr>
              <tr>
                <td><span>*</span>确认密码：</td>
                <td><input type="text" title="affirmPassword"/></td>
              </tr>
              <tr>
                <td>设置出款账号</td>
                <td></td>
              </tr>
              <tr>
                <td><span>*</span>开户姓名：</td>
                <td><input type="text" title="name"/></td>
              </tr>
              <tr>
                <td><span>*</span>借记卡种类：</td>
                <td>
                  <select title="">
                    <option value="">中国工商银行</option>
                    <option value="">中国银行</option>
                    <option value="">中国农业银行</option>
                    <option value="">中国建设银行</option>
                    <option value="">中国交通银行</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td><span>*</span>借记卡号：</td>
                <td><input type="text" title="cardNumber"/></td>
              </tr>
              <tr>
                <td><span>*</span>验证码：</td>
                <td>
                  <input type="text" title="security"/>
                  <img src={require("../../assets/wx/images/img_security.jpg")}/>
                </td>
              </tr>
              </tbody>
            </table>
            <button type="submit">提交信息</button>
          </div>
        </div>
      </div>
    );
  }
}


