import React, {Component} from 'react';
import {connect} from 'dva';
import '../../assets/wx/css/discounts.css';
/**
 * Created by sven on 2018/1/7.
 */

class Discounts extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
  }

  render() {
    const {userinfo} = this.props.wx;
    return (
      <div className="w">
        <div className="receipts">
          <h1>2018春节特惠</h1>
          <span>至尊宝娱乐城在回馈老会员的同时，也欢迎更多的新会员加入我们；每日首充赠送活动彩金2018年01月28日08:00起（结束时间另行通知）</span><br/>
          <h2>活动内容</h2>
          <span>&emsp;&emsp;会员在2018年01月28日08:00起每日首充入款彩金，请在未投注前24小时内进行申请。审核期间请勿下注，审核通过后财务会将相应彩金添加到您的游戏账号上。<br/>
          <b>1、每日首充入款彩金</b><br/>
          申请格式：<br/>
          账号：xxxx 姓名：xxxx 手机：xxxx QQ或微信：xxxx 充值金额： xxxx</span>
          <h2>活动规则 <small>（早上07:00-次日06:59为一天）</small></h2>
          <span>
              每日首充<strong style={{color: "#F00"}}>1000元赠送</strong>彩金<strong style={{color: "#F00"}}>38元</strong><br/>
              每日首充<strong style={{color: "#F00"}}>5000元赠送</strong>彩金<strong style={{color: "#F00"}}>88元</strong><br/>
              每日首充<strong style={{color: "#F00"}}>10000元赠送</strong>彩金<strong style={{color: "#F00"}}>188元</strong><br/>
              每日首充<strong style={{color: "#F00"}}>50000元赠送</strong>彩金<strong style={{color: "#F00"}}>888元</strong><br/>
              每日首充<strong style={{color: "#F00"}}>50000元赠送</strong>彩金<strong style={{color: "#F00"}}>888元</strong><br/>
              每日首充<strong style={{color: "#F00"}}>200000元赠送</strong>彩金<strong style={{color: "#F00"}}>2888元</strong><br/>
              每日首充<strong style={{color: "#F00"}}>500000元赠送</strong>彩金<strong style={{color: "#F00"}}>5888元</strong><br/>
              （首充申请，请在充值未投注之前申请，投注后申请无效 当作放弃）<br/>
              <strong style={{color: "#F00"}}>附言：充值本金+赠送彩金只需1倍流水即可提现，不限次数提款。</strong><br/>
          </span>
          <h2>活动要求</h2>
          <span style={{display:'block',width:'100%',textAlign:'center'}}>申请每日首充彩金请添加微信专员：fengkaixiaofang</span>
            <img src={require("../../assets/wx/images/qrcode2.jpg")} className="qrcode"/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}

export default connect(mapStateToProps)(Discounts);


