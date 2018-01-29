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
        finished: false,
      }
    }
  }

  componentWillReceiveProps(nextPorps) {
    const {start, end} =this.props;

    const start_hm = start.split(":");
    const start_h = start_hm[0];
    const start_m = start_hm[1];

    const end_hm = end.split(":");
    const end_h = end_hm[0];
    const end_m = end_hm[1];

    const h = moment().hour();
    const m = moment().minute();

    var finished = false;
    if ((h < start_h || (h == start_h && m < start_m)) || ( h > end_h || (h == end_h && m > end_m))) {
      finished = true;
    }
    this.setState({
      time: nextPorps.time,
      finished,
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
    console.log(this.state.time)
    if (!this.state.finished) {
      return (<div>
        本期投注剩余时间：{this.state.time > 0 ? `${Math.floor(this.state.time / 60)}:${this.state.time % 60}` : '开奖中'}</div>);
    } else {
      return (<div>当天开奖已结束</div>);
    }
  }
}


