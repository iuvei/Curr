import request from '../utils/request';

export async function addUQuiz(params) {
  return request('/api/quizs', {
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getAllLotterys(params) {
  return request(`/api/stat/lotterys?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&no=${params.no || ''}`, {
    method: 'get',
  });
}

export async function getAllBrokerages(params) {
  return request(`/api/stat/brokerages?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&createdAt=${params.createdAt || ''}`, {
    method: 'get',
  });
}

export async function getAllUserStats(params) {
  return request(`/api/stat/users?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&startTime=${params.startTime || ''}&endTime=${params.endTime || ''}`, {
    method: 'get',
  });
}

export async function getAllTerraceStats(params) {
  return request(`/api/stat/terrace?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&startTime=${params.startTime || ''}&endTime=${params.endTime || ''}`, {
    method: 'get',
  });
}

export async function getTodayTerraceWorth(params) {
  return request('/api/stat/terrace/today', {
    method: 'get',
  });
}

export async function getMonthTerraceWorth(params) {
  return request('/api/stat/terrace/month', {
    method: 'get',
  });
}


export async function getTodayNewUsers(params) {
  return request('/api/stat/users/today', {
    method: 'get',
  });
}

export async function getMonthNewUsers(params) {
  return request('/api/stat/users/month', {
    method: 'get',
  });
}

