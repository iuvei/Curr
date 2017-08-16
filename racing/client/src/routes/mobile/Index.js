import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import "../../assets/mobile/css/common.css";

/**
 * Created by sven on 2017/8/2.
 */

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputShow: false,
    }
  }

  trigger = () => {
    this.setState({
      inputShow: !this.state.inputShow,
    })
  }

  render() {
    return (
      <div>
        <video src={require("./Loader.swf")} width="320">
          Your browser does not support the video tag.
        </video>
        {/*<iframe src="https://www.apk10.com/build/flash/pk10/pk10.html" frameBorder="0" className="iframe"></iframe>*/}
        <div className="text">
          <p>剩余积分：0.00分</p>
          <p>线上人数：217人</p>
        </div>
        <div className="userInfo clearfix">
          <img src="images/man.png" className="fl"/>
          <form action="" className="fl">
            <input type="text" title="" placeholder="车道/玩法/金额" className="fl"/>
            <a className="fl" onClick={this.trigger}></a>
            <button type="submit" className="fl">发送</button>
          </form>
          <div className="key" id="mydiv" style={this.state.inputShow ? {display: 'block'} : {display: 'none'}}>
            <div className="board clearfix">
              <a href="#">1</a>
              <a href="#">2</a>
              <a href="#">3</a>
              <a href="#">4</a>
              <a href="#">5</a>
              <a href="#">/</a>
              <a href="#">-</a>

              <a href="#">6</a>
              <a href="#">7</a>
              <a href="#">8</a>
              <a href="#">9</a>
              <a href="#">0</a>
              <a href="#">/</a>
              <a href="#">.</a>

              <a href="#">大</a>
              <a href="#">小</a>
              <a href="#">单</a>
              <a href="#">双</a>
              <a href="#">组</a>
              <a href="#">和</a>
              <a href="#">特</a>

              <a href="#">庄</a>
              <a href="#">闲</a>
              <a href="#">龙</a>
              <a href="#">虎</a>
              <a href="#">A</a>
              <a href="#">B</a>
              <a href="#">C</a>
            </div>

            <div className="btn clearfix">
              <a href="#" className="a1">清除</a>
              <a href="#" className="a2">上分</a>
              <a href="#" className="a3">发送</a>
              <a href="#" className="a4">下分</a>
              <a href="#" className="a5">关闭</a>
            </div>

          </div>
        </div>
      </div>
    );
  }
}


