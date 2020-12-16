import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/permission'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import './icons'
import CusButton from '@/plugins/index.js'
import cusTable from '@/components/cusTable/index.js'
// import cusTable from 'cus-table/src/index'
// 引入echarts
import echarts from 'echarts'
import 'echarts/map/js/china.js'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(CusButton)
Vue.use(cusTable)

new Vue({
    router,

    store,
    render: h => h(App)
}).$mount('#app')
