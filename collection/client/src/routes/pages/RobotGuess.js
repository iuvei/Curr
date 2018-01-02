import React, {Component} from 'react';
import '../../assets/backend/css/robotGuess.css'
import Paging from '../../components/paging/Paging'
import {message, notification, Popconfirm} from 'antd';
import {RuleFactory} from '../../utils/rules';
import {addRobotGuess, getAllRobotGuesses, editRobotGuess, deleteRobotGuess} from '../../services/robots';
/**
 * Created by sven on 2017/8/4.
 */

export default class RobotGuess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
      edit: false,
      currItem: {choice: '', _id:''},
      choice: '',
      guess: {data: []},
    }
  }

  componentDidMount() {
    this.queryRobotGuesses(10, 1)
  }

  queryRobotGuesses(pageSize, currPage) {
    getAllRobotGuesses({pageSize, currPage})
      .then(data => {
        if (data.success) {
          this.setState({
            guess: data.result,
          });
        }
      })
  }

  onShowModel = () => {
    this.setState({
      visiable: true,
    })
  }

  onShowEditModel = (item) => {
    this.setState({
      visiable: true,
      edit: true,
      currItem: item,
    })
  }

  onHideModel = () => {
    this.setState({
      visiable: false,
      edit: false,
      currItem: {choice: ''},
    })
  }

  onAddRobotGuess = () => {
    const choice = this.refs.choiceInput.value.trim();
    if (!RuleFactory.isMatch(choice)) {
      notification.error({
        message: '操作失败',
        description: "请输入正确的竞猜规则",
      });
      return;
    }
    const that = this;
    addRobotGuess({choice})
      .then(data => {
        if (data.success) {
          that.onHideModel();
          this.queryRobotGuesses(10, 1);
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
  }
  onEditRobotGuess = () => {
    const choice = this.refs.choiceInput.value.trim();
    if (!RuleFactory.isMatch(choice)) {
      notification.error({
        message: '操作失败',
        description: "请输入正确的竞猜规则",
      });
      return;
    }
    const that = this;
    editRobotGuess({id: this.state.currItem._id, choice})
      .then(data => {
        if (data.success) {
          that.onHideModel();
          this.queryRobotGuesses(10, 1);
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
  }

  onConfirm = (id) => {
    deleteRobotGuess({id})
      .then(data => {
        if (data.success) {
          this.queryRobotGuesses(10, 1);
        } else {
          notification.error({
            message: '操作失败',
            description: data.message,
          });
        }
      })
  }

  onChoiceInputChange = (event) => {
    const currItem = this.state.currItem;
    currItem.choice = event.target.value.trim()
    this.setState({currItem});
  }

  render() {
    return (
      <div className="r_aside">
        <div className="position">
          <span>机器人管理</span>
          &nbsp;&gt;&nbsp;
          <span>机器人竞猜</span>
        </div>
        <section className="mainBox clearfloat">
          <div className="btns">
            <button type="button" className="addBtn" onClick={this.onShowModel}>增加</button>
          </div>
          <table>
            <thead>
            <tr>
              <th width="80">ID</th>
              <th width="200">竞猜设置</th>
              <th width="620">操作</th>
            </tr>
            </thead>
            <tbody>

            {
              this.state.guess.data.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{item.choice}</td>
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
            currPage={this.state.guess.currPage}
            pageSize={this.state.guess.pageSize}
            total={this.state.guess.total}
            callBack={this.queryRobotGuesses.bind(this)}
          />

          <div className="zj" style={this.state.visiable ? {display: "block"} : {display: "none"}}>
            <div className="title"><span>{this.state.edit ? "编辑" : "增加"}竞猜</span>
              <a href="javascript:void(0)" onClick={this.onHideModel}>关闭</a>
            </div>
            <div className="content">
              <div className="img">
                <form action="">
                  <input type="text" placeholder="请输入下注竞猜" value={this.state.currItem.choice}
                         className="ip2" ref="choiceInput"
                         onChange={this.onChoiceInputChange}/>
                  <input type="submit" value="确认" className="ip3"
                         onClick={this.state.edit ? this.onEditRobotGuess : this.onAddRobotGuess}/>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}


