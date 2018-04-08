import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/index.css';
import {setCookie} from '../../utils/cookies';

/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks";
const PATH_Typm = "/tpym";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    }
  }

  componentDidMount() {
    setTimeout(() => hashHistory.push({pathname: PATH_Typm}), 3000)
  }


  render() {
    return (
      <div id="index">
        <img src={require("../../assets/images/logo_2.png")} className="logo"/>
        <h2>爱随行，panda go！</h2>
        <p>世界地球日（Earth
          Day）即每年的4月22日，是一个专为世界环境保护而设立的节日，旨在提高民众对于现有环境问题的意识，并动员民众参与到环保运动中，通过绿色低碳生活，改善地球的整体环境。地球日由盖洛德·尼尔森和丹尼斯·海斯于1970年发起。</p>
      </div>
    );
  }
}


