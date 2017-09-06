import request from '../utils/request';

export async function addRobot(params) {
  return request('/api/robots', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function editRobot(params) {
  return request(`/api/robots/${params.id}`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function getRobot(params) {
  return request('/api/robots/{userid}', {
    method: 'get',
  });
}

export async function deleteRobot(params) {
  return request(`/api/robots/${params.id}`, {
    method: 'delete',
  });
}


export async function getAllRobots(params) {
  return request(`/api/robots?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&nickname=${params.nickname || ''}`, {
    method: 'get',
  });
}

