import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/fairDetail.css';
import {setCookie} from '../../utils/cookies';
import {Toast} from 'antd-mobile';
/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks";

export default class FairDetail extends Component {
  constructor(props) {
    //var str = '2018-04-22 9:00:00';
    var end = new Date(2018, 3, 22, 9, 0, 0)
    var now = new Date();
    super(props);
    this.state = {
      phone: '',
      ticker: null,
      time: (end.getTime() - now.getTime()) / 1000,
    }
  }

  componentDidMount() {
    const ticker = setInterval(this.tickerTicker, 1000);
    this.setState({ticker});
  }

  tickerTicker = () => {
    console.log(this.state.time)
    this.setState({time: this.state.time - 1})
    if (this.state.time <= 0) {
      clearInterval(this.state.ticker);
    }
  }

  paddingZero = (n) => {
    // Toast.show(n)
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  render() {
    const {time} = this.state;
    return (
      <div id='fairDetail'>
        <div className="topbar">
          <h3>活动介绍</h3>
          <a href="javascript:" className="fl" onClick={() => this.props.history.goBack()}><img
            src={require("../../assets/images/icon_arrows_left.png")}/></a>
        </div>
        <div className="main1">
          <img src={require("../../assets/images/img_fairDetail_1.png")}/>
          <p>世界地球日（Earth
            Day）即每年的4月22日，是一个专为世界环境保护而设立的节日，旨在提高民众对于现有环境问题的意识，并动员民众参与到环保运动中，通过绿色低碳生活，改善地球的整体环境。地球日由盖洛德·尼尔森和丹尼斯·海斯于1970年发起。</p>
          <img src={require("../../assets/images/img_fairDetail_2.png")}/>
          <p>Marc
            Brody，总部在香港的非政府组织“朋友熊猫山创始人，”曾在一个范围广泛的环境教育和环保项目在中国25年。2000，布洛迪先生开始致力于保护大熊猫卧龙自然保护区–中国领先的家庭大熊猫和一个全球重要的世界遗产地靠近成都，四川。</p>
          <img src={require("../../assets/images/img_fairDetail_3.png")}/>
          <div>上传 时间：4.9-4.23</div>
          <div>参与要求：没有要求，仅需您的宝宝挥洒想象力</div>
          <div>上传方式：将作品上传至h5中，并填写作品名称及小画手名字，上传作品即可得到一次抽奖机会</div>
          <div>比赛奖项： 最终10幅获奖作品将得到NAUTICAKIDS颁发的证书，并得到自己所绘制的品牌T恤</div>
          <div>抽奖奖品：1等奖 定制环保袋 <br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;2等奖 50元现金券<br/>
            &emsp;&emsp;&emsp;&emsp;&emsp;3等奖 30元现金券
          </div>
          <div>比赛结果：我们将在5.4结束所有作品的评审，选取10幅获奖作品，著名设计师进行设计后，投入批量生产，在NAUTICAKIDS官方TMALL店铺中销售，详情点击>> <a href="javascript:">nauticatz.tmall.com</a>
          </div>
        </div>
        <div className="live">
          <div className="countDown">
            <span>{this.paddingZero(Math.floor(time / 60 / 60 / 24))}</span>天
            <span>{this.paddingZero(Math.floor((time / 60 / 60) % 24))}</span>时
            <span>{this.paddingZero(Math.floor((time / 60) % 60))}</span>分
            <span>{this.paddingZero(Math.floor(time % 60))}</span>秒
            <img src={require("../../assets/images/img_live.png")} className="absImg"/>
          </div>
          <div className="liveList clf">
            <a href="javascript:" className="item">
              <img src={require("../../assets/images/img_live_1.png")}/>
            </a>
            <a href="https://liveplatform.taobao.com/live/live_detail.htm?id=200600896354&openHlvPush=true" className="item">
              <img src={require("../../assets/images/img_live_2.png")}/>
            </a>
          </div>
        </div>
      </div>
    );
  }
}


