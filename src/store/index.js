import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
import user from './modules/user.js'
import permission from './modules/permission.js'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        app,
        user,
        permission
    },
    getters
})
export default store
