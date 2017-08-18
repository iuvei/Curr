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
    return (
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
    );
  }
}


