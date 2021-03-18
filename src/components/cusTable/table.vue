<!-- Discription: 自定义table组件带分页器, author: ydj, Date: 2019-12-13 19:15:48

  扩展功能
          spanArr     合并的数组
          contentSpanArr 合并的数组
          type : 0    合并1列
          type:  1    合并2列
          cusColumnIndex 合并的行号数组 [1,3,4,6,7]

 -->

<template>
  <div class="sir-table" :class="{'mt20':mt20,'mb20':mb20}">
    <slot name="cus-action"></slot>
    <el-table
      ref="elTables"
      :key="0"
      :data="showData"
      :border="border"
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
    >
      <slot />
    </el-table>
    <!-- 分页 -->
    <div :class="{'hidden':hidden}" class="tabel-pagination">
      <div class="button-left">
        <slot name="action" />
        <!-- <span>接收样机</span>
        <span>输出Excel</span>-->
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
      <div style="width:100%;height:60px;line-height:60px;text-align:center;">共{{onlytotal}}条</div>
    </div>
  </div>
</template>
<script>
import { scrollTo } from '@/utils/scrollTo'
export default {
    props: {
        data: {
            default() {
                return []
            },
            type: Array
        },
        border: {
            type: Boolean,
            default: false
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
                return [10, 20, 30, 50]
            }
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper'
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
        orderIndexArr: {
            type: Array,
            default() {
                return []
            }
        },
        spanArr: {
            type: Array,
            default() {
                return []
            }
        },
        contentSpanArr: {
            type: Array,
            default() {
                return []
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
                return []
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
                return []
            }
        }
    },
    data() {
        return {
            showData: []
        }
    },
    computed: {
        currentPage: {
            get() {
                return this.page
            },
            set(val) {
                this.$emit('update:page', val)
            }
        },
        pageSize: {
            get() {
                return this.limit
            },
            set(val) {
                this.$emit('update:limit', val)
            }
        }
    },
    watch: {
        data(val) {
            this.showData = val
            //   console.log("this.showDate", this.showData);
        }
    // cusColumnIndex:{
    //   handler(n,o){
    //   }
    // }
    // onlytotal(val) {
    //   this.showTotal = val;
    // }
    },
    mounted() {
    // console.log('子级')
    // console.log(this.$refs.elTables)
        this.showData = this.data
    // console.log("this.showDate", this.showData);
    },
    methods: {
        handleSizeChange(val) {
            this.$emit('pagination', { page: this.currentPage, limit: val })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },
        handleCurrentChange(val) {
            this.$emit('pagination', { page: val, limit: this.pageSize })
            if (this.autoScroll) {
                scrollTo(0, 800)
            }
        },
        // 修改table tr行的背景色
        tableRowStyle({ row, rowIndex }) {
            return 'color:#333;'
        },
        // 修改table header的背景色
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color: #f6f7fb;color: #333;font-weight: blod;'
            }
        },
        // select-change
        handleSelectionChange(selection) {
            this.$emit('selectChange', selection)
        },
        // 合并单元格
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            for (let i = 0; i < this.rowspans.length; i++) {
                if (
                    this.rowspans[i].row === rowIndex &&
          columnIndex === this.rowspans[i].index
                ) {
                    return this.rowspans[i].span
                }
            }
            if (this.autoMerge) {
                if (columnIndex === this.cusColumnIndex[0]) {
                    const _row = this.spanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                } else if (this.type === 1 && columnIndex === this.cusColumnIndex[1]) {
                    const _row = this.contentSpanArr[rowIndex]
                    const _col = _row > 0 ? 1 : 0
                    return {
                        rowspan: _row,
                        colspan: _col
                    }
                }
            }
        },

        // 合并单元格
        // objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        //   if (this.autoMerge) {
        //     console.log(row, column, rowIndex, columnIndex);
        //     if (columnIndex === 0) {
        //       for (let i = 0; i < this.OrderIndexArr.length; i++) {
        //         let element = this.OrderIndexArr[i];
        //         for (let j = 0; j < element.length; j++) {
        //           let item = element[j];
        //           console.log(rowIndex, item, element, rowIndex === item, j);
        //           if (rowIndex == item) {
        //             if (j == 0) {
        //               return {
        //                 rowspan: element.length,
        //                 colspan: 1
        //               };
        //             } else if (j != 0) {
        //               return {
        //                 rowspan: 0,
        //                 colspan: 0
        //               };
        //             }
        //           }
        //           // 以下内容为合并最后一行的列
        //           // if (item === element.length - 1) {
        //           //   if (columnIndex === 1 || columnIndex === 3) {
        //           //     return [1, 2];
        //           //   } else if (columnIndex === 2 || columnIndex === 4) {
        //           //     return [0, 0];
        //           //   }
        //           // }
        //         }
        //       }
        //     }else if (columnIndex === 1) {
        //       for (let i = 0; i < this.OrderIndexArr2.length; i++) {
        //         let element = this.OrderIndexArr2[i];
        //         for (let j = 0; j < element.length; j++) {
        //           let item = element[j];
        //           console.log(rowIndex, item, element, rowIndex === item, j);
        //           if (rowIndex == item) {
        //             if (j == 0) {
        //               return {
        //                 rowspan: element.length,
        //                 colspan: 1
        //               };
        //             } else if (j != 0) {
        //               return {
        //                 rowspan: 0,
        //                 colspan: 0
        //               };
        //             }
        //           }
        //           // 以下内容为合并最后一行的列
        //           // if (item === element.length - 1) {
        //           //   if (columnIndex === 1 || columnIndex === 3) {
        //           //     return [1, 2];
        //           //   } else if (columnIndex === 2 || columnIndex === 4) {
        //           //     return [0, 0];
        //           //   }
        //           // }
        //         }
        //       }
        //     }
        //     // 以下代码为合并指定行的指定的列
        //     // if (rowIndex === 2 || rowIndex === 3) {
        //     //   if (columnIndex === 1 || columnIndex === 3) {
        //     //     return [1, 2];
        //     //   } else if (columnIndex === 2 || columnIndex === 4) {
        //     //     return [0, 0];
        //     //   }
        //     // }
        //   } else {
        //     // if (rowIndex % 2 === 0) {
        //     //   if (columnIndex === 1 || columnIndex === 3) {
        //     //     return [1, 2];
        //     //   } else if (columnIndex === 2 || columnIndex === 4) {
        //     //     return [0, 0];
        //     //   }
        //     // }
        //   }
        // }
        // 排序
        handleSortChange(column) {
            this.$emit('sort-change', column)
        }
    }
}
</script>
<style lang ='scss' scoped>
// 设置表头主体的高度
/* 设置表主体的高度 */
.mt20 {
  margin-top: 20px;
}
.mb20 {
  margin-bottom: 20px;
  .table-tip {
    padding-left: 20px;
    font-size: 16px;
    color: #f00;
  }
}

