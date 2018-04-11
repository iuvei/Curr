import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/pending.css';
import {setCookie} from '../../utils/cookies';

/**
 * Created by sven on 2017/8/12.
 */

const PATH_MyWorks = "/myworks";
const PATH_Typm = "/tpym";

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
    }
  }

  componentDidMount() {
    setTimeout(() => hashHistory.push({pathname: PATH_Typm}), 5000)
  }

  render() {
    return (
      <div id="admin">
        <div className="title">待审核作品</div>
        <div className="clf sort">
          <span className="current">待审核</span>
          <span>投票结果</span>
          <span>抽奖结果</span>
        </div>
        <div className="tabWrap">
          <div className="tabItem">
            <div className="pendingList">
              <div className="item clf">
                <a href="javascript:" className="fl img">
                  <img src={require("../../assets/images/img_1.png")}/>
                </a>
                <div className="fr">
                  <p>
                    <a href="javascript:" className="itemTitle">《贝加尔湖畔》</a>
                    <span className="time">2018.03.28</span>
                  </p>
                  <a href="javascript:" className="audit fr">立即审核</a>
                  <a href="javascript:" className="delBtn fr">删除</a>
                </div>
              </div>
              <div className="item clf">
                <a href="javascript:" className="fl img">
                  <img src={require("../../assets/images/img_1.png")}/>
                </a>
                <div className="fr">
                  <p>
                    <a href="javascript:" className="itemTitle">《贝加尔湖畔》</a>
                    <span className="time">2018.03.28</span>
                  </p>
                  <a href="javascript:" className="audit fr">立即审核</a>
                  <a href="javascript:" className="delBtn fr">删除</a>
                </div>
              </div>
            </div>
          </div>
          <div className="tabItem">
            <div className="pollList">
              <div className="item clf">
                <a href="javascript:" className="img">
                  <img src={require("../../assets/images/img_2.png")}/>
                    <div className="absDiv">编号：001</div>
                </a>
                <div>
                  <a href="javascript:" className="fl">《贝加尔湖畔》</a>
                  <a href="javascript:" className="fr">999</a>
                </div>
              </div>
              <div className="item clf">
                <a href="javascript:" className="img">
                  <img src={require("../../assets/images/img_2.png")}/>
                    <div className="absDiv">编号：001</div>
                </a>
                <div>
                  <a href="javascript:" className="fl">《贝加尔湖畔》</a>
                  <a href="javascript:" className="fr">999</a>
                </div>
              </div>
            </div>
          </div>
          <div className="tabItem">
            <div className="lotteryRes">
              <div className="item">
                <img src={require("../../assets/images/img_3.png")} className="prize"/>
                  <p className="prizeName">500代金券</p>
                  <div>
                    <p><span className="name">张三</span>17388298829</p>
                    <p className="addr">深圳福田区车公庙XX大厦28-1</p>
                  </div>
              </div>
              <div className="item">
                <img src={require("../../assets/images/img_3.png")} className="prize"/>
                  <p className="prizeName">小米平衡车</p>
                  <div>
                    <p><span className="name">张三</span>17388298829</p>
                    <p className="addr">深圳福田区车公庙XX大厦28-1</p>
                  </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}


