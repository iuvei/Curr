import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {setBetConfing, getBetConfing} from '../../services/settings';
import {message} from 'antd';
import '../../assets/backend/css/setbetting.css';
/**
 * Created by sven on 2017/8/3.
 */

export default class SetBetting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
    }
  }

  componentDidMount() {
    getBetConfing()
      .then(data => {
        if (data.success) {
          this.setState({
            config: data.result.config,
          });
        }
      })
  }

  onSubmit = () => {
    setBetConfing({...this.state.config})
      .then(data => {
        message.success("修改成功")
      });
  }

  onMinChange = (event) => {
    const config = this.state.config;
    config.min = parseInt(event.target.value)
    this.setState({config});
  }

  onMaxChange = (event) => {
    const config = this.state.config;
    config.max = parseInt(event.target.value)
    this.setState({config});
  }

  onRule01Change = (event) => {
    const config = this.state.config;
    config.rule01 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule02Change = (event) => {
    const config = this.state.config;
    config.rule02 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule03Change = (event) => {
    const config = this.state.config;
    config.rule03 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule04Change = (event) => {
    const config = this.state.config;
    config.rule04 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule05Change = (event) => {
    const config = this.state.config;
    config.rule05 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule06Change = (event) => {
    const config = this.state.config;
    config.rule06 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule07Change = (event) => {
    const config = this.state.config;
    config.rule07 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule08Change = (event) => {
    const config = this.state.config;
    config.rule08 = parseInt(event.target.value)
    this.setState({config});
  }

  onRule09Change = (event) => {
    const config = this.state.config;
    config.rule09 = parseInt(event.target.value)
    this.setState({config});
  }

  render() {
    const {min, max, rule01, rule02, rule03, rule04, rule05, rule06, rule07, rule08, rule09} = this.state.config
    return (
      <div className="r_aside">
        <div className="betting">
          <div className="top">下注配置</div>
          <div className="bottom">
            <form action="">
              <div className="limit">
                <p className="p1"><span className="sp1">单笔最低下注</span>
                  <input type="number" ref="minInput" className="sp2" value={min} placeholder="默认10" onChange={this.onMinChange}/>
                </p>
                <p className="p1"><span className="sp1">单笔最高下注</span>
                  <input type="number" ref="maxInput" className="sp2" value={max} placeholder="默认1000"  onChange={this.onMaxChange}/>
                </p>
              </div>
              <table width="100%">
                <tbody>
                <tr>
                  <td width="400">1-10名猜车号</td>
                  <td width="530"><input type="number" ref="rule01Input" value={rule01} placeholder="默认10倍" onChange={this.onRule01Change}/></td>
                </tr>
                <tr>
                  <td>1-10名猜大小单双</td>
                  <td><input type="number" ref="rule02Input" value={rule02} placeholder="默认1倍"  onChange={this.onRule02Change}/></td>
                </tr>
                <tr>
                  <td>1-10名组合（大单、小双、小单、大双）</td>
                  <td><input type="number" ref="rule03Input" value={rule03} placeholder="默认4倍"  onChange={this.onRule03Change}/></td>
                </tr>
                <tr>
                  <td>1-5名猜龙虎</td>
                  <td><input type="number" ref="rule04Input" value={rule04} placeholder="默认2倍" onChange={this.onRule04Change}/></td>
                </tr>
                <tr>
                  <td>冠亚猜庄闲</td>
                  <td><input type="number" ref="rule05Input" value={rule05} placeholder="默认2倍"  onChange={this.onRule05Change}/></td>
                </tr>
                <tr>
                  <td>冠亚猜号码</td>
                  <td><input type="number" ref="rule06Input" value={rule06 }placeholder="默认40倍"  onChange={this.onRule06Change}/></td>
                </tr>
                <tr>
                  <td>冠亚和值(特码)猜大小单双</td>
                  <td><input type="number" ref="rule07Input" value={rule07} placeholder="默认2倍"  onChange={this.onRule07Change}/></td>
                </tr>
                <tr>
                  <td>冠亚和值(特码)猜数字【11的基础赔率】</td>
                  <td><input type="number" ref="rule08Input" value={rule08 } placeholder="默认6倍" onChange={this.onRule08Change}/></td>
                </tr>
                <tr>
                  <td>说明：上面填写的是特码11的基础赔率</td>
                  <td>
                    区间[3.4.18.19] 为基础赔率的2倍
                    区间[5.6.16.17] 为基础赔率的3倍
                    区间[7.8.14.15] 为基础赔率的4倍
                    区间[9.10.12.13] 为基础赔率的5倍
                  </td>
                </tr>
                <tr>
                  <td>冠亚和值(特码)猜区段</td>
                  <td><input type="number" ref="rule09Input" value={rule09} placeholder="默认4倍" onChange={this.onRule09Change}/></td>
                </tr>

                <tr>
                  <td></td>
                  <td>
                    <input type="submit" value="保存信息" onClick={this.onSubmit} className="ip1"/>
                    <input type="submit" value="取消" className="ip2"/>
                  </td>
                  <td></td>
                </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


