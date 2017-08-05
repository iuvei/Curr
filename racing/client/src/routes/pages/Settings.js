import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/settings.css';
/**
 * Created by sven on 2017/8/3.
 */

export default class Settings extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <form action="">
              <div className="setup">
                <div className="top">赛车飞艇全局设置</div>
                <div className="bottom">
                  <div className="dv1 clearfloat">
                    <p className="p1 fl">是否开启机器人</p><p className="p2 fl"><span className="sp1 sp3">是</span><span className="sp2">开启机器人后机器人自动参与下注</span></p>
                  </div>
                  <div className="clearfloat">
                    <p className="p1 fl">欢迎语</p><p className="p2 fl"><span className="sp1">欢迎莅临，祝您竞猜愉快！本平台重金打造，玩法多样，超高赔率，等你来战！</span></p>
                  </div>
                  <div className="dv2 clearfloat">
                    <p className="p1 fl">封盘时间</p><p className="p2 fl"><span className="sp1">60</span><span className="sp2">秒（修改后需要重启服务器生效）</span></p>
                  </div>
                  <div className="dv3 clearfloat">
                    <p className="p1 fl">虚拟在线人数</p><p className="p2 fl"><span className="sp1">164</span></p>
                  </div>
                  <div className="dv4 clearfloat">
                    <p className="p1 fl">微信客服</p>
                    <p className="p2 fl">
                      <input type="submit" value="选择文件" className="ip1"/>
                        <span>未选择任何文件</span>
                        <input type="submit" value="上传" className="ip2"/>
                          <input type="submit" value="取消" className="ip2"/>
                            <img src="images/erweima.jpg" alt=""/>
                    </p>
                  </div>
                  <div className="dv5">
                    <input type="submit" value="保存信息" className="ip1"/>
                      <input type="submit" value="取消" className="ip2"/>
                  </div>
                </div>
              </div>
            </form>

          </div>

    );
    }
}


