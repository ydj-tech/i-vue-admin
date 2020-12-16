import cusTable from './table'
export default {
    install: (Vue) => {
        if (typeof window !== 'undefined' && window.Vue) {
            Vue = window.Vue
        }
        Vue.component('cus-table', cusTable)
    }
}