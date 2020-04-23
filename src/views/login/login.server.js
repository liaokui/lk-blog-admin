import request from '@/utils/request'

// 获取验证码
export function getCaptcha() {
  return request({
    url: '/api/getCaptcha',
    method: 'get',
    noToken: false
  });
}

// 登录
export function login(params) {
  return request({
    url: '/api/login',
    method: 'post',
    data: params
  });
}