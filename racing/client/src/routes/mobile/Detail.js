import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/detail.css';
/**
 * Created by sven on 2017/8/12.
 */

export default class  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
          <div className="detail">
            <div className="thead clearfix">
              <span>期号</span>
              <span>内容</span>
              <span>金额</span>
              <span>盈亏</span>
              <span>时间</span>
            </div>
            <div className="paging"><p>当前第1页，共0页，共有0条记录</p></div>
          </div>
          <div className="userInfo clearfix">
            <img src="images/man.png" className="fl"/>
              <form action="" className="fl">
                <input type="text" title="" placeholder="车道/玩法/金额"/>
                  <button type="submit">发送</button>
              </form>
              <div className="fl">
                <p>剩余积分：0.00分</p>
                <p>线上人数：217人</p>
              </div>
          </div>
        </div>);
    }
}


