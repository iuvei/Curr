'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addRobot = addRobot;
exports.editRobot = editRobot;
exports.deleteRobot = deleteRobot;
exports.getAllRobots = getAllRobots;
exports.addRobotGuess = addRobotGuess;
exports.editRobotGuess = editRobotGuess;
exports.deleteRobotGuess = deleteRobotGuess;
exports.getAllRobotGuesses = getAllRobotGuesses;

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function addRobot(params) {
  return (0, _request2.default)('/api/robots', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function editRobot(params) {
  return (0, _request2.default)('/api/robots/' + params.id, {
    method: 'put',
    body: JSON.stringify(params)
  });
}

async function deleteRobot(params) {
  return (0, _request2.default)('/api/robots/' + params.id, {
    method: 'delete'
  });
}

async function getAllRobots(params) {
  return (0, _request2.default)('/api/robots?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1) + '&nickname=' + (params.nickname || ''), {
    method: 'get'
  });
}

//竞猜规则

async function addRobotGuess(params) {
  return (0, _request2.default)('/api/robots/guesses', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function editRobotGuess(params) {
  return (0, _request2.default)('/api/robots/guesses//' + params.id, {
    method: 'put',
    body: JSON.stringify(params)
  });
}

async function deleteRobotGuess(params) {
  return (0, _request2.default)('/api/robots/guesses/' + params.id, {
    method: 'delete'
  });
}

async function getAllRobotGuesses(params) {
  return (0, _request2.default)('/api/robots/guesses?pageSize=' + (params.pageSize || 10) + '&currPage=' + (params.currPage || 1), {
    method: 'get'
  });
}
//# sourceMappingURL=robots.js.map