import request from '@/utils/request'

// 获取数量
export function getAmount() {
  return request({
    url: '/api/statistics/amount',
    method: 'get'
  });
}

// 获取标签关联的文章和项目
export function getHostTag() {
  return request({
    url: '/api/statistics/hostTag',
    method: 'get'
  });
}
