import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../../assets/mobile/css/footer.css';
/**
 * Created by sven on 2017/8/12.
 */
const PATH_INDEX = "index"
const PATH_AGENCY = "agency"
export default class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer>
        <a href="javascript:;" onClick={this.gotoIndex}>返回游戏</a>
        <a href="javascript:;" onClick={this.gotoAgency}>推广赚钱</a>
      </footer>
    );
  }

  gotoIndex = () => {
    hashHistory.push({pathname: PATH_INDEX, state: {from: "index"}});
  }

  gotoAgency = () => {
    hashHistory.push({pathname: PATH_AGENCY, state: {from: "index"}});
  }
}


