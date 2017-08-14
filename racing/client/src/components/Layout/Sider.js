import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
/**
 * Created by sven on 2017/8/2.
 */

const PATH_INDEX = "/index";
const PATH_CONGIG = "/config";
const PATH_SETTINGS = "/settings";
const PATH_SET_BETTING = "/setbetting";
const PATH_MEMBER = "/member";
const PATH_QUIZ = "/quiz";
const PATH_UPDOWN_UP = "/updown_up";
const PATH_UPDOWN_DOWN = "/updown_down";
const PATH_UPDOWN_RECEPITES = "/upddown_recepites";
const PATH_UPDOWN_REVIEW = "/updown_review";
const PATH_PROXY = "/proxy";
const PATH_BROKERAGE = "/brokerage";
const PATH_DATE_GATHER = "/dataGather";
const PATH_STAT_USERS = "/statUsers";
const PATH_STAT_TERRACE = "/statTerrace";
const PATH_ROBOT_MGR = "/robotMgr";
const PATH_ROBOT_GUESS = "/robotGuess";
const PATH_ANNOUNCEMENT = "/announcement";

export default class Sider extends Component {
  constructor(props) {
    super(props);
  }

  isCurrent = (inPath) => {
    return inPath === this.props.current ? "current" : "";
  }

  render() {
    return (
      <div className="l_aside fl">
        <div className="title">北京赛车后台管理</div>
        <ul className="menu">
          <li className="level1">
            <Link className={this.isCurrent(PATH_INDEX)} onClick={this.gotoIndex}>
              <em className="ico ico1"></em>系统主页</Link>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_CONGIG)} onClick={this.gotoConfig}>
              <em className="ico ico2"></em>系统配置</Link>
          </li>
          <li className="level1">
            <Link className="tit"><em className="ico ico3"></em>赛车飞艇设置<i></i></Link>
            <ul className="level2">
              <li><Link className={this.isCurrent(PATH_SETTINGS)} onClick={this.gotoSettings}>全局设置</Link></li>
              <li><Link className={this.isCurrent(PATH_SET_BETTING)} onClick={this.gotoSetbetting}>下注设置</Link></li>
            </ul>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_MEMBER)} onClick={this.gotoMember}>
              <em className="ico ico4"></em>会员管理</Link>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_QUIZ)} onClick={this.gotoQuiz}>
              <em className="ico ico5"></em>竞猜记录</Link>
          </li>
          <li className="level1">
            <a href="" className="tit"><em className="ico ico6"></em>上下分管理<i></i></a>
            <ul className="level2">
              <li><Link className={this.isCurrent(PATH_UPDOWN_UP)} onClick={this.gotoUpdown_up}>上分申请</Link></li>
              <li><Link className={this.isCurrent(PATH_UPDOWN_DOWN)} onClick={this.gotoUpdown_down}>下分申请</Link></li>
              <li><Link className={this.isCurrent(PATH_UPDOWN_REVIEW)} onClick={this.gotoUpdownReview}>审核操作记录</Link>
              </li>
              <li><Link className={this.isCurrent(PATH_UPDOWN_RECEPITES)}
                        onClick={this.gotoUpddownRecepites}>收款账户设置</Link></li>
            </ul>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_PROXY)} onClick={this.gotoProxy}>
              <em className="ico ico7"></em>代理推广</Link>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_BROKERAGE)} onClick={this.gotoBrokerage}>
              <em className="ico ico8"></em>会员返水</Link>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_DATE_GATHER)} onClick={this.gotoDataGather}>
              <em className="ico ico9"></em>数据采集</Link>
          </li>
          <li className="level1">
            <a href="" className="tit"><em className="ico ico10"></em>输赢统计<i></i></a>
            <ul className="level2">
              <li><Link className={this.isCurrent(PATH_STAT_TERRACE)} onClick={this.gotoStatTerrace}>平台输赢</Link></li>
              <li><Link className={this.isCurrent(PATH_STAT_USERS)} onClick={this.gotoStatUsers}>客户输赢</Link></li>
            </ul>
          </li>
          <li className="level1">
            <a href="" className="tit"><em className="ico ico11"></em>机器人管理<i></i></a>
            <ul className="level2">
              <li><Link className={this.isCurrent(PATH_ROBOT_MGR)} onClick={this.gotoRobotMgr}>机器人管理</Link></li>
              <li><Link className={this.isCurrent(PATH_ROBOT_GUESS)} onClick={this.gotoRobotGuess}>机器人竞猜</Link></li>
            </ul>
          </li>
          <li className="level1">
            <Link className={this.isCurrent(PATH_ANNOUNCEMENT)} onClick={this.gotoAnnouncement}>
              <em className="ico ico12"></em>发布公告</Link>
          </li>
        </ul>
      </div>
    );
  }

  gotoIndex = () => {
    hashHistory.push({pathname: PATH_INDEX});
  }
  gotoConfig = () => {
    hashHistory.push({pathname: PATH_CONGIG, state: {from: "index"}});
  }

  gotoSettings = () => {
    hashHistory.push({pathname: PATH_SETTINGS, state: {from: "index"}});
  }

  gotoSetbetting = () => {
    hashHistory.push({pathname: PATH_SET_BETTING, state: {from: "index"}});
  }

  gotoMember = () => {
    hashHistory.push({pathname: PATH_MEMBER, state: {from: "index"}});
  }

  gotoQuiz = () => {
    hashHistory.push({pathname: PATH_QUIZ, state: {from: "index"}});
  }

  gotoUpdown_up = () => {
    hashHistory.push({pathname: PATH_UPDOWN_UP, state: {from: "index", type: true}});
  }

  gotoUpdown_down = () => {
    hashHistory.push({pathname: PATH_UPDOWN_DOWN, state: {from: "index", type: false}});
  }

  gotoUpddownRecepites = () => {
    hashHistory.push({pathname: PATH_UPDOWN_RECEPITES, state: {from: "index"}});
  }

  gotoUpdownReview = () => {
    hashHistory.push({pathname: PATH_UPDOWN_REVIEW, state: {from: "index"}});
  }

  gotoProxy = () => {
    hashHistory.push({pathname: PATH_PROXY, state: {from: "index"}});
  }

  gotoBrokerage = () => {
    hashHistory.push({pathname: PATH_BROKERAGE, state: {from: "index"}});
  }

  gotoDataGather = () => {
    hashHistory.push({pathname: PATH_DATE_GATHER, state: {from: "index"}});
  }

  gotoStatUsers = () => {
    hashHistory.push({pathname: PATH_STAT_USERS, state: {from: "index", type: "user"}});
  }

  gotoStatTerrace = () => {
    hashHistory.push({pathname: PATH_STAT_TERRACE, state: {from: "index", type: "terrace"}});
  }

  gotoRobotMgr = () => {
    hashHistory.push({pathname: PATH_ROBOT_MGR, state: {from: "index"}});
  }

  gotoRobotGuess = () => {
    hashHistory.push({pathname: PATH_ROBOT_GUESS, state: {from: "index"}});
  }

  gotoAnnouncement = () => {
    hashHistory.push({pathname: PATH_ANNOUNCEMENT, state: {from: "index"}});
  }
}


