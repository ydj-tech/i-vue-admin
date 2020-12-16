<!-- Discription: 自定义table组件带分页器, author: ydj, Date: 2019-12-13 19:15:48

  扩展功能
          spanArr     合并的数组
          contentSpanArr 合并的数组
          type : 0    合并1列
          type:  1    合并2列
          cusColumnIndex 合并的行号数组 [1,3,4,6,7]
 -->

<template>
  <div>
    <el-table
      ref="elTables"
      :row-key="rowkey"
      border
      :data="showData"
      :row-style="tableRowStyle"
      :header-cell-style="tableHeaderColor"
      :show-summary="showsummary"
      style="width: 100%"
      class="table"
      :span-method="objectSpanMethod"
      :type="type"
      v-loading="loading"
      @selection-change="handleSelectionChange"
      @sort-change="handleSortChange"
      tooltip-effect="light"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      :default-expand-all="defaultExpandAll"
    >
      <slot />
    </el-table>
    <!-- 分页 -->
    <div :class="{ hidden: hidden }" class="tabel-pagination">
      <div class="button-left">
        <slot name="action" />
      </div>
      <div class="block">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :page-sizes="pageSizes"
          :layout="layout"
          :total="total"
          v-bind="$attrs"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <div v-if="onlytotal" class="tabel-pagination">
      <div style="width:100%;height:60px;line-height:60px;text-align:center;">共{{ onlytotal }}条</div>
    </div>
  </div>
</template>
<script>
import { scrollTo } from "@/utils/scrollTo";
export default {
  props: {
    data: {
      default() {
        return [];
      },
      type: Array
    },
    border: {
      type: Boolean,
      default: true
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    limit: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    rowkey: {
      type: String,
      default: "id"
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
    },
    showsummary: {
      type: Boolean,
      default: false
    },
    autoMerge: {
      type: Boolean,
      default: false
    },
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    orderIndexArr: {
      type: Array,
      default() {
        return [];
      }
    },
    spanArr: {
      type: Array,
      default() {
        return [];
      }
    },
    contentSpanArr: {
      type: Array,
      default() {
        return [];
      }
    },
    type: {
      type: Number,
      default: 0
    },
    mt20: {
      type: Boolean,
      default: false
    },
    mb20: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    cusColumnIndex: {
      type: Array,
      default() {
        return [];
      }
    },
    onlytotal: {
      type: Number,
      default: 0
    },
    rowspans: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    selectedRows: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      showData: []
    };
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    }
  },
  watch: {
    data(val, oldVal) {
      this.showData = val;
      if (val !== oldVal) {
        this.$nextTick(() => {
          this.$refs.elTables.clearSelection();
          this.data.forEach(row => {
            if (this.selectedRows.includes(row.id)) {
              this.$refs.elTables.toggleRowSelection(row, true);
            }
          });
        });
      }
      //   console.log("this.showDate", this.showData);
    },
    selectedRows: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.$nextTick(() => {
            this.$refs.elTables.clearSelection();
            this.data.forEach(row => {
              if (this.selectedRows.includes(row.id)) {
                this.$refs.elTables.toggleRowSelection(row, true);
              }
            });
          });
        }
      },
      // 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.showData = this.data;
  },
  methods: {
    handleSizeChange(val) {
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      return "color:#333;";
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #f6f7fb;color: #333;font-weight: blod;";
      }
    },
    // select-change
    handleSelectionChange(selection) {
      this.$emit("selectChange", selection);
    },
    // 合并单元格
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      } else if (columnIndex === 6) {
        const _row = this.contentSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      } else if (columnIndex === 7) {
        const _row = this.colSpanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col
        };
      }
    },
    // 合并单元格
    // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
    //     for (let i = 0; i < this.rowspans.length; i++) {
    //         if (
    //             this.rowspans[i].row === rowIndex &&
    //   columnIndex === this.rowspans[i].index
    //         ) {
    //             return this.rowspans[i].span
    //         }
    //     }
    //     if (this.autoMerge) {
    //         if (columnIndex === this.cusColumnIndex[0]) {
    //             const _row = this.spanArr[rowIndex]
    //             const _col = _row > 0 ? 1 : 0
    //             return {
    //                 rowspan: _row,
    //                 colspan: _col
    //             }
    //         } else if (
    //             this.type === 1 &&
    //   columnIndex === this.cusColumnIndex[1]
    //         ) {
    //             const _row = this.contentSpanArr[rowIndex]
    //             const _col = _row > 0 ? 1 : 0
    //             return {
    //                 rowspan: _row,
    //                 colspan: _col
    //             }
    //         }
    //     }
    // },
    // 排序
    handleSortChange(column) {
      this.$emit("sort-change", column);
    }
  }
};
</script>
<style lang="scss" scoped>
// 设置表头主体的高度
/* 设置表主体的高度 */
.mt20 {
  margin-top : 20px;
}
.mb20 {
  margin-bottom : 20px;
  .table-tip {
    padding-left : 20px;
    font-size : 16px;
    color : #FF0000;
  }
}

