import {parse, stringify} from 'qs';
import {MOBILE_ROOT} from './rootPath';
import request from '../utils/request';
import moment from 'moment';
export async function getAnnouncement() {
  return request(`${MOBILE_ROOT}/api/announcement`, {
    method: 'get',
  });
}

// /m/api/live
export async function getLive(params) {
  return request(`${MOBILE_ROOT}/api/live?type=${params.type || ''}`, {
    method: 'get',
  });
}

//下注
export async function bet(params) {
  return request(`${MOBILE_ROOT}/api/users/bet`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}


//获取开奖信息
export async function getCurrLottery(params) {
  return request(`${MOBILE_ROOT}/api/lotterys/current?type=${params.type}`, {
    method: 'get',
  });
}

//获取微信公众号信息（这里仅appID）
export async function getConfig() {
  return request(`${MOBILE_ROOT}/api/config`, {
    method: 'get',
  });
}

export async function registerUser(params) {
  console.log(params)
  return request(`${MOBILE_ROOT}/api/users/register`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}


export async function loginUser(params) {
  console.log(params)
  return request(`${MOBILE_ROOT}/api/users/login`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}


//获取用户信息（微信登录）
export async function getUserInfo(params) {
  return request(`${MOBILE_ROOT}/api/userinfo`, {
    method: 'get',
  });
}


//获取详情 （密码登录）
export async function getUserDetail(params) {
  return request(`${MOBILE_ROOT}/api/users/${params.userid}`, {
    method: 'get',
  });
}

//获取客服图片
export async function getCustomerImg(params) {
  return request(`${MOBILE_ROOT}/api/getCustomerImg`, {
    method: 'get',
  });
}

export async function getAllMessages(params) {
  //return request(`/m/api/messages?no=${params.no}`, {
  return request(`${MOBILE_ROOT}/api/messages`, {
    method: 'get',
  });
}

//获取账户余额等
export async function getAccount(params) {
  return request(`${MOBILE_ROOT}/api/account?userid=${params.userid || ''}`, {
    method: 'get',
  });
}

//获取支付方式图片
export async function getPayment(params) {
  return request(`${MOBILE_ROOT}/api/settings/payment?type=${params.type || ''}`, {
    method: 'get',
  });
}


//上分
export async function addUpReq(params) {
  return request(`${MOBILE_ROOT}/api/up`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}
//下分
export async function addDownReq(params) {
  return request(`${MOBILE_ROOT}/m/api/down`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

//上下分记录，即充值记录
export async function getRechargeRecords(params) {
  return request(`${MOBILE_ROOT}/api/updowns/${params.openid}`, {
    method: 'get',
  });
}

//下注记录，即交易记录
export async function getQuizRecords(params) {
  return request(`${MOBILE_ROOT}/api/quizs/${params.userid}?day=${params.day || moment().format("YYYY-MM-DD")}`, {
    method: 'get',
  });
}

//开奖记录
export async function getLotterys(params) {
  return request(`${MOBILE_ROOT}/api/lotterys?type=${params.type}&day=${params.day || moment().format("YYYY-MM-DD")}`, {
    method: 'get',
  });
}

//长龙
export async function getChanLong(params) {
  return request(`${MOBILE_ROOT}/api/lotterys/changlong?type=${params.type}&day=${params.day || moment().format("YYYY-MM-DD")}`, {
    method: 'get',
  });
}

export async function getAllQuizs(params) {
  return request(`${MOBILE_ROOT}/api/quizs?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&no=${params.no || ''}&username=${params.username || ''}`, {
    method: 'get',
  });
}

