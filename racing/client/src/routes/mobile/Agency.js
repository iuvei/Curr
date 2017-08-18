import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import "../../assets/mobile/css/agency.css";
import Footer from './comm/footer'
/**
 * Created by sven on 2017/8/12.
 */

export default class  extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div className="agency">
      <img src="images/qrcode.png" className="qrcode"/>
      <div className="item">
        <div>
          <p className="title">复制链接：</p>
          <div className="cont">http://2500.pc4321.com/login.php?parent_openid=oZOdDvz27PTUd-vpkSVV0XcYepNE</div>
        </div>
      </div>
      <div className="item">
        <div>
          <p className="title">转发小提示：</p>
          <div className="cont">
            <p>方法1：长按二维码，保存到手机发送给朋友！</p>
            <p>方法2：长按链接全选复制黏贴给朋友！</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>);
  }
}


