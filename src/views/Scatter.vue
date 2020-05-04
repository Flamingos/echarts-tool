<template>
  <div>
      <ChartHead></ChartHead>
    <el-row class="wrapper">
      <el-col class="menu">
        <el-tabs type="border-card">
          <el-tab-pane label="显示相关">
            <AxisLayout :option="option" :myChart="myChart"></AxisLayout>
            <Legend :option="option" :myChart="myChart"></Legend>
            <Title :option="option" :myChart="myChart"></Title>
            <LineSize :option="option" :myChart="myChart"></LineSize>
          </el-tab-pane>
          <el-tab-pane label="查看代码">
            <CodeEditor :option="option"></CodeEditor>
          </el-tab-pane>
        </el-tabs>

        <!--el-button-- type="primary" @click="downloadImg">保存为图片</!--el-button-->
      </el-col>
      <el-col class="show">
        <div id="main" ref="main"></div>
      </el-col>
      <el-col class="aside">
        <ScatterForm :option="option" :myChart="myChart" :type="'scatter'"></ScatterForm>
      </el-col>
    </el-row>
    <Reset @reset="reset"></Reset>
    <Save :option="option" :isNew="isNew"></Save>
  </div>
</template>

<script>
import ChartHead from "@/components/ChartHead.vue";
import Title from "@/components/Title.vue";
import AxisLayout from "@/components/AxisLayout.vue";
import LineStyle from "@/components/LineStyle.vue";
import LineSize from "@/components/LineSize.vue";
import ScatterForm from "@/components/ScatterForm.vue";
import Legend from "@/components/Legend.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import Save from '@/components/Save.vue'
import Reset from "@/components/Reset.vue";
export default {
  components: {
    ChartHead,
    Title,
    AxisLayout,
    LineStyle,
    LineSize,
    ScatterForm,
    Legend,
    CodeEditor,
    Save,
    Reset
  },
  data() {
    return {
      isNew: true,
      myChart: {}, //echarts实例
      option: {} //存储图表配置
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    //ref绑定，减少获取DOM节点的消耗
    this.myChart = this.$echarts.init(this.$refs.main);
  },
  activated(){
    this.init()
  },
  methods: {
    init() {
      this.isNew = this.$route.params.isNew;
      if (this.isNew) {
        if(sessionStorage[this.$route.params.type]){
          this.option = JSON.parse(sessionStorage[this.$route.params.type])
          this.myChart.setOption(this.option);
        }else{
          this.drawScatter();
        }
      } else {
        let option = JSON.parse(localStorage.options)[this.$route.params.number]
          .option;
        if (option) {
          this.option = option;
          this.myChart.setOption(this.option);
        }
      }
    },
    reset() {
      console.log("reset");
      this.drawScatter();
    },
    //配置代码option
    drawScatter() {
      // 绘制图表
      this.option = {
        title: {
          show: true,
          text: "示例",
          subtext: "副标题",
          left: "left"
        },
        tooltip: {},
        grid: {},
        legend: { show: true,
          data: ["one", "two"],
          left: "10%",
          top: "0%",
          orient: "horizontal",
          type: "plain" },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
            scale:true,
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false,
            show: true
          },
          position: 'bottom'
        },
        yAxis: {
            scale:true,
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false,
            show: true
          },
          position: 'left'
        },
        series: [
          {
            name: "one",
            type: "scatter",
            label: {
              show: false
            },
            data: [
              [161.2, 51.6],
              [167.5, 59.0],
              [159.5, 49.2],
              [157.0, 63.0],
              [155.8, 53.6],
            ]
          },
          {
            name: "two",
            type: "scatter",
            label: {
              show: false
            },
            data: [[10, 20],
            [20, 10]]
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
  width: 280px;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  overflow: scroll;
}
.show {
  width: calc(100vw - 740px);
  height: 100%;
  background: rgba(178, 205, 235, 0.2);
}
.aside {
  width: 460px;
}
</style>