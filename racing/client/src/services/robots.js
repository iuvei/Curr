import request from '../utils/request';

export async function addRobot(pbarams) {
  return request('/api/robots',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getRobot(params) {
  return request('/api/robots/{userid}',{
    method: 'get',
  });
}

export async function getAllRobots(params) {
  return request(`/api/robots?pageSize=${params.pageSize||10}&currPage=${params.currPage||1}&username=${params.username||''}`,{
    method: 'get',
  });
}

