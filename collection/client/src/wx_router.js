import React from 'react';
import {Router, Route, IndexRedirect} from 'dva/router';

import WxPage from './routes/WxPage';
import Index from './routes/wx/Index';
import Login from './routes/wx/Login'
import SignIn from './routes/wx/SignIn'
import MemberCenter from './routes/wx/MemberCenter';
import Deposit from './routes/wx/Deposit';
import Discounts from './routes/wx/Discounts';
import SetDrawMoney from './routes/wx/SetDrawMoney';
import XiaZhuJiLu from './routes/wx/XiaZhuJiLu';
import Ranking from './routes/wx/Ranking';
import FinanceRecords from './routes/wx/FinanceRecords';
import Statistics from './routes/wx/Statistics';
import GameGuide from './routes/wx/GameGuide';
import UnRead from './routes/wx/UnRead';
import Account from './routes/wx/Account';

import OpenRecord from './routes/wx/OpenRecord';

import KaiJiangLiShi from './routes/wx/KaiJiangLiShi';
import Agency from './routes/wx/Agency';

import CQSSC from './routes/wx/youxi/CQSSC';
import BJPK10 from './routes/wx/youxi/BJPK10';
import JSK3 from './routes/wx/youxi/JSK3';

function routerChange() {
  //document.getElementById("createOrderUserList").style.display = "none";
}
function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Route path="/" onEnter={routerChange} component={WxPage}>
        <IndexRedirect to="index"/>
        <Route path="index" component={Index}/>
        <Route path="login" component={Login}/>
        <Route path="sign" component={SignIn}/>

        <Route path="memberCenter" component={MemberCenter}/>
        <Route path="account" component={Account}/>
        <Route path="deposit" component={Deposit}/>
        <Route path="discounts" component={Discounts}/>
        <Route path="drawMoney" component={SetDrawMoney}/>
        <Route path="xiazhujilu" component={XiaZhuJiLu}/>
        <Route path="finance" component={FinanceRecords}/>
        <Route path="statistics" component={Statistics}/>
        <Route path="gameGuide" component={GameGuide}/>
        <Route path="unread" component={UnRead}/>

        <Route path="openRecord" component={OpenRecord}/>
        <Route path="youxi/cqssc" component={CQSSC}/>
        <Route path="youxi/bjpk10" component={BJPK10}/>
        <Route path="youxi/jsk3" component={JSK3}/>
        <Route path="kaijianglishi" component={KaiJiangLiShi}/>
        <Route path="ranking" component={Ranking}/>
        <Route path="agency" component={Agency}/>


        {/*<Route path="detail" component={Detail}/>*/}
      </Route>
      {/*<Route path="/my" onEnter={routerChange} component={My}>*/}
      {/*<Route path="shangfen" component={ShangFen}/>*/}
      {/*<Route path="xiafen" component={XiaFen}/>*/}
      {/*<Route path="qianbao" component={QianBao}/>*/}
      {/*<Route path="czjl" component={Czjl}/>*/}
      {/*<Route path="wdxx" component={Wodexiaxian}/>*/}
      {/*<Route path="jymx" component={Jymx}/>*/}
      {/*</Route>*/}

    </Router>
  );
}

export default RouterConfig;
