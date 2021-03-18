<!-- Discription: 头部组件, author: ydj, Date: 2020-07-27 20:46:06 -->
<template>
  <div class="cus-header">
    <!-- <img
      class="logo"
      src="../../assets/logo.png"
    /> -->
    <span class="title">保健食品注册管理系统</span>

    <div class="right-menu">
      <el-badge
        :value="200"
        :max=this.total
        class="badge"
        slot="reference"
      >
        <img src="../../assets/message.png">
      </el-badge>
      <el-dropdown trigger="click">
        <span class="el-dropdown-link"><img
            class="user-img"
            :src="userImg"
          />欢迎您，{{username}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item  @click.native="logout">
            <span>
              <i class="el-icon-right"></i>退出登录</span>
          </el-dropdown-item>
          <!-- <el-dropdown-item @click.native="handleModify()">
            <span >
              <i class="el-icon-edit"></i>修改密码</span>
          </el-dropdown-item>
          <el-dropdown-item  @click.native="handlepersonal()">
            <span>
              <i class="el-icon-user"></i>个人信息</span>
          </el-dropdown-item> -->
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
    components: {
    },
    data() {
        return {
            userImg: '',
            total: 0,
            username: ''
        }
    },
    mounted() {
        this.username = this.$store.getters.username || 'yb_admin'
    },
    computed: {},
    created() {
    },
    methods: {
    //   修改密码
        handleModify() {
            this.$router.push({ path: '/modifyInformation/changePassword' })
        },
        //   个人信息
        handlepersonal() {
            this.$router.push({ path: '/modifyInformation/personalInformation' })
        },
        logout() {
            this.$store.dispatch('LogOut').then((res) => {
                console.log('成功登出')
                this.$router.replace({ path: '/login' })
            }).catch((res) => {
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.treeselect /deep/ .vue-treeselect__control {
  width : 247px;
}

</style>
