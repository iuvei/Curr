import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/wx/css/youxiguize.css';
/**
 * Created by sven on 2018/1/7.
 */

export default class GameGuide extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="rule">
        <div className="article">
          <div className="title">游戏规则</div>
          <div className="tab">
            <select>
              <option>北京赛车</option>
              <option>重庆时时彩</option>
              <option>江苏快3</option>
            </select>
          </div>
          <div className="text">
            <p>简介</p>
            <p className="prompt">温馨提示：该彩票定位每位数最多只能下注6个号码</p>
            <p>该游戏的投注时间、开奖时间和开奖号码与“北京PK拾”完
              全同步，北京时间（GMT+8）每天白天从上午09：02开到
              晚上23：:57，每5分钟开一次将，每天开奖179期。
            </p>
            <p>游戏玩法</p>
            <p className="method">1、第一名～第十名</p>

            <p>
              ※第一名～第十名：车号指定，每一个车号为一投注组合，
              开奖结果“投注车号”对应所投名次视为中奖，其余情形
              视为不中奖。
            </p>
            <p>※两面：指单、双；大、小。</p>
            <p>※单、双：号码为双数叫双，如8、10；号码为单数叫单，
              如9、5。</p>
            <p>※大、小：开出之号码大于或等于6为大，小于或等于5为
              小。</p>

            <p className="method">2、1～5龙虎</p>

            <p>※冠 军龙/虎：“第一名”车号大于“第十名”车号视为【龙
              】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </p>
            <p>※亚 军 龙/虎：“第二名”车号大于“第九名”车号视为【龙
              】中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </p>
            <p>
              ※第三名 龙/虎：“第三名”车号大于“第八名”车号视为【龙】
              中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </p>
            <p>
              ※第四名 龙/虎：“第四名”车号大于“第七名”车号视为【龙】
              中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </p>
            <p>
              ※第五名 龙/虎：“第五名”车号大于“第六名”车号视为【龙】
              中奖、反之小于视为【虎】中奖，其余情形视为不中奖。
            </p>

            <p className="method">3、冠亚军和</p>

            <p>※冠军车号+亚军车号=冠亚和值：可能出现的结果为
              3～19，投中对应“冠亚和值”数字的视为中奖，其余视为
              不中奖。</p>
            <p>※冠亚和单双：为单视为投注“单”的注单视为中奖，为双
              视为投注“双”的注单视为中奖，其余视为不中奖。</p>
          </div>
        </div>
      </div>
    );
  }
}


