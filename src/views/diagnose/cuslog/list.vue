<!-- Discription: 设备列表, author: ydj, Date: 2019-11-09 09:52:46 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>日志列表</span>
        </div>
        <div style="margin-bottom:50px;">
          <div class="filter-container">
            <!-- <el-form :inline="true" class="demo-form-inline">
              <el-form-item label>
                <el-select v-model="type" placeholder="故障码/数据流/版本信息">
                  <el-option label="故障码" value="dtc"></el-option>
                  <el-option label="数据流" value="cds"></el-option>
                  <el-option label="版本信息" value="ver"></el-option>
                  <el-option label="登陆信息" value="login"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>-->
          </div>
          <el-table
            :key="tableKey"
            :data="list"
            stripe
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" class="demo-table-expand">
                  <template v-if="props.row.event === 'login' ? true : false">
                    <el-form-item label="经度">
                      <span>{{ props.row.info.longitude }}</span>
                    </el-form-item>
                    <el-form-item label="纬度">
                      <span>{{ props.row.info.latitude }}</span>
                    </el-form-item>
                    <el-form-item label="地址">
                      <span>{{ props.row.info.address }}</span>
                    </el-form-item>
                  </template>
                  <template v-if="props.row.event === 'dtc' ? true : false">
                    <el-table
                      :data="props.row.con"
                      stripe
                      fit
                      border
                      highlight-current-row
                      style="width: 100%;"
                    >
                      <el-table-column label="代号" align="center" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.code }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="中文描述" align="center" width="300">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description_cn }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="英文描述" align="center" width="300">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description_en }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="故障位置" align="center" width="180">
                        <template slot-scope="scope">
                          <span>{{ scope.row.position }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="描述" align="center" width="180">
                        <template slot-scope="scope">
                          <span>{{ scope.row.remark }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="提示" align="center" width="455">
                        <template slot-scope="scope">
                          <span>{{ scope.row.tips }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                  <template v-if="props.row.event === 'ver' ? true : false">
                    <el-table
                      :data="props.row.con"
                      stripe
                      fit
                      border
                      highlight-current-row
                      style="width: 100%;"
                    >
                      <el-table-column label="代号" align="center" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.code }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="中文描述" align="center" width="300">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description_cn }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="英文描述" align="center" width="300">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description_en }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="当前取值" align="center" width="350">
                        <template slot-scope="scope">
                          <span>{{ scope.row.value }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="描述" align="center" width="500">
                        <template slot-scope="scope">
                          <span>{{ scope.row.remark }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                  <template v-if="props.row.event === 'cds' ? true : false">
                    <el-table
                      :data="props.row.con"
                      stripe
                      fit
                      border
                      highlight-current-row
                      style="width: 100%;"
                    >
                      <el-table-column label="代号" align="center" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.code }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="命令字" align="center" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.command }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="中文描述" align="center" width="300">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description_cn }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="英文描述" align="center" width="300">
                        <template slot-scope="scope">
                          <span>{{ scope.row.description_en }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="当前取值" align="center" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.value }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="单位" align="center" width="100">
                        <template slot-scope="scope">
                          <span>{{ scope.row.unit }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="表达式" align="center" width="180">
                        <template slot-scope="scope">
                          <span>{{ scope.row.formula }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="描述" align="center" width="180">
                        <template slot-scope="scope">
                          <span>{{ scope.row.remark }}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="提示" align="center" width="480">
                        <template slot-scope="scope">
                          <span>{{ scope.row.tips }}</span>
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                  <!-- <template v-if="props.row.event === 'valid' ? true : false"/> -->
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="编号" align="center" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.sn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="盒子号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.device }}</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.con.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="头像" align="center">
              <template slot-scope="scope">
                <div>
                  <el-avatar :size="50" :src="scope.row.con.avatar" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="事件" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.event }}</span>
              </template>
            </el-table-column>
            <el-table-column label="时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.update_time }}</span>
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
import { pageList } from "@/api/diagnose/cuslog";
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
      tableKey: 0,
      listLoading: true, // 开发时改为true
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      },
      event: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      try {
        const response = await pageList(this.listQuery);
        this.total = response.total;
        response.items.forEach(item => {
          item.con = JSON.parse(item.content);
          if (item.con && item.con.address) {
            item.info = JSON.parse(item.con.address);
          }
        });
        this.list = response.items;
      } catch (error) {}
    },
    handleUpdate(row) {
      this.$router.push({ path: "/diagnose/dtc/edit/" + row.sn });
    },
    onSubmit() {
      this.init();
    }
  }
};
</script>
