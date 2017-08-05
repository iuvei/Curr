import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/dataGather.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class DataGather  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <div className="position">
              <span>数据采集</span>
            </div>
            <section className="mainBox clearfloat">
              <div className="search">
                <input type="text" placeholder="请输入开奖期号"/>
                  <button type="button">搜索</button>
              </div>
              <table cellspacing="0" cellpadding="0">
                <thead>
                <tr>
                  <th width="120">类型</th>
                  <th width="120">期号</th>
                  <th width="230">开奖时间</th>
                  <th width="430">开奖号码</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                <tr>
                  <td>北京赛车</td>
                  <td>628809</td>
                  <td>2017-07-18&emsp;17:42:57</td>
                  <td>01、08、09、10、06、03、07、05、04、02</td>
                </tr>
                </tbody>
              </table>
              <div className="paging">
                <a href="javascript:;" className="prev">&lt;&lt;</a>
                <a href="javascript:;">1</a>
                <a href="javascript:;" className="cur">2</a>
                <a href="javascript:;">3</a>
                <a href="javascript:;">4</a>
                <a href="javascript:;">5</a>
                <a href="javascript:;">6</a>
                <a href="javascript:;">7</a>
                <a href="javascript:;">8</a>
                <a href="javascript:;">9</a>
                <a href="javascript:;">10</a>
                <a href="javascript:;" className="next">&gt;&gt;</a>
              </div>
            </section>
          </div>

    );
    }
}


