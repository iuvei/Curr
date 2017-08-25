import React, {Component} from 'react';
import '../../assets/mobile/css/jymx.css';
import {addDownReq, getRechargeRecords} from '../../services/mobile';
import moment from 'moment';
import {message} from 'antd'
/**
 * Created by sven on 2017/8/23.
 */

export default class Jymx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updowns: []
    }
  }

  componentDidMount() {
    const {userinfo} = this.props.location.state;
    getRechargeRecords({openid: userinfo.openid})
      .then(data => {
        console.log(data)
        if (data.success) {
          this.setState({
            quits: data.result.upDowns,
          });
        }else{
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
          <tr>
            <td>0016</td>
            <td>2017-02-02</td>
            <td >100</td>
            <td className="sf">20</td>
          </tr>
          <tr>
            <td>0018</td>
            <td>2017-02-02</td>
            <td >50</td>
            <td className="xf">-10</td>
          </tr>
          </tbody>

        </table>
      </div>

    );
  }
}


