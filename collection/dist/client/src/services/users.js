'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = addUser;
exports.updateUserBalanceByAdmin = updateUserBalanceByAdmin;
exports.setProxy = setProxy;
exports.getUser = getUser;
exports.getUserAccount = getUserAccount;
exports.getAllUsers = getAllUsers;
exports.getAllAgents = getAllAgents;

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addUser(params) {
  return (0, _request2.default)('/api/users', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function updateUserBalanceByAdmin(params) {
  console.log(params);
  return (0, _request2.default)('/api/users/' + params.openid + '/balance', {
    method: 'put',
    body: JSON.stringify(params)
  });
}

async function setProxy(params) {
  console.log(params);
  return (0, _request2.default)('/api/users/' + params.openid + '/proxy', {
    method: 'put',
    body: JSON.stringify(params)
  });
}

async function getUser(params) {
  return (0, _request2.default)('/api/users/{userid}', {
    method: 'get'
  });
}

async function getUserAccount(params) {
  return (0, _request2.default)('/api/users/account?openid=' + params, {
    method: 'get'
  });
}

async function getAllUsers(params) {
  return (0, _request2.default)('/api/users?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&username=' + (params.username || ''), {
    method: 'get'
  });
}

async function getAllAgents(params) {
  return (0, _request2.default)('/api/agents?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&username=' + (params.username || ''), {
    method: 'get'
  });
}
//# sourceMappingURL=users.js.map