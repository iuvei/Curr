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
    console.log('=============', nextPorps.time)
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
      //this.props.finish();
    }
    this.setState({
      time: nextPorps.time,
      finished,
    })

  }

  componentDidMount() {
    console.log('=====================')
    //const ticker = setInterval(() => this.setState({time: this.state.time - 1}), 1000);
    const ticker = setInterval(this.tickerTicker, 1000);
    this.setState({ticker});
  }

  xiaZhu = () => {
    return this.state.time - this.props.interval;
  }

  tickerTicker = () => {
    console.log(this.state.time)
    this.setState({time: this.state.time - 1})

    if (this.state.finished) {
      this.props.callBack({finish: true});
    } else {
      if (this.xiaZhu() <= 0) {
        this.props.callBack({opening: true});
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  paddingZero = (n) => {
    if (n < 10) {
      return '0' + n;
    }
    return n;
  }

  render() {
    const xiaZhu = this.xiaZhu();

    if (!this.state.finished) {
      return (<div>
        距离封盘：<span>{xiaZhu > 0 ? `${this.paddingZero(Math.floor(xiaZhu / 60))}:${this.paddingZero(xiaZhu % 60)}` : '停止下注'}</span>
        距离开奖：<span>{this.state.time > 0 ? `${this.paddingZero(Math.floor(this.state.time / 60))}:${this.paddingZero(this.state.time % 60)}` : '开奖中'}</span>
      </div>);
    } else {
      return (<div><span>当天开奖已结束</span></div>);
    }
  }
}


