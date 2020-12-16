const getters = {
    isSidebarNavCollapse: state => state.app.isSidebarNavCollapse,
    token: state => state.user.token,
    username: state => state.user.username
}
export default getters