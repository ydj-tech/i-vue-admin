<!-- Discription: 用户列表, author: ydj, Date: 2019-12-03 20:55:11 -->
<template>
  <div>
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>会员列表</span>
        </div>
        <div style="margin-bottom:50px;">
          <!-- <div class="filter-container">
            <router-link to="/diagnose/dtc/create">
              <el-button
                v-waves
                class="filter-item"
                type="success"
                icon="el-icon-plus"
              >{{ $t('table.add') }}</el-button>
            </router-link>
          </div>-->
          <el-table
            :key="tableKey"
            :data="list"
            stripe
            fit
            highlight-current-row
            style="width: 100%;"
          >
            <el-table-column label="编号" align="center" width="180">
              <template slot-scope="scope">
                <span>{{ scope.row.sn }}</span>
              </template>
            </el-table-column>
            <el-table-column label="昵称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.nickname }}</span>
              </template>
            </el-table-column>
            <el-table-column label="头像" align="center">
              <template slot-scope="scope">
                <div>
                  <el-avatar :size="50" :src="scope.row.avatar" />
                </div>
              </template>
            </el-table-column>
            <el-table-column label="地址" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.addr.address }}</span>
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
import { pageList } from "@/api/diagnose/user";
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
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
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
          item.addr = JSON.parse(item.address);
        });
        this.list = response.items;
      } catch (error) {}
    },
    handleUpdate(row) {
      this.$router.push({ path: "/diagnose/dtc/edit/" + row.sn });
    }
  }
};
</script>
