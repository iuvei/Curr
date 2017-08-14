import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/statUsers.css'
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {getAllUserStats} from '../../services/stat';
/**
 * Created by sven on 2017/8/4.
 */

export default class StatUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: {data: []},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.state.type !== this.state.type) {
      this.queryUpdowns(1, 10, '', '', nextProps.location.state.type);
    }
  }

  componentDidMount() {
    this.queryStatsRecords(1, 10, '', '', this.props.location.state.type);
  }

  queryStatsRecords(currPage, pageSize, startTime, endTime, type) {
    type = type === undefined ? this.state.type : type
    getAllUserStats({
      pageSize,
      currPage,
      startTime: startTime || '',
      endTime: endTime || ''
    })
      .then(data => {
        if (data.success) {
          this.setState({
            stats: data.result,
            startTime,
            endTime,
            type,
          });
        } else {
          this.setState({
            startTime,
            endTime,
            type,
          });
        }
      })
  }

  onStartTimeInputChange(e) {
    this.setState({
      startTime: e.target.value.trim(),
    })
  }

  onEndTimeInputChange(e) {
    this.setState({
      endTime: e.target.value.trim(),
    })
  }

  searchReviewUpdowns = (duration) => {
    switch (duration) {
      case "Today":
        this.queryStatsRecords(1, 10, moment().format("YYYY-MM-DD"), moment().add(1, 'day').format("YYYY-MM-DD"));
        break;
      case "Yesterday":
        this.queryStatsRecords(1, 10, moment().add(-1, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        break;
      case "Week":
        this.queryStatsRecords(1, 10, moment().add(-7, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        break;
      case "Month":
        this.queryStatsRecords(1, 10, moment().add(-30, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        break;
      default:
        this.queryStatsRecords(1, 10, this.state.startTime, this.state.endTime);
    }
  }


  render() {
    console.log('===', this.state.type)
    return (
      <div className="r_aside">
        <div className="position">
          <span>输赢统计</span>
          &nbsp;&gt;&nbsp;
          <span>客户输赢</span>
        </div>
        <section className="mainBox clearfloat">
          <div className="search">
            <div className="date fl">
              <input type="date" value={this.state.startTime} onChange={this.onStartTimeInputChange.bind(this)}/></div>
            <div className="date fl">
              <input type="date" value={this.state.endTime} onChange={this.onEndTimeInputChange.bind(this)}/></div>
            <button type="button" onClick={() => this.searchReviewUpdowns()}>搜索</button>
            <button type="button" onClick={() => this.searchReviewUpdowns("Today")}>今天</button>
            <button type="button" onClick={() => this.searchReviewUpdowns("Yesterday")}>昨天</button>
            <button type="button" onClick={() => this.searchReviewUpdowns("Week")}>最近一周</button>
            <button type="button" onClick={() => this.searchReviewUpdowns("Month")}>最近一月</button>
          </div>
          <table>
            <thead>
            <tr>
              <th width="80">头像</th>
              <th width="160">用户名</th>
              <th width="150">客户进项流水</th>
              <th width="150">客户出项流水</th>
              <th width="360">客户输赢统计</th>
            </tr>
            </thead>
            <tbody>

            {
              this.state.stats.data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td><img src={item.avatar} alt=""/></td>
                    <td>{item.username}</td>
                    <td>{item.income}</td>
                    <td>{item.outlay}</td>
                    <td>{item.worth}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
          <Paging
            currPage={this.state.stats.currPage}
            pageSize={this.state.stats.pageSize}
            total={this.state.stats.total}
            callBack={this.queryStatsRecords.bind(this)}
          />
        </section>
      </div>

    );
  }
}


