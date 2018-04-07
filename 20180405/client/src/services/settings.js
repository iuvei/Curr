import request from '../utils/request';
import {ADMIN_ROOT} from './rootPath';

export async function setPlatConfing(params) {
  return request(`${ADMIN_ROOT}/api/settings/platfrom`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getPlatConfing(params) {
  return request(`${ADMIN_ROOT}/api/settings/platfrom`,{
    method: 'get',
  });
}

export async function setRaceConfing(params) {
  return request(`${ADMIN_ROOT}/api/settings/race`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getRaceConfing(params) {
  return request(`${ADMIN_ROOT}/api/settings/race`,{
    method: 'get',
  });
}

export async function setBetConfing(params) {
  return request(`${ADMIN_ROOT}/api/settings/betting`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getBetConfing(params) {
  return request(`${ADMIN_ROOT}/api/settings/betting`,{
    method: 'get',
  });
}

export async function setPayment(params) {
  return request(`${ADMIN_ROOT}/api/settings/payment`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getPayment(params) {
  return request(`${ADMIN_ROOT}/api/settings/payment?type=${params.type}`,{
    method: 'get',
  });
}

export async function setAnnouncement(params) {
  return request(`${ADMIN_ROOT}/api/settings/announcement`,{
    method: 'post',
    body: JSON.stringify(params),
  });
}

export async function getAnnouncement(params) {
  return request(`${ADMIN_ROOT}/api/settings/announcement`,{
    method: 'get',
  });
}

export async function sign_up(params) {
  return request(`${ADMIN_ROOT}/api/sign_up`, {
    method: 'post',
    body: JSON.stringify(params),
  });
}
