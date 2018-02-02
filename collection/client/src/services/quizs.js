import request from '../utils/request';
import {ADMIN_ROOT} from './rootPath';

export async function addUQuiz(params) {
  return request(`${ADMIN_ROOT}/api/quizs`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}


export async function getAllQuizs(params) {
  return request(`${ADMIN_ROOT}/api/quizs?pageSize=${params.pageSize||10}&currPage=${params.currPage||1}&no=${params.no||''}&username=${params.username||''}`,{
    method: 'get',
  });
}

