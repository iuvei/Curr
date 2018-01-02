import React, {Component} from 'react';
import '../../assets/mobile/css/xiafen.css';
import {addDownReq, getAccount} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */

export default class Wodexiaxian  extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="content">
            <table>
              <tbody>
              <tr >
                <th>头像</th><th>用户名</th><th>注册时间</th>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>干警万克里</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>是否撒旦</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>是否撒旦</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>123456</td> <td>2017-02-02</td>
              </tr>
              <tr>
                <td><img src="images/man.png" alt=""/></td> <td>是否撒旦</td> <td>2017-02-02</td>
              </tr>
              </tbody>
            </table>
          </div>

    );
    }
}


