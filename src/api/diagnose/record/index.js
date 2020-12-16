import request from '@/utils/request'

// 分页
export function pageList(listQuery, type) {
  return request.get(
    '/api/admin/record?page_idx=' + listQuery.page + '&page_size=' + listQuery.limit + '&event=' + '["' + type + '"]',
  )
}
