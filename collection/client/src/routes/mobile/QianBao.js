import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/qianbao.css';
import Footer from './comm/footer'
import {getAccount} from '../../services/mobile';
/**
 * Created by sven on 2017/8/12.
 */


const PATH_CZJL = "/my/czjl"
const PATH_WDXX = "/my/wdxx"
const PATH_JYMX = "/my/jymx"
export default class QianBao extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
  }

  render() {
    const {userinfo} = this.props.location.state;
    return (<div>
      <section className="main">
        <div className="part">
          <a href="javascript:;" className="clearfix a1">
            <span className="fl sp1">佣金转入钱包</span>
            <button>转入钱包</button>
          </a>
        </div>
        <div className="part">
          <a href="javascript:;" className="clearfix a2">
            <span className="fl sp2" >我的下线</span>
            <span className="fr" onClick={this.gotoWdxx}>共<span>0</span>人</span>
          </a>
          <a href="javascript:;" className="clearfix">
            <span className="fl sp3" >充值记录</span>
            <span className="fr" onClick={this.gotoCzjl}>查看</span>
          </a>
        </div>
        <div className="part">
          <a href="javascript:;" className="clearfix a3">
            <span className="fl sp4">交易明细</span>
            <span className="fr" onClick={this.gotoJymx}>查看</span>
          </a>
        </div>
      </section>
      <Footer/>
    </div>);
  }

  gotoCzjl = () => {
    hashHistory.push({pathname: PATH_CZJL, state: {from: "my", userinfo: this.props.location.state.userinfo}});
  }

  gotoWdxx = () => {
    hashHistory.push({pathname: PATH_WDXX, state: {from: "my", userinfo: this.props.location.state.userinfo}});
  }

  gotoJymx = () => {
    hashHistory.push({pathname: PATH_JYMX, state: {from: "my", userinfo: this.props.location.state.userinfo}});
  }
}


