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
            <Legend :option="option" :myChart="myChart"></Legend>
            <RoseType :option="option" :myChart="myChart"></RoseType>
            <Title :option="option" :myChart="myChart"></Title>
            <PieSize :option="option" :myChart="myChart"></PieSize>
          </el-tab-pane>
          <el-tab-pane label="查看代码">
            <CodeEditor :option='option'></CodeEditor>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col class="show">
        <div id="main" ref="main"></div>
      </el-col>
      <el-col class="aside">
        <PieForm :option="option" :myChart="myChart"></PieForm>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
import Legend from "@/components/Legend.vue";
import RoseType from "@/components/RoseType.vue";
import PieSize from "@/components/PieSize.vue";
import PieForm from "@/components/PieForm.vue";
import CodeEditor from '@/components/CodeEditor.vue'
export default {
  components: { Title, Legend, RoseType, PieSize, PieForm, CodeEditor },
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
    this.drawPie();
  },
  methods: {
    //配置代码option
    drawPie() {
      this.option = {
        title: {
          show: true,
          text: "示例",
          subtext: "副标题",
          titlePos: "left"
        },
        tooltip: {},
        legend: {
          left: "10%",
          top: "0%",
          orient: "horizontal",
          show: true,
          data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            type: "pie",
            roseType: "",
            radius: ["0%", "75%"],
            data: [
              { name: "直接访问", value: "335" },
              { name: "邮件营销", value: "310" },
              { name: "联盟广告", value: "234" },
              { name: "视频广告", value: "135" },
              { name: "搜索引擎", value: "154" }
            ]
          }
        ]
      };
      this.myChart.setOption(this.option);
    }
    /*downloadImg() {
      let img = this.myChart.getDom().getElementsByTagName("canvas")[0];
      Canvas2Image().saveAsPNG(img, 2000, 1400);
    }*/
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
.container {
  position: fixed;
}
.menu {
  height: 100%;
  width: 270px;
  background: rgba(0, 0, 0, 0.2);
  overflow: scroll;
}
.axis-card {
  margin-bottom: 1em;
}
.card-item {
  margin-bottom: 0.5em;
}

.box-card {
  width: 480px;
}

.show {
  height: 100%;
  width: calc(100vw - 680px);
  overflow: scroll;
  background: rgba(178, 205, 235, 0.2);
}
.aside{
  width: 410px;
}
</style>