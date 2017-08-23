import React, {Component} from 'react';
import '../../assets/mobile/css/jymx.css';
import {addDownReq, getAccount} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */

export default class Jymx extends Component {
  constructor(props) {
    super(props);
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


