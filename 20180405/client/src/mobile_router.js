import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';
import MobilePage from './routes/MobilePage';
import Index from './routes/mobile/Index';
import Login from './routes/mobile/Login';
import FairDetail from './routes/mobile/FairDetail';
import MyWorks from './routes/mobile/MyWorks';
import Regulate from './routes/mobile/Regulate';
import Sczp from './routes/mobile/Sczp';
import Tpym from './routes/mobile/Tpym';
import Tpym_xq from './routes/mobile/Tpym_xq';
import Wdjp from './routes/mobile/Wdjp';
import Lottery from './routes/mobile/Lottery';
import LotteryResult from './routes/mobile/LotteryResult';
import Admin from './routes/mobile/Admin';

function routerChange() {
  //document.getElementById("createOrderUserList").style.display = "none";
}
function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/index" component={Index}/>
      <Route path="/fair" component={FairDetail}/>
      <Route path="/login" component={Login}/>
      <Route path="/tpym_xq" component={Tpym_xq}/>
      <Route path="/admin" component={Admin}/>

      <Route path="/" onEnter={routerChange} component={MobilePage}>
        <IndexRedirect to='index'/>
        <Route path="login" component={Login}/>
        <Route path="myworks" component={MyWorks}/>
        <Route path="regulate" component={Regulate}/>
        <Route path="sczp" component={Sczp}/>
        <Route path="tpym" component={Tpym}/>
        <Route path="wdjp" component={Wdjp}/>
        <Route path="lottery" component={Lottery}/>
        <Route path="lotteryResult" component={LotteryResult}/>
      </Route>
    </Router>
  );
}

export default RouterConfig;
