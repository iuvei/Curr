import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/css/sczp.css';
import {ImagePicker, WingBlank, Toast} from 'antd-mobile';
import {sendZuoPin, getUploadToken} from '../../services/mobile';
import {getCookie} from '../../utils/cookies';

/**
 * Created by sven on 2017/8/23.
 */
const PATH_MyWorks = "/myworks";

export default class Sczp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: {},
      name: '',
      zpName: '',
      files: [],
      multiple: false,
    }
  }

  componentDidMount() {
    getUploadToken()
      .then(data => {
        this.setState({
          token: data,
        })
      })
  }

  onNameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  onZpNameChange = (e) => {
    this.setState({
      zpName: e.target.value,
    });
  };


  onChange = (files) => {
    this.setState({
      files,
    });
  };

  uploadPath = (path, file) => {
    return `${path}/${getCookie("userId")}-${file.name}`
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {name, zpName, files, token} = this.state;
    if (name === "") {
      Toast.show("名称不能为空");
      return;
    }
    if (zpName === "") {
      Toast.show("作品名称不能为空");
      return;
    }
    if (files.length === 0) {
      Toast.show("图片不能为空");
      return;
    }

    var ossClient = new OSS.Wrapper({
      accessKeyId: token.accessKeyId,
      accessKeySecret: token.accessKeySecret,
      bucket: token.bucket,
      region: token.region,
    });
    Toast.loading("上传中...")
    const UploadToOss = (self, path, file) => {
      const url = this.uploadPath(path, file)
      return new Promise((resolve, reject) => {
        ossClient.multipartUpload(url, file).then(d => {
          const data = {
            name,
            zpName,
            images: [d.name]
          };

          //Toast.loading("上传中...")
          sendZuoPin(data).then(d => {
            if (d === undefined) {
              Toast.fail("上传失败");
              return;
            } else {
              Toast.success("上传成功");
              setTimeout(() => {
                hashHistory.push({pathname: PATH_MyWorks, state: {from: "login"}});
              }, 3000)
            }
          })

        }).catch(error => {
          reject(error)
          Toast.fail("上传失败")
        })
      })
    }


    UploadToOss(this, "images", this.state.files[0].file).then(data => {
      console.log('==============', data)
    })
  };


  onSubmit2 = (e) => {
    e.preventDefault();
    const {name, zpName, files} = this.state;
    if (name === "") {
      Toast.show("名称不能为空");
      return;
    }
    if (zpName === "") {
      Toast.show("作品名称不能为空");
      return;
    }
    if (files.length === 0) {
      Toast.show("图片不能为空");
      return;
    }

    //Toast.show("ss")
    const data = new FormData();
    data.append('name', name);
    data.append('zpName', zpName);
    files.forEach(e => {
      data.append('image[]', e.file);
    });
    //Toast.loading("上传中...")
    sendZuoPin(data).then(d => {
      if (d === undefined) {
        Toast.fail("上传失败");
        return;
      } else {
        Toast.success("上传成功");
        setTimeout(() => {
          hashHistory.push({pathname: PATH_MyWorks, state: {from: "login"}});
        }, 3000)
      }
    })
  };

  render() {
    const {name, zpName, files} = this.state;
    return (<div>
      <div className="title"><a href="javascript:void(0)" onClick={() => this.props.history.goBack()}></a>上传作品
      </div>
      <div className="content">
        <form action="" onSubmit={this.onSubmit}>
          <input type="text" className="text1" value={name} onChange={this.onNameChange}
                 placeholder="请输入作者名"/>
          <input type="text" className="text2" value={zpName} onChange={this.onZpNameChange}
                 placeholder="请输入作品名称"/>
          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 1}
            multiple={this.state.multiple}
          />
          <input type="submit" value="马上上传" onSubmit={this.onSubmit}/>
        </form>
      </div>
      <div className="bk"><img src={require("../../assets/images/bk_1.png")} alt=""/></div>
    </div>);
  }
}


