import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/quiz.css';
import moment from 'moment';
import Paging from '../../components/paging/Paging'
import {message, Input} from 'antd';
import {addUQuiz, getAllQuizs} from '../../services/quizs';
/**
 * Created by sven on 2017/8/4.
 */

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: {data: []}
    }
  }

  componentDidMount() {
    getAllQuizs({pageSize: 10, currPage: 1})
      .then(data => {
        if (data.success) {
          this.setState({
            quizs: data.result,
          });
        }
      })
  }

  queryQuizs(currPage, pageSize) {
    getAllQuizs({pageSize, currPage, no: this.state.no, username: this.state.username})
      .then(data => {
        if (data.success) {
          this.setState({
            quizs: data.result,
          });
        }
      })
  }

  queryQuizsByNoAndUsername() {
    getAllQuizs({pageSize: 10, currPage: 1, no: this.state.no, username: this.state.username})
      .then(data => {
        if (data.success) {
          this.setState({
            quizs: data.result,
          });
        }
      })
  }

  onNoInputChange(e) {
    this.setState({
      no: e.target.value.trim(),
    })
  }

  onUsernameInputChange(e) {
    this.setState({
      username: e.target.value.trim(),
    })
  }

  render() {
    return (
      <div className="r_aside">
        <div className="quiz">
          <div className="top">竞猜记录</div>
          <div className="bottom">
            <form action="">
              <div className="search clearfloat">
                <input type="text" className="ip1"
                       placeholder="请输入开奖期号"
                       value={this.state.no || ''}
                       onChange={this.onNoInputChange.bind(this)}/>
                <input type="text" placeholder="请输入用户ID" className="ip1 ip2"
                       value={this.state.username || ''}
                       onChange={this.onUsernameInputChange.bind(this)}/>
                <input type="submit" value="搜索" className="ip3" onClick={this.queryQuizsByNoAndUsername.bind(this)}/>
              </div>
              <div className="tab">
                <table style={{border: "1"},{width: "100%"}}>
                  <tr>
                    <th width="110">期号</th>
                    <th width="180">时间</th>
                    <th width="90">头像</th>
                    <th width="150">用户名</th>
                    <th width="180">竞猜选择</th>
                    <th width="120">进项</th>
                    <th width="120">出项</th>
                    <th width="120">输赢</th>
                    {/*<th width="130">余额</th>*/}
                  </tr>
                  <tbody className="">
                  {
                    this.state.quizs.data.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td>{item.no}</td>
                          {/*<td>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>*/}
                          <td>{item.opentime}</td>
                          <td><img src={item.avatar || require("../../assets/backend/images/1.jpg")} alt=""/></td>
                          <td>{item.username}</td>
                          <td>{item.choice}</td>
                          <td>{item.income}</td>
                          <td>{item.outlay}</td>
                          <td className={item.worth > 0 ? "win" : "lose"}>{item.worth}</td>
                          {/*<td>{item.balance}</td>*/}
                        </tr>
                      );
                    })
                  }
                  </tbody>
                </table>

                <Paging
                  currPage={this.state.quizs.currPage}
                  pageSize={this.state.quizs.pageSize}
                  total={this.state.quizs.total}
                  callBack={this.queryQuizs.bind(this)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