.table {
  border: 1px solid #ddd;
  /* border-bottom: 0; */
  box-sizing: border-box;
  /deep/.item-action-primary {
    color: #008cff;
    cursor: pointer;
  }
  /deep/.item-action-danger {
    color: #f5493a;
    cursor: pointer;
  }
}
.table /deep/.el-table__body td {
  height: 50px;
  line-height: 50px;
  padding: 0px;
}
.table /deep/.el-table__body th {
  padding: 0px;
}
.table /deep/ th {
  padding: 8px 0;
}
.table /deep/.remark_hover {
  white-space: nowrap;
}
/* .table /deep/.remark_hover:hover {
  white-space: normal;
} */

// 分页区域
.tabel-pagination.hidden {
  display: none;
}
.tabel-pagination {
  width: 100%;
  height: 60px;
  border: 1px solid #ddd;
  border-top: 0;
  box-sizing: border-box;
  .button-left {
    float: left;
    margin: 15px 0;
    .el-button {
      width: 98px;
      height: 30px;
      line-height: 30px;
      margin-left: 20px;
      padding: 0;
      .cus-ml-20 {
        margin-left: 20px;
      }
      .cus-danger {
        margin: 0 20px;
        color: #fff;
        background-color: #f5493a;
        &:hover {
          background-color: #3cabff;
        }
      }
      span {
        float: left;
        display: block;
        width: 98px;
        height: 30px;
        background-color: #008cff;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 30px;
        border-radius: 3px;
        cursor: pointer;
        &:first-child {
          margin: 0 20px;
        }
        &:hover {
          background-color: #3cabff;
        }
      }
      .cus-width-120 {
        width: 120px;
      }
    }
  }
  .block {
    float: right;
    /deep/ .el-pagination {
      display: inline-block;
      margin: 13px 0;
      padding-right: 100px;
      color: #333;
    }
    /deep/ .el-pagination__total {
      color: #333;
      font-size: 14px;
      line-height: 30px;
    }
    /deep/ .el-pagination__sizes {
      margin-right: 40px;
      height: 30px;
      line-height: 30px;
    }
    /deep/ .el-pagination button {
      padding: 0px;
      height: 30px;
      line-height: 30px;
    }
    /deep/ .el-pager li {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #999;
    }
    /deep/ .el-pager li.active {
      color: #008cff;
    }
    /deep/ .el-pagination__jump {
      font-size: 14px;
      color: #333;
      height: 30px;
      line-height: 30px;
      margin-left: 12px;
    }
    /deep/ .el-pagination__editor {
      margin: 0 10px;
    }
    // 页码条数
    /deep/ .el-input--mini .el-input__inner {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #333;
    }
  }
}
</style>
