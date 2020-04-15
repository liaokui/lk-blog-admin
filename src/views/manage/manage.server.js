import request from '@/utils/request'

// 分页查询提现记录
export function getPage(params) {
  return request({
    url: '/scene/describeSceneByPage',
    method: 'post',
    data: params
  });
}

//删除
export function del(params) {
  return request({
    url: '/modelProduct',
    method: 'delete',
    params
  })
}