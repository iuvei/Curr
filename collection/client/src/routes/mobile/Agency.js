import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import "../../assets/mobile/css/agency.css";
import Footer from './comm/footer';
import QRCode from 'qrcode';
/**
 * Created by sven on 2017/8/12.
 */

export default class  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      targetUrl:'',
    }
  }

  componentDidMount() {
    this.genQRcode()
  }


  genQRcode =() => {
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    };
    const that = this
    const {userinfo} = this.props.location.state;
    const targetUrl = `http://${document.domain}/mobile.html?parent_openid=${userinfo.openid}`
    console.log('============', targetUrl)
    QRCode.toDataURL(targetUrl, opts, function (err, url) {
      if (err) throw err
      that.setState({
        img : url,
        targetUrl,
      });
    });
  }

  render() {
    return (<div className="agency">
      <div className="qrcodepic"><img src={this.state.img}/></div>
      <div className="item">
        <div>
          <p className="title">复制链接：</p>
          <div className="cont">{this.state.targetUrl}</div>
        </div>
      </div>
      <div className="item">
        <div>
          <p className="title">转发小提示：</p>
          <div className="cont">
            <p>方法1：长按二维码，保存到手机发送给朋友！</p>
            <p>方法2：长按链接全选复制黏贴给朋友！</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>);
  }
}


