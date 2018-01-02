import {user_update, sign_in, getSettings} from '../services/users';
import { parse } from 'qs';
import {message} from 'antd';
export default {

  namespace: 'app',

  state: {
    current: '/index',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        dispatch({ type: 'updateState', payload: { current: pathname } });
      });
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  },

};
