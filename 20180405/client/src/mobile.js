import dva from 'dva';
import { hashHistory } from 'dva/router';
import createLoading from 'dva-loading';
import './mobile.css';

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(e) {
    //message.error(e.message, /* duration */5);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/mobile"));

// 4. Router
app.router(require('./mobile_router'));

// 5. Start
app.start('#root');
