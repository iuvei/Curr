import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/sczp.css';
import {ImagePicker, WingBlank, Toast} from 'antd-mobile';
import {sendZuoPin} from '../../services/mobile';
/**
 * Created by sven on 2017/8/23.
 */
const PATH_MyWorks = "/myworks"
export default class Sczp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      zpName: '',
      files: [],
      multiple: false,
    }
  }

  componentDidMount() {
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  }

  onZpNameChange = (e) => {
    this.setState({
      zpName: e.target.value,
    });
  }


  onChange = (files) => {
    this.setState({
      files,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {name, zpName, files} = this.state;
    if (name == "") {
      Toast.show("名称不能为空")
      return;
    }
    if (zpName == "") {
      Toast.show("作品名称不能为空")
      return;
    }
    if (files.length == 0) {
      Toast.show("图片不能为空")
      return;
    }

    const data = new FormData();
    data.append('name', name);
    data.append('zpName', zpName);
    files.forEach(e => {
      data.append('image[]', e.file);
    })

    sendZuoPin(data).then(d => {
      if (d == undefined) {
        Toast.fail("上传失败")
        return;
      } else {
        hashHistory.push({pathname: PATH_MyWorks, state: {from: "login"}});
      }
    })
  }

  render() {
    const {name, zpName, files} = this.state;
    return (<div>
      <div className="title"><a href="javascript:void(0)" onClick={() => this.props.history.goBack()}></a>上传作品</div>
      <div className="content">
        <form action="" onSubmit={this.onSubmit}>
          <input type="text" className="text1" value={name} onChange={this.onNameChange} placeholder="请输入作者名"/>
          <input type="text" className="text2" value={zpName} onChange={this.onZpNameChange} placeholder="请输入作品名称"/>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 5}
            multiple={this.state.multiple}
          />
          <input type="submit" value="马上上传"/>
        </form>
      </div>
      <div className="bk"><img src={require("../../assets/images/bk_1.png")} alt=""/></div>
    </div>);
  }
}


