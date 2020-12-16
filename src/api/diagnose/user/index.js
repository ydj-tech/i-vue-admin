import request from '@/utils/request'

// 分页
export function pageList(listQuery) {
  return request.get('/api/admin/user?page_idx=' + listQuery.page + '&page_size=' + listQuery.limit,
  )
}
