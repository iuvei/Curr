import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {getUsersZuoPin} from '../../services/mobile';
import '../../assets/css/common.css'
import '../../assets/css/myWorks.css';
/**
 * Created by sven on 2017/8/12.
 */

export default class MyWorks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zuopins: [],
    }
  }

  componentDidMount() {
    getUsersZuoPin({}).then(data => {
      if (data !== undefined) {
        this.setState({zuopins: data.zps});
      }
    })
  }


  gotoSczp = () => {
    hashHistory.push({pathname: '/sczp', state: {from: "index"}});
  };


  render() {
    const {zuopins} = this.state;
    return (<div>
      <div className="topbar">
        <h3>我的作品</h3>
        <a href="javascript:" className="fr" onClick={this.gotoSczp}>继续上传</a>
      </div>
      <div className="worksList">

        {
          zuopins.map((e, i) => {
            return (
              <Link to={{pathname: '/tpym_xq', state: e}} key={i}>
                <div className="item">
                  <a href="javascript:" className="img">
                    <img src={e.images[0] || require("../../assets/images/myWorks_1.png")}/>
                  </a>
                  <div className="grid clf">
                    <a href="javascript:" className="itemTitle fl">《{e.zpName}》</a>
                    <div className="fr">
                      <a href="javascript:" className="fl">{e.stars}</a>
                      <a href="javascript:" className="share fr">
                        <img src={require("../../assets/images/icon_comment.png")}/>
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        }
      </div>
    </div>);
  }
}
