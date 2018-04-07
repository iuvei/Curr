import request from '../utils/request';
import {ADMIN_ROOT} from './rootPath';

export async function addRobot(params) {
  return request(`${ADMIN_ROOT}/api/robots`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function editRobot(params) {
  return request(`${ADMIN_ROOT}/api/robots/${params.id}`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function deleteRobot(params) {
  return request(`${ADMIN_ROOT}/api/robots/${params.id}`, {
    method: 'delete',
  });
}


export async function getAllRobots(params) {
  return request(`${ADMIN_ROOT}/api/robots?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&nickname=${params.nickname || ''}`, {
    method: 'get',
  });
}

//竞猜规则

export async function addRobotGuess(params) {
  return request(`${ADMIN_ROOT}/api/robots/guesses`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function editRobotGuess(params) {
  return request(`${ADMIN_ROOT}/api/robots/guesses//${params.id}`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function deleteRobotGuess(params) {
  return request(`${ADMIN_ROOT}/api/robots/guesses/${params.id}`, {
    method: 'delete',
  });
}


export async function getAllRobotGuesses(params) {
  return request(`${ADMIN_ROOT}/api/robots/guesses?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}`, {
    method: 'get',
  });
}

