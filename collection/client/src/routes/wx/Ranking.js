import React, {Component} from 'react';
import moment from 'moment';

import '../../assets/wx/css/kaijianglishi.css';

import {getLotterys} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/14.
 */

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    const days = [...Array(30).keys()].map(i => {
      return moment().add('days', -i).format('YYYY-MM-DD');
    });

    this.state = {
      days,
      day: moment().format('YYYY-MM-DD'),
      type: props.location.state.type || 'CQSSC',
      lotterys: [],
    }
  }

  componentDidMount() {
    this.getLotterysByType(this.state.type, this.state.day)
  }

  getLotterysByType = (type, day) => {
    getLotterys({type, day})
      .then(data => {
        if (data.success) {
          this.setState({
            type,
            day,
            lotterys: data.result.lotterys,
          });
        }
      });
  }

  onTypeChange = (type) => {
    this.getLotterysByType(type, this.state.day)
  }

  onDayChange = (e) => {
    this.getLotterysByType(this.state.type, e.target.value)
  }

  render() {
    const {days, type, lotterys} = this.state;
    return (
      <div className="w">
        <div id="betting2">
          <div className="clf top" id="btn">
            <span onClick={() => this.onTypeChange("BJPK10")}
                  className={type == "BJPK10" ? 'redBG' : ''}>北京赛车</span>
            <span onClick={() => this.onTypeChange("CQSSC")}
                  className={type == "CQSSC" ? 'redBG' : ''}>重庆时时彩</span>
            <span onClick={() => this.onTypeChange("JSK3")}
                  className={type == "JSK3" ? 'redBG' : ''}>江苏快三</span>
          </div>

          <div className="time">
            <span>两面长龙：</span>
            <select onChange={this.onDayChange}>
              {
                days.map(item => {
                  return <option key={item} value={item}>{item}</option>;
                })
              }
            </select>
          </div>
          <div id="ctb2">
            <div className="bottom">
              <div className="clf title">
                <span className="sp1">玩法</span>
                <span className="sp2">期数</span>
              </div>
              <div className="types">
                <ul className="clf">
                  {
                    lotterys.map((item, i) => {
                      return (
                      <li className="clf" key={i}>
                        <div className="dv1">{item.no}</div>
                        <div className="dv2">{item.no}</div>
                      </li>
                      );
                    })
                  }
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


