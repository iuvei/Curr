import { parse } from 'qs';
import {getAllMessages, getCurrent} from '../services/mobile';
export default {
  namespace: 'mobile',
  state: {
    no: '20170810',
    users: [],
    messages: [],
  },
  reducers: {
    updateState(state, action) {
      console.log(action)
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  effects: {
    *getCurrent({
      payload,
    }, {call, put}) {
      const data = yield call(getCurrent, parse(payload));
      console.log('=====================', data)
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {...data.data},
        });
      }
    },
    *getMessages({
      payload,
    }, {call, put}) {
      const data = yield call(getAllMessages, parse(payload));
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            messages: data.result,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({dispatch}) {
      //dispatch({type: 'getCurrent'});
      //dispatch({type: 'getMessages'});
    },
  },
};
