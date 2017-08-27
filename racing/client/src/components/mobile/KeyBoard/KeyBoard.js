import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {message} from 'antd'
import '../../../assets/backend/css/common.css';
import {RuleFactory} from '../../../utils/rules'
/**
 * Created by sven on 2017/8/16.
 */

export default class KeyBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputShow: false,
      choice: "",
    }
  }

  componentDidMount() {
    // this.props.socket.on('info', info => {
    //   const {type, msg} = info
    //   if (type === "error") {
    //     message.error(msg)
    //   }
    // });
  }

  trigger = () => {
    this.setState({
      inputShow: !this.state.inputShow,
    })
  }

  keyDown = (key) => {
    this.setState({
      choice: this.state.choice + key
    });
  }

  onSend = () => {
    const {userinfo} = this.props;
    const choice = this.state.choice;
    if (!RuleFactory.isMatch(choice)) {
      const message = {
        from: 2, nickname: "客服", choice: `@${userinfo.nickname}\n格式错误: ${choice}`,
        avatar: require("../../../assets/mobile/images/manageIcon.png")
      }

      this.props.alterMessage(message);
      this.setState({inputShow: false});
      return;
    }

    const msg = {
      user: this.props.userinfo,
      no: this.props.no,
      choice: this.state.choice,
    }

    this.props.socket.emit('BET', msg);
    this.setState({inputShow: false, choice: ""});
  }

  render() {
    const {userinfo} = this.props;

    return (
      <div className="userInfo clearfix">
        <img src={userinfo.avatar} className="fl"/>
        <form action="" className="fl">
          <input type="text" title="" value={this.state.choice} placeholder="名次/号码/金额" className="fl"/>
          <a className="fl" onClick={this.trigger}></a>
          <button type="submit" className="fl" onClick={() => this.onSend()}>发送</button>
        </form>
        <div className="key" id="mydiv" style={this.state.inputShow ? {display: 'block'} : {display: 'none'}}>
          <div className="board clearfix">
            <a href="javascript:void(0)" onClick={() => this.keyDown('1')}>1</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('2')}>2</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('3')}>3</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('4')}>4</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('5')}>5</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('/')}>/</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('-')}>-</a>

            <a href="javascript:void(0)" onClick={() => this.keyDown('6')}>6</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('7')}>7</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('8')}>8</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('9')}>9</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('0')}>0</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('/')}>/</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('.')}>.</a>

            <a href="javascript:void(0)" onClick={() => this.keyDown('大')}>大</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('小')}>小</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('单')}>单</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('双')}>双</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('组')}>组</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('和')}>和</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('特')}>特</a>

            <a href="javascript:void(0)" onClick={() => this.keyDown('庄')}>庄</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('闲')}>闲</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('龙')}>龙</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('虎')}>虎</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('A')}>A</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('B')}>B</a>
            <a href="javascript:void(0)" onClick={() => this.keyDown('C')}>C</a>
          </div>

          <div className="btn clearfix">
            <a href="javascript:void(0)" onClick={() => this.setState({choice: ''})} className="a1">清除</a>
            <a href="javascript:void(0)" onClick={() => this.onSend()} className="a3">发送</a>
            <a href="javascript:void(0)" onClick={() => this.setState({inputShow: false})} className="a5">关闭</a>
          </div>
        </div>
      </div>
    );
  }
}


