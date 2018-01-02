import React, {Component} from 'react';
import '../../assets/mobile/css/jymx.css';
import {getQuizRecords} from '../../services/mobile';
import {message} from 'antd'
/**
 * Created by sven on 2017/8/23.
 */

export default class Jymx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizs: []
    }
  }

  componentDidMount() {
    const {userinfo} = this.props.location.state;
    getQuizRecords({openid: userinfo.openid})
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            quizs: data.result.quizs,
          });
        } else {
          message.error(data.message)
        }
      })
  }

  render() {
    return (
      <div className="content">
        <table>
          <tbody>
          <tr >
            <th>开奖期号</th>
            <th>开奖时间</th>
            <th>下注金额</th>
            <th>输赢统计</th>
          </tr>
          {
            this.state.quizs.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.no}</td>
                  <td>{item.opentime}</td>
                  <td >{item.income}</td>
                  {item.worth >= 0 ? <td className="xf">{item.worth}</td> : <td className="sf">{item.worth}</td>}
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}


