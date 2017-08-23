import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import moment from 'moment';
import {getUpdownsCounts} from '../../services/updowns';
import {message} from 'antd';
/**
 /**
 * Created by sven on 2017/8/2.
 */

const PATH_UPDOWN_UP = "/updown_up";
const PATH_UPDOWN_DOWN = "/updown_down";
export default class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ups: 0,
      downs: 0,
    }
  }

  componentDidMount() {
    getUpdownsCounts()
      .then(data => {
        if (data.success) {
          this.setState({
            ups: data.result.ups,
            downs: data.result.downs,
          });
        } else {
          message.error(data.message)
        }
      })
  }

  render() {
    return (
      <div className="nav">
        <div className="name fl">
          <img src="images/icon-14.png" alt="" className="fl"/>
          <span className="fl">admin</span>
          <a href="#" className="fl">退出</a>
        </div>
        <div className="time fl">
          <span className="sp1">{moment().format('YYYY-MM-DD')}</span><span
          className="sp2">{moment().format('HH:mm:ss')}</span>
        </div>
        <div className="submit fr">
          <form action="" className="clearfloat">
            <div className="dv1 fl">
              <input type="submit" value="上分申请" onClick={this.gotoUpdown_up}/>{this.state.ups !== 0 ?
              <i>{this.state.ups}</i> : <span></span>}</div>
            <div className="dv2 fl">
              <input type="submit" value="下分申请" onClick={this.gotoUpdown_down}/>{this.state.downs !== 0 ?
              <i>{this.state.downs}</i> : <span></span>}</div>
          </form>
        </div>
      </div>
    );
  }

  gotoUpdown_up = () => {
    hashHistory.push({pathname: PATH_UPDOWN_UP, state: {from: "index", type: true}});
  }

  gotoUpdown_down = () => {
    hashHistory.push({pathname: PATH_UPDOWN_DOWN, state: {from: "index", type: false}});
  }

}


