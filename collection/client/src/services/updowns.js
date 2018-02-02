import request from '../utils/request';
import {ADMIN_ROOT} from './rootPath';

export async function updateUpDown(params) {
  return request(`${ADMIN_ROOT}/api/updowns/${params.id}`, {
    method: 'put',
    body: JSON.stringify(params),
  });
}

export async function getAllUpDowns(params) {
  return request(`${ADMIN_ROOT}/api/updowns?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&type=${params.type}&nickname=${params.nickname || ''}`, {
    method: 'get',
  });
}

export async function getUpdownsCounts(params) {
  return request(`${ADMIN_ROOT}/api/updowns/counts`, {
    method: 'get',
  });
}

export async function getALlReviewUpDowns(params) {
  return request(`${ADMIN_ROOT}/api/updowns/review?pageSize=${params.pageSize || 10}&currPage=${params.currPage || 1}&startTime=${params.startTime || ''}&endTime=${params.endTime || ''}&nickname=${params.nickname || ''}`, {
    method: 'get',
  });
}


