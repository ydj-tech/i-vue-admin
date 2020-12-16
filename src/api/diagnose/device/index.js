import request from '@/utils/request'
// 分页
export function pageList(listQuery, code = '') {
  return request.get(
    '/api/admin/device?page_idx=' + listQuery.page + '&page_size=' + listQuery.limit + '&code=' + code,
  )
}
// 获取指定故障码
export function querDeviceBySN(sn = '1192706750957096967') {
  return request.get(
    `/api/admin/device/${sn}`,
  )
}
// 新增
export function createDevice(data) {
  return request.post(
    '/api/admin/device',
    data
  )
}
// 删除
export function deleteDevice(sn) {
  return request.delete(
    `/api/admin/device/${sn}`,
  )
}
// 修改
export function updateDevice(sn, data) {
  return request.put(
    `/api/admin/device/${sn}`,
    data
  )
}
