'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPlatConfing = setPlatConfing;
exports.getPlatConfing = getPlatConfing;
exports.setRaceConfing = setRaceConfing;
exports.getRaceConfing = getRaceConfing;
exports.setBetConfing = setBetConfing;
exports.getBetConfing = getBetConfing;
exports.setPayment = setPayment;
exports.getPayment = getPayment;
exports.setAnnouncement = setAnnouncement;
exports.getAnnouncement = getAnnouncement;
exports.sign_up = sign_up;

var _request = require('../utils/request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function setPlatConfing(params) {
  return (0, _request2.default)('/api/settings/platfrom', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getPlatConfing(params) {
  return (0, _request2.default)('/api/settings/platfrom', {
    method: 'get'
  });
}

async function setRaceConfing(params) {
  return (0, _request2.default)('/api/settings/race', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getRaceConfing(params) {
  return (0, _request2.default)('/api/settings/race', {
    method: 'get'
  });
}

async function setBetConfing(params) {
  return (0, _request2.default)('/api/settings/betting', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getBetConfing(params) {
  return (0, _request2.default)('/api/settings/betting', {
    method: 'get'
  });
}

async function setPayment(params) {
  return (0, _request2.default)('/api/settings/payment', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getPayment(params) {
  return (0, _request2.default)('/api/settings/payment?type=' + params.type, {
    method: 'get'
  });
}

async function setAnnouncement(params) {
  return (0, _request2.default)('/api/settings/announcement', {
    method: 'post',
    body: JSON.stringify(params)
  });
}

async function getAnnouncement(params) {
  return (0, _request2.default)('/api/settings/announcement', {
    method: 'get'
  });
}

async function sign_up(params) {
  return (0, _request2.default)('/api/sign_up', {
    method: 'post',
    body: JSON.stringify(params)
  });
}
//# sourceMappingURL=settings.js.map