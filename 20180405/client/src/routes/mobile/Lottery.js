import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/lottery.css';
/**
 * Created by sven on 2017/8/12.
 */


const PATH_LotteryResult = "/lotteryResult"
const PATH_Regulate = "/regulate"

export default class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    }
  }

  gotoLotteryResult = () => {
    hashHistory.push({pathname: PATH_LotteryResult, state: {from: "index"}});
  }

  gotoRegulate = () => {
    hashHistory.push({pathname: PATH_Regulate, state: {from: "index"}});
  }


  render() {
    return (
      <div>
        <div className="topbar">
          <h3>抽奖</h3>
          <a href="javascript:" className="fr" onClick={this.gotoRegulate}>游戏规则</a>
        </div>
        <div className="main">
          <img src={require("../../assets/images/img_lottery.png")}/>
          <img src={require("../../assets/images/img_lottery_absImg.png")} className="absImg"/>
          <div className="absChance">您有1次抽奖机会</div>
          <div className="absDiv">
            <p className="tips">姚某某用户抽中地图（滚动）</p>
            <div className="machine">
              <ul>
                <li className="icon_1 active"><span>地图</span></li>
                <li className="icon_2"><span>水杯</span></li>
                <li className="icon_3"><span>雨伞</span></li>
                <li className="icon_4"><span>加湿器</span></li>
                <li className="icon_go"><a href="javascript:"></a></li>
                <li className="icon_5"><span>自拍杆</span></li>
                <li className="icon_none"><span>谢谢<br/>参与</span></li>
                <li className="icon_6"><span>手机</span></li>
                <li className="icon_7"><span>购物卡</span></li>
              </ul>
            </div>
          </div>
        </div>
        <a href="javascript:void(0)" className="viewResults" onClick={this.gotoLotteryResult}>查看中奖</a>
      </div>
    );
  }
}


