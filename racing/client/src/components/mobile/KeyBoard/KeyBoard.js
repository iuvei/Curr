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
    this.props.socket.on('info', info => {
      const {type, msg} = info
      if (type === "error") {
        message.error(msg)
      }
    });
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
    // console.log(key)
    // switch (key) {
    //   case  key>=0 && key <=9 :
    //     console.log('=====2====',key)
    //         break;
    //
    //   case '大','小','单','双','组','和','特','庄','闲','龙','虎','A','B','C':
    //
    //   case '/':
    //     this.setState({
    //       input: this.state.input + key
    //     });
    //     break;
    //   case '清除':
    //     this.setState({input: ''});
    //     break;
    //   case '上分':
    //   case '下分':
    //   case '发送':
    //     this.onSend();
    //     break;
    //   case '关闭':
    //     this.setState({inputShow: false});
    //     break;
    //   default:
    //     message.warn('无效输入')
    // }
  }

  onSend = () => {
    const msg = {
      user: this.props.userinfo,
      no: "20170810",
      choice: this.state.choice,
    }
    this.props.socket.emit('BET', msg);
    this.setState({inputShow: false});
    // if (RuleFactory.isMatch(this.state.choice)) {
    //   console.log("匹配")
    //   this.props.socket.emit('BET', msg);
    //   this.setState({inputShow: false});
    // }else{
    //   console.log("不")
    //}

    // const reg = /^[0-9]\/[大小单双组和特庄闲龙虎ABC]\/[1-9][0-9]{0,5}$/
    //
    // console.log(reg.test(this.state.choice))
    // if (!reg.test(this.state.choice)) {
    //   message.warn("格式错误！ 规则：车道/玩法/金额")
    //   return;
    // }
    //
    // const msg = {
    //   user: {username: 'test1'},
    //   no: "20170810",
    //   choice: this.state.choice,
    // }
    // this.props.socket.emit('BET', msg);
    // this.setState({inputShow: false});
  }

  render() {
    const {userinfo} = this.props;

    return (
      <div className="userInfo clearfix">
        <img src={userinfo.avatar} className="fl"/>
        <form action="" className="fl">
          <input type="text" title="" value={this.state.choice} placeholder="车道/玩法/金额" className="fl"/>
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


