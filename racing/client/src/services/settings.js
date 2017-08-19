import request from '../utils/request';

export async function setPlatConfing(params) {
  return request('/api/settings/platfrom',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getPlatConfing(params) {
  return request('/api/settings/platfrom',{
    method: 'get',
  });
}

export async function setRaceConfing(params) {
  return request('/api/settings/race',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getRaceConfing(params) {
  return request('/api/settings/race',{
    method: 'get',
  });
}

export async function setBetConfing(params) {
  return request('/api/settings/betting',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getBetConfing(params) {
  return request('/api/settings/betting',{
    method: 'get',
  });
}

export async function setPayment(params) {
  return request('/api/settings/payment',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getPayment(params) {
  return request(`/api/settings/payment?type=${params.type}`,{
    method: 'get',
  });
}

export async function sign_up(params) {
  return request('/api/sign_up', {
    method: 'post',
    body: JSON.stringify(params),
  });
}
