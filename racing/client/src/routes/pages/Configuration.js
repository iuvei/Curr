import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import {message, Input} from 'antd';
import {setPlatConfing, getPlatConfing} from '../../services/settings';
import '../../assets/backend/css/configuration.css';
/**
 * Created by sven on 2017/8/3.
 */

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
      },
    }
  }

  componentDidMount(){
    getPlatConfing()
      .then(data=>{
        if (data.success) {
          this.setState({
            config: data.result.data.config,
          });
        }
      })
  }

  onSubmit = (e) => {
    setPlatConfing({...this.state.config})
      .then(data=> {
        message.success("修改成功")
      });
  }

  onIsOpenChange = (event) => {
    const config = this.state.config;
    config.isOpen = event.target.value.trim()
    this.setState({config});
  }

  onDomainChange = (event) => {
    const config = this.state.config;
    config.domain = event.target.value.trim()
    this.setState({config});
  }
  onSiteNameChange = (event) => {
    const config = this.state.config;
    config.siteName = event.target.value.trim()
    this.setState({config});
  }

  onWxAppIDChange = (event) => {
    const config = this.state.config;
    config.wxAppID = event.target.value.trim()
    this.setState({config});
  }
  onWxSecretChange = (event) => {
    const config = this.state.config;
    config.wxSecret = event.target.value.trim()
    this.setState({config});
  }
  onWxCodeChange = (event) => {
    const config = this.state.config;
    config.wxCode = event.target.value.trim()
    this.setState({config});
  }

  gotoIndex = () => {
    this.props.history.push({pathname: "/index"});
  }

  render() {
    const {isOpen, domain, siteName, wxAppID, wxSecret, wxCode} = this.state.config;
    return (
      <div className="r_aside">
        <div className="deploy">
          <div className="top">系统配置</div>
          <div className="bottom">
            <form>
              <p><span className="sp1">网站是否开放</span>
                <select ref="isOpen" className="sp2 sp3" value={isOpen||true} onChange={this.onIsOpenChange} >
                  <option value="true">是</option>
                  <option value="false">否</option>
                </select>
              </p>
              <p><span className="sp1">网站域名</span>
                <input className="sp2" ref="domain" value={domain} onChange={this.onDomainChange}></input></p>
              <p><span className="sp1">网站名称</span>
                <input className="sp2" ref="siteName" value={siteName} onChange={this.onSiteNameChange}></input></p>
              <p><span className="sp1">微信AppID</span>
                <input className="sp2" ref="wxAppID" value={wxAppID} onChange={this.onWxAppIDChange}></input>
              </p>
              <p><span className="sp1">微信AppSecret</span>
                <input className="sp2" ref="wxSecret" value={wxSecret} onChange={this.onWxSecretChange}></input>
              </p>
              <p><span className="sp1">授权码</span>
                <input className="sp2" ref="wxCode" value={wxCode} onChange={this.onWxCodeChange}></input>
              </p>
              <input type="submit" value="保存信息" onClick={this.onSubmit} className="ip1"/>
              <input type="reset" value="取消" onClick={this.gotoIndex} className="ip2"/>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Configuration;


