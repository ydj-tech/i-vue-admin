import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        name: 'Home',
        meta: { title: '首页', icon: 'splc' },
        redirect: '/home',
        component: Layout,
        children: [
            {
                path: '/home',
                meta: { title: '首页', icon: 'dashboard' },
                name: 'myHome',
                component: () => import('@/views/home/index')
            },
            {
                path: '/index',
                meta: { title: '扉页', icon: '' },
                hidden: true,
                name: 'cusHome',
                component: () => import('@/views/home/index1')
            }
        ]
    },
    // {
    //     path: '/form',
    //     name: 'Form',
    //     meta: { title: '表格', icon: 'splc' },
    //     component: Layout,
    //     children: [
    //         {
    //             path: 'circle',
    //             meta: { title: '圆形', icon: '' },
    //             name: 'myForm',
    //             component: () => import('@/views/form/circle')
    //         },
    //         {
    //             path: 'index',
    //             meta: { title: '饼图', icon: '' },
    //             name: 'cusForm',
    //             component: () => import('@/views/form/index')
    //         }
    //     ]
    // },
    // 诊断管理
    {
        path: '/diagnose',
        component: Layout,
        name: 'Diagnose',
        meta: {
            title: '诊断管理',
            icon: 'example'
        },
        children: [
            {
                path: 'dtc/list',
                component: () => import('@/views/diagnose/dtc/list'),
                name: 'DtcList',
                meta: { title: '故障码列表', icon: 'list' }
            },
            {
                path: 'dtc/create',
                component: () => import('@/views/diagnose/dtc/edit'),
                name: 'DtcCreate',
                hidden: true,
                meta: { title: '创建故障码', icon: 'edit' }
            },
            {
                path: 'dtc/edit/:sn',
                component: () => import('@/views/diagnose/dtc/edit'),
                name: 'DtcEdit',
                hidden: true,
                meta: { title: '编辑故障码', icon: 'edit' }
            },
            {
                path: 'cds/list',
                component: () => import('@/views/diagnose/cds/list'),
                name: 'CdsList',
                meta: { title: '数据流列表', icon: 'list' }
            },
            {
                path: 'cds/create',
                component: () => import('@/views/diagnose/cds/edit'),
                name: 'CdsCreate',
                hidden: true,
                meta: { title: '创建数据流', icon: 'edit' }
            },
            {
                path: 'cds/edit/:sn',
                component: () => import('@/views/diagnose/cds/edit'),
                name: 'CdsEdit',
                hidden: true,
                meta: { title: '编辑数据流', icon: 'edit' }
            },
            {
                path: 'device/list',
                component: () => import('@/views/diagnose/device/list'),
                name: 'DeviceList',
                meta: { title: '设备列表', icon: 'list' }
            },
            {
                path: 'device/create',
                component: () => import('@/views/diagnose/device/edit'),
                name: 'DeviceCreate',
                hidden: true,
                meta: { title: '创建设备', icon: 'edit' }
            },
            {
                path: 'device/edit/:sn',
                component: () => import('@/views/diagnose/device/edit'),
                name: 'DeviceEdit',
                hidden: true,
                meta: { title: '编辑设备', icon: 'edit' }
            },
            {
                path: 'cuslog/list',
                component: () => import('@/views/diagnose/cuslog/list'),
                name: 'LogList',
                meta: { title: '日志列表', icon: 'list' }
            },
            {
                path: 'cuslog/create',
                component: () => import('@/views/diagnose/cuslog/edit'),
                name: 'LogCreate',
                hidden: true,
                meta: { title: '创建日志', icon: 'edit' }
            },
            {
                path: 'cuslog/edit/:sn',
                component: () => import('@/views/diagnose/cuslog/edit'),
                name: 'LogEdit',
                hidden: true,
                meta: { title: '编辑日志', icon: 'edit' }
            },
            {
                path: 'user/list',
                component: () => import('@/views/diagnose/user/list'),
                name: 'UserList',
                meta: { title: '会员列表', icon: 'list' }
            },
            {
                path: 'record/list',
                component: () => import('@/views/diagnose/record/list'),
                name: 'RecordList',
                meta: { title: '记录列表', icon: 'list' }
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
