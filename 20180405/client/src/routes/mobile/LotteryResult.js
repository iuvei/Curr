import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/lotteryResult.css';
import {putLotteryResult} from '../../services/mobile';
import {Toast} from 'antd-mobile';
/**
 * Created by sven on 2017/8/12.
 */


export default class LotteryResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      result: '1'
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    putLotteryResult({name: e.target.name.value, phone: e.target.phone.value}).then(data => {
      if (data !== undefined) {
        Toast.success("提交成功");
        setTimeout(() => hashHistory.push({pathname: "tpym", state: {from: "index"}}), 3000)
      }
    })
  }

  render() {
    console.log('===', this.props.location.state)
    const result = this.props.location.state;
    if (result == "1") {
      return (
        <div id='lotteryResult'>
          <div className="topbar">
            <h3>中奖结果</h3>
            <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}>
              <img src={require("../../assets/images/icon_arrows_left.png")}/></a>
          </div>
          <img src={require("../../assets/images/img_lotteryResult_1.png")} className="proImg"/>
          <img src={require("../../assets/images/icon_smile.png")} className="smileImg"/>
          <div className="explain">
            <h3>恭喜您抽中绿色环保袋</h3>
            <h4>(您宝宝的画作将会变成定制款)</h4>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="line">
              <span>姓名</span>
              <input type="text" placeholder="请输入您的姓名" name="name"/>
            </div>
            <div className="line">
              <span>电话</span>
              <input type="text" placeholder="请输入您的联系方式" name="phone"/>
            </div>
            <p className="tips">温馨提示：联系方式不要填错了</p>
            <button type="submit">马上领取</button>
          </form>
        </div>
      );
    }

    if (result == '2') {
      return (
        <div id='lotteryResult'>
          <div className="topbar">
            <h3>中奖结果</h3>
            <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}>
              <img src={require("../../assets/images/icon_arrows_left.png")}/></a>
          </div>
          <img src={require("../../assets/images/img_lotteryResult_2.png")} className="proImg"/>
          <img src={require("../../assets/images/icon_smile.png")} className="smileImg"/>
          <div className="explain">
            <h3>恭喜您抽中30元代金券</h3>
            <h4>(请扫描下方二维码领取)</h4>
          </div>
          <div className="cj_code">
            <img src={require("../../assets/images/code_30.jpeg")}/>
          </div>
        </div>
      );
    }

    if (result == '3') {
      return (
        <div id='lotteryResult'>
          <div className="topbar">
            <h3>中奖结果</h3>
            <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}>
              <img src={require("../../assets/images/icon_arrows_left.png")}/></a>
          </div>
          <img src={require("../../assets/images/img_lotteryResult_3.png")} className="proImg"/>
          <img src={require("../../assets/images/icon_smile.png")} className="smileImg"/>
          <div className="explain">
            <h3>恭喜您抽中50元代金券</h3>
            <h4>(请扫描下方二维码领取)</h4>
          </div>
          <div className="cj_code">
            <img src={require("../../assets/images/code_50.jpeg")}/>
          </div>
        </div>
      );
    }
  }
}


