import {parse, stringify} from 'qs';
import request from '../utils/request';

export async function getAuth() {
  return request(`/m/api/auth`, {
    method: 'get',
  });
}

//获取微信公众号信息（这里仅appID）
export async function getConfig() {
  return request(`/m/api/config`, {
    method: 'get',
  });
}

//获取用户信息
export async function getUserInfo() {
  return request(`/m/api/userinfo`, {
    method: 'get',
  });
}

//获取客服图片
export async function getCustomerImg(params) {
  return request('/m/api/getCustomerImg', {
    method: 'get',
  });
}

export async function getAllMessages(params) {
  return request(`/m/api/messages?no=${params.no}`, {
    method: 'get',
  });
}

//获取账户余额等
export async function getAccount(params) {
  return request(`/m/api/account?openid=${params.openid}`, {
    method: 'get',
  });
}

//获取支付方式图片
export async function getPayment(params) {
  return request(`/m/api/settings/payment?type=${params.type}`, {
    method: 'get',
  });
}


//上分
export async function addUpReq(params) {
  return request('/m/api/up', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
//下分
export async function addDownReq(params) {
  return request('/m/api/down', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

//上下分记录，即充值记录
export async function getRechargeRecords(params) {
  return request(`/m/api/updowns/${params.openid}`, {
    method: 'get',
  });
}

//开奖记录
export async function getLotterys(params) {
  return request('/m/api/lotterys', {
    method: 'get',
  });
}


export async function getAllQuizs(params) {
  return request(`/api/quizs?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&no=${params.no || ''}&username=${params.username || ''}`, {
    method: 'get',
  });
}

