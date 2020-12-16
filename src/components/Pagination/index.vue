<!-- Discription: 分页组件, author: ydj, Date: 2019-11-06 16:47:40 -->
<template>
  <div class="Pagination mt20" :class="{'hidden':hidden}">
    <el-pagination
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      :layout="layout"
      prev-text="上一页"
      next-text="下一页"
      @size-change="handleSizeChange"
      @current-change="handleCurrnetChange"
    ></el-pagination>
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scrollTo'
export default {
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      // default: 'total,sizes, prev, pager, next,jumper'
      default: 'total, prev, pager, next,jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },

  computed: {
    currentPage: {
      get () {
        return this.page
      },
      set (val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get () {
        return this.limit
      },
      set (val) {
        console.log(val)
        this.$emit('update:limit', val)
      }
    }
  },

  methods: {
    handleSizeChange (val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrnetChange (val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.Pagination {
  width : 100%;
  text-align : center;
  font-size : 14px;
  color : #606266;
}
.pagination.hidden {
  display : none;
}

.Pagination /deep/ .btn-prev {
  background : none;
  border : 1px solid #DDDDDD;
  width : 60px;
  display : inline-block;
}
.Pagination /deep/ .btn-next {
  background : none;
  border : 1px solid #DDDDDD;
  width : 60px;
  display : inline-block;
}

</style>
