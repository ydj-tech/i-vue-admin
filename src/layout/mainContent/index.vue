<!-- Discription: 主内容显示区域, author: ydj, Date: 2020-07-29 20:15:11 -->
<template>
    <div class="cus-main">
        <breadcrumb-bar></breadcrumb-bar>
        <div class="placeholder"></div>
        <section class="main-container">
            <router-view />
        </section>
    </div>
</template>

<script>
import breadcrumbBar from '../breadcrumbBar'
export default {
    components: { breadcrumbBar },
    data() {
        return {}
    },
    created() {
    },
    computed: {},

    methods: {}
}
</script>
<style lang='scss' scoped>
.placeholder {
  height : 50px;
}

</style>
