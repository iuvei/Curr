import {parse, stringify} from 'qs';
import request from '../utils/request';
import {getCookie} from '../utils/cookies';

export async function getUploadToken() {
  return request(`/v1/token`, {
    method: 'GET',
  });
}

//上传
export async function sendZuoPin(params) {
  return request(`/v1/users/${getCookie('userId')}/zp`, {
    method: 'PUT',
    //headers: {"Content-Length": params.size},
    body: JSON.stringify(params),
  });
}

//获取作品
export async function getUsersZuoPin() {
  return request(`/v1/users/${getCookie('userId')}/zps`, {
      method: 'GET',
    }
  )
}


//获取用户信息
export async function getUserByUserId(params) {
  return request(`/v1/users/${params.userId}`, {
    method: 'get',
  });
}

//抽奖
export async function putChoujiang(params) {
  return request(`/v1/users/${params.userId || ''}/choujiang`, {
    method: 'PUT',
    //body: JSON.stringify(params),
  });
}


//通过排序条件获取作品
export async function getZuoPins(params) {
  return request(`/v1/zps?sorted=${params.sorted || ''}&status=${params.status}`, {
      method: 'GET',
    }
  )
}

//删除
export async function deleteZuoPins(params) {
  return request(`/v1/zps/${params.id}`, {
      method: 'DELETE',
    }
  )
}

//作品审核通过
export async function putZuoPinongguo(params) {
  return request(`/v1/zps/${params.id}/tongguo`, {
    method: 'PUT'
  });
}

//作品投票
export async function putZuoPinTouPiao(params) {
  return request(`/v1/zps/${params.id}/toupiao`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

export async function putPv(params) {
  return request(`/v1/zps/${params.id}/pv`, {
    method: 'PUT',
  });
}

export async function getLotteryResult(params) {
  return request(`/v1/lottery?userId=${params.userId}`, {
    method: 'GET'
  });
}

export async function getAllLotteryResult(params) {
  return request(`/v1/lottery?result=1`, {
    method: 'GET'
  });
}

export async function postLotteryResult(params) {
  return request(`/v1/lottery`, {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function putLotteryResult(params) {
  return request(`/v1/lottery/${params.userId}`, {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}


export async function getAllMessages(params) {
  //return request(`/m/api/messages?no=${params.no}`, {
  return request(`/m/api/messages`, {
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

//下注记录，即交易记录
export async function getQuizRecords(params) {
  return request(`/m/api/quizs/${params.openid}`, {
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

