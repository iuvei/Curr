import React, {Component} from 'react';
import Frame from 'react-frame-component';
import GamePk10 from '../../pk10/Index';
import "../../assets/mobile/css/common.css";

/**
 * Created by sven on 2017/8/2.
 */

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputShow: false,
    }
  }

  render() {
    return (
      <div className="iframeDiv">
       <GamePk10 requestUrl="/m/api/live" sceneryType="scenery"/>
        {/*<iframe src="video.html" frameBorder="0" className="iframe"></iframe>*/}
      </div>
    );
  }
}


