import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/mobile/css/czjl.css';
import {addDownReq, getRechargeRecords} from '../../services/mobile';
import moment from 'moment';
import {message} from 'antd'
/**
 * Created by sven on 2017/8/23.
 */

export default class Czjl extends Component {
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
            updowns: data.result.upDowns,
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
            <th>充值时间</th>
            <th>充值金额</th>
            <th>上下分类型</th>
            <th>状态</th>
          </tr>
          {
            this.state.updowns.map((item, i)=> {
              return(
                <tr key={i}>
                  <td>{moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</td>
                  <td>{item.amount}</td>
                  {item.type?<td className="sf">上分</td>:<td className="xf">下分</td>}
                  {item.ignore===0?<td className="shz">审核中</td>:item.ignore===1?<td className="tg">通过</td>:<td className="wtg">未通过</td>}
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>

    );
  }
}


