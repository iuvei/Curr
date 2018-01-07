import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/openOrder.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class OpenRecord extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="openOrder">
          <h1>未结算注单</h1>
          <div className="mainDiv">
            <div className="tabOption clf">
              <span className="curTab">彩票</span>
              <span>北京赛车</span>
            </div>
            <div className="tabDiv">
              <div className="tabCont">
                <table cellSpacing="0" cellPadding="0">
                  <tbody>
                  <tr>
                    <td>时间/单号</td>
                    <td>详细</td>
                    <td>金额</td>
                    <td>可赢</td>
                  </tr>
                  <tr>
                    <td colSpan="4" style={{textAlign: 'center'}}>暂时没有下注。</td>
                  </tr>
                  <tr>
                    <td colSpan="4">
                      <div className="paging clf">
                        <a className="cur">1</a>
                        <span>1/1</span>
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div className="tabCont">2222</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


