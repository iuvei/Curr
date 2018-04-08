import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/tpym.css';
import {getZuoPins} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */

export default class Tpym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: 'newest',
      zuopins: [],
      num: ''
    }
  }

  componentDidMount() {
    this.getZPs('');
  }

  getZPs = (type) => {
    getZuoPins({sorted: type}).then(data => {
      if (data !== undefined) {
        this.setState({zuopins: data.zps});
      }
    })
  };

  getNewest = () => {
    this.getZPs('');
    this.setState({curr: 'newest'})
  };

  getStars = () => {
    this.getZPs('stars');
    this.setState({curr: 'stars'})
  };

  onNumChange = (e) => {
    this.setState({num: e.target.value})
  };

  render() {
    const {zuopins, curr, num} = this.state;
    var zps = zuopins;
    if (num !== '') {
      zps = zps.filter(x => x.num.startsWith(num));
    }
    return (<div id='tpym'>
      <div className="search"><input type="text" onChange={this.onNumChange} placeholder="请输入作品编号"/></div>
      <div className="clf sort">
        <a href="javascript:void(0)" className={curr == "newest" ? "current" : ""} onClick={this.getNewest}>最新</a>
        <a href="javascript:void(0)">关注量</a>
        <a href="javascript:void(0)" className={curr == "stars" ? "current" : ""} onClick={this.getStars}>点赞数</a>
      </div>

      <div className="list">
        <ul className="clf">
          {
            zps.map((e, i) => {
              return (
                <Link to={{pathname: '/tpym_xq', state: e}} key={i}>
                  <li key={i}>
                    <div className="img"><img src={e.images[0]}/></div>
                    <div className="clf dv1"><span className="sp1">《{e.zpName}》</span> <span
                      className="sp2">编号：{e.num}</span></div>
                    <div className="from"><span>来自</span>{e.name}</div>
                    <div className="clf hot"><a href="javascript:void(0)" className="a1">{e.stars}</a><a href="#"
                                                                                                         className="a2"></a>
                    </div>
                  </li>
                </Link>
              );
            })
          }
        </ul>
      </div>
      <div className="banner"><img src={require("../../assets/images/photo_2.png")}/></div>
    </div>);
  }
}


