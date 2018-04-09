import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/login.css';
import {setCookie} from '../../utils/cookies';
import {Toast} from 'antd-mobile';
/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks";
const PATH_Fair = "/fair";
const phoneReg = /^[1][3,4,5,7,8][0-9]{9}$/;
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    }
  }

  onPhoneChange = (e) => {
    this.setState({phone: e.target.value})
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!phoneReg.test(this.state.phone)) {
      Toast.show("请输入11位手机号码");
      return;
    }
    setCookie('userId', this.state.phone);
    hashHistory.push({pathname: PATH_MyWorks, state: {from: "login"}});
  };

  render() {
    return (
      <div id='login'>
        <div className="title"><a href="javascript:void(0)" onClick={() => this.props.history.goBack()}></a>登录</div>
        <div className="logo">
          <img src={require("../../assets/images/logo.png")} alt=""/>
          <div>地球日绘画大赛</div>
        </div>

        <div className="login">
          <form action="" onSubmit={this.onSubmit}>
            <div className="text"><span></span>
              <input type="text" placeholder="请输入手机号登录" value={this.state.phone} onChange={this.onPhoneChange}/></div>
            <input type="submit" value="登录"/>
          </form>
        </div>

        <div className="clf subtitle">
          <span className="s_left"></span> <h5>活动介绍</h5>
          <span className="s_right"></span>
          <br/>
          <a onClick={() => hashHistory.push({pathname: PATH_Fair})}>查看详情</a></div>
        <div className="content">
          <p>上传时间：4.9-4.23</p>
          <p>参与要求：没有要求，仅需您的宝宝挥洒想象力</p>
          <p>上传方式：将作品上传至h5中，并填写作品名称及小画手名字，上传作品即可得到一次抽奖机会</p>
          <p>比赛奖项： 最终10幅获奖作品将得到NAUTICAKIDS颁发的证书，并得到自己所绘制的品牌T恤 </p>
          <p>抽奖奖品：1等奖 定制环保袋<br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;2等奖 50元现金券<br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;3等奖 30元现金券</p>
          <p>比赛结果：我们将在5.4结束所有作品的评审，选取10幅获奖作品，著名设计师进行设计后，投入批量生产，在NAUTICAKIDS官方TMALL店铺中销售，</p>
          <p>详情点击>><a href="https://nauticatz.m.tmall.com">nauticatz.tmall.com</a></p>
        </div>
      </div>
    );
  }
}


