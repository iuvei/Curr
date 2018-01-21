import React, {Component} from 'react';
import moment from 'moment';
/**
 * Created by sven on 2018/1/21.
 */

export default class CountDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
      time: '-',
    }
  }

  componentWillReceiveProps(nextPorps) {
   // console.log(nextPorps)
    this.setState({
      time: nextPorps.time,
    })
  }

  componentDidMount() {
    const ticker = setInterval(() => this.setState({time: this.state.time - 1}), 1000);
    this.setState({ticker});
  }

  // diff = () => {
  //   const now = moment();
  //
  // }

  componentWillUnmount() {
    clearInterval(this.state.ticker);
  }

  render() {
    //const ti = moment('2018-01-21 19:31:03');
    //const da = new Date('2018-01-21 19:31:03');
   // const ff = moment('2018-01-21 19:31:03', 'YYYY-MM-DD HH:mm');
    return (<div>本期投注剩余时间：{this.state.time}</div>);
    //return (<div>距离开奖还剩：{moment("2010-10-20 4:30","YYYY-MM-DD HH:mm")}</div>);
  }
}


