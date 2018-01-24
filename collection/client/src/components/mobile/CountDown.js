import React, {Component} from 'react';
import moment from 'moment';
/**
 * Created by sven on 2018/1/21.
 */

export default class CountDown extends Component {
  constructor(props) {
    super(props);
    if (props.time < 0) {
      props.callBack();
    } else {
      this.state = {
        ticker: null,
        time: props.time,
      }
    }
  }

  componentWillReceiveProps(nextPorps) {
    this.setState({
      time: nextPorps.time,
    })
  }

  componentDidMount() {
    const ticker = setInterval(() => this.setState({time: this.state.time - 1}), 1000);
    this.setState({ticker});
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  render() {
    if (this.state.time == 0) {
      this.props.callBack();
    }
    //console.log(this.state.time)
    const h = moment().hour();
    if (h >= 0 && h < 23) {
      return (<div>
        本期投注剩余时间：{this.state.time > 0 ? `${Math.floor(this.state.time / 60)}:${this.state.time % 60}` : '开奖中'}</div>);
    } else {
      return (<div>当天开奖已结束</div>);
    }
  }
}


