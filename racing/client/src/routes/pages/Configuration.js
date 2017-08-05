import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/configuration.css';
/**
 * Created by sven on 2017/8/3.
 */

export default class Configuration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="r_aside">
        <div className="deploy">
          <div className="top">系统配置</div>
          <div className="bottom">
            <p><span className="sp1">网站是否开放</span><span className="sp2 sp3">是</span></p>
            <p><span className="sp1">网站域名</span><span className="sp2">www.hm008.cn</span></p>
            <p><span className="sp1">网站名称</span><span className="sp2">皇马娱乐</span></p>
            <p><span className="sp1">微信AppID</span><span className="sp2">wx907fc0aaad8ffb9c4</span></p>
            <p><span className="sp1">微信AppSecret</span><span className="sp2">5b6ae4db086c3a5e34ec6f5cc59c8473</span></p>
            <p><span className="sp1">授权码</span><span className="sp2">I3DSWnE4KEWCKVE2e5nJKDL5ddf54w5</span></p>
            <form action="">
              <input type="submit" value="保存信息" className="ip1"/>
              <input type="submit" value="取消" className="ip2"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


