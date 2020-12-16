import { setToken, getToken, removeToken } from '@/utils/auth'
import { login } from '@/api/login/index'
import { longStackSupport } from 'q';

const user = {
    state: {
        token: getToken() || '',
        username: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_USERNAME: (state, username) => {
            state.username = username
        }
    },
    actions: {
        Login({ commit }, userInfo) {
            const { username, password } = userInfo;
            return new Promise(async (resolve, reject) => {
                try {
                    const response = await login({ username, password })
                    commit('SET_TOKEN', response.token)
                    commit('SET_USERNAME', username)
                    setToken(response.token)
                    resolve(response)
                } catch (error) {
                    reject(error)
                }
            })
        },
        LogOut({ commit }) {
            return new Promise((resolve, reject) => {
                commit('SET_TOKEN', '')
                commit('SET_USERNAME', '')
                removeToken()
                resolve()
            })
        }
    }
}







export default user;