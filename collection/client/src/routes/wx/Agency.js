import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import "../../assets/wx/css/agency.css";
import {connect} from 'dva';
import QRCode from 'qrcode';
/**
 * Created by sven on 2017/8/12.
 */

class Agency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      targetUrl: '',
    }
  }

  componentDidMount() {
    this.genQRcode()
  }


  genQRcode = () => {
    const opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      rendererOpts: {
        quality: 0.3
      }
    };
    const that = this
    const {userinfo} = this.props.wx;
    const targetUrl = `http://${document.domain}/caipiao/wx.html?parent_userid=${userinfo.userid}`
    console.log('============', targetUrl)
    QRCode.toDataURL(targetUrl, opts, function (err, url) {
      if (err) throw err
      that.setState({
        img: url,
        targetUrl,
      });
    });
  }

  render() {
    return (
      <div className="w">
        <div className="receipts">
          <h2 style={{lineHeight: '22px'}} id="qyhym">请长按下方的二维码，保存到相册域转发给你的好友。</h2>
          <img id="qrcode-img" src={this.state.img} width="200px" height="200px"/>
        </div>
      </div>);
  }
}

function mapStateToProps(state) {
  return {wx: state.wx};
}

export default connect(mapStateToProps)(Agency);


