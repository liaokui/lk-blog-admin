import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/scene/describeSceneByPage',
    method: 'post',
    data: params
  });
}