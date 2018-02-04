import React, {Component} from 'react';
import moment from 'moment';

import '../../assets/wx/css/kaijianglishi.css';

import {getChanLong} from '../../services/wxEnd';
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
      changlong: {},
    }
  }

  componentDidMount() {
    this.getChanLongByType(this.state.type, this.state.day)
  }

  getChanLongByType = (type, day) => {
    getChanLong({type, day})
      .then(data => {
        if (data.success) {
          this.setState({
            type,
            day,
            changlong: data.result.changlong.m,
          });
        } else {
          this.setState({
            type,
            day,
            changlong: {},
          });
        }
      });
  }

  onTypeChange = (type) => {
    this.getChanLongByType(type, this.state.day)
  }

  onDayChange = (e) => {
    this.getChanLongByType(this.state.type, e.target.value)
  }

  render() {
    const {days, type, changlong} = this.state;
    const sortData = [];
    Object.keys(changlong).forEach(e => {
      console.log(changlong[e])
      if (changlong[e] > 0) {
        sortData.push({key: e, value: changlong[e]});
      }
    });
    sortData.sort(up)

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
            <span>两面长龙</span>
            {/*<select onChange={this.onDayChange}>*/}
              {/*{*/}
                {/*days.map(item => {*/}
                  {/*return <option key={item} value={item}>{item}</option>;*/}
                {/*})*/}
              {/*}*/}
            {/*</select>*/}
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
                    sortData.map((item, i) => {
                      return (
                        <li className="clf" key={i}>
                          <div className="dv1">{item.key}</div>
                          <div className="dv2">{item.value}期</div>
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


function up(x, y) {
  return y.value - x.value
}


