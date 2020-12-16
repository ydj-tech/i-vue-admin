<!-- Discription: 中国地形图, author: ydj, Date: 2020-11-26 19:37:10 -->
<template>
  <!-- 初始化echarts需要个有宽高的盒子 -->
  <div ref="mapbox" style="height:600px;width:1000px;"></div>
</template>

<script>
import { data, geoCoordMap } from "@/data/map";
import { initChina } from "@/api/home";
export default {
  components: {},
  data() {
    return {};
  },

  mounted() {
    this.init();
    // this.getData();
  },
  computed: {},

  methods: {
    convertData(data) {
      let res = [];
      for (let i = 0; i < data.length; i++) {
        let geCord = geoCoordMap[data[i].name];
        if (geCord) {
          res.push({
            name: data[i].name,
            value: geCord.concat(data[i].value)
          });
        }
      }
      return res;
    },
    init() {
      this.mycharts = this.$echarts.init(this.$refs.mapbox);
      //使用地图需要注册
      const options = {
        backgroundColor: "#404a59", // 默认背景颜色显示
        title: {
          text: "全国主要城市数据终端分布图",
          subtext: "data from deveice",
          sublink: "#",
          left: "center",
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          y: "bottom",
          x: "right",
          data: ["pm2.5"],
          textStyle: {
            color: "#fff"
          }
        },
        geo: {
          map: "china", // 获取中国地图
          layoutCenter: ["50%", "50%"], // 设置地图居中
          layoutSize: 600, // 设置最大宽高
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              borderWidth: 2, //边框大小
              borderColor: "#323c48", //  地图边框颜色
              areaColor: "#111" //背景颜色
            },
            emphasis: {
              areaColor: "#2a333d", // 鼠标移入显示效果，既高亮显示
              show: true //  高亮显示是否触发
            }
          }
        },
        series: [
          {
            // name: 'pm2.5',  //鼠标移入显示名字
            type: "scatter", // 类型
            coordinateSystem: "geo", // 获取上面定义的样式
            data: this.convertData(data), //数据传输接口
            symbolSize: function(val) {
              return val[2] / 18; //根据传入至计算小圆的大小
            },
            label: {
              normal: {
                formatter: "{b}", // 图例文版显示
                position: "right", // 定位方式，以当前元素的父元素
                show: false //小图城市名字显示控制
              },
              emphasis: {
                //高亮显示样式
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#ddb926" //小圆的颜色
              }
            }
          },
          {
            // name: 'Top 5',  // 弹出层显示内容
            type: "effectScatter",
            coordinateSystem: "geo", // 获取上面定义的样式
            data: this.convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value;
                })
                .slice(0, 10)
            ), // 在
            symbolSize: function(val) {
              return val[2] / 16;
            },
            // showEffectOn: 'emphasis',  //控制动画直接播放
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true, // 鼠标移入效果
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true //控制文字显示与隐藏
              }
            },
            itemStyle: {
              normal: {
                color: "#f4e925", //颜色
                shadowBlur: 10,
                shadowColor: "#333" // 波纹显示效果
              }
            }
          }
        ]
        // title: {
        //   text: "全国销量分布图",
        //   link: "https://blog.csdn.net/qq_36818627?spm=1001.2101.3001.5113",
        //   subtext: "全国销量分布图",
        //   sublink: "https://blog.csdn.net/qq_36818627?spm=1001.2101.3001.5113"
        // },
        // series: [
        //   {
        //     name: "累计确诊",
        //     type: "map",
        //     map: "china", //通知echarts渲染地图
        //     //控制对应地图的汉字
        //     label: {
        //       show: true,
        //       color: "black", //地区名的颜色
        //       fontSize: 10
        //     },
        //     itemStyle: {
        //       areaColor: "#ff0000"
        //     },
        //     zoom: 1.2, //控制地图的方法缩小
        //     emphasis: {
        //       //控制鼠标划过后的背景色
        //       label: {
        //         color: "#fff",
        //         fontSize: 12
        //       },
        //       itemStyle: {
        //         areaColor: "#83b5e7"
        //       }
        //     },
        //     data: [] //后台数据
        //   }
        // ],
        // visualMap: [
        //   {
        //     type: "piecewise",
        //     show: true,
        //     pieces: [
        //       { min: 10000 },
        //       { min: 1000, max: 9999 },
        //       { min: 100, max: 999 },
        //       { min: 10, max: 99 },
        //       { min: 1, max: 9 }
        //     ]
        //   }
        // ],
        // tooltip: [
        //   {
        //     trigger: "item"
        //   }
        // ]
      };
      this.mycharts.setOption(options);
    },
    async getData() {
      try {
        const response = await initChina();
        console.log(response, 2222);
      } catch (error) {}
    }
  }
};
</script>
<style lang='scss' scoped>
</style>
