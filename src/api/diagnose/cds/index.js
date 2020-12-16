import request from '@/utils/request'
// 分页
export function pageList(listQuery, code) {
  return request.get('/api/admin/cds?page_idx=' + listQuery.page + '&page_size=' + listQuery.limit + '&code=' + code,)
}
// 获取指定故障码
export function querCdsBySN(sn = '1192706750957096967') {
  return request.get(
    `/api/admin/cds/${sn}`,
  )
}
// 新增
export function createCds(data) {
  return request.post(
    '/api/admin/cds',
    data
  )
}
// 删除
export function deleteCds(sn) {
  return request.delete(
    `/api/admin/cds/${sn}`
  )
}
// 修改
export function updateCds(sn, data) {
  return request.put(
    `/api/admin/cds/${sn}`,
    data
  )
}
