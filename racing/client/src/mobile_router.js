import React from 'react';
import { Router, Route , IndexRedirect} from 'dva/router';
import MobilePage from './routes/MobilePage';
import Index from './routes/mobile/Index'
import Agency from './routes/mobile/Agency'
import Detail from './routes/mobile/Detail'
import HowToPlay from './routes/mobile/HowToPlay'
import QianBao from './routes/mobile/QianBao'
import ShangFen from './routes/mobile/ShangFen'
import XiaFen from './routes/mobile/XiaFen'

function routerChange(){
  //document.getElementById("createOrderUserList").style.display = "none";
}
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" onEnter={routerChange} component={MobilePage}>
        <IndexRedirect to="index"/>
        <Route path="index" component={Index}/>
        <Route path="detail" component={Detail}/>
        <Route path="howtoplay" component={HowToPlay}/>
      </Route>
      <Route path="/agency" component={Agency}/>
      <Route path="/shangfen" component={ShangFen}/>
      <Route path="/xiafen" component={XiaFen}/>
      <Route path="/qianbao" component={QianBao}/>
    </Router>
  );
}

export default RouterConfig;
