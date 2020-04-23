import request from '@/utils/request'

// 获取标签列表
export function getTagList(params) {
  return request({
    url: '/api/tag/find',
    method: 'get',
    params
  });
}

// 创建标签
export function createTag(params) {
  return request({
    url: '/api/tag/create',
    method: 'post',
    data: params
  });
}

// 移除标签
export function removeTag(params) {
  return request({
    url: '/api/tag/remove',
    method: 'post',
    data: params
  });
}