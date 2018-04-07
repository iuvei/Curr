import React, {Component} from 'react';
import {connect} from 'dva';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../assets/css/common.css';
import Footer from './mobile/comm/footer';
import {getCookie} from '../utils/cookies';

const PATH_Login = "/login"

class MobilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      no: 0,
    }
  }

  componentDidMount() {
    const userid = getCookie("userid")
    if (userid=='') {
      hashHistory.push({pathname: PATH_Login});
    }
  }

  render() {
    return (
      <div>
        {this.props.children}
        <Footer/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {mobile: state.mobile};
}

export default connect(mapStateToProps)(MobilePage);
