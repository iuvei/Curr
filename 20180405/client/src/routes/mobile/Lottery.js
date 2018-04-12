import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/lottery.css';
import {getCookie} from '../../utils/cookies';
import {getUserByUserId, putChoujiang, postLotteryResult} from '../../services/mobile';
import {Toast} from 'antd-mobile';
/**
 * Created by sven on 2017/8/12.
 */


const PATH_LotteryResult = "/lotteryResult";
const PATH_Regulate = "/regulate";
const PATH_Wdjp = "/wdjp";

export default class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {lcount: 0},
      total: 0,
      count: 0,
      curr: 0,
      num: {
        dz: 1000,
        d30: 11000,
        d50: 4000,
      }
    }
  }

  componentDidMount() {
    getUserByUserId({userId: getCookie("userId")}).then(data => {
      if (data.code === undefined) {
        this.setState({
          user: data,
        })
      }
    })
  }

  gotoLotteryResult = () => {
    if (this.state.total === 0) {
      Toast.fail("您还没有抽奖哦");
      return
    }
    var result = '0';
    const {curr} = this.state;
    if ([1].indexOf(curr) >= 0) {
      result = "1"
    }
    if ([0, 2, 4, 5, 7].indexOf(curr) >= 0) {
      result = "2"
    }
    if ([3, 6].indexOf(curr) >= 0) {
      result = "3"
    }
    console.log('===', curr, result);

    postLotteryResult({userId: getCookie("userId"), result: result}).then(data => {
      if (data !== undefined) {
        hashHistory.push({pathname: PATH_LotteryResult, state: result});
        //setTimeout(() => hashHistory.push({pathname: "tpym", state: {from: "index"}}), 3000)
      }
    })
  };

  gotoRegulate = () => {
    hashHistory.push({pathname: PATH_Regulate, state: {from: "index"}});
  };

  gotoWdjp = () => {
    hashHistory.push({pathname: PATH_Wdjp, state: {from: "index"}});
  };


  onStart = () => {
    const {user} = this.state;

    // if (user.dealed) {
    //   Toast.show("您已经抽过奖啦！");
    //   return
    // }

    if (user.lcount <= 0) {
      Toast.fail("您没有抽奖机会，请上传作品");
      return
    }

    putChoujiang({userId: user.userId}).then(data => {
      if (data.code !== undefined) {
        Toast.show("内部错误")
      } else {
        this.setState({user: {...user, lcount: user.lcount - 1}})
        this.setState({total: 2 * 8 + Math.floor(Math.random() * 10), curr: 0, count: 0});
        const handler = setInterval(() => {
          const {total, curr, count} = this.state;
          console.log(total, count);
          if (total < count) {
            clearInterval(handler);
            setTimeout(() => this.gotoLotteryResult(), 2000);
          }
          this.setState({curr: (curr + 1) % 8, count: count + 1})
        }, 150)
      }
    })
  };


  render() {
    const {curr, user:{lcount, name}} = this.state;
    return (
      <div id='lottery'>
        <div className="topbar">
          <h3>抽奖</h3>
          <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}><img
            src={require("../../assets/images/icon_arrows_left.png")}/></a>
          <a href="javascript:" className="fr" onClick={this.gotoRegulate}>游戏规则</a>
        </div>
        <div className="main">
          <img src={require("../../assets/images/img_lottery.png")}/>
          {/*<img src={require("../../assets/images/img_lottery_absImg.png")} className="absImg"/>*/}
          <div className="absChance">您有{lcount || 0}次抽奖机会</div>
          <div className="absDiv">
            {/*<p className="tips">姚某某用户抽中地图（滚动）</p>*/}
            <div className="machine">
              <ul>
                <li className={curr === 0 ? "icon_0 active" : "icon_0"}><span>现金券30</span></li>
                <li className={curr === 1 ? "icon_1 active" : "icon_1"}><span>袋子</span></li>
                <li className={curr === 2 ? "icon_2 active" : "icon_2"}><span>现金券30</span></li>
                <li className={curr === 7 ? "icon_7 active" : "icon_7"}><span>现金券30</span></li>
                <li className="icon_go" onClick={() => this.onStart()}><a href="javascript:"></a></li>
                <li className={curr === 3 ? "icon_3 active" : "icon_3"}><span>现金券50</span></li>
                <li className={curr === 6 ? "icon_6 active" : "icon_6"}><span>现金券50</span></li>
                <li className={curr === 5 ? "icon_5 active" : "icon_5"}><span>现金券30</span></li>
                <li className={curr === 4 ? "icon_4 active" : "icon_4"}><span>现金券30</span></li>
              </ul>
            </div>
          </div>
        </div>
        <a href="javascript:void(0)" className="viewResults" onClick={this.gotoWdjp}>查看中奖</a>
      </div>
    );
  }
}


