/**
 * Discription: 封装axios
 * author: ydj
 * Date: 2020-08-26 19:40:45
 */
import { Message, Loading } from 'element-ui'
import instance from './interceptor'
/**
 *
 * @param {*} url 请求地址
 * @param {*} params 请求参数
 * @param {*} options 请求配置项
 * @param {*} loading 是否显示loading
 * @param {*} mock 是否mock数据
 * @param {*} error 是否显示错误
 * @param {*} method 请求方式
 */
function requset(url, params, options = { loading: true, mock: false, error: true }, method = 'GET') {
    let loadingInstance = null
    if (options.loading) {
        loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        })
    }
    return new Promise((resolve, reject) => {
        if (options.mock) url = 'http://localhost:8080/api'
        const httpDefault = {
            url,
            method,
            params: method === 'GET' || method === 'DELETE' ? params : null,
            data: method === 'POST' || method === 'PUT' ? params : null
        }
        instance(httpDefault).then((res) => {
            if (res.status === 80200) {
                resolve(res.data)
            } else {
                // 错误信息可控
                if (options.error) Message.error(res.message)
                reject(res)
            }
        }).catch(error => {
            Message.error(error.message)
        }).finally(() => {
            loadingInstance.close()
        })
    })
}
function get(url, params, options) {
    return requset(url, params, options, 'GET')
}
function deleted(url, params, options) {
    return requset(url, params, options, 'DELETE')
}
function post(url, params, options) {
    return requset(url, params, options, 'POST')
}
function put(url, params, options) {
    return requset(url, params, options, 'PUT')
}
export default {
    get, deleted, post, put
}
