import React, {Component} from 'react';
import '../../assets/wx/css/xiazhujilu.css';
import moment from 'moment';
import {getCookie} from '../../utils/cookies';
import {getQuizRecords} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/7.
 */

export default class XiaZhuJiLu extends Component {
  constructor(props) {
    super(props);
    const days = [...Array(30).keys()].map(i => {
      return moment().add('days', -i).format('YYYY-MM-DD');
    });
    this.state = {
      days,
      day: moment().format('YYYY-MM-DD'),
      records: [],
    }
  }

  componentDidMount() {
    this.getQuizRecordsByDay()
  }

  getQuizRecordsByDay = (day) => {
    getQuizRecords({userid: getCookie("userid"), day})
      .then(data => {
        if (data.success) {
          this.setState({
            day,
            records: data.result.quizs,
          });
        }
      });
  }

  changeDay = (e) => {
    this.getQuizRecordsByDay(e.target.value)
  }

  render() {
    const {days, records} = this.state;
    return (
      <div className="w">
        <div className="clf time">
          <span className="fl title">交易日期：</span>
          <div className="fl choose">
            <select onChange={this.changeDay}>
              {
                days.map(item => {
                  return <option key={item} value={item}>{item}</option>;
                })
              }
            </select>
          </div>
        </div>
        <div className="dbox">
          <div className="clf title">
            <span>游戏类型</span>
            <span>期号</span>
            <span>下注金额</span>
            <span>结果</span>
          </div>
          <div className="types">
            <ul>
              {
                records.map((item, i) => {
                  const {game, no, income, worth} = item;
                  return (<li className="clf" key={i}>
                    <span>{game == "CQSSC" ? "重庆时时彩" : game == "BJPK10" ? "北京赛车" : game == "JSK3" ? "江苏快3" : ""}</span>
                    <span>{no}</span>
                    <span>{income}</span>
                    <span>{worth}</span>
                  </li>);
                })
              }
              {/*<li className="clf">*/}
              {/*<span>总计</span>*/}
              {/*<span>0</span>*/}
              {/*<span>0</span>*/}
              {/*<span>0</span>*/}
              {/*</li>*/}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}


