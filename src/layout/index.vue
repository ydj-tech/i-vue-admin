<!-- Discription: 基本布局, author: ydj, Date: 2020-07-28 17:06:24 -->
<template>
    <div class="main-container" :class="{hideSidebar:isSidebarNavCollapse}">
        <cus-header/>
        <cus-aside />
        <cus-main/>
        <cus-footer/>
    </div>
</template>

<script>
import CusHeader from './header'
import CusAside from './aside'
import CusMain from './mainContent'
import CusFooter from './footer'
export default {
    components: {
        CusHeader,
        CusAside,
        CusMain,
        CusFooter
    },
    data() {
        return {}
    },

    computed: {
        isSidebarNavCollapse() {
            return this.$store.getters.isSidebarNavCollapse
        }
    },

    methods: {}
}
</script>
<style lang='scss' scoped>
.el-header, .el-footer {
  background-color : #B3C0D1;
  color : #333333;
  text-align : center;
  line-height : 60px;
}

.el-aside {
  background-color : #D3DCE6;
  color : #333333;
  text-align : center;
  line-height : 200px;
}

.el-main {
  background-color : #E9EEF3;
  color : #333333;
  text-align : center;
  line-height : 160px;
}

body > .el-container {
  margin-bottom : 40px;
}

.el-container:nth-child(5) .el-aside, .el-container:nth-child(6) .el-aside {
  line-height : 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height : 320px;
}

</style>
