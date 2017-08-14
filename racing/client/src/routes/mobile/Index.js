import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import "../../assets/mobile/css/common.css";

/**
 * Created by sven on 2017/8/2.
 */

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div>
              <video src={require("./Loader.swf")} width="320">
                Your browser does not support the video tag.
              </video>
            {/*<iframe src="https://www.apk10.com/build/flash/pk10/pk10.html" frameBorder="0" className="iframe"></iframe>*/}
            <div className="userInfo clearfix">
              <img src="images/man.png" className="fl"/>
                <form action="" className="fl">
                  <input type="text" title="" placeholder="车道/玩法/金额"/>
                    <button type="submit">发送</button>
                </form>
                <div className="fl">
                  <p>剩余积分：0.00分</p>
                  <p>线上人数：217人</p>
                </div>
            </div>
          </div>
        );
    }
}