.table {
  border : 1px solid #DDDDDD;
  border-bottom : 0;
  box-sizing : border-box;
  /deep/ .item-action-primary {
    color : #008CFF;
    cursor : pointer;
  }
  /deep/ .item-action-danger {
    color : #F5493A;
    cursor : pointer;
  }
}
.table /deep/ .el-table__body td {
  height : 50px;
  line-height : 50px;
  padding : 0px;
}
.table /deep/ .el-table__body th {
  padding : 0px;
}
.table /deep/ th {
  padding : 8px 0;
}
.table /deep/ .el-icon-edit-outline {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
}
.table /deep/ .el-icon-s-check {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
}
.table /deep/ .el-icon-check {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
}
.table /deep/ .el-icon-view {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
}
.table /deep/ .el-icon-delete {
  font-size : 25px;
  color : #F56C6C;
  cursor : pointer;
}
.table /deep/ .el-icon-plus {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
  margin-right : 15px;
}
.table /deep/ .el-icon-edit {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
  margin-right : 15px;
}
.table /deep/ .el-icon-top {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
  margin-right : 15px;
}
.table /deep/ .el-icon-bottom {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
  margin-right : 15px;
}
.table /deep/ .el-icon-lock {
  font-size : 25px;
  color : #F56C6C;
  cursor : pointer;
  margin-right : 15px;
}
.table /deep/ .el-icon-unlock {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
  margin-right : 15px;
}
.table /deep/ .el-icon-circle-plus {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
}
.table /deep/ .el-icon-user-solid {
  font-size : 25px;
  color : #008CFF;
  cursor : pointer;
}

// 分页区域
.tabel-pagination.hidden {
  display : none;
}
.tabel-pagination {
  width : 100%;
  height : 60px;
  border : 1px solid #DDDDDD;
  border-top : 0;
  box-sizing : border-box;
  .button-left {
    float : left;
    margin : 15px 0;
    .el-button {
      width : 98px;
      height : 30px;
      line-height : 30px;
      margin-left : 20px;
      padding : 0;
      .cus-ml-20 {
        margin-left : 20px;
      }
      .cus-danger {
        margin : 0 20px;
        color : #FFFFFF;
        background-color : #F5493A;
        &:hover {
          background-color : #3CABFF;
        }
      }
      span {
        float : left;
        display : block;
        width : 98px;
        height : 30px;
        background-color : #008CFF;
        font-size : 12px;
        color : #FFFFFF;
        text-align : center;
        line-height : 30px;
        border-radius : 3px;
        cursor : pointer;
        &:first-child {
          margin : 0 20px;
        }
        &:hover {
          background-color : #3CABFF;
        }
      }
    }
  }
  .block {
    float : right;
    /deep/ .el-pagination {
      display : inline-block;
      margin : 13px 0;
      padding-right : 100px;
      color : #333333;
    }
    /deep/ .el-pagination__total {
      color : #333333;
      font-size : 14px;
      line-height : 30px;
    }
    /deep/ .el-pagination__sizes {
      margin-right : 40px;
      height : 30px;
      line-height : 30px;
    }
    /deep/ .el-pagination button {
      padding : 0px;
      height : 30px;
      line-height : 30px;
    }
    /deep/ .el-pager li {
      height : 30px;
      line-height : 30px;
      font-size : 12px;
      color : #999999;
    }
    /deep/ .el-pager li.active {
      color : #008CFF;
    }
    /deep/ .el-pagination__jump {
      font-size : 14px;
      color : #333333;
      height : 30px;
      line-height : 30px;
      margin-left : 12px;
    }
    /deep/ .el-pagination__editor {
      margin : 0 10px;
    }
    // 页码条数
    /deep/ .el-input--mini .el-input__inner {
      height : 30px;
      line-height : 30px;
      font-size : 12px;
      color : #333333;
    }
  }
}

</style>
