import request from '@/utils/request'

// 登录
export function initChina() {
  return request.get(
    '/g2/getOnsInfo?name=disease_h5&callback=jQuery34102848205531413024_1584924641755&_=1584924641756',
  )
}
