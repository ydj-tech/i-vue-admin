<!-- Discription: 内容描述, author: ydj, Date: 2020-07-28 20:56:11 -->
<template>
  <!-- <h1>我是首页</h1> -->
  <div class="wrap">
    <el-row>
      <el-col :span="8">
        <div id="myChart" :style="{width: '500px', height: '300px'}"></div>
      </el-col>
      <el-col :span="8">
        <div id="myChart1" :style="{width: '500px', height: '300px'}"></div>
      </el-col>
      <el-col :span="8">
        <div id="myChart2" :style="{width: '500px', height: '300px'}"></div>
      </el-col>
      <el-col :span="8">
        <div style="width:500px;height:500px" ref="chart"></div>
      </el-col>
      <el-col :span="16">
        <china-map />
      </el-col>
    </el-row>

    <!-- <el-table :data="list" border style="margin-top:40px;" :span-method="objectSpanMethod">
      <el-table-column prop="CDBATCH" label="申请号" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.CDBATCH}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="LICENSENO" label="许可证号" width="140">
        <template slot-scope="scope">
          <span>{{scope.row.LICENSENO}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="EQUIPMENTMODEL" label="设备型号" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.EQUIPMENTMODEL}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="EQUIPMENTNAME" label="设备名称">
        <template slot-scope="scope">
          <span>{{scope.row.EQUIPMENTNAME}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="PRNUMBERCOUNT" label="打印数量">
        <template slot-scope="scope">
          <span>{{scope.row.PRNUMBERCOUNT}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="OBTAINSTYLE" label="领取方式" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.OBTAINSTYLE}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.state}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lk" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 20 || scope.row.status ===10"
            type="text"
            size="mini"
            @click="handScore(scope.row)"
          >查 看</el-button>
          <el-button
            v-if="scope.row.status === -1"
            type="text"
            size="mini"
            @click="handScore(scope.row)"
          >上 传</el-button>
          <el-button
            v-if="scope.row.status === 0"
            type="text"
            size="mini"
            @click="handScore(scope.row)"
          >提 交</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="page.total"
      :page.sync="page.pageNo"
      :limit.sync="page.pageSize"
      @pagination="initData"
      slot="Pagination"
    ></Pagination> -->
  </div>
</template>

