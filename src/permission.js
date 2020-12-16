// <!-- Discription: 权限控制逻辑, author: ydj, Date: 2020-11-25 15:22:25 -->
import router from '@/router'
import store from '@/store'
import { Message } from 'element-ui'


const whiteList = ['/login'] // 白名单
router.beforeEach((to, from, next) => {
    const token = store.getters.token
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' })
        }else{
            next()
        }
    } else {
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
        }
    }
})