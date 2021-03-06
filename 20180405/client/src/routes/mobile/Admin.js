import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/pending.css';
import {setCookie} from '../../utils/cookies';
import {Modal, Toast} from 'antd-mobile';
const prompt = Modal.prompt;
import {getZuoPins, deleteZuoPins, putZuoPinongguo, getAllLotteryResult} from '../../services/mobile';

/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks";
const PATH_Typm = "/tpym";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: '1',
      zuopins: [],
      lotterys: [],
    }
  }

  componentDidMount() {
    // prompt(
    //   'Password',
    //   'Password Message',
    //   password => console.log(`password: ${password}`),
    //   'secure-text',
    // )
    this.getZPs('');
  }

  getZPs = () => {
    getZuoPins({sorted: '', status: 'neTrue'}).then(data => {
      if (data !== undefined) {
        this.setState({zuopins: data.zps});
      }
    })
  };

  deleteZp = (id) => {
    deleteZuoPins({id}).then(data => {
      if (data !== undefined) {
        Toast.show("删除成功")
        this.getZPs()
      }
    })
  }

  tongGuo = (id) => {
    putZuoPinongguo({id}).then(data => {
      if (data !== undefined) {
        Toast.show("审核通过")
        this.getZPs()
      }
    })
  }

  shenhe = () => {
    this.setState({curr: '1'})
    this.getZPs()
  }

  touPiaoResult = () => {
    this.setState({curr: '2'});
    getZuoPins({sorted: 'stars', status: true}).then(data => {
      if (data !== undefined) {
        this.setState({zuopins: data.zps});
      }
    })
  }

  choujiangResult = () => {
    this.setState({curr: '3'})
    getAllLotteryResult().then(data => {
      if (data !== undefined) {
        this.setState({lotterys: data});
      }
    })
  }

  render() {
    const {zuopins, curr, lotterys} = this.state;
    console.log(lotterys)
    return (
      <div id="admin">
        <div className="title">待审核作品</div>
        <div className="clf sort">
          <span className={curr == "1" ? "current" : ""} onClick={this.shenhe}>待审核</span>
          <span className={curr == "2" ? "current" : ""} onClick={this.touPiaoResult}>投票结果</span>
          <span className={curr == "3" ? "current" : ""} onClick={this.choujiangResult}>抽奖结果</span>
        </div>
        <div className="tabWrap">
          <div className="tabItem" style={curr == "1" ? {display: 'block'} : {display: 'none'}}>
            <div className="pendingList">
              {
                zuopins.map((e, i) => {
                  return (
                    <div className="item clf" key={i}>
                      <a href="javascript:" className="fl img">
                        <img src={e.images[0]}/>
                      </a>
                      <div className="fr">
                        <p>
                          <a href="javascript:" className="itemTitle">《{e.zpName}》</a>
                          <span className="time">{e.createAt}</span>
                        </p>
                        {/*<a href="javascript:" className="audit fr" onClick={() => this.tongGuo(e.id)}>立即审核</a>*/}
                        <a href="javascript:" className="delBtn fr" onClick={() => this.deleteZp(e.id)}>删除</a>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>


          <div className="tabItem" style={curr == "2" ? {display: 'block'} : {display: 'none'}}>
            <div className="pollList">
              {
                zuopins.map((e, i) => {
                  return (
                    <div className="item clf" key={i}>
                      <a href="javascript:" className="img">
                        <img src={e.images[0]}/>
                        <div className="absDiv">编号：{e.num}</div>
                      </a>
                      <div>
                        <a href="javascript:" className="fl">《{e.zpName}》</a>
                        <a href="javascript:" className="fr">{e.stars}</a>
                      </div>
                    </div>);
                })
              }
            </div>
          </div>
          <div className="tabItem" style={curr == "3" ? {display: 'block'} : {display: 'none'}}>
            <div className="lotteryRes">
              {
                lotterys.map((e, i) => {
                  return (
                    <div className="item" key={i}>
                      <img src={require("../../assets/images/img_lotteryResult_1.png")} className="prize"/>
                      <p className="prizeName">袋子</p>
                      <div>
                        <p><span className="name">{e.name}</span>{e.phone}</p>
                        <p className="addr">地址：{e.addr}</p>
                      </div>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


