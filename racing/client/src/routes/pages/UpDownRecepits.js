import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {setPayment, getPayment} from '../../services/settings';
import {message} from 'antd';
import '../../assets/backend/css/upDownRecepits.css';
/**
 * Created by sven on 2017/8/4.
 */

export default class UpDownRecepits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wxPay: {type: 'WXPAY', img: ''},
      aliPay: {type: 'ALIPAY', img: ''},
      upPAY: {type: 'UPPAY'},
    }
  }

  componentDidMount() {
    getPayment({type: 'WXPAY'})
      .then(data => {
        if (data.success) {
          this.setState({
            wxPay: data.result.data,
          });
        }
      })

    getPayment({type: 'ALIPAY'})
      .then(data => {
        if (data.success) {
          this.setState({
            aliPay: data.result.data,
          });
        }
      })
    getPayment({type: 'UPPAY'})
      .then(data => {
        if (data.success) {
          this.setState({
            upPAY: data.result.data,
          });
        }
      })
  }


  selectWxImage = (event) => {
    const that = this;
    const files = event.target.files
    if (files.length !== 0) {
      const reader = new FileReader();
      if (!reader) {
        return;
      }
      ;

      if (files[0].size > 10000000) {
        message.warn("图片大小不能超过10000K");
        return;
      }

      reader.onload = function (e) {
        const config = that.state.wxPay;
        config.img = e.target.result;
        that.setState({...config});
      };
      reader.readAsDataURL(files[0]);
    }
    ;
  }

  selectAliPayImage = (event) => {
    const that = this;
    const files = event.target.files
    if (files.length !== 0) {
      const reader = new FileReader();
      if (!reader) {
        return;
      }
      ;

      if (files[0].size > 10000000) {
        message.warn("图片大小不能超过10000K");
        return;
      }

      reader.onload = function (e) {
        const config = that.state.aliPay;
        config.img = e.target.result;
        that.setState({...config});
      };
      reader.readAsDataURL(files[0]);
    }
    ;
  }


  onWxPaySubmit = (e) => {
    setPayment({...this.state.wxPay})
      .then(data => {
        message.success("上传成功")
      })
  }

  onAliPaySubmit = (e) => {
    setPayment({...this.state.aliPay})
      .then(data => {
        message.success("上传成功")
      })
  }

  onUpPaySubmit = (e) => {
    setPayment({...this.state.upPAY})
      .then(data => {
        message.success("保存成功")
      })
  }

  onCardNoChange = (event) => {
    const upPAY = this.state.upPAY;
    upPAY.cardNo = event.target.value.trim()
    this.setState({upPAY});
  }
  onCardNameChange = (event) => {
    const upPAY = this.state.upPAY;
    upPAY.cardName = event.target.value.trim()
    this.setState({upPAY});
  }

  onCardBankChange = (event) => {
    const upPAY = this.state.upPAY;
    upPAY.cardBank = event.target.value.trim()
    this.setState({upPAY});
  }

  gotoIndex = () => {
    this.props.history.push({pathname: "/index"});
  }

  render() {
    const {wxPay, aliPay, upPAY} =  this.state;

    return (
      <div className="r_aside">
        <form action="">
          <div className="receipts">
            <div className="top"><a href="#">上下分管理</a> <span> > </span> 收款账户设置</div>
            <div className="bottom">
              <div className="b_content clearfloat">
                <div className="left fl">微信二维码</div>
                <div className="right fl">
                  <input type="file" className="ip1" onChange={this.selectWxImage}/>
                  <span>{wxPay.img !== '' ? "" : "未选择任何文件"}</span>
                  <input type="submit" value="上传" className="ip2" onClick={this.onWxPaySubmit}/>
                  {/*<input type="submit" value="取消" className="ip2"/>*/}
                  <img src={wxPay.img} alt=""/>
                </div>
              </div>
              <div className="b_content clearfloat">
                <div className="left fl">支付宝二维码</div>
                <div className="right fl">
                  <input type="file" className="ip1" onChange={this.selectAliPayImage}/>
                  <span>{aliPay.img !== '' ? "" : "未选择任何文件"}</span>
                  <input type="submit" value="上传" className="ip2" onClick={this.onAliPaySubmit}/>
                  {/*<input type="submit" value="取消" className="ip2"/>*/}
                  <img src={aliPay.img} alt=""/>
                </div>
              </div>
              <div className="b_content clearfloat">
                <div className="left fl">
                  <span>银行账号</span>
                  <span>开户名</span>
                  <span>开户支行</span>
                </div>
                <div className="right fl">
                  <input type="text" className="ip3"
                         placeholder="输入银行卡号"
                         value={upPAY.cardNo}
                         onChange={this.onCardNoChange}/>
                  <input type="text" className="ip3"
                         placeholder="输入银行开户名"
                         value={upPAY.cardName}
                         onChange={this.onCardNameChange}/>
                  <input type="text" className="ip3"
                         placeholder="输入银行开户行支行"
                         value={upPAY.cardBank}
                         onChange={this.onCardBankChange}/>
                </div>
              </div>
              <div className="btn">
                <input type="submit" value="保存信息" className="ip1" onClick={this.onUpPaySubmit}/>
                <input type="submit" value="取消" className="ip2" onClick={this.gotoIndex}/>
              </div>
            </div>
          </div>
        </form>
      </div>

    );
  }
}


