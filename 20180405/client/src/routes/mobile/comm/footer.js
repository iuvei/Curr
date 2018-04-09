import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../../assets/css/common.css';
/**
 * Created by sven on 2017/8/12.
 */
const PATH_MyWorks = "/myworks"
const PATH_Lottery = "/lottery"
const PATH_Tpym = "/tpym"

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: 'tpym',
    }
  }

  render() {
    const {curr} = this.state;
    return (
      <div className="fixedNav">
        <a href="javascript:" className={curr == "tpym" ? "icon_1 active" : "icon_1"}
           onClick={this.gotoPATH_Tpym}>作品投票</a>
        <a href="javascript:" className={curr == "lottery" ? "icon_2 active" : "icon_2"}
           onClick={this.gotoLottery}>我要抽奖</a>
        <a href="javascript:" className={curr == "myworks" ? "icon_3 active" : "icon_3"}
           onClick={this.gotoMyWorks}>我的作品</a>
      </div>
    );
  }

  gotoMyWorks = () => {
    this.setState({curr: "myworks"})
    hashHistory.push({pathname: PATH_MyWorks, state: {from: "index"}});
  }

  gotoLottery = () => {
    this.setState({curr: "lottery"})
    hashHistory.push({pathname: PATH_Lottery, state: {from: "index"}});
  }

  gotoPATH_Tpym = () => {
    this.setState({curr: "tpym"})
    hashHistory.push({pathname: PATH_Tpym, state: {from: "index"}});
  }
}


