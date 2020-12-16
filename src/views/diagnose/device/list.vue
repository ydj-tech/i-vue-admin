<!-- Discription: 设备列表, author: ydj, Date: 2019-11-09 09:52:46 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>设备列表</span>
        </div>
        <div style="margin-bottom:50px;">
          <div class="filter-container">
            <router-link to="/diagnose/device/create">
              <el-button v-waves class="filter-item" type="success" icon="el-icon-plus">新增</el-button>
            </router-link>
            <el-form
              :inline="true"
              class="demo-form-inline"
              style="float:right; vertical-align:middle;"
            >
              <el-form-item label>
                <el-input v-model="code" placeholder="设备名称" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="list" style="width: 100%;">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="经度">
                    <span>{{ scope.row.longitude }}</span>
                  </el-form-item>
                  <el-form-item label="纬度">
                    <span>{{ scope.row.latitude }}</span>
                  </el-form-item>
                  <el-form-item label="地址">
                    <span>{{ scope.row.address }}</span>
                  </el-form-item>
                  <el-form-item label="描述">
                    <span>{{ scope.row.remark }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="编号" align="center" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.sn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="硬件编号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.hid }}</span>
              </template>
            </el-table-column>
            <el-table-column label="硬件版本" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.hard_ver }}</span>
              </template>
            </el-table-column>
            <el-table-column label="软件版本" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.soft_ver }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status }}</span>
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
import { pageList } from "@/api/diagnose/device";
import {
  eventStatusOptions,
  percentStageOptions
} from "@/api/contacts/options";

export default {
  name: "BInfoList",
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
      items: [],
      status: [],
      tableKey: 0,
      listLoading: false, // 开发时改为true
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
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
      } catch (error) {}
    },
    handleUpdate(row) {
      this.$router.push({ path: "/diagnose/device/edit/" + row.sn });
    },
    onSubmit() {
      this.init();
    }
  }
};
</script>
