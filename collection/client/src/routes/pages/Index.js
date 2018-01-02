import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';

import '../../assets/backend/css/index.css';
import {getTodayTerraceWorth, getMonthTerraceWorth, getTodayNewUsers, getMonthNewUsers} from '../../services/stat';
/**
 * Created by sven0726 on 2017/8/2.
 */

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    getTodayTerraceWorth()
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            worth: data.result.worth
          });
        }
      })

    getMonthTerraceWorth()
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            monthWorth: data.result.worth
          });
        }
      })

    getTodayNewUsers()
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            addUsersByDay: data.result.addUsers
          });
        }
      })

    getMonthNewUsers()
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            addUsersByMonth: data.result.addUsers
          });
        }
      })
  }

  render() {
    return (
      <div className="r_aside">
        <div className="home_page">
          <div className="top clearfloat">
            <div className="platform_t fl">
              <div className="title">
                <span className="sp1">平台输赢</span><span className="sp2">今天</span>
              </div>
              <div className="content">
                {-this.state.worth}
              </div>
            </div>

            <div className="platform_r fl">
              <div className="title">
                <span className="sp1">平台输赢</span><span className="sp2">最近一个月</span>
              </div>
              <div className="content">
                {-this.state.monthWorth}
              </div>
            </div>

            <div className="user_t fl">
              <div className="title">
                <span className="sp1">新增用户</span><span className="sp2">今天</span>
              </div>
              <div className="content">
                {this.state.addUsersByDay}
              </div>
            </div>

            <div className="user_r fl">
              <div className="title">
                <span className="sp1">新增用户</span><span className="sp2">最近一个月</span>
              </div>
              <div className="content">
                {this.state.addUsersByMonth}
              </div>
            </div>
          </div>
          <div className="bottom clearfloat">
            <div className="statement fl">
              <div className="title"><span>开发申明</span></div>
              <div className="b_content">
                <p>1、本站点源码仅供研究学习，休闲娱乐，请于24h后删除源码。</p>
                <p>2、请勿用于非法及商业用途，否则造成的责任后果自行承担。</p>
                <p>3、如产生法律纠纷，与开发者本人无关。</p>
                <p>4、自您使用学习本源码起，将视为您已经接受本申明。</p>
              </div>
            </div>
            <div className="log fl">
              <div className="title"><span>更新日志</span></div>
              <div className="time"><span className="sp1 fl">V1.0</span> <span className="sp2 fr">2017年8月05日</span>
              </div>
              <div className="b_content">
                <p>1、前台开奖记录增加到最近20条，以及该界面优化</p>
                <p>2、前台开奖记录增加到最近20条，以及该界面优化</p>
                <p>3、前台开奖记录增加到最近20条，以及该界面优化</p>
                <p>4、优化前台界面和进一步增加开奖稳定性</p>
                <p>5、优化前台界面和进一步增加开奖稳定性</p>
                <p>6、优化前台界面和进一步增加开奖稳定性</p>
                <p>7、优化前台界面和进一步增加开奖稳定性</p>
                <p>8、优化前台界面和进一步增加开奖稳定性</p>
                <p>9、前台开奖记录增加到最近20条，以及该界面优化</p>
              </div>
            </div>
            <div className="description fl">
              <div className="title"><span>系统说明</span></div>
              <div className="b_content">
                <h6>北京赛车系统微信版</h6>
                <p>1、本系统主要为微信端版本，主要通过二维码扫码或者分享链接访问，访问需要
                  验证码，如果不输入验证码直接跳转到百度，输入正确验证码才能正常访问系统
                </p>
                <p>2、登录本系统无需注册，通过微信用户接口授权登录，不授权则退出系统</p>
                <p>3、赛车飞艇采用同一套，动画和开奖结果不同，赛车9点到24点，飞艇0点到4点</p>
                <p>4、用户在微信端下注，系统根据开奖结果，自动赔付结算</p>
                <p>5、用户不设置用户中心，用户只能操作上下分申请、下注、查看投注记录</p>
                <p>6、上下分控制，后台声音提示申请，管理员审核后系统操作上下分，记录审核人</p>
                <p>7、自动采集开奖结果，稳定采集指定网站开奖数据用于系统开奖赔付</p>
                <p>8、设总代理和子代理两级，直属上线可设置返水百分比，每一局开奖后统计</p>
                <p>9、自带机器人，机器人自动参与公屏下注（信息输入），所有动作系统不统计</p>
                <p>10、前台有上下分管理，提交表单到后台，可以选择微信、支付宝、银行方式</p>
                <p>11、后台统计下注输赢情况，上下分统计、返水统计</p>
                <p>12、完善的后台管理功能，系统设置，后台上下分等</p>
                <p>13、后台只能PC访问，游戏前台只能微信访问</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


