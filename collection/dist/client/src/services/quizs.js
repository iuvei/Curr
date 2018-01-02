'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUQuiz = addUQuiz;
exports.getUser = getUser;
exports.getAllQuizs = getAllQuizs;

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addUQuiz(params) {
  return (0, _request2.default)('/api/quizs', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getUser(params) {
  return (0, _request2.default)('/api/quizs/{userid}', {
    method: 'get'
  });
}

async function getAllQuizs(params) {
  return (0, _request2.default)('/api/quizs?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&no=' + (params.no || '') + '&username=' + (params.username || ''), {
    method: 'get'
  });
}
//# sourceMappingURL=quizs.js.map