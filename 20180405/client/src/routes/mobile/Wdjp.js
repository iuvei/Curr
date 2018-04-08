import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/common.css'
import '../../assets/css/wdjp.css';
/**
 * Created by sven on 2017/8/23.
 */

export default class Wdjp extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    return (<div>
      <div className="title"><a href="javascript:void(0)" onClick={()=>this.props.history.goBack()}></a>我的中奖</div>
      <div className="content">
        <ul>
          <li className="clf">
            <a href="#">
              <div className="fl img"><img src={require("../../assets/images/icon_9.png")}/></div>
              <div className="fl text">
                <p>500代金券</p>
                <p><span>有效期：</span><span>2018-03-29</span></p>
              </div>
            </a>
          </li>
          <li className="clf">
            <a href="#">
              <div className="fl img"><img src={require("../../assets/images/icon_10.png")}/></div>
              <div className="fl text">
                <p>尼泊尔菜刀一把</p>
                <p><span>有效期：</span><span>2018-03-29</span></p>
              </div>
            </a>
          </li>
        </ul>
      </div>

      <div className="bk"><img src={require("../../assets/images/bk_1.png")}/></div>

    </div>);
  }
}


