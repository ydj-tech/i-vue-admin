/**
 * Discription: 封装interceptor
 * author: ydj
 * Date: 2020-08-26 19:29:45
 */
import axios from 'axios'
import { Message } from 'element-ui'
/**
 * 生成基础axios对象，并对请求和响应做处理
 * 前后端约定接口返回解构规范
 * {
 *    code:200,
 *    data:"成功",
 *    message:""
 * }
 */
// 创建实例
const service = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : '/api',
    // 配置请求头
    headers: {
        // post: {
        //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        // }
        'Content-Type': 'application/json'
    },
    timeout: 10000,
    // 是否发送cookie
    withCredentials: false
})
service.interceptors.request.use(config => {
    // if (store.getters.token) {
    //     config.headers.Authorization = 'Bearer' + store.getters.token
    // }
    return config
})
service.interceptors.response.use((response) => {
    const res = response.data
    if (response.status === 200) {
        return res
    } else if (response.status === 403) {
        Message.warning(res.message)
        window.location.href = '/login'
        return res
    } else {
        Message.error(res.message)
        return res
    }
}, () => {
    Message.error('服务器走丢了,请稍后重试!')
})
export default service
