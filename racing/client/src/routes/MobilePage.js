import React, {Component} from 'react';
import { connect } from 'dva';
import io from 'socket.io-client';
import '../assets/backend/css/common.css';
const socket = io('', {path: '/ws/chat'});

const PATH_AGENCY = "agency"
const PATH_DETAIL = "detail"
const PATH_HOWTOPLAY = "howtoplay"
const PATH_QIANBAO = "qianbao"
const PATH_SHANGFEN = "shangfen"
const PATH_XIAFEN = "xiafen"
const PATH_INDEX = "index"

class MobilePage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.emit('chat mounted', "--");
  }

   handleOk = (data) => {
    dispatch({
      type: 'app/sign_in',
      payload: data,
    })
  }

  render () {

    return (
      <div>
        {this.props.children}
        <div className="clearfix">
          <div className="leftMenu fl">
            <a href="javascript:;" onClick={this.gotoShangfen}><span>上分</span></a>
            <a href="javascript:;" onClick={this.gotoIndex}><span>首页</span></a>
            <a href="javascript:;" id="popupBtn"><span>客服</span></a>
            <a href="javascript:;" onClick={this.gotoQianBao}><span>钱包</span></a>
            <a href="javascript:;"><span>走势</span></a>
            <a href="javascript:;" onClick={this.gotoDetail}><span>明细</span></a>
            <a href="javascript:;" onClick={this.gotoHowToPaly}><span>玩法</span></a>
            <a href="javascript:;" onClick={this.gotoAgency}><span>代理</span></a>
            <a href="javascript:;" onClick={this.gotoXiafen}><span>下分</span></a>
          </div>
          <div className="rightMessage fr">
            <div className="messageItem manageMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">管理员 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字这里是发布的文字这里是发布的文字这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字这里是发布的文字这里是发布的文字这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字这里是发布的文字这里是发布的文字这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字这里是发布的文字这里是发布的文字这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字这里是发布的文字这里是发布的文字这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字这里是发布的文字这里是发布的文字这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
            <div className="messageItem userMessage clearfix">
              <img src="images/man.png" className="fl"/>
              <div className="fl">
                <p className="userAndTime">用户名用户名 <span>2017-07-25 16:34:45</span></p>
                <div className="message fl">这里是发布的文字</div>
              </div>
            </div>
          </div>
        </div>
        <div className="layer" id="servicePopup">
          <div className="servicePopup">
            <img src="images/servicePopup.jpg"/>
            <a href="javascript:;" className="closeBtn"></a>
          </div>
        </div>
      </div>
    );
  }

  gotoIndex = () => {
    this.props.history.push({pathname: PATH_INDEX, state: {from: "index"}});
  }

  gotoShangfen = () => {
    this.props.history.push({pathname: PATH_SHANGFEN, state: {from: "index"}});
  }
  gotoXiafen = () => {
    this.props.history.push({pathname: PATH_XIAFEN, state: {from: "index"}});
  }

  gotoQianBao = () => {
    this.props.history.push({pathname: PATH_QIANBAO, state: {from: "index"}});
  }

  gotoAgency = () => {
    this.props.history.push({pathname: PATH_AGENCY, state: {from: "index"}});
  }

  gotoDetail = () => {
    this.props.history.push({pathname: PATH_DETAIL, state: {from: "index"}});
  }

  gotoHowToPaly = () => {
    this.props.history.push({pathname: PATH_HOWTOPLAY, state: {from: "index"}});
  }
}

function mapStateToProps(state) {
  return {mobile: state.mobile};
}


export default connect(mapStateToProps)(MobilePage);
