import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
/**
 * Created by sven on 2017/8/2.
 */

export default class Sider extends Component {
    constructor(props) {
        super(props);
        this.state = {
          current: 'index'
        }
    }

    render() {
      console.log(this.props)
        return (
          <div className="l_aside fl">
            <div className="title">北京赛车后台管理</div>
            <ul className="menu">
              <li className="level1">
                <Link className={this.state.current===''?"current":""} onClick={this.gotoIndex}><em className="ico ico1"></em>系统主页</Link>
              </li>
              <li className="level1">
                <Link onClick={this.gotoConfig}><em className="ico ico2"></em>系统配置</Link>
              </li>
              <li className="level1">
                <Link  className="tit"><em className="ico ico3"></em>赛车飞艇设置<i></i></Link>
                <ul className="level2">
                  <li><Link onClick={this.gotoSettings}>全局设置</Link></li>
                  <li><Link onClick={this.gotoSetbetting}>下注设置</Link></li>
                </ul>
              </li>
              <li className="level1">
                <Link onClick={this.gotoMember}><em className="ico ico4"></em>会员管理</Link>
              </li>
              <li className="level1">
                <Link onClick={this.gotoQuiz}><em className="ico ico5"></em>竞猜记录</Link>
              </li>
              <li className="level1">
                <a href="" className="tit"><em className="ico ico6"></em>上下分管理<i></i></a>
                <ul className="level2">
                  <li><Link onClick={this.gotoUpdownApp}>上分申请</Link></li>
                  <li><Link onClick={this.gotoUpddownRecepites}>下分申请</Link></li>
                  <li><Link onClick={this.gotoUpdownReview}>审核操作记录</Link></li>
                  <li><a href="">收款账户设置</a></li>
                </ul>
              </li>
              <li className="level1">
                <Link onClick={this.gotoProxy}><em className="ico ico7"></em>代理推广</Link>
              </li>
              <li className="level1">
                <Link onClick={this.gotoBrokerage}><em className="ico ico8"></em>会员返水</Link>
              </li>
              <li className="level1">
                <Link onClick={this.gotoDataGather}><em className="ico ico9"></em>数据采集</Link>
              </li>
              <li className="level1">
                <a href="" className="tit"><em className="ico ico10"></em>输赢统计<i></i></a>
                <ul className="level2">
                  <li><Link onClick={this.gotoStatTerrace}>平台输赢</Link></li>
                  <li><Link onClick={this.gotoStatUsers}>客户输赢</Link></li>
                </ul>
              </li>
              <li className="level1">
                <a href="" className="tit"><em className="ico ico11"></em>机器人管理<i></i></a>
                <ul className="level2">
                  <li><Link onClick={this.gotoRobotMgr}>机器人管理</Link></li>
                  <li><Link onClick={this.gotoRobotGuess}>机器人竞猜</Link></li>
                </ul>
              </li>
              <li className="level1">
                <Link onClick={this.gotoAnnouncement}><em className="ico ico12"></em>发布公告</Link>
              </li>
            </ul>
          </div>
        );
    }

  gotoIndex = () => {
    hashHistory.push({pathname: "/"});
  }
  gotoConfig = () => {
    hashHistory.push({pathname: "/config", state: {from: "index"}});
  }

  gotoSettings = () => {
    hashHistory.push({pathname: "/settings", state: {from: "index"}});
  }

  gotoSetbetting = () => {
    hashHistory.push({pathname: "/setbetting", state: {from: "index"}});
  }

  gotoMember = () => {
    hashHistory.push({pathname: "/member", state: {from: "index"}});
  }

  gotoQuiz = () => {
    hashHistory.push({pathname: "/quiz", state: {from: "index"}});
  }

  gotoUpdownApp = () => {
    hashHistory.push({pathname: "/updown_App", state: {from: "index"}});
  }

  gotoUpddownRecepites = () => {
    hashHistory.push({pathname: "/upddown_recepites", state: {from: "index"}});
  }

  gotoUpdownReview = () => {
    hashHistory.push({pathname: "/updown_review", state: {from: "index"}});
  }

  gotoProxy = () => {
    hashHistory.push({pathname: "/proxy", state: {from: "index"}});
  }

  gotoBrokerage = () => {
    hashHistory.push({pathname: "/brokerage", state: {from: "index"}});
  }

  gotoDataGather = () => {
    hashHistory.push({pathname: "/dataGather", state: {from: "index"}});
  }

  gotoBrokerage = () => {
    hashHistory.push({pathname: "/brokerage", state: {from: "index"}});
  }

  gotoStatUsers = () => {
    hashHistory.push({pathname: "/statUsers", state: {from: "index"}});
  }

  gotoStatTerrace = () => {
    hashHistory.push({pathname: "/statTerrace", state: {from: "index"}});
  }

  gotoRobotMgr = () => {
    hashHistory.push({pathname: "/robotMgr", state: {from: "index"}});
  }

  gotoRobotGuess = () => {
    hashHistory.push({pathname: "/robotGuess", state: {from: "index"}});
  }

  gotoAnnouncement = () => {
    hashHistory.push({pathname: "/announcement", state: {from: "index"}});
  }
}


