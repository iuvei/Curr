import React, {Component} from 'react';
import moment from 'moment';

import '../../assets/wx/css/kaijianglishi.css';

import {getLotterys} from '../../services/wxEnd';
/**
 * Created by sven on 2018/1/14.
 */

export default class KaiJiangLiShi extends Component {
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
            <span>开奖历史：</span>
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
                <span className="sp1">期数</span>
                <span className="sp2">开奖号码</span>
              </div>
              <div className="types">
                <ul className="clf">
                  {
                    lotterys.map((item, i) => {
                      return (
                        <li className="clf" key={i}>
                          <div className="dv1">{item.no}</div>
                          <div className="dv2">
                            {
                              item.code.split(",").map(e => {
                                return <img key={e} src={require(`../../assets/wx/images/h-${e}.png`)}/>;
                              })
                            }
                          </div>
                          <div className="dv3"></div>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>

            </div>
            {/*<!--重庆时时彩-->*/}
            <div className="bottom hidden">
              <div className="clf title">
                <span className="sp1">期数</span>
                <span className="sp2">开奖号码</span>
                <span className="sp3">和值</span>
              </div>
              <div className="types">
                <ul>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                </ul>
              </div>

            </div>
            {/*<!--2-->*/}
            <div className="bottom hidden">
              <div className="clf title">
                <span className="sp1">期数</span>
                <span className="sp2">开奖号码</span>
                <span className="sp3">和值</span>

              </div>
              <div className="types">
                <ul>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                  <li className="clf">
                    <div className="dv1">062</div>
                    <div className="dv2">06-04-04-07-05</div>
                    <div className="dv3">26 总和大 总和双 龙</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


