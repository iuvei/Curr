import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/setbetting.css';
/**
 * Created by sven on 2017/8/3.
 */

export default class SetBetting extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <div className="betting">
              <div className="top">下注配置</div>
              <div className="bottom">
                <form action="">
                  <div className="limit">
                    <p className="p1"><span className="sp1">单笔最低下注</span><span className="sp2">10</span></p>
                    <p className="p1"><span className="sp1">单笔最低下注</span><span className="sp2">3000</span></p>
                  </div>
                  <table>
                    <tr>
                      <td width="35%">1-10名猜大小单双</td>
                      <td width="55%"> <input type="text"/> </td>
                      <td width="10%"><input type="radio" name="dio1" checked="checked"/>开启
                        <input type="radio" name="dio1"/>关闭</td>
                    </tr>
                    <tr>
                      <td>1-10名猜车号</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio2" checked="checked"/>开启 <input type="radio" name="dio2"/>关闭</td>
                    </tr>
                    <tr>
                      <td>1-10名组合（大单、小双）</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio3" checked="checked"/>开启 <input type="radio" name="dio3"/>关闭</td>
                    </tr>
                    <tr>
                      <td>1-10名组合（小单、大双）</td>
                      <td> <input type="text"/> </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>1-5名猜龙虎</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio4" checked="checked"/>开启 <input type="radio" name="dio4"/>关闭</td>
                    </tr>
                    <tr>
                      <td>冠亚猜庄闲</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio5" checked="checked"/>开启 <input type="radio" name="dio5"/>关闭</td>
                    </tr>
                    <tr>
                      <td>冠亚猜号码</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio6" checked="checked"/>开启 <input type="radio" name="dio6"/>关闭</td>
                    </tr>
                    <tr>
                      <td>冠亚和值（特码）（大、小、单、双、11为和）</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio7" checked="checked"/>开启 <input type="radio" name="dio7"/>关闭</td>
                    </tr>
                    <tr>
                      <td>冠亚和值（特码）猜数字（3、4、18、19）</td>
                      <td> <input type="text"/> </td>
                      <td><input type="radio" name="dio8" checked="checked"/>开启 <input type="radio" name="dio8"/>关闭</td>
                    </tr>
                    <tr>
                      <td>冠亚和值（特码）猜数字（5、6、16、17）</td>
                      <td> <input type="text"/> </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>冠亚和值（特码）猜数字（7、8、14、15）</td>
                      <td> <input type="text"/> </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>冠亚和值（特码）猜数字（9、10、12、13）</td>
                      <td> <input type="text"/> </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input type="submit" value="保存信息" className="ip1"/><input type="submit" value="取消" className="ip2"/></td>
                      <td></td>
                    </tr>
                  </table>
                </form>
              </div>
            </div>
          </div>
    );
    }
}


