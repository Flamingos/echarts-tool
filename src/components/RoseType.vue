<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
      <span>南丁格尔图</span>
    <div class="card-item">
      <div>是否显示为南丁格尔图</div>
      <el-switch v-model="roseTypeBool" active-color="#13ce66" @change="roseShow"></el-switch>
    </div>
    <div class="card-item">
      <div>选择类型</div>
      <el-switch
        v-model="roseType"
        inactive-color="#13ce66"
        active-text="RADIUS"
        inactive-text="AREA"
        active-value="radius"
        inactive-value="area"
        @change="roseChange"
      ></el-switch>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roseType: "radius",
      roseTypeBool: false
    };
  },
  props: ["option", "myChart"],
  methods: {
    roseShow() {
      if (this.roseTypeBool) {
        this.option.series[0].roseType = this.roseType;
      } else {
        this.option.series[0].roseType = "";
      }
      this.myChart.setOption(this.option, true);
    },
    roseChange(value) {
      this.roseType = value;
      this.roseShow();
    }
  },
  watch:{
    option:function(){
      this.roseType = this.option.series[0].roseType
      if(this.roseType == ''){
        this.roseTypeBool = false
      }else{
        this.roseTypeBool = true
      }
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