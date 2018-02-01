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
          <h1>优惠活动</h1><span></span>
          <span>欢迎光临捷胜娱乐城，本公司优惠活动。</span><br/>
          <h2>一、新用户首充福利</h2>
          <span>新用户首次充值100元以上送18元彩金，500元以上送58元彩金，1000元以上送88元彩金，5000元以上送188元彩金，仅限于新用户首次充值，第二次充值则不送。（新用户彩金可联系客服申请，2倍打码量即可出款,未达到2倍打码量要出款将扣除赠送的彩金）</span>
          <h2>二、会员充值与投注福利</h2>
          <span>投注返水<strong style={{color: "#F00"}}>0.5%</strong>（次日12点返水到账）
</span>
          <h2>三、拉人福利</h2>
          <span>1、下级会员，您可获得下级会员投注额的<strong style={{color: "#F00"}}>0.5%</strong>返利。（应得福利于次日12点到账）。<br/>
          2、有实力者，可联系客服申请成为线上代理商。7*24小时招收实力代理！</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}

export default connect(mapStateToProps)(Discounts);


