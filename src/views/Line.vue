<template>
  <div>
    <el-row>
      <el-col class="head">
        图表编辑工具
      </el-col>
    </el-row>
    <el-row class="wrapper">
      <el-col class="menu">
        <el-tabs type="border-card">
          <el-tab-pane label="显示相关">
            <AxisLayout :option='option' :myChart='myChart'></AxisLayout>
            <AxisLegend :option='option' :myChart='myChart'></AxisLegend>
            <Legend :option='option' :myChart='myChart'></Legend>
            <Title :option="option" :myChart="myChart"></Title>
            <LineStyle :option="option" :myChart="myChart"></LineStyle>
            <LineSize :option="option" :myChart="myChart"></LineSize>
          </el-tab-pane>
          <el-tab-pane label="查看代码">
            <CodeEditor :option='option'></CodeEditor>
          </el-tab-pane>
        </el-tabs>

        <!--el-button-- type="primary" @click="downloadImg">保存为图片</!--el-button-->
      </el-col>
      <el-col class="show">
        <div id="main" ref="main"></div>
      </el-col>
      <el-col class="aside">
        <LineForm :option="option" :myChart="myChart" :type="'line'"></LineForm>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import AxisLayout from '@/components/AxisLayout.vue'
import AxisLegend from '@/components/AxisLegend.vue'
import LineStyle from '@/components/LineStyle.vue'
import LineSize from '@/components/LineSize.vue'
import LineForm from '@/components/LineForm.vue'
import Legend from '@/components/Legend.vue'
import CodeEditor from '@/components/CodeEditor.vue'
export default {
  components:{ Title,AxisLayout,AxisLegend,LineStyle,LineSize,LineForm,Legend,CodeEditor },
  data() {
    return {
      myChart: {}, //echarts实例
      option: {}, //存储图表配置
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    //ref绑定，减少获取DOM节点的消耗
    this.myChart = this.$echarts.init(this.$refs.main);
    this.drawLine();
  },
  methods: { 
    //配置代码option
    drawLine() {
      this.showline = true;
      this.option = {
        title: {
          text: "示例",
          subtext: "副标题",
          left: "left"
        },
        tooltip: {},
        grid: {},
        legend: { data: ['one','two'], left: '10%' },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          boundaryGap: false,
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false
          }
        },
        yAxis: {
          boundaryGap: false,
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false
          }
        },
        series: [
          {
            name:'one',
            type: "line",
            areaStyle: { opacity: 0 },
            smooth: false,
            label: {
              show: false
            },
            step: "",
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name:'two',
            type: "line",
            areaStyle: { opacity: 0 },
            smooth: false,
            label: {
              show: false
            },
            step: "",
            data: [20, 10, 50, 45, 38, 9]
          },
          /*{
            name:'three',
            type: "pie",
            roseType: "",
            radius: [0, '30%'],
        center: ['75%', '25%'],
            data: [
              { name: "直接访问", value: "335" },
              { name: "邮件营销", value: "310" },
              { name: "联盟广告", value: "234" },
              { name: "视频广告", value: "135" },
              { name: "搜索引擎", value: "154" }
            ]
          }*/
        ]
      };
      this.myChart.setOption(this.option);
    },
  }
};
</script>

<style lang="scss" scoped>
.head{
  color: white;
  line-height: 3em;
  font-size: 1em;
  height: 3em;
  padding-left: 1em;
  background-color: rgba(53,137,255);
}
.wrapper{
  height: calc(100vh - 3em);
  min-width: 1300px;
}
#main {
  height: 400px;
  width: 600px;
}
.show {
  overflow: scroll;
}
.axis-card {
  margin-bottom: 1em;
}
.menu {
  height: 100%;
  width: 270px;
  background: rgba(0, 0, 0, 0.2);
  overflow: scroll;
}
.show {
  height: 100%;
  width: calc(100vw - 680px);
  background: rgba(178, 205, 235, 0.2);
}
.aside{
  height: 100%;
  width: 410px;
}
</style>