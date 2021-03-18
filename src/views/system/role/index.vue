<!-- Discription: 角色管理, author: ydj, Date: 2021-03-17 10:31:12 -->
<template>
  <div>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="角色">
          <Origin v-if="isShow" @addNew="addNew"/>
          <addNew v-else @returnBack="returnBack"/>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Origin from './origin'
import addNew from './addNew'
export default {
    components: { Origin, addNew },
    data() {
        return {
            isShow: true
        }
    },

    computed: {},

    methods: {
        handleClick(tab, event) {
            console.log(tab, event)
        },
        returnBack(val) {
            this.isShow = val
        },
        addNew(val) {
            this.isShow = val
        }
    }
}
</script>
<style lang='scss' scoped>

</style>
