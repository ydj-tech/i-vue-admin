import request from '@/utils/request'

export function login(params) {
    return request.get('/user', params)
}
