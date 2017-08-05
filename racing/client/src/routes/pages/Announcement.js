import React, {Component} from 'react';
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router';
import '../../assets/backend/css/announcement.css'
/**
 * Created by sven on 2017/8/4.
 */

export default class Announcement extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
          <div className="r_aside">
            <div className="position">
              <span>发布公告</span>
            </div>
            <section className="contentBox clearfloat">
              <span className="fl">公告内容：</span>
              <div className="cont fl">
                <textarea title="content"></textarea>
                <p>发布后，所有在线会员都可以看到</p>
                <button type="submit">确认</button>
              </div>
            </section>
          </div>
        );
    }
}


