const app = {
    state: {
        isSidebarNavCollapse: false
    },
    mutations: {
        TOGGLE_SIDEBAR: state => {
            state.isSidebarNavCollapse = !state.isSidebarNavCollapse
        }
    },
    actions: {
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR')
        }
    }
}

export default app
