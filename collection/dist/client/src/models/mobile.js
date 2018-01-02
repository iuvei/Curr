'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  namespace: 'mobile',
  state: {},
  reducers: {},
  effects: {
    getMessages: regeneratorRuntime.mark(function getMessages(_ref, _ref2) {
      var payload = _ref.payload;
      var call = _ref2.call,
          put = _ref2.put;
      var data;
      return regeneratorRuntime.wrap(function getMessages$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return call(queryMessages, parse(payload));

            case 2:
              data = _context.sent;

              if (!data.success) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return put({
                type: 'updateState',
                payload: {
                  messages: data.result
                }
              });

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, getMessages, this);
    })
  },
  subscriptions: {}
};
//# sourceMappingURL=mobile.js.map