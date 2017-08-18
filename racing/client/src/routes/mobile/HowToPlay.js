import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/howToPlay.css';
/**
 * Created by sven on 2017/8/12.
 */

export default class  extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="howToPlay">
        <p>和投注方法：和/3/100中间是和数号码 后面是金额</p>
        <p>比如上分一百 前台发查100 下分h100 管理接到消息会给你通知</p>
        <p>上分关键词查 上分 上 c 这4个都可以</p>
      </div>
    );
  }
}


