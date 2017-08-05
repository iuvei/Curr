import React from 'react';
import { connect } from 'dva';
import Sider from '../components/Layout/Sider';
import Nav from '../components/Layout/Nav';
import '../assets/backend/css/common.css';

function IndexPage({children, dispatch, app}) {
  console.log('==', app)
  //const {current} = app;

  function handleOk(data) {
    dispatch({
      type: 'app/sign_in',
      payload: data,
    })
  }

  const siderProps = {
   // current,
  }
  return (
    <div>
      <Sider {...siderProps}/>
      <Nav/>
      {children}
    </div>
  );
}

function mapStateToProps(state) {
  console.log('===================', state)
  return {app: state.app, loading: state.loading.models.app};
}


export default connect(mapStateToProps)(IndexPage);
