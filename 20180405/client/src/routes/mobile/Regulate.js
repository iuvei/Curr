import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/regulate.css';
/**
 * Created by sven on 2017/8/23.
 */

export default class Regulate extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (<div>
      <div className="topbar">
        <h3>游戏规则</h3>
        <a href="javascript:" className="fl"><img src={require("../../assets/images/icon_arrows_left.png")}/></a>
      </div>
      <div className="main">
        <img src={require("../../assets/images/img_regulate.png")}/>
        <p>1. 活动规则活动规则活动规则活动规则活动规则活动规则活动规则</p>
        <p>2. 活动规则活动规则活动规则活动规则活动规则活动规则活动规则</p>
        <p>3. 活动规则活动规则活动规则活动规则活动规则活动规则活动规则</p>
      </div>
    </div>);
  }
}


