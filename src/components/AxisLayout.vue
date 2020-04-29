<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
    <span>坐标系布局</span>
    <div class="card-item">
      <el-button size="mini" type="primary" @click="transfer">对换坐标</el-button>
    </div>
    <div class="card-item">
      <el-radio-group v-model="gridStyle" @change="gridChoose">
        <el-radio :label="1">布局一</el-radio>
        <el-radio :label="2">布局二</el-radio>
        <el-radio :label="3">布局三</el-radio>
        <el-radio :label="4">布局四</el-radio>
      </el-radio-group>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      gridStyle: 1, //坐标系布局
      gridTransfer: true //用作坐标系的调换
    };
  },
  props: ["option", "myChart"],
  methods: {
    //坐标系样式
    gridChoose(value) {
      let assign = (axis,position) => {Object.assign(this.option[axis], { position: position })}
      switch (value) {
        case 1:
          assign('xAxis',"bottom");
          assign('yAxis',"left");
          break;
        case 2:
          assign('xAxis',"bottom");
          assign('yAxis',"right");
          break;
        case 3:
          assign('xAxis',"top");
          assign('yAxis',"left");
          break;
        case 4:
          assign('xAxis',"top");
          assign('yAxis',"right");
          break;
        default:
          assign('xAxis',"bottom");
          assign('yAxis',"left");
      }
      this.myChart.setOption(this.option, true);
    },
    transfer() {
      //坐标系对换
      this.gridTransfer = !this.gridTransfer;
      if (!this.option.xAxis.data && !this.option.yAxis.data) {
        this.option.series.forEach(function(item) {
          item.data.forEach(function(_item, index) {
            //交换两个值
            [_item[0],_item[1]] = [_item[1],_item[0]]
          });
        });
      } else {
        let axisData = this.option.xAxis.data || this.option.yAxis.data;
        delete this.option.xAxis.data;
        delete this.option.yAxis.data;
        if (this.gridTransfer) {
          Object.assign(this.option.xAxis, { data: axisData });
        } else {
          Object.assign(this.option.yAxis, { data: axisData });
        }
      }
      this.myChart.setOption(this.option, true);
    }
  },
  watch:{
    option:function(){
      if(this.option.xAxis.data){
        this.gridTransfer = true
      }else{
        this.gridTransfer = false
      }
      if(this.option.xAxis.position == 'bottom'){
        if(this.option.yAxis.position == 'left'){
          this.gridStyle = 1
        }
        if(this.option.yAxis.position == 'right'){
          this.gridStyle = 2
        }
      }else if(this.option.xAxis.position == 'top'){
        if(this.option.yAxis.position == 'left'){
          this.gridStyle = 3
        }
        if(this.option.yAxis.position == 'right'){
          this.gridStyle = 4
        }
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