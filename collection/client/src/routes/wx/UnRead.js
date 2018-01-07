import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/unread.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class UnRead extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="w">
        <div className="unread">
          <h1>未读信息</h1>
          <div className="mainDiv">
            <div className="tip">若数据未完全显示，请左右滑动查看</div>
            <table cellSpacing="0" cellPadding="0">
              <tbody>
              <tr>
                <td><b>标题</b></td>
                <td><b>时间</b></td>
              </tr>
              <tr>
                <td><a href="javascript:;" className="link">欢迎您加入捷胜娱乐城</a></td>
                <td>2017-10-24&nbsp;14:26:02</td>
              </tr>
              <tr>
                <td>
                  <div className="paging clf">
                    <a className="cur">1</a>
                    <span>1/1</span>
                  </div>
                </td>
                <td><a href="javascript:;" className="delAll">[删除全部]</a></td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


