import request from '../utils/request';

export async function addUQuiz(params) {
  return request('/api/quizs',{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getUser(params) {
  return request('/api/quizs/{userid}',{
    method: 'get',
  });
}

export async function getAllQuizs(params) {
  return request(`/api/quizs?pageSize=${params.pageSize||10}&currPage=${params.currPage||1}&no=${params.no||''}&username=${params.username||''}`,{
    method: 'get',
  });
}

