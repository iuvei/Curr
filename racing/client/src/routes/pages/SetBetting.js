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
    config.min = event.target.value
    this.setState({config});
  }

  onMaxChange = (event) => {
    const config = this.state.config;
    config.max = event.target.value
    this.setState({config});
  }

  onRule01Change = (event) => {
    const config = this.state.config;
    config.rule01 = event.target.value
    this.setState({config});
  }

  onRule02Change = (event) => {
    const config = this.state.config;
    config.rule02 = event.target.value
    this.setState({config});
  }

  onRule03Change = (event) => {
    const config = this.state.config;
    config.rule03 = event.target.value
    this.setState({config});
  }

  onRule04Change = (event) => {
    const config = this.state.config;
    config.rule04 = event.target.value
    this.setState({config});
  }

  onRule05Change = (event) => {
    const config = this.state.config;
    config.rule05 = event.target.value
    this.setState({config});
  }

  onRule06Change = (event) => {
    const config = this.state.config;
    config.rule06 = event.target.value
    this.setState({config});
  }

  onRule07Change = (event) => {
    const config = this.state.config;
    config.rule07 = event.target.value
    this.setState({config});
  }

  onRule08Change = (event) => {
    const config = this.state.config;
    config.rule08 = event.target.value
    this.setState({config});
  }

  onRule09Change = (event) => {
    const config = this.state.config;
    config.rule09 = event.target.value
    this.setState({config});
  }

  onRule10Change = (event) => {
    const config = this.state.config;
    config.rule10 = event.target.value
    this.setState({config});
  }

  onRule11Change = (event) => {
    const config = this.state.config;
    config.rule11 = event.target.value
    this.setState({config});
  }

  onRule12Change = (event) => {
    const config = this.state.config;
    config.rule12 = event.target.value
    this.setState({config});
  }

  render() {
    const {min, max, rule01, rule02, rule03, rule04, rule05, rule06, rule07, rule08, rule09, rule10, rule11, rule12} = this.state.config
    return (
      <div className="r_aside">
        <div className="betting">
          <div className="top">下注配置</div>
          <div className="bottom">
            <form action="">
              <div className="limit">
                <p className="p1"><span className="sp1">单笔最低下注</span>
                  <input type="number" ref="minInput" className="sp2" value={min || ''} onChange={this.onMinChange}/>
                </p>
                <p className="p1"><span className="sp1">单笔最低下注</span>
                  <input type="number" ref="maxInput" className="sp2" value={max || ''} onChange={this.onMaxChange}/>
                </p>
              </div>
              <table>
                <tbody>
                <tr>
                  <td width="35%">1-10名猜大小单双</td>
                  <td width="55%"><input type="number" ref="rule01Input" value={rule01 || ''}
                                         onChange={this.onRule01Change}/></td>
                  <td width="10%"><input type="radio" name="dio1" checked="checked"/>开启
                    <input type="radio" name="dio1"/>关闭
                  </td>
                </tr>
                <tr>
                  <td>1-10名猜车号</td>
                  <td><input type="number" ref="rule02Input" value={rule02 || ''} onChange={this.onRule02Change}/></td>
                  <td><input type="radio" name="dio2" checked="checked"/>开启 <input type="radio" name="dio2"/>关闭</td>
                </tr>
                <tr>
                  <td>1-10名组合（大单、小双）</td>
                  <td><input type="number" ref="rule03Input" value={rule03 || ''} onChange={this.onRule03Change}/></td>
                  <td><input type="radio" name="dio3" checked="checked"/>开启 <input type="radio" name="dio3"/>关闭</td>
                </tr>
                <tr>
                  <td>1-10名组合（小单、大双）</td>
                  <td><input type="number" ref="rule04Input" value={rule04 || ''} onChange={this.onRule04Change}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td>1-5名猜龙虎</td>
                  <td><input type="number" ref="rule05Input" value={rule05 || ''} onChange={this.onRule05Change}/></td>
                  <td><input type="radio" name="dio4" checked="checked"/>开启 <input type="radio" name="dio4"/>关闭</td>
                </tr>
                <tr>
                  <td>冠亚猜庄闲</td>
                  <td><input type="number" ref="rule06Input" value={rule06 || ''} onChange={this.onRule06Change}/></td>
                  <td><input type="radio" name="dio5" checked="checked"/>开启 <input type="radio" name="dio5"/>关闭</td>
                </tr>
                <tr>
                  <td>冠亚猜号码</td>
                  <td><input type="number" ref="rule07Input" value={rule07 || ''} onChange={this.onRule07Change}/></td>
                  <td><input type="radio" name="dio6" checked="checked"/>开启 <input type="radio" name="dio6"/>关闭</td>
                </tr>
                <tr>
                  <td>冠亚和值（特码）（大、小、单、双、11为和）</td>
                  <td><input type="number" ref="rule08Input" value={rule08 || ''} onChange={this.onRule08Change}/></td>
                  <td><input type="radio" name="dio7" checked="checked"/>开启 <input type="radio" name="dio7"/>关闭</td>
                </tr>
                <tr>
                  <td>冠亚和值（特码）猜数字（3、4、18、19）</td>
                  <td><input type="number" ref="rule09Input" value={rule09 || ''} onChange={this.onRule09Change}/></td>
                  <td><input type="radio" name="dio8" checked="checked"/>开启 <input type="radio" name="dio8"/>关闭</td>
                </tr>
                <tr>
                  <td>冠亚和值（特码）猜数字（5、6、16、17）</td>
                  <td><input type="number" ref="rule10Input" value={rule10 || ''} onChange={this.onRule10Change}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td>冠亚和值（特码）猜数字（7、8、14、15）</td>
                  <td><input type="number" ref="rule11Input" value={rule11 || ''} onChange={this.onRule11Change}/></td>
                  <td></td>
                </tr>
                <tr>
                  <td>冠亚和值（特码）猜数字（9、10、12、13）</td>
                  <td><input type="number" ref="rule12Input" value={rule12 || ''} onChange={this.onRule12Change}/></td>
                  <td></td>
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


