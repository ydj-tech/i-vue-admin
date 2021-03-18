<!-- Discription: 内容描述, author: ydj, Date: 2021-03-17 19:36:58 -->
<template>
<div>
     <div class="cus-form" :class="advanced ? 'search' : null">
          <el-form size="small">
            <div :class="advanced ? null: 'fold'">
              <el-row>
                <el-col :span="8" :md="8" :sm="24">
                  <el-form-item label="规则编号">
                    <el-input placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="8" :md="8" :sm="24">
                  <el-form-item label="使用状态">
                    <el-select v-model="form.status" placeholder="请选择">
                      <el-option value="1">关闭</el-option>
                      <el-option value="2">运行中</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :md="8" :sm="24">
                  <el-form-item label="调用次数">
                    <el-input style="width:100%" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="advanced">
                <el-col :span="8" :md="8" :sm="24">
                  <el-form-item label="更新日期">
                    <el-date-picker placeholder="请输入更新日期" />
                  </el-form-item>
                </el-col>
                <el-col :span="8" :md="8" :sm="24">
                  <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="请选择">
                      <el-option value="1">关闭</el-option>
                      <el-option value="2">运行中</el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :md="8" :sm="24">
                  <el-form-item label="描述">
                    <el-input style="width:100%" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <span style="float: right; margin-top: 30px;">
              <el-button type="primary" size="mini">查询</el-button>
              <el-button style="margin-left: 8px" size="mini">重置</el-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{advanced ? '收起' : '展开'}}
                <i
                  :class="advanced ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                />
              </a>
            </span>
          </el-form>
        </div>
        <div>
          <div class="operator">
            <el-button @click="addNew" type="primary" size="mini">新增</el-button>
            <el-button size="mini">批量操作</el-button>
            <el-dropdown>
              <el-button size="mini">
                更多操作
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>删除</el-dropdown-item>
                <el-dropdown-item>操作</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div>
            <cus-table
              :data="data"
              style="100%"
              :total="total"
              :page.sync="listQuery.page"
              :limit.sync="listQuery.limit"
              @pagination="init"
            >
              <el-table-column label="序号" align="center" type="index"></el-table-column>
              <el-table-column label="角色名称" align="center" prop="name"></el-table-column>
              <el-table-column label="备注" align="center" prop="mask"></el-table-column>
              <el-table-column label="分配菜单权限" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    size="mini"
                    @click="handleToInfo(scope.row.applyAuthorizationTypeId)"
                  >配置菜单</el-button>
                </template>
              </el-table-column>
            </cus-table>
          </div>
        </div>
</div>
</template>

<script>
export default {
    components: {},
    data () {
        return {
            advanced: true,
            form: {},
            total: 0,
            listQuery: {
                page: 1,
                limit: 10
            },
            data: [
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '总局审核人员',
                    mask: '总局审核人员'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                },
                {
                    xuhao: '1',
                    name: '超级管理员',
                    mask: '系统超级管理员，具有所有功能的权限'
                }
            ]
        }
    },

    computed: {},

    methods: {
        init() {},
        toggleAdvanced() {
            this.advanced = !this.advanced
        },
        addNew() {
            this.$emit('addNew', false)
        },
        handleToInfo() {}
    }
}

</script>
<style lang='scss' scoped>
.cus-form {
  padding: 20px;
}
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
