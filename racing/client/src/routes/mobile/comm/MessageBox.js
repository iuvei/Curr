import React, {Component} from 'react';
import moment from 'moment';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {getAllMessages, getCustomerImg} from '../../../services/mobile';
/**
 * Created by sven on 2017/8/17.
 */
const PATH_AGENCY = "agency"
const PATH_ZOUSHI = "zoushi"
const PATH_HOWTOPLAY = "howtoplay"
const PATH_QIANBAO = "/my/qianbao"
const PATH_SHANGFEN = "/my/shangfen"
const PATH_XIAFEN = "/my/xiafen"
const PATH_INDEX = "index"
export default class  extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      config: {},
    }
  }

  componentWillReceiveProps(nextProps) {
    const {message} = nextProps;
    if (Object.keys(message).length !== 0) {
      this.setState({
        messages: [message].concat(this.state.messages)
      })
    }
  }

  componentDidMount() {
    //getAllMessages({no: this.props.no})
    getAllMessages()
      .then(data => {
        if (data.success) {
          this.setState({
            messages: data.result.data,
          });
        } else {
          this.setState({})
        }
      })

    this.props.socket.on('bet-msg', msg => {
        this.setState({
          messages: [msg].concat(this.state.messages),
        });
      }
    );
  }


  getCustomerService = () => {
    getCustomerImg()
      .then(data => {
        if (data.success) {
          this.setState({
            config: data.result.data.config,
          });
        } else {
          this.setState({})
        }
      })
  }


  render() {
    return (
      <div className="clearfix">
        <div className="leftMenu fl">
          <a href="javascript:;" onClick={this.gotoShangfen}><span>上分</span></a>
          <a href="javascript:;" onClick={this.gotoIndex}><span>首页</span></a>
          <a href="javascript:;" id="popupBtn" onClick={this.getCustomerService}><span>客服</span></a>
          <a href="javascript:;" onClick={this.gotoQianBao}><span>钱包</span></a>
          <a href="javascript:;" onClick={this.gotoZoushi}><span>开奖</span></a>
          {/*<a href="javascript:;" onClick={this.gotoDetail}><span>明细</span></a>*/}
          <a href="javascript:;" onClick={this.gotoHowToPaly}><span>玩法</span></a>
          <a href="javascript:;" onClick={this.gotoAgency}><span>代理</span></a>
          <a href="javascript:;" onClick={this.gotoXiafen}><span>下分</span></a>
        </div>
        <div className="rightMessage fr">
          {

            this.state.messages.map((item, i) => {
              return (
                <div key={i}
                     className={item.from === 2 ? "messageItem manageMessage clearfix" : "messageItem userMessage clearfix"}>
                  <img src={item.avatar} className="fl"/>
                  <div className="fl">
                    <p className="userAndTime">{item.nickname}
                      <span> {moment(item.createdAt).format('HH:mm:ss')}</span></p>
                    <div className="message fl">{item.choice}</div>
                  </div>
                </div>
              );
            })
          }
        </div>
        <div className="layer" id="servicePopup">
          <div className="servicePopup">
            <img src={this.state.config.service}/>
            <a href="javascript:;" className="closeBtn"></a>
          </div>
        </div>
      </div>
    );
  }

  gotoIndex = () => {
    hashHistory.push({pathname: PATH_INDEX, state: {from: "index", userinfo: this.props.userinfo}});
  }

  gotoShangfen = () => {
    hashHistory.push({pathname: PATH_SHANGFEN, state: {from: "index", userinfo: this.props.userinfo}});
  }
  gotoXiafen = () => {
    hashHistory.push({pathname: PATH_XIAFEN, state: {from: "index", userinfo: this.props.userinfo}});
  }

  gotoQianBao = () => {
    hashHistory.push({pathname: PATH_QIANBAO, state: {from: "index", userinfo: this.props.userinfo}});
  }

  gotoAgency = () => {
    hashHistory.push({pathname: PATH_AGENCY, state: {from: "index", userinfo: this.props.userinfo}});
  }

  gotoZoushi = () => {
    hashHistory.push({pathname: PATH_ZOUSHI, state: {from: "index"}});
  }

  gotoHowToPaly = () => {
    hashHistory.push({pathname: PATH_HOWTOPLAY, state: {from: "index"}});
  }
}


