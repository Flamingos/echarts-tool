<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
      <span>图表样式</span>
    <div class="card-item">
      <div>显示数值</div>
      <el-switch v-model="showlabel" active-color="#13ce66" @change="showLabelChange"></el-switch>
    </div>
    <div v-if="showline">
      <div class="card-item">
        <div>平滑曲线</div>
        <el-switch v-model="smooth" active-color="#13ce66" @change="smoothChange"></el-switch>
      </div>
      <div class="card-item">
        <div>曲线填充</div>
        <el-switch v-model="areaStyle" active-color="#13ce66" @change="areaStyleChange"></el-switch>
      </div>
      <div class="card-item">
        <div>阶梯线图</div>
        <el-switch v-model="step" active-color="#13ce66" @change="stepChange"></el-switch>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      smooth: false,
      areaStyle: 0,
      showlabel: false,
      step: false,
      showline: true
    };
  },
  props: ["option", "myChart"],
  methods: {
    showLabelChange() {
      for (let i = 0; i < this.option.series.length; i++) {
        Object.assign(this.option.series[i].label, {
          show: this.showlabel
        });
      }
      this.myChart.setOption(this.option, true);
    },
    smoothChange() {
      for (let i = 0; i < this.option.series.length; i++) {
        Object.assign(this.option.series[i], {
          smooth: this.smooth
        });
      }
      this.myChart.setOption(this.option, true);
    },
    areaStyleChange() {
      for (let i = 0; i < this.option.series.length; i++) {
        Object.assign(this.option.series[i].areaStyle, {
          opacity: this.areaStyle / 2
        });
      }
      this.myChart.setOption(this.option, true);
    },
    stepChange() {
      for (let i = 0; i < this.option.series.length; i++) {
        if (this.step) {
          Object.assign(this.option.series[i], {
            step: "middle"
          });
        } else {
          Object.assign(this.option.series[i], {
            step: ""
          });
        }
      }
      this.myChart.setOption(this.option, true);
    }
  }
};
</script>

<style lang="scss" scoped>
span{
    font-size: 1.2em;
    display: block;
    margin: 10px 0;
}
.card-item {
  border-top: 1px solid #f0f0f0;
  padding: 0.5em 0;
}
.axis-card {
  line-height: 25px;
}
</style>