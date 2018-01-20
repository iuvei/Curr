import {parse} from 'qs';
import {getAllMessages, getUserDetail} from '../services/wxEnd';
import {getCookie} from '../utils/cookies';
export default {
  namespace: 'wx',
  state: {
    no: 20170810,
    logged: getCookie("logged")||false,
    userinfo: {},
    message: {},
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
    //   const data = yield call(getUserDetail, parse(payload));
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
