import request from '@/utils/request'

// 创建
export function create(data) {
  return request({
    url: '/api/oa/department',
    method: 'post',
    data
  })
}
// 更新
export function update(sn, data) {
  return request({
    url: '/api/oa/department/' + sn,
    method: 'put',
    data
  })
}
// 删除
export function deleteBySN(sn) {
  return request({
    url: '/api/oa/department/' + sn,
    method: 'delete'
  })
}
// 分页
export function pageList(listQuery) {
  return request({
    url: '/api/oa/department?page_idx=' + (listQuery.page - 1) + '&page_size=' + listQuery.limit,
    method: 'get'
  })
}
// 根据id
export function findByID(sn) {
  return request({
    url: '/api/oa/department/' + sn,
    method: 'get'
  })
}
// 列表
export function findList() {
  return request({
    url: '/api/oa/department/list',
    method: 'get'
  })
}
export function findDepartment() {
  return request({
    url: '/api/oa/department/list',
    method: 'get'
  })
}
