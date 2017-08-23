import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/upDownReview.css';
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {getALlReviewUpDowns} from '../../services/updowns';
import {message} from 'antd';
/**
 * Created by sven on 2017/8/4.
 */

export default class UpDownReview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewUpdowns: {data: []},
    }
  }

  componentDidMount() {
    this.queryReviewUpdowns(1, 10);
  }

  queryReviewUpdowns(currPage, pageSize, startTime, endTime) {
    getALlReviewUpDowns({
      pageSize,
      currPage,
      startTime: startTime || '',
      endTime: endTime || '',
      nickname: this.state.nickname
    })
      .then(data => {
        if (data.success) {
          this.setState({
            reviewUpdowns: data.result,
            startTime,
            endTime,
          });
        } else {
          this.setState({
            startTime,
            endTime,
          });
        }
      })
  }

  onSearchInputChange(e) {
    this.setState({
      nickname: e.target.value.trim(),
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
        this.queryReviewUpdowns(1, 10, moment().format("YYYY-MM-DD"), moment().add(1, 'day').format("YYYY-MM-DD"));
        break;
      case "Yesterday":
        this.queryReviewUpdowns(1, 10, moment().add(-1, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        break;
      case "Week":
        this.queryReviewUpdowns(1, 10, moment().add(-7, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        break;
      case "Month":
        this.queryReviewUpdowns(1, 10, moment().add(-30, 'day').format("YYYY-MM-DD"), moment().format("YYYY-MM-DD"));
        break;
      default:
        this.queryReviewUpdowns(1, 10, this.state.startTime, this.state.endTime);
    }
  }

  render() {
    return (
      <div className="r_aside">
        <form action="">
          <div className="review">
            <div className="top">审核操作记录</div>
            <div className="bottom">
              <form action="">
                <div className="search clearfloat">
                  <input type="date" placeholder="起始时间" className="ip1 "
                         value={this.state.startTime} onChange={this.onStartTimeInputChange.bind(this)}/>
                  <input type="date" placeholder="结束时间" className="ip1 "
                         value={this.state.endTime} onChange={this.onEndTimeInputChange.bind(this)}/>
                  <input type="text" placeholder="请输入用户名" className="ip1"
                         value={this.state.nickname || ''} onChange={this.onSearchInputChange.bind(this)}/>
                  <input type="submit" value="搜索" className="ip3" onClick={() => this.searchReviewUpdowns()}/>
                  <input type="submit" value="今天" className="ip3" onClick={() => this.searchReviewUpdowns("Today")}/>
                  <input type="submit" value="昨天" className="ip3"
                         onClick={() => this.searchReviewUpdowns("Yesterday")}/>
                  <input type="submit" value="最近一周" className="ip3" onClick={() => this.searchReviewUpdowns("Week")}/>
                  <input type="submit" value="最近一月" className="ip3" onClick={() => this.searchReviewUpdowns("Month")}/>
                </div>

                <div className="tab">
                  <table style={{border: "1"},{width: "100%"}}>
                    <tr>
                      <th width="80">头像</th>
                      <th width="160">用户名</th>
                      <th width="150">上分金额</th>
                      <th width="150">下分金额</th>
                      <th width="150">操作后余额</th>
                      <th width="200">审核通过时间</th>
                      <th width="150">审核管理员</th>
                    </tr>
                    <tbody className="">
                    {
                      this.state.reviewUpdowns.data.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td><img src={item.avatar} alt=""/></td>
                            <td>{item.nickname}</td>
                            <td className={item.type ? "up" : ""}>{item.type ? item.amount : "00.00"}</td>
                            <td className={!item.type ? "down" : ""}>{!item.type ? item.amount : "00.00"}</td>
                            <td>{item.balance}</td>
                            <td>{moment(item.updateAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                            <td>{item.byWho}</td>
                          </tr>
                        );
                      })
                    }
                    </tbody>
                  </table>
                  <Paging
                    currPage={this.state.reviewUpdowns.currPage}
                    pageSize={this.state.reviewUpdowns.pageSize}
                    total={this.state.reviewUpdowns.total}
                    callBack={this.queryReviewUpdowns.bind(this)}
                  />
                </div>
              </form>
            </div>
          </div>
        </form>

      </div>
    );
  }
}


