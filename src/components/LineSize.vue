<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
      <span>图表大小</span>
    <div class="card-item">
      <div>图表宽度</div>
      <el-slider
        v-model="width"
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
        v-model="height"
        :min="100"
        :max="1000"
        :step="100"
        :show-tooltip="false"
        show-stops
        @input="changeHeight"
      ></el-slider>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      width: 600,
      height: 500
    };
  },
  props: ["option", "myChart"],
  methods: {
    changeWidth() {
      this.myChart.resize({ width: this.width });
    },
    changeHeight() {
      this.myChart.resize({ height: this.height });
    }
  },
  watch:{
    option:function(){
      //this.legend.show = this.option.legend.show !== undefined ? this.option.legend.show : true
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