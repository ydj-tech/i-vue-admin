import router from '@/router/index'
export default {
  namespaced: true,
  state: {
    permissionList: null /** 所有路由 */,
    sidebarMenu: router.options.routes || [] /** 导航菜单 */,
    currentMenu: '' /** 当前active导航菜单 */
  }

}
