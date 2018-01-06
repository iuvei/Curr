'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUQuiz = addUQuiz;
exports.getAllLotterys = getAllLotterys;
exports.getAllBrokerages = getAllBrokerages;
exports.getAllUserStats = getAllUserStats;
exports.getAllTerraceStats = getAllTerraceStats;
exports.getTodayTerraceWorth = getTodayTerraceWorth;
exports.getMonthTerraceWorth = getMonthTerraceWorth;
exports.getTodayNewUsers = getTodayNewUsers;
exports.getMonthNewUsers = getMonthNewUsers;

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addUQuiz(params) {
  return (0, _request2.default)('/api/quizs', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getAllLotterys(params) {
  return (0, _request2.default)('/api/stat/lotterys?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&type=' + (params.type || '') + '&no=' + (params.no || ''), {
    method: 'get'
  });
}

async function getAllBrokerages(params) {
  return (0, _request2.default)('/api/stat/brokerages?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&createdAt=' + (params.createdAt || ''), {
    method: 'get'
  });
}

async function getAllUserStats(params) {
  return (0, _request2.default)('/api/stat/users?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&startTime=' + (params.startTime || '') + '&endTime=' + (params.endTime || ''), {
    method: 'get'
  });
}

async function getAllTerraceStats(params) {
  return (0, _request2.default)('/api/stat/terrace?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&startTime=' + (params.startTime || '') + '&endTime=' + (params.endTime || ''), {
    method: 'get'
  });
}

async function getTodayTerraceWorth(params) {
  return (0, _request2.default)('/api/stat/terrace/today', {
    method: 'get'
  });
}

async function getMonthTerraceWorth(params) {
  return (0, _request2.default)('/api/stat/terrace/month', {
    method: 'get'
  });
}

async function getTodayNewUsers(params) {
  return (0, _request2.default)('/api/stat/users/today', {
    method: 'get'
  });
}

async function getMonthNewUsers(params) {
  return (0, _request2.default)('/api/stat/users/month', {
    method: 'get'
  });
}
//# sourceMappingURL=stat.js.map