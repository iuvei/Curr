import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import moment from 'moment';
/**
 * Created by qiniu on 2017/8/2.
 */

export default class Nav extends Component {
    constructor(props) {
        super(props);
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
              <span className="sp1">{moment().format('YYYY-MM-DD')}</span><span className="sp2">{moment().format('HH:mm:ss')}</span>
            </div>
            <div className="submit fr">
              <form action="" className="clearfloat">
                <div className="dv1 fl"> <input type="submit" value="上分申请"/><i>15</i></div>
                <div className="dv2 fl"> <input type="submit" value="下分申请"/><i>8</i></div>
              </form>
            </div>
          </div>
        );
    }
}


