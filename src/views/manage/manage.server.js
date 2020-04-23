import request from '@/utils/request'

// 获取留言列表
export function getMessageList(params) {
  return request({
    url: '/api/message/find',
    method: 'get',
    params
  });
}