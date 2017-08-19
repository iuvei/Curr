import {parse, stringify} from 'qs';
import request from '../utils/request';

export async function getAuth() {
  return request(`/m/api/auth`, {
    method: 'get',
  });
}

export async function getUserInfo() {
  return request(`/m/api/userinfo`, {
    method: 'get',
  });
}

export async function getCustomerImg(params) {
  return request('/m/api/getCustomerImg', {
    method: 'get',
  });
}

export async function getAllMessages(params) {
  return request(`/m/api/messages?no=${params.no}`, {
    method: 'get',
  });
}

export async function getUser(params) {
  return request('/api/quizs/{userid}', {
    method: 'get',
  });
}

export async function getAllQuizs(params) {
  return request(`/api/quizs?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&no=${params.no || ''}&username=${params.username || ''}`, {
    method: 'get',
  });
}

