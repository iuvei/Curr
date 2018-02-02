import request from '../utils/request';
import {ADMIN_ROOT} from './rootPath';

export async function addUser(params) {
  return request(`${ADMIN_ROOT}/api/users`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function updateUserBalanceByAdmin(params) {
  console.log(params)
  return request(`${ADMIN_ROOT}/api/users/${params.userid}/balance`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function setProxy(params) {
  console.log(params)
  return request(`${ADMIN_ROOT}/api/users/${params.userid}/proxy`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function getUser(params) {
  return request(`${ADMIN_ROOT}/api/users/{userid}`, {
    method: 'get',
  });
}

export async function getUserAccount(params) {
  return request(`${ADMIN_ROOT}/api/users/account?openid=${params}`, {
    method: 'get',
  });
}

export async function getAllUsers(params) {
  return request(`${ADMIN_ROOT}/api/users?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&username=${params.username || ''}`, {
    method: 'get',
  });
}

export async function getAllAgents(params) {
  return request(`${ADMIN_ROOT}/api/agents?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&username=${params.username || ''}`, {
    method: 'get',
  });
}

