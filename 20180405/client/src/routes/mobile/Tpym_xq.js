import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/tpym_xq.css';
import {putZuoPinTouPiao, putPv} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */

export default class Tpym_xq extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zp: this.props.location.state,
    }
  }

  componentDidMount() {
    const {zp} = this.state;
    putPv({id: zp.id}).then(data => {
      if (data !== undefined) {
        this.setState({
          zp: {...zp, pv: zp.pv + 1}
        })
      }
    })
  }

  touPiao = () => {
    const {zp} = this.state;
    putZuoPinTouPiao({id: zp.id}).then(data => {
      if (data !== undefined) {
        this.setState({
          zp: {...zp, stars: zp.stars + 1}
        })
      }
    })
  };

  render() {
    const {zp} = this.state;
    return (<div id='tpym_xq'>
      <div className="title"><a href="javascript:void(0)" onClick={() => this.props.history.goBack()}></a>《{zp.zpName}》
      </div>
      <div className="article">
        <div className="a_title">《{zp.zpName}》</div>
        <div className="number">编号：{zp.num}</div>
        <div className="from"><span>来自</span>{zp.name}</div>
        {
          zp.images.map((e, i) => {
            return <div className="img" key={i}><img src={e}/></div>;
          })
        }
      </div>

      <div className="clf btns">
        <a href="javascript:void(0)" className="share"></a>
        <a href="javascript:void(0)" className="zan" onClick={this.touPiao}><span>{zp.stars}</span></a>
        <a href="javascript:void(0)" className="vote" onClick={this.touPiao}>投一票</a>
      </div>

    </div>);
  }
}


