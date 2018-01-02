'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnnouncement = getAnnouncement;
exports.getCurrLottery = getCurrLottery;
exports.getConfig = getConfig;
exports.getUserInfo = getUserInfo;
exports.getCustomerImg = getCustomerImg;
exports.getAllMessages = getAllMessages;
exports.getAccount = getAccount;
exports.getPayment = getPayment;
exports.addUpReq = addUpReq;
exports.addDownReq = addDownReq;
exports.getRechargeRecords = getRechargeRecords;
exports.getQuizRecords = getQuizRecords;
exports.getLotterys = getLotterys;
exports.getAllQuizs = getAllQuizs;

var _qs = require('qs');

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function getAnnouncement() {
  return (0, _request2.default)('/m/api/announcement', {
    method: 'get'
  });
}

//获取开奖信息
async function getCurrLottery() {
  return (0, _request2.default)('/m/api/lotterys/current', {
    method: 'get'
  });
}

//获取微信公众号信息（这里仅appID）
async function getConfig() {
  return (0, _request2.default)('/m/api/config', {
    method: 'get'
  });
}

//获取用户信息
async function getUserInfo() {
  return (0, _request2.default)('/m/api/userinfo', {
    method: 'get'
  });
}

//获取客服图片
async function getCustomerImg(params) {
  return (0, _request2.default)('/m/api/getCustomerImg', {
    method: 'get'
  });
}

async function getAllMessages(params) {
  //return request(`/m/api/messages?no=${params.no}`, {
  return (0, _request2.default)('/m/api/messages', {
    method: 'get'
  });
}

//获取账户余额等
async function getAccount(params) {
  return (0, _request2.default)('/m/api/account?openid=' + params.openid, {
    method: 'get'
  });
}

//获取支付方式图片
async function getPayment(params) {
  return (0, _request2.default)('/m/api/settings/payment?type=' + params.type, {
    method: 'get'
  });
}

//上分
async function addUpReq(params) {
  return (0, _request2.default)('/m/api/up', {
    method: 'post',
    body: JSON.stringify(params)
  });
}
//下分
async function addDownReq(params) {
  return (0, _request2.default)('/m/api/down', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

//上下分记录，即充值记录
async function getRechargeRecords(params) {
  return (0, _request2.default)('/m/api/updowns/' + params.openid, {
    method: 'get'
  });
}

//下注记录，即交易记录
async function getQuizRecords(params) {
  return (0, _request2.default)('/m/api/quizs/' + params.openid, {
    method: 'get'
  });
}

//开奖记录
async function getLotterys(params) {
  return (0, _request2.default)('/m/api/lotterys', {
    method: 'get'
  });
}

async function getAllQuizs(params) {
  return (0, _request2.default)('/api/quizs?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&no=' + (params.no || '') + '&username=' + (params.username || ''), {
    method: 'get'
  });
}
//# sourceMappingURL=mobile.js.map