import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/robotMgr.css'
import Paging from '../../components/paging/Paging'
import {message, notification, Popconfirm} from 'antd';
import {addRobot, getAllRobots, editRobot, deleteRobot} from '../../services/robots';
/**
 * Created by sven on 2017/8/4.
 */

export default class RobotMgr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      robotVisiable: false,
      edit: false,
      currItem: {nickname: '', avatar: ''},
      photo: '',
      users: {data: []},
    }
  }

  componentDidMount() {
    this.queryRobots(10, 1)
  }

  queryRobots(pageSize, currPage) {
    getAllRobots({pageSize, currPage, nickname: this.state.keyWord})
      .then(data => {
        if (data.success) {
          this.setState({
            users: data.result,
          });
        }
      })
  }

  queryRobotByName() {
    this.queryRobots(10, 1)
  }

  onSearchInputChange(e) {
    this.setState({
      keyWord: e.target.value.trim(),
    })
  }

  onShowModel = () => {
    this.setState({
      robotVisiable: true,
    })
  }

  onShowEditModel = (item) => {
    this.setState({
      robotVisiable: true,
      edit: true,
      currItem: item,
    })
  }

  onHideModel = () => {
    this.setState({
      robotVisiable: false,
      edit: false,
      currItem: {nickname: '', avatar: ''},
    })
  }

  onAddRobot = () => {
    const nickname = this.refs.nicknameInput.value.trim();
    const avatar = this.refs.photoInput.value.trim();
    const that = this;
    addRobot({nickname, avatar})
      .then(data => {
        if (data.success) {
          that.onHideModel();
          this.queryRobots(10, 1);
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
  }

  onEditRobot = () => {
    const nickname = this.refs.nicknameInput.value.trim();
    const avatar = this.refs.photoInput.value.trim();
    const that = this;
    editRobot({id: this.state.currItem._id, nickname, avatar})
      .then(data => {
        if (data.success) {
          that.onHideModel();
          this.queryRobots(10, 1);
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
  }

  onConfirm = (id) => {
    deleteRobot({id})
      .then(data => {
        if (data.success) {
          this.queryRobots(10, 1);
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
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
      }
      ;

      if (files[0].size > 100000) {
        message.warn("图片大小不能超过100K");
        return;
      }

      reader.onload = function (e) {
        console.log('======', e.target.result)
        that.setState({photo: e.target.result});
      };
      reader.readAsDataURL(files[0]);
    }
    ;
  }

  onPhotoChange = (event) => {
    const currItem = this.state.currItem;
    currItem.avatar = event.target.value.trim()
    this.setState({currItem});
  }
  onNicknameChange = (event) => {
    const currItem = this.state.currItem;
    currItem.nickname = event.target.value.trim()
    this.setState({currItem});
  }


  render() {
    return (
      <div className="r_aside">
        <div className="position">
          <span>机器人管理</span>
          &nbsp;&gt;&nbsp;
          <span>机器人管理</span>
        </div>
        <section className="mainBox clearfloat">
          <div className="search">
            <input type="text" placeholder="请输入用户名" value={this.state.keyWord || ''}
                   onChange={this.onSearchInputChange.bind(this)}/>
            <button type="submit" className="searchBtn" onClick={this.queryRobotByName.bind(this)}>搜索</button>
            <button type="button" className="addBtn" onClick={this.onShowModel}>增加机器人</button>
          </div>
          <table cellPadding="0" cellSpacing="0">
            <thead>
            <tr>
              <th width="80">选择</th>
              <th width="100">头像</th>
              <th width="160">用户名</th>
              <th width="560">操作</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.users.data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td><input type="checkbox" title=""/></td>
                    <td><img src={item.avatar || require("../../assets/backend/images/1.jpg")} alt=""/></td>
                    <td>{item.nickname}</td>
                    <td>
                      <button type="button" className="edit" onClick={() => this.onShowEditModel(item)}>编辑</button>
                      <Popconfirm title="确定删除吗?" onConfirm={() => this.onConfirm(item._id)}
                                  okText="确定"
                                  cancelText="取消">
                        <button type="button" className="del">删除</button>
                      </Popconfirm>

                    </td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
          <Paging
            currPage={this.state.users.currPage}
            pageSize={this.state.users.pageSize}
            total={this.state.users.total}
            callBack={this.queryRobots.bind(this)}
          />

          <div className="zj" style={this.state.robotVisiable ? {display: "block"} : {display: "none"}}>
            <div className="title"><span>{this.state.edit ? "编辑" : "增加机器人"}</span><a href="javascript:void(0)"
                                                                                     onClick={this.onHideModel}>关闭</a>
            </div>
            <div className="content">
              <div className="img">
                <form action="">
                  <input type="text" name="pic" placeholder="请输入头像地址"
                         value={this.state.currItem.avatar}
                         onChange={this.onPhotoChange}
                         className="ip2" ref="photoInput"/>
                  <input type="text" placeholder="请输入用户名" className="ip2"
                         value={this.state.currItem.nickname}
                         onChange={this.onNicknameChange}
                         ref="nicknameInput"/>
                  <input type="submit" value="确认" className="ip3"
                         onClick={this.state.edit ? this.onEditRobot : this.onAddRobot}/>
                </form>
              </div>
            </div>
          </div>

        </section>
      </div>


    );
  }
}


