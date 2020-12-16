<!-- Discription: 故障码列表, author: ydj, Date: 2019-11-09 09:52:46 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>故障码列表</span>
        </div>
        <div style="margin-bottom:50px;">
          <div class="filter-container">
            <router-link to="/diagnose/dtc/create">
              <el-button v-waves class="filter-item" type="success" icon="el-icon-plus">新增</el-button>
            </router-link>
            <el-form
              :inline="true"
              class="demo-form-inline"
              style="float:right; vertical-align:middle;"
            >
              <el-form-item label>
                <el-input v-model="code" placeholder="故障码" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table
            :key="tableKey"
            :data="list"
            stripe
            border
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="sn" align="center" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.sn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="代号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>
            <el-table-column label="中文描述" align="center" width="430">
              <template slot-scope="scope">
                <span>{{ scope.row.description_cn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="英文描述" align="center" width="430">
              <template slot-scope="scope">
                <span>{{ scope.row.description_en }}</span>
              </template>
            </el-table-column>
            <el-table-column label="部位" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.position }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              width="230"
              class-name="small-padding fixed-width"
            >
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <pagination
            v-show="total > 0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="init"
          />
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";
import { pageList, deleteDtc } from "@/api/diagnose/dtc";
import {
  eventStatusOptions,
  percentStageOptions
} from "@/api/contacts/options";

export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(value, element) {
      return eventStatusOptions.filter(it => {
        return value === it.value;
      })[0][element];
    },
    percentFilter(value, element) {
      return percentStageOptions.filter(it => {
        return value === it.value;
      })[0][element];
    }
  },
  data() {
    return {
      tableKey: 0,
      listLoading: true, // 开发时改为true
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      code: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const response = await pageList(this.listQuery, this.code);
        this.total = response.total;
        this.list = response.items;
      } catch (err) {
      }
    },
    handleUpdate(row) {
      this.$router.push({ path: "/diagnose/dtc/edit/" + row.sn });
    },
    handleDelete(row) {
      deleteDtc(row.sn).then(response => {
        if (response.data.status === 80200) {
          this.$message({ message: "删除成功", type: "success" });
          this.init();
        }
      });
    },

    onSubmit() {
      this.init();
    }
  }
};
</script>
