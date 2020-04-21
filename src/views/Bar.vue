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
        <LineForm :option="option" :myChart="myChart" :type="'bar'"></LineForm>
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
    this.drawBar();
  },
  methods: { 
    //配置代码option
    drawBar() {
      // 绘制图表
      this.option = {
        title: {
          text: "示例",
          subtext: "副标题",
          left: "left"
        },
        tooltip: {},
        grid: {},
        legend: { data: ['one','two'],left: '10%'},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false
          }
        },
        yAxis: {
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false
          }
        },
        series: [
          {
            name: 'one',
            type: "bar",
            label: {
              show: false
            },
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name:'two',
            type: "bar",
            label: {
              show: false
            },
            data: [20, 10, 50, 45, 38, 9]
          }
        ]
      };
      this.myChart.setOption(this.option);
    }
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
  width: 270px;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  overflow: scroll;
}
.show {
  width: calc(100vw - 680px);
  height: 100%;
  background: rgba(178, 205, 235, 0.2);
}
.aside{
  width: 410px;
}
</style>