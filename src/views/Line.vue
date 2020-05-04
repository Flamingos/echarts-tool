<template>
  <div>
    <ChartHead></ChartHead>
    <el-row class="wrapper">
      <el-col class="menu">
        <el-tabs type="border-card">
          <el-tab-pane label="显示相关">
            <AxisLayout :option="option" :myChart="myChart"></AxisLayout>
            <AxisLegend :option="option" :myChart="myChart"></AxisLegend>
            <Legend :option="option" :myChart="myChart"></Legend>
            <Title :option="option" :myChart="myChart"></Title>
            <LineStyle :option="option" :myChart="myChart"></LineStyle>
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
        <LineForm :option="option" :myChart="myChart" :type="'line'"></LineForm>
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
import AxisLegend from "@/components/AxisLegend.vue";
import LineStyle from "@/components/LineStyle.vue";
import LineSize from "@/components/LineSize.vue";
import LineForm from "@/components/LineForm.vue";
import Legend from "@/components/Legend.vue";
import CodeEditor from "@/components/CodeEditor.vue";
import Save from "@/components/Save.vue";
import Reset from "@/components/Reset.vue";
export default {
  components: {
    ChartHead,
    Title,
    AxisLayout,
    AxisLegend,
    LineStyle,
    LineSize,
    LineForm,
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
  activated() {
    this.init();
  },
  methods: {
    //配置代码option
    init() {
      this.isNew = this.$route.params.isNew;
      if (this.isNew) {
        if (sessionStorage[this.$route.params.type]) {
          this.option = JSON.parse(sessionStorage[this.$route.params.type]);
          this.myChart.setOption(this.option);
        } else {
          this.drawLine();
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
      this.drawLine();
    },
    drawLine() {
      this.showline = true;
      this.option = {
        title: {
          show:true,
          text: "示例",
          subtext: "副标题",
          left: "left"
        },
        tooltip: {},
        grid: {},
        legend: {
          show: true,
          data: ["one", "two"],
          left: "10%",
          top: "0%",
          orient: "horizontal",
          type: "plain"
        },
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
            inside: false,
            show: true
          },
          position: "bottom"
        },
        yAxis: {
          boundaryGap: false,
          axisLabel: {
            rotate: 0,
            interval: 0,
            inside: false,
            show: true
          },
          position: "left"
        },
        series: [
          {
            name: "one",
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
            name: "two",
            type: "line",
            areaStyle: { opacity: 0 },
            smooth: false,
            label: {
              show: false
            },
            step: "",
            data: [20, 10, 50, 45, 38, 9]
          }
        ]
      };
      this.myChart.setOption(this.option);
    },
    save() {
      if (!localStorage.options) {
        localStorage.options = JSON.stringify([]);
      }
      let options = JSON.parse(localStorage.options);
      if (this.isNew) {
        options.push({ type: this.$route.params.type, option: this.option });
      } else {
        options[this.$route.params.number].option = this.option;
      }
      localStorage.options = JSON.stringify(options);
      this.$router.push({ name: "userCenter" });
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
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
.aside {
  height: 100%;
  width: 410px;
}
.save {
  position: fixed;
  right: 10px;
  bottom: 20px;
}
</style>