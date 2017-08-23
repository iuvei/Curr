import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/zoushi.css';
import {getLotterys} from '../../services/mobile';
import Footer from './comm/footer';
import moment from 'moment';
import {message} from 'antd';
/**
 * Created by sven on 2017/8/23.
 */

export default class ZouShi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lotterys: []
    }
  }

  componentDidMount() {
    getLotterys()
      .then(data => {
        if (data.success) {
          this.setState({
            lotterys: data.result.lotterys,
          });
        }else{
          message.error(data.message)
        }
      })
  }

  render() {
    return (<div>
      <div className="content">
        <table>
          <tbody>
          <tr >
            <th width="14%">开奖期号</th>
            <th width="36%">开奖时间</th>
            <th width="50%"> 开奖号码</th>
          </tr>
          {
            this.state.lotterys.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.no}</td>
                  <td>{moment(item.createdAt).format('YYYY-MM-DD HH:mm')}</td>
                  <td className="sf">{item.code}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>);
  }
}


