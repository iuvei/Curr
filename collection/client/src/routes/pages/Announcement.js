import React, {Component} from 'react';
import '../../assets/backend/css/announcement.css'
import {getAnnouncement, setAnnouncement} from '../../services/settings';
import {notification, message} from 'antd';
/**
 * Created by sven on 2017/8/4.
 */

export default class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {},
    }
  }

  componentDidMount() {
    getAnnouncement()
      .then(data => {
        if (data.success) {
          this.setState({
            config: data.result.config,
          });
        }
      })
  }

  onSubmit = (e) => {
    setAnnouncement({...this.state.config})
      .then(data => {
        if (data.success) {
          message.success("修改成功")
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      });
  }

  onAnnounceInputChange = (event) => {
    const config = this.state.config;
    config.announcement = event.target.value.trim()
    this.setState({config});
  }


  render() {
    console.log(this.state.config)
    return (
      <div className="r_aside">
        <div className="position">
          <span>发布公告</span>
        </div>
        <section className="contentBox clearfloat">
          <span className="fl">公告内容：</span>
          <div className="cont fl">
            <textarea title="content" ref="announceInput"
                      value={this.state.config.announcement || ''}
                      onChange={this.onAnnounceInputChange}/>
            <p>发布后，所有在线会员都可以看到</p>
            <button type="submit" onClick={this.onSubmit}>确认</button>
          </div>
        </section>
      </div>
    );
  }
}


