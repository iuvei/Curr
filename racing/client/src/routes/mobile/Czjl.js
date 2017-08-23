import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/czjl.css';
import {addDownReq, getAccount} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */

export default class Czjl extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content">
        <table>
          <tbody>
          <tr >
            <th>充值时间</th>
            <th>充值金额</th>
            <th>上下分类型</th>
            <th>状态</th>
          </tr>
          <tr>
            <td>2017-02-02</td>
            <td>100.00</td>
            <td className="sf">上分</td>
            <td className="tg">通过</td>
          </tr>
          <tr>
            <td>2017-02-03</td>
            <td>-100.00</td>
            <td className="xf">下分</td>
            <td className="wtg">未通过</td>
          </tr>
          <tr>
            <td>2017-02-04</td>
            <td>-100.00</td>
            <td className="xf">下分</td>
            <td className="shz">审核中</td>
          </tr>
          </tbody>
        </table>
      </div>

    );
  }
}


