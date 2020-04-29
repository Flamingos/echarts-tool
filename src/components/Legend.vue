<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
    <span>标记</span>
    <div class="card-item">
      <div>是否显示标签</div>
      <el-switch v-model="show" active-color="#13ce66" @change="legendShow"></el-switch>
    </div>
    <div class="card-item">
      <div>标签显示方向</div>
      <el-radio-group v-model="orient" @change="orientChoose">
        <el-radio label="horizontal">水平</el-radio>
        <el-radio label="vertical">竖直</el-radio>
      </el-radio-group>
    </div>
    <div class="card-item">
      <div>标签类型</div>
      <el-radio-group v-model="type" @change="typeChoose">
        <el-radio label="plain">普通</el-radio>
        <el-radio label="scroll">滚动</el-radio>
      </el-radio-group>
    </div>
    <div class="card-item">
      <div>左侧距离</div>
      <el-slider
        v-model="left"
        :min="0"
        :max="90"
        :step="10"
        :show-tooltip="false"
        show-stops
        @input="changeLeft"
      ></el-slider>
    </div>
    <div class="card-item">
      <div>顶部距离</div>
      <el-slider
        v-model="top"
        :min="0"
        :max="90"
        :step="10"
        :show-tooltip="false"
        show-stops
        @input="changeTop"
      ></el-slider>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      left: 10,
      top: 0,
      orient: "horizontal", //代替settings里面的orient
      type: "plain"
    };
  },
  props: ["option", "myChart"],
  methods: {
    orientChoose(value) {
      this.orient = value;
      Object.assign(this.option.legend, {
        orient: this.orient
      });
      this.myChart.setOption(this.option, true);
    },
    typeChoose(value) {
      this.type = value;
      Object.assign(this.option.legend, {
        type: this.type
      });
      this.myChart.setOption(this.option, true);
    },
    legendShow() {
      Object.assign(this.option.legend, {
        show: this.show
      });
      this.myChart.setOption(this.option, true);
    },
    changeLeft() {
      Object.assign(this.option.legend, {
        left: this.left + "%"
      });
      this.myChart.setOption(this.option, true);
    },
    changeTop() {
      Object.assign(this.option.legend, {
        top: this.top + "%"
      });
      this.myChart.setOption(this.option, true);
    }
  },
  watch:{
    option:function(){
      this.show = this.option.legend.show !== undefined ? this.option.legend.show : true
      this.left = this.option.legend.left !== undefined ? Number.parseInt(this.option.legend.left.split('%')[0]) : 10
      this.top = this.option.legend.top !== undefined ? Number.parseInt(this.option.legend.top.split('%')[0]) : 0
      this.orient = this.option.legend.orient !== undefined ? this.option.legend.orient : 'horizontal'
      this.type = this.option.legend.type !== undefined ? this.option.legend.type : 'plain'
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