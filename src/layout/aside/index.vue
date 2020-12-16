<!-- Discription: 菜单, author: ydj, Date: 2020-07-28 19:33:20 -->
<template>
    <div class="cus-menu">
        <el-menu :collapse="isCollapse" background-color="#04234d" text-color="#a5c0e7" active-text-color="#fff" :default-active="currentMenu" :unique-opened="true">
            <slider-item :collapse="isCollapse" :menuList="sidebarMenu"></slider-item>
        </el-menu>
    </div>
</template>

<script>
import SliderItem from './SliderItem'
import { mapState } from 'vuex'
export default {
    components: { SliderItem },
    data() {
        return {
            currentMenu: ''
        }
    },

    computed: {
        ...mapState('app', ['isSidebarNavCollapse']),
        // 含有命名空间的辅助函数的使用
        ...mapState('permission', ['sidebarMenu']),
        isCollapse() {
            return this.$store.getters.isSidebarNavCollapse
        }
    },
    mounted() {
        this.currentMenu = this.$route.name
    },
    methods: {}
}
</script>
<style lang='scss' scoped>
</style>
