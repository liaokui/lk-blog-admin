import request from '@/utils/request'

export function getPage(params) {
  return getList({
    url: '/scene/describeSceneByPage',
    method: 'post',
    data: params
  });
}