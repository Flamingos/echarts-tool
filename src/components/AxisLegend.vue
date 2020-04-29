<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
    <span>坐标轴刻度标签</span>
    <div class="card-item">
      <div>是否显示标签</div>
      <el-switch v-model="axisLabel.show" active-color="#13ce66" @change="axisLabelShow"></el-switch>
    </div>
    <div class="card-item">
      <div>标签旋转角度</div>
      <el-slider
        v-model="axisLabel.rotate"
        :min="-90"
        :max="90"
        :step="10"
        show-stops
        @input="axisLabelRotate"
      ></el-slider>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      axisLabel: {
        show: true,
        inside: false,
        rotate: 0
      }
    };
  },
  props: ["option", "myChart"],
  methods: {
    axisLabelShow() {
      //坐标轴标签显示
      if (this.option.xAxis.data) {
        Object.assign(this.option.xAxis.axisLabel, {
          show: this.axisLabel.show
        });
      } else {
        Object.assign(this.option.yAxis.axisLabel, {
          show: this.axisLabel.show
        });
      }
      this.myChart.setOption(this.option, true);
    },
    axisLabelRotate() {
      //坐标轴标签旋转角度
      if (this.option.xAxis.data) {
        Object.assign(this.option.xAxis.axisLabel, {
          rotate: this.axisLabel.rotate
        });
      } else {
        Object.assign(this.option.yAxis.axisLabel, {
          rotate: this.axisLabel.rotate
        });
      }

      this.myChart.setOption(this.option, true);
    }
  },
  watch:{
    option:function(){
      
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