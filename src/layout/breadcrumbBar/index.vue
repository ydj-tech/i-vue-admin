<template :data="data">
  <el-menu
    class="navbar"
    mode="horizontal"
  >
    <hamburger
      class="hamburger-container"
      :toggleClick="toggleSideBar"
      :isActive="isSidebarNavCollapse"
    ></hamburger>
    <breadcrumb></breadcrumb>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'BreadcrumbBar',
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      data: {
        businessNum: 0,
        infoNum: 0,
        subUserNum: 0,
        registerNum: 0,
        transpondNum: 0,
        role: ''
      }
    }
  },
  computed: {
    isAuditAction() {
      return this.$store.getters.isAudit
    },
    ...mapGetters([
      'isSidebarNavCollapse'
    ])
  },
  created() {
    // getReviewInfo().then(res => {
    //     this.data = res.data;
    // })
  },
  watch: {
    isAuditAction(newValue, oldValue) {
      // if (newValue) {
      //     getReviewInfo().then(res => {
      //         this.data = res.data;
      //     })
      // }
      this.$store.dispatch('IsAudit', false)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  width : 100%;
  height : 50px;
  line-height : 50px;
  border-radius : 0px !important;
  position : fixed;
  top : 54px;
  z-index : 2000;
  .right-menu {
    float : right;
    margin-right : 35px;
    height : 100%;
    .nx-help {
      display : inline-block;
      vertical-align : top;
    }
  }
  .hamburger-container {
    line-height : 58px;
    height : 50px;
    float : left;
    padding : 0 10px;
    outline : none;
  }
  .screenfull {
    position : absolute;
    right : 90px;
    top : 16px;
    color : red;
  }
  .avatar-container {
    height : 50px;
    display : inline-block;
    position : absolute;
    right : 75px;
    .avatar-wrapper {
      cursor : pointer;
      margin-top : 5px;
      position : relative;
      .user-avatar {
        width : 40px;
        height : 40px;
        border-radius : 10px;
      }
      .el-icon-caret-bottom {
        position : absolute;
        right : -20px;
        top : 25px;
        font-size : 12px;
      }
    }
  }
}
//跑马灯
@keyframes scroll {
  0% {
    left : 100%;
  }
  100% {
    left : -100%;
  }
}
.loopDiv {
  position : fixed;
  top : 154px;
  right : 0px;
  width : 50%;
  height : 30px;
  line-height : 28px;
  margin-top : 8px;
  overflow : hidden;
  z-index : 999;
  background-color : #FFFFFF;
  .number {
    padding : 0 10px;
    color : #008CFF;
    font-size : 16px;
    font-weight : bold;
    cursor : pointer;
  }
  .number::after {
    content : '';
    display : inline-block;
    width : 30px;
  }
}
.childDiv {
  position : absolute;
  left : 100%;
  top : 0px;
  color : #333333;
  font-size : 14px;
  white-space : nowrap;
  animation : 30s linear 0s infinite normal none running scroll;
}
.childDiv:hover {
  animation-play-state : paused;
}

</style>
