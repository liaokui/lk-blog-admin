import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/scene/describeSceneByPage',
    method: 'post',
    data: params
  });
}