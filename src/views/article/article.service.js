import request from '@/utils/request'

// 获取文章列表
export function getArticleList(params) {
  return request({
    url: '/api/article/find',
    method: 'get',
    params,
  });
}

// 获取文章详情
export function getArticleDetail(params) {
  return request({
    url: '/api/article/detail',
    method: 'get',
    params,
  });
}

// 创建文章
export function addArticle(params) {
  return request({
    url: '/api/article/create',
    method: 'post',
    data: params
  });
}

// 更新文章
export function editArticle(params) {
  return request({
    url: '/api/article/update',
    method: 'post',
    data: params
  });
}

// 移除文章
export function removeArticle(params) {
  return request({
    url: '/api/article/remove',
    method: 'post',
    data: params
  });
}

// 发布 or 撤销发布
export function publishArticle(params) {
  return request({
    url: '/api/article/publish',
    method: 'post',
    data: params
  });
}

// 获取标签列表
export function getTagList() {
  return request({
    url: '/api/tag/find',
    method: 'get',
  });
}