import dva from 'dva';
import { hashHistory } from 'dva/router';
import { message } from 'antd';
import createLoading from 'dva-loading';
import './admin.css';

// 1. Initialize
const app = dva({
  history: hashHistory,
  onError(e) {
    message.error(e.message, /* duration */5);
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/context'));

// 4. Router
app.router(require('./admin_router'));

// 5. Start
app.start('#root');
