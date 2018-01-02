'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUpDown = updateUpDown;
exports.getAllUpDowns = getAllUpDowns;
exports.getUpdownsCounts = getUpdownsCounts;
exports.getALlReviewUpDowns = getALlReviewUpDowns;

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function updateUpDown(params) {
  return (0, _request2.default)('/api/updowns/' + params.id, {
    method: 'put',
    body: JSON.stringify(params)
  });
}

async function getAllUpDowns(params) {
  return (0, _request2.default)('/api/updowns?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&type=' + params.type + '&nickname=' + (params.nickname || ''), {
    method: 'get'
  });
}

async function getUpdownsCounts(params) {
  return (0, _request2.default)('/api/updowns/counts', {
    method: 'get'
  });
}

async function getALlReviewUpDowns(params) {
  return (0, _request2.default)('/api/updowns/review?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&startTime=' + (params.startTime || '') + '&endTime=' + (params.endTime || '') + '&nickname=' + (params.nickname || ''), {
    method: 'get'
  });
}
//# sourceMappingURL=updowns.js.map