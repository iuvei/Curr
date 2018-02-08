import React, {Component} from 'react';
import {setRaceConfing, getRaceConfing} from '../../services/settings';
import {message} from 'antd';
import '../../assets/backend/css/settings.css';
/**
 * Created by sven on 2017/8/3.
 */
export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {isOpen: true},
    }
  }

  componentDidMount() {
    getRaceConfing()
      .then(data => {
        if (data.success) {
          this.setState({
            config: data.result.data.config,
          });
        }
      })
  }

  onSubmit = (e) => {
    setRaceConfing({...this.state.config})
      .then(data => {
        message.success("修改成功")
      });
  }

  onIsOpenChange = (event) => {
    const config = this.state.config;
    config.isOpen = event.target.value.trim()
    this.setState({config});
  }

  onWellComeChange = (event) => {
    const config = this.state.config;
    config.wellcome = event.target.value.trim()
    this.setState({config});
  }
  onCloseTimeChange = (event) => {
    const config = this.state.config;
    config.closeTime = event.target.value
    this.setState({config});
  }

  onVirtualMemberChange = (event) => {
    const config = this.state.config;
    config.virtualMember = event.target.value.trim()
    this.setState({config});
  }

  sendImage = (event) => {
    const that = this;
    const files = event.target.files
    //检查是否有文件被选中
    if (files.length !== 0) {
      //获取文件并用FileReader进行读取
      const reader = new FileReader();
      if (!reader) {
        return;
      };

      if (files[0].size>10000000) {
        message.warn("图片大小不能超过10000K");
        return;
      }

      reader.onload = function (e) {
        const config = that.state.config;
        config.service = e.target.result;
        that.setState({config});
        //读取成功，显示到页面并发送到服务器
        // const {user, socket} = that.props;
        // var newMessage = {
        //   id: `${Date.now()}${uuid.v4()}`,
        //   isImg: true,
        //   text: e.target.result,
        //   user: user,
        //   //speakTo: this.props.speakTo,
        //   time: moment().format('Do h:mm:ss a')
        // };
        // console.log('==========sendImage================')
        // that.send(newMessage);
      };
      reader.readAsDataURL(files[0]);
    };
  }

  gotoIndex = () => {
    this.props.history.push({pathname: "/index"});
  }
  render() {
    const {isOpen, wellcome, closeTime, virtualMember, service} = this.state.config;
    return (
      <div className="r_aside">
        <form>
          <div className="setup">
            <div className="top">赛车飞艇全局设置</div>
            <div className="bottom">
              <div className="dv1 clearfloat">
                <p className="p1 fl">是否开启机器人</p>
                <select className="p2 fl p2sele" value={isOpen || true} onChange={this.onIsOpenChange}>
                  <option value="true">是</option>
                  <option value="false">否</option>
                </select>
              </div>

              <div className="clearfloat">
                <p className="p1 fl">欢迎语</p>
                <p className="p2 fl">
                  <input className="sp1" value={wellcome || ''} onChange={this.onWellComeChange}/>
                </p>
              </div>
              <div className="dv2 clearfloat">
                <p className="p1 fl">封盘时间</p>
                <p className="p2 fl">
                  <input className="sp1" type="number" value={closeTime || 0} onChange={this.onCloseTimeChange}/><span
                  className="sp2">秒（修改后需要重启服务器生效）</span>
                </p>
              </div>
              <div className="dv3 clearfloat">
                <p className="p1 fl">虚拟在线人数</p>
                <p className="p2 fl">
                  <input className="sp1" value={virtualMember || 0} onChange={this.onVirtualMemberChange}/>
                </p>
              </div>
              <div className="dv4 clearfloat">
                <p className="p1 fl">微信客服</p>
                <p className="p2 fl">
                  <input type="file" className="ip1" onChange={this.sendImage}/>
                  <span>未选择任何文件</span>
                  {/*<input type="submit" value="上传" className="ip2"/>*/}
                  {/*<input type="submit" value="取消" className="ip2"/>*/}
                  <img src={service||''} alt=""/>
                </p>
              </div>
              <div className="dv5">
                <input type="submit" value="保存信息" onClick={this.onSubmit} className="ip1"/>
                <input type="reset" value="取消" onClick={this.gotoIndex} className="ip2"/>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


