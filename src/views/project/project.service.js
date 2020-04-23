import request from '@/utils/request'

// 获取项目列表
export function getProjectList(params) {
  return request({
    url: '/api/project/find',
    method: 'get',
    params,
  });
}

// 获取项目详情
export function getProjectDetail(params) {
  return request({
    url: '/api/project/detail',
    method: 'get',
    params,
  });
}

// 创建项目
export function addProject(params) {
  return request({
    url: '/api/project/create',
    method: 'post',
    data: params
  });
}

// 更新项目
export function editProject(params) {
  return request({
    url: '/api/project/update',
    method: 'post',
    data: params
  });
}

// 移除项目
export function removeProject(params) {
  return request({
    url: '/api/project/remove',
    method: 'post',
    data: params
  });
}

// 发布 or 撤销发布
export function publishProject(params) {
  return request({
    url: '/api/project/publish',
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