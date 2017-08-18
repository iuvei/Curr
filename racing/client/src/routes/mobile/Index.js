import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import "../../assets/mobile/css/common.css";

/**
 * Created by sven on 2017/8/2.
 */

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputShow: false,
    }
  }

  render() {
    return (
      <div className="iframeDiv">
        <iframe src="http://www.pk101.com/build/flash/pk10/pk10.html" frameBorder="0" className="iframe"></iframe>
      </div>
    );
  }
}


