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
    return (<div id='regulate'>
      <div className="topbar">
        <h3>游戏规则</h3>
        <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}><img src={require("../../assets/images/icon_arrows_left.png")}/></a>
      </div>
      <div className="main">
        <img src={require("../../assets/images/img_regulate.png")}/>
        <p>1、本次活动时间为4月9日到4月23日</p>
        <p>2、所有人凭手机号登录参加活动，手机号作为唯一身份标识</p>
        <p>3、参加活动的每人有一次给作品点赞机会，分享额外获得一次点赞机会</p>
        <p>4、参与上传作品将获得一次抽奖机会，上传多个作品抽奖次数不累加</p>
        <p>5、本次抽奖设置一、二、三等奖，分别为环保袋、50元现金券、30元现金券</p>
        <p>6、抽中一等奖需填写真实信息，方便奖品发放</p>
        <p>7、抽中二、三等奖可扫码奖品下方的二维码进入对应的页面领取</p>
		<p></p>
      </div>
    </div>);
  }
}


