import request from '@/utils/request'
// 分页
export function pageList(listQuery, code = '') {
  return request.get('/api/admin/dtc?page_idx=' + listQuery.page + '&page_size=' + listQuery.limit + '&code=' + code,
  )
}
// 获取指定故障码
export function querDtcBySN(sn = '1192706750957096967') {
  return request.get(`/api/admin/dtc/${sn}`)
}
// 新增
export function createDtc(data) {
  return request.post(
    '/api/admin/dtc',
    data
  )
}
// 删除
export function deleteDtc(sn) {
  return request.delete(
    `/api/admin/dtc/${sn}`,
  )
}
// 修改
export function updateDtc(sn, data) {
  return request.put(
    `/api/admin/dtc/${sn}`,
    data
  )
}
