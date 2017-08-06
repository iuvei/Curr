import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Index from './routes/pages/Index';
import Configuration from './routes/pages/Configuration';
import Settings from './routes/pages/Settings';
import SetBetting from './routes/pages/SetBetting';
import Member from './routes/pages/Member';
import Quiz from './routes/pages/Quiz';
import UpDownApplication from './routes/pages/UpDownApplication';
import UpDownRecepits from './routes/pages/UpDownRecepits';
import UpDownReview from './routes/pages/UpDownReview';
import Proxy from './routes/pages/Proxy';
import Brokerage from './routes/pages/Brokerage';
import DataGather from './routes/pages/DataGather';
import StatUsers from './routes/pages/StatUsers';
import StatTerrace from './routes/pages/StatTerrace';


import RobotMgr from './routes/pages/RobotMgr';
import RobotGuess from './routes/pages/RobotGuess';
import Announcement from './routes/pages/Announcement';
function RouterConfig({history}) {
  function routerChange(){
    //document.getElementById("createOrderUserList").style.display = "none";
  }
  return (
    <Router history={history}>
      <Route path="/" onEnter={routerChange} component={IndexPage}>
        <IndexRedirect to="index"/>
        <Route path="index" component={Index}/>
        <Route path="config" component={Configuration}/>
        <Route path="settings" component={Settings}/>
        <Route path="setbetting" component={SetBetting}/>
        <Route path="member" component={Member}/>
        <Route path="quiz" component={Quiz}/>
        <Route path="updown_up" component={UpDownApplication}/>
        <Route path="updown_down" component={UpDownApplication}/>
        <Route path="upddown_recepites" component={UpDownRecepits}/>
        <Route path="updown_review" component={UpDownReview}/>
        <Route path="proxy" component={Proxy}/>
        <Route path="brokerage" component={Brokerage}/>
        <Route path="dataGather" component={DataGather}/>
        <Route path="statUsers" component={StatUsers}/>
        <Route path="statTerrace" component={StatTerrace}/>

        <Route path="robotMgr" component={RobotMgr}/>
        <Route path="robotGuess" component={RobotGuess}/>

        <Route path="announcement" component={Announcement}/>

      </Route>
    </Router>
  );
}

export default RouterConfig;
