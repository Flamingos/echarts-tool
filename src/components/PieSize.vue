<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
    <span>图表大小</span>
    <div class="card-item">
      <div>图表宽度</div>
      <el-slider
        v-model="size.width"
        :min="100"
        :max="1000"
        :step="100"
        :show-tooltip="false"
        show-stops
        @input="changeWidth"
      ></el-slider>
    </div>
    <div class="card-item">
      <div>图表高度</div>
      <el-slider
        v-model="size.height"
        :min="100"
        :max="1000"
        :step="100"
        :show-tooltip="false"
        show-stops
        @input="changeHeight"
      ></el-slider>
    </div>
    <div class="card-item">
      <div>内半径值</div>
      <el-slider
        v-model="radius[0]"
        :min="0"
        :max="100"
        :step="10"
        :show-tooltip="false"
        show-stops
        @input="changeInner"
      ></el-slider>
    </div>
    <div class="card-item">
      <div>外半径值</div>
      <el-slider
        v-model="radius[1]"
        :min="0"
        :max="100"
        :step="10"
        :show-tooltip="false"
        show-stops
        @input="changeOutter"
      ></el-slider>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      size: {
        width: 600,
        height: 500
      },
      radius: [0, 80]
    };
  },
  props: ["option", "myChart"],
  methods: {
    changeWidth() {
      this.myChart.resize({ width: this.size.width });
    },
    changeHeight() {
      this.myChart.resize({ height: this.size.height });
    },
    changeInner(value) {
      if (this.option.series[0]) {
        this.option.series[0].radius[0] = value + "%";
        this.myChart.setOption(this.option, true);
      }
    },
    changeOutter(value) {
      if (this.option.series[0]) {
        this.option.series[0].radius[1] = value + "%";
        this.myChart.setOption(this.option, true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
span {
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