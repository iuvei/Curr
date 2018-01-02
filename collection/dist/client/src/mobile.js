'use strict';

var _dva = require('dva');

var _dva2 = _interopRequireDefault(_dva);

var _router = require('dva/router');

var _antd = require('antd');

var _dvaLoading = require('dva-loading');

var _dvaLoading2 = _interopRequireDefault(_dvaLoading);

require('./mobile.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1. Initialize
var app = (0, _dva2.default)({
  history: _router.hashHistory,
  onError: function onError(e) {
    _antd.message.error(e.message, /* duration */5);
  }
});

// 2. Plugins
app.use((0, _dvaLoading2.default)());

// 3. Model
app.model(require("./models/mobile"));

// 4. Router
app.router(require('./mobile_router'));

// 5. Start
app.start('#root');
//# sourceMappingURL=mobile.js.map