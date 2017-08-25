import {parse} from 'qs';
import {getAllMessages, getUserInfo} from '../services/mobile';
export default {
  namespace: 'mobile',
  state: {
    no: '20170810',
    userinfo: {openid: ''},
    message: [],
  },
  reducers: {
    updateState(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    // *getUserInfo({
    //   payload,
    // }, {call, put}) {
    //   const data = yield call(getUserInfo, parse(payload));
    //   if (data.success) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {userinfo: data.result.userinfo},
    //     });
    //   }
    // },
    // *getMessages({
    //   payload,
    // }, {call, put}) {
    //   const data = yield call(getAllMessages, parse(payload));
    //   if (data.success) {
    //     yield put({
    //       type: 'updateState',
    //       payload: {
    //         messages: data.result,
    //       },
    //     });
    //   }
    // },
  },
  subscriptions: {
    setup({dispatch}) {
      //dispatch({type: 'getUserInfo'});
      //dispatch({type: 'getMessages'});
    },
  },
};
