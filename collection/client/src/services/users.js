import request from '../utils/request';

export async function addUser(params) {
  return request('/api/users', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function updateUserBalanceByAdmin(params) {
  console.log(params)
  return request(`/api/users/${params.userid}/balance`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function setProxy(params) {
  console.log(params)
  return request(`/api/users/${params.userid}/proxy`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function getUser(params) {
  return request('/api/users/{userid}', {
    method: 'get',
  });
}

export async function getUserAccount(params) {
  return request(`/api/users/account?openid=${params}`, {
    method: 'get',
  });
}

export async function getAllUsers(params) {
  return request(`/api/users?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&username=${params.username || ''}`, {
    method: 'get',
  });
}

export async function getAllAgents(params) {
  return request(`/api/agents?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&username=${params.username || ''}`, {
    method: 'get',
  });
}

