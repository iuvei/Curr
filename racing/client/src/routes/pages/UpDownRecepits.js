import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/upDownRecepits.css';
/**
 * Created by sven on 2017/8/4.
 */

export default class UpDownRecepits extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <form action="">
              <div className="receipts">
                <div className="top"><a href="#">上下分管理</a> <span> > </span> 收款账户设置</div>
                <div className="bottom">
                  <div className="b_content clearfloat">
                    <div className="left fl">微信二维码</div>
                    <div className="right fl">
                      <input type="submit" value="选择文件" className="ip1"/>
                        <span>未选择任何文件</span>
                        <input type="submit" value="上传" className="ip2"/>
                          <input type="submit" value="取消" className="ip2"/>
                            <img src="images/erweima.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="b_content clearfloat">
                    <div className="left fl">支付宝二维码</div>
                    <div className="right fl">
                      <input type="submit" value="选择文件" className="ip1"/>
                        <span>未选择任何文件</span>
                        <input type="submit" value="上传" className="ip2"/>
                          <input type="submit" value="取消" className="ip2"/>
                            <img src="images/erweima.jpg" alt=""/>
                    </div>
                  </div>
                  <div className="b_content clearfloat">
                    <div className="left fl">
                      <span>银行账号</span>
                      <span>开户名</span>
                      <span>开户支行</span>
                    </div>
                    <div className="right fl">
                      <input type="text" placeholder="6287541265781587160" className="ip3"/>
                        <input type="text" placeholder="皇马国际娱乐" className="ip3"/>
                          <input type="text" placeholder="招商银行 深圳高新园支行" className="ip3"/>
                    </div>
                  </div>
                  <div className="btn"><input type="submit" value="保存信息" className="ip1"/><input type="submit" value="取消" className="ip2"/></div>
                </div>
              </div>
            </form>

          </div>

    );
    }
}


