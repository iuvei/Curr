import request from '../utils/request';

export async function addUser(params) {
  return request('/api/users',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getUser(params) {
  return request('/api/users/{userid}',{
    method: 'get',
  });
}

export async function getAllUsers(params) {
  return request(`/api/users?pageSize=${params.pageSize||10}&currPage=${params.currPage||1}&username=${params.username||''}`,{
    method: 'get',
  });
}

