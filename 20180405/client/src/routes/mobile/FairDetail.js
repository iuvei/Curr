import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/fairDetail.css';
import {setCookie} from '../../utils/cookies';
import {Toast} from 'antd-mobile';
/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks";

export default class FairDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    }
  }

  render() {
    return (
      <div>
        <div className="topbar">
          <h3>活动介绍</h3>
          <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}><img
            src={require("../../assets/images/icon_arrows_left.png")}/></a>
        </div>
        <div className="main1">
          <img src={require("../../assets/images/img_fairDetail_1.png")}/>
          <p>世界地球日（Earth
            Day）即每年的4月22日，是一个专为世界环境保护而设立的节日，旨在提高民众对于现有环境问题的意识，并动员民众参与到环保运动中，通过绿色低碳生活，改善地球的整体环境。地球日由盖洛德·尼尔森和丹尼斯·海斯于1970年发起。</p>
          <img src={require("../../assets/images/img_fairDetail_2.png")}/>
          <p>公益组织介绍，这里是公益组织介绍！公益组织介绍，这里是公益组织介绍公益组织介绍，这里是公益组织介绍公益组织介绍，这里是公益组织介绍</p>
          <br/>
          <p>公益组织介绍，这里是公益组织介绍</p>
          <img src={require("../../assets/images/img_fairDetail_3.png")}/>
          <p>公益组织介绍，这里是公益组织介绍！公益组织介绍，这里是公益组织介绍公益组织介绍，这里是公益组织介绍公益组织介绍，这里是公益组织介绍</p>
          <br/>
          <p>公益组织介绍，这里是公益组织介绍</p>
        </div>
        <div className="live">
          <div className="countDown">
            <span>1</span>天
            <span>20</span>时
            <span>16</span>分
            <img src={require("../../assets/images/img_live.png")} className="absImg"/>
          </div>
          <div className="liveList clf">
            <a href="javascript:" className="item">
              <img src={require("../../assets/images/img_live_1.png")}/>
            </a>
            <a href="javascript:" className="item">
              <img src={require("../../assets/images/img_live_2.png")}/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}


