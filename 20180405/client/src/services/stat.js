import request from '../utils/request';
import {ADMIN_ROOT} from './rootPath';

export async function addUQuiz(params) {
  return request(`${ADMIN_ROOT}/api/quizs`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getAllLotterys(params) {
  return request(`${ADMIN_ROOT}/api/stat/lotterys?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&type=${params.type || ''}&no=${params.no || ''}`, {
    method: 'get',
  });
}

export async function getAllBrokerages(params) {
  return request(`${ADMIN_ROOT}/api/stat/brokerages?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&createdAt=${params.createdAt || ''}`, {
    method: 'get',
  });
}

export async function getAllUserStats(params) {
  return request(`${ADMIN_ROOT}/api/stat/users?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&startTime=${params.startTime || ''}&endTime=${params.endTime || ''}`, {
    method: 'get',
  });
}

export async function getAllTerraceStats(params) {
  return request(`${ADMIN_ROOT}/api/stat/terrace?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&startTime=${params.startTime || ''}&endTime=${params.endTime || ''}`, {
    method: 'get',
  });
}

export async function getTodayTerraceWorth(params) {
  return request(`${ADMIN_ROOT}/api/stat/terrace/today`, {
    method: 'get',
  });
}

export async function getMonthTerraceWorth(params) {
  return request(`${ADMIN_ROOT}/api/stat/terrace/month`, {
    method: 'get',
  });
}


export async function getTodayNewUsers(params) {
  return request(`${ADMIN_ROOT}/api/stat/users/today`, {
    method: 'get',
  });
}

export async function getMonthNewUsers(params) {
  return request(`${ADMIN_ROOT}/api/stat/users/month`, {
    method: 'get',
  });
}

