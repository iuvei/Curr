import { parse, stringify } from 'qs';
import request from '../utils/request';

//https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect

export async function getAuth() {
   return request(`/m/api/auth`,{
    method: 'get',
  });
}

export async function getUserInfo() {
  return request(`/m/api/users/id`,{
    method: 'get',
  });
}

export async function getWxInfo() {
  console.log(window.location.href, document.domain, window.location.host)
  const params = {
    appid:'wxf0e81c3bee622d60',
    redirect_uri: `http://${document.domain}/m/api/auth`,
    response_type: 'code',
    scope: 'snsapi_userinfo',
    state: '',
  }
  //return request('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf0e81c3bee622d60&redirect_uri=http%3A%2F%2Fnba.bluewebgame.com%2Foauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect',{
  return request(`https://open.weixin.qq.com/connect/oauth2?${stringify(params)}#wechat_redirect`,{
      method: 'get',
    params: params,
  });
}

export async function getCurrent(params) {
  return request('/m/api/current',{
    method: 'get',
  });
}

export async function getAllMessages(params) {
  return request(`/m/api/messages?no=${params.no}`,{
    method: 'get',
  });
}

export async function getUser(params) {
  return request('/api/quizs/{userid}',{
    method: 'get',
  });
}

export async function getAllQuizs(params) {
  return request(`/api/quizs?pageSize=${params.pageSize||10}&currPage=${params.currPage||1}&no=${params.no||''}&username=${params.username||''}`,{
    method: 'get',
  });
}