<script>
import ChinaMap from "@/components/ChinaMap";
import { login } from "@/api";
import Pagination from "@/components/Pagination";
export default {
  components: { ChinaMap, Pagination },
  data() {
    return {
      list: [],
      page: {
        total: 13,
        pageNo: 1,
        pageSize: 10
      },
      // 合并单元格
      autoMerge: true,
      spanArr: [],
      contentSpanArr: [],
      colSpanArr: [],
      pos: 0,
      position: 0,
      colpos: 0
    };
  },
  created() {
    // this.init()
    // this.initData();
  },
  mounted() {
    this.drawLine();
    this.drawLine1();
    this.drawLine2();
    this.initCharts();
  },
  computed: {},

  methods: {
    initData() {
      if (this.page.pageNo === 1) {
        this.list = [
          {
            CDBATCH: "PN202011051891",
            EQUIPMENTMODEL: "H10g-31",
            EQUIPMENTNAME: "吉比特无源光纤接入用户端设备（GPON ONU）",
            LICENSENO: "19-7448-202949",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 50000,
            ROW_ID: 1,
            SLBH: "20023802",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011051891",
            EQUIPMENTMODEL: "H10e-31",
            EQUIPMENTNAME: "边缘路由器",
            LICENSENO: "12-7448-202948",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 50000,
            ROW_ID: 2,
            SLBH: "20023801",
            SYNCID: null,
            lk: "查看",
            rn: 2,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011051892",
            EQUIPMENTMODEL: "SVG6032",
            EQUIPMENTNAME: "边缘路由器",
            LICENSENO: "12-7448-182483",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 500,
            ROW_ID: 3,
            SLBH: "18022530",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011051893",
            EQUIPMENTMODEL: "SVG6000RW-M(LAN)",
            EQUIPMENTNAME: "边缘路由器",
            LICENSENO: "12-7448-190744",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 100000,
            ROW_ID: 4,
            SLBH: "19020755",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011051894",
            EQUIPMENTMODEL: "H80G",
            EQUIPMENTNAME: "吉比特无源光纤接入用户端设备（GPON ONU）",
            LICENSENO: "19-7448-184017",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 80000,
            ROW_ID: 5,
            SLBH: "18024156",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011051895",
            EQUIPMENTMODEL: "H810G（GPON）",
            EQUIPMENTNAME: "吉比特无源光纤接入用户端设备（GPON ONU）",
            LICENSENO: "19-7448-190743",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 40000,
            ROW_ID: 6,
            SLBH: "19020762",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011051896",
            EQUIPMENTMODEL: "SVX8032",
            EQUIPMENTNAME: "程控用户交换机",
            LICENSENO: "04-7448-183965",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 2000,
            ROW_ID: 7,
            SLBH: "18024085",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN2020112015831",
            EQUIPMENTMODEL: "SVG6032",
            EQUIPMENTNAME: "边缘路由器",
            LICENSENO: "12-7448-182483",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 1000,
            ROW_ID: 8,
            SLBH: "18022530",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN2020112015831",
            EQUIPMENTMODEL: "SVG6008",
            EQUIPMENTNAME: "边缘路由器",
            LICENSENO: "12-7448-201955",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 1000,
            ROW_ID: 9,
            SLBH: "20022481",
            SYNCID: null,
            lk: "查看",
            rn: 2,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN2020112015831",
            EQUIPMENTMODEL: "SVX8032",
            EQUIPMENTNAME: "程控用户交换机",
            LICENSENO: "04-7448-183965",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 1000,
            ROW_ID: 10,
            SLBH: "18024085",
            SYNCID: null,
            lk: "查看",
            rn: 3,
            state: "已通过",
            status: 20
          }
        ];
        this.getOrderNumber(this.list);
      } else {
        this.list = [
          {
            CDBATCH: "PN202011235030",
            EQUIPMENTMODEL: "H810G（GPON）",
            EQUIPMENTNAME: "吉比特无源光纤接入用户端设备（GPON ONU）",
            LICENSENO: "19-7448-190743",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 20000,
            ROW_ID: 11,
            SLBH: "19020762",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          },
          {
            CDBATCH: "PN202011245027",
            EQUIPMENTMODEL: "SVG6000RW-M(LAN)",
            EQUIPMENTNAME: "边缘路由器",
            LICENSENO: "12-7448-190744",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 70000,
            ROW_ID: 12,
            SLBH: "19020755",
            SYNCID: null,
            lk: "上传",
            rn: 1,
            state: "待上传",
            status: 0
          },
          {
            CDBATCH: "PN202011245029",
            EQUIPMENTMODEL: "H10g-31",
            EQUIPMENTNAME: "吉比特无源光纤接入用户端设备（GPON ONU）",
            LICENSENO: "19-7448-202949",
            OBTAINSTYLE: "邮寄",
            PRNUMBERCOUNT: 134000,
            ROW_ID: 13,
            SLBH: "20023802",
            SYNCID: null,
            lk: "查看",
            rn: 1,
            state: "已通过",
            status: 20
          }
        ];
        this.getOrderNumber(this.list);
      }
    },
    // 获取相同编号的数组
    getOrderNumber(data) {
      this.spanArr.length = 0;
      this.contentSpanArr.length = 0;
      this.colSpanArr.length = 0;
      this.pos = 0;
      this.position = 0;
      this.colpos = 0;
      data.map((item, i) => {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
          this.contentSpanArr.push(1);
          this.position = 0;
          this.colSpanArr.push(1);
          this.colpos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同(第1列)
          if (data[i].CDBATCH === data[i - 1].CDBATCH) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
          // 判断当前元素与上一个元素是否相同(第2列)
          if (
            data[i].state === data[i - 1].state &&
            data[i].CDBATCH === data[i - 1].CDBATCH
          ) {
            this.contentSpanArr[this.position] += 1;
            this.contentSpanArr.push(0);
            this.colSpanArr[this.colpos] += 1;
            this.colSpanArr.push(0);
          } else {
            this.contentSpanArr.push(1);
            this.position = i;
            this.colSpanArr.push(1);
            this.colpos = i;
          }
        }
      });
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
    async init() {
      try {
        const res = await login({ name: "zs", psd: "111111" });
        console.log("res==", res);
      } catch (error) {
        console.log(error);
      }
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "北京市销量" },
        tooltip: {},
        xAxis: {
          type: "category",
          data: ["房山区", "顺义区", "密云区", "大兴区", "延庆县", "平谷区"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart.setOption({
        title: { text: "天津市销量" },
        tooltip: {},
        xAxis: {
          data: ["蓟县", "武清区", "开发区", "河东区", "和平区", "开发区"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart2"));
      // 绘制图表
      myChart.setOption({
        title: { text: "山东省销量" },
        tooltip: {},
        xAxis: {
          data: ["菏泽市", "济南市", "青岛市", "潍坊市", "临沂市", "烟台市"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    initCharts() {
      let myChart = this.$echarts.init(this.$refs.chart, "shine");
      // 绘制图表
      myChart.setOption({
        title: { text: "省市销量分布图" },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: [
              {
                value: 748,
                name: "北京"
              },
              {
                value: 410,
                name: "天津"
              },
              {
                value: 234,
                name: "广东"
              },
              {
                value: 335,
                name: "上东"
              },
              {
                value: 445,
                name: "河北"
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.wrap {
  padding: 20px;
}
</style>
