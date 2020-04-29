<template>
  <aside class="data-form">
    <div class="header">图表数据
      <span v-show="tipShow" class="tip">未保存</span>
    </div>
    <section>
      <el-collapse v-model="xCollapse">
        <el-collapse-item title="X轴（类别）" name="1">
          <el-form size="mini" :model="chartData" :ref="'chartDatax'" label-width="60px">
            <draggable v-model="chartData.xcoors" :options="options" @update="dragUpdate">
              <el-form-item
                :label="'类别'+(index+1)"
                v-for="(coordinate,index) in chartData.xcoors"
                :key="index"
              >
                <el-input class="coor-input" @input="inputChangeX" v-model="coordinate.x"></el-input>
                <el-button type="danger" @click.prevent="removeXCoor(index)" icon="el-icon-delete"></el-button>
                <el-button type="success" class="drag" icon="el-icon-rank"></el-button>
              </el-form-item>
            </draggable>
            <el-form-item>
              <el-button type="primary" @click="submitXCoorsForm()">提交</el-button>
              <el-button @click="addXCoor()">新增坐标</el-button>
              <el-button @click="deleteDialog = true">全部删除</el-button>
              <el-button @click="addDialog = true">新增多项</el-button>
            </el-form-item>
            <el-dialog title="提示" :visible.sync="deleteDialog" width="30%">
              <span>确认删除？</span>
              <span slot="footer">
                <el-button @click="deleteDialog = false">取 消</el-button>
                <el-button type="primary" @click="deleteAll()">确 定</el-button>
              </span>
            </el-dialog>
            <el-dialog title="请输入新增数量" :visible.sync="addDialog" width="30%">
              <el-form :model="addForm">
                <el-form-item label="数量" label-width="40px">
                  <el-input v-model.number="addForm.count"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer">
                <el-button type="primary" @click="addXCoors()">确 定</el-button>
              </span>
            </el-dialog>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="Y轴（数据）" name="2">
          <el-tabs v-model="editableTabsValue" type="border-card" editable @edit="handleCoorTabs">
            <el-tab-pane
              :key="outterIndex"
              v-for="(item, outterIndex) in chartData.coordinates"
              :label="'系列'+(outterIndex+1)"
              :name="String(outterIndex)"
            >
              <el-form size="mini" :model="item" :ref="'chartData'+outterIndex" label-width="60px">
                <el-form-item
                  label="名称"
                  style="border-bottom:1px solid #f0f0f0;padding-bottom:5px;"
                >
                  <el-input
                    class="coor-input"
                    @input="inputChangeY(outterIndex)"
                    v-model="item.name"
                  ></el-input>
                </el-form-item>
                <div>
                  <span class="name">类别</span>
                  <span class="value">数据</span>
                </div>
                <el-form-item
                  :label="'坐标'+(index+1)"
                  v-for="(coordinate,index) in item.coors"
                  :key="index"
                >
                  <el-input readonly class="coor-input" v-model="chartData.xcoors[index].x"></el-input>
                  <el-input
                    class="coor-input"
                    @input="inputChangeY(outterIndex)"
                    type="number"
                    v-model="coordinate.y"
                  ></el-input>
                  <el-button
                    type="danger"
                    @click.prevent="clearCoor(outterIndex,index)"
                    icon="el-icon-delete"
                  ></el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitChartDataForm('chartData'+outterIndex)">提交</el-button>
                  <el-button @click="clearDialog = true">全部清空</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-dialog title="提示" :visible.sync="clearDialog" width="30%">
              <span>确认清空？</span>
              <span slot="footer">
                <el-button @click="clearDialog = false">取 消</el-button>
                <el-button type="primary" @click="clearAll()">确 定</el-button>
              </span>
            </el-dialog>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
    </section>
  </aside>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      tipShow: false,
      seriesSelected: [],
      deleteDialog: false, //对话框
      addDialog: false, //对话框
      clearDialog: false, //对话框
      editableTabsValue: 0,
      xCollapse: [], //x轴数据折叠面板
      chartData: {
        xcoors: [
          { x: "衬衫" },
          { x: "羊毛衫" },
          { x: "雪纺衫" },
          { x: "裤子" },
          { x: "高跟鞋" },
          { x: "袜子" }
        ],
        coordinates: [
          //表单数据
          {
            name: "one",
            coors: [
              { y: "5" },
              { y: "20" },
              { y: "36" },
              { y: "10" },
              { y: "10" },
              { y: "20" }
            ]
          },
          {
            name: "two",
            coors: [
              { y: "20" },
              { y: "10" },
              { y: "50" },
              { y: "45" },
              { y: "38" },
              { y: "9" }
            ]
          }
        ]
      },
      addForm: {
        //新增多项
        count: ""
      },
      legend: {
        data: ["one", "two"]
      },
      options: {
        handle: ".drag"
      }
    };
  },
  props: ["option", "myChart", 'type'],
  methods: {
    handleCoorTabs(targetName, action) {
      if (action === "add") {
        let newTabName = this.chartData.coordinates.length + "";
        //创建数组长度this.chartData.xcoors.length，内容undefined，然后替换成{y:''}
        let coors = Array.from({ length:this.chartData.xcoors.length }, (x)=>x={y:''})
        this.legend.data.push("");
        this.chartData.coordinates.push({ name: "", coors: coors });
        this.option.series.push({
          type: this.type,
          name: "",
          data: coors
        });
        this.myChart.setOption(this.option, true);
        this.editableTabsValue = newTabName;
      }
      if (action === "remove") {
        if (this.chartData.coordinates.length != 1) {
          let tabs = this.chartData.coordinates;
          this.seriesSelected.splice(parseInt(targetName), 1);
          if (this.seriesSelected.length == 0) {
            this.tipShow = false;
          }
          if (
            this.editableTabsValue ==
            String(this.chartData.coordinates.length - 1)
          ) {
            this.editableTabsValue = String(
              parseInt(this.editableTabsValue) - 1
            );
          }
          this.chartData.coordinates.splice(parseInt(targetName), 1);
          this.legend.data.splice(parseInt(targetName), 1);
          this.option.legend.data.splice(parseInt(targetName), 1);
          this.option.series.splice(parseInt(targetName), 1);
          this.myChart.setOption(this.option, true);
        } else {
          this.$message({
            message: "请至少保留一组数据",
            type: "error"
          });
        }
      }
    },
    addCoor(outterIndex) {
      //新增坐标
      this.chartData.coordinates[outterIndex].coors.push({ x: "", y: "" });
    },
    addXCoor() {
      this.chartData.xcoors.push({ x: "" });
      this.chartData.coordinates.forEach((item)=>{
        item.coors.push({ y: "" });
      })
      this.submitXCoorsForm();
    },
    addXCoors() {
      //新增多项坐标
      this.addDialog = false;
      //this.chartData.xcoors.push(...Array.from({length:this.addForm.count},(x)=>x={x:""}))
      for (let i = 0; i < this.addForm.count; i++) {
        this.chartData.xcoors.push({ x: "" });
        for (let item of this.chartData.coordinates) {
          item.coors.push({ y: "" });
        }
      }
      this.submitXCoorsForm();
    },
    //删除类别
    removeXCoor(index) {
      this.chartData.xcoors.splice(index, 1);
      this.chartData.coordinates.forEach((item)=>item.coors.splice(index, 1))
      for (let i = 0; i < this.chartData.coordinates.length; i++) {
        this.seriesSelected.push(i);
      }
      this.tipShow = true;
    },
    deleteAll() {
      //删除所有坐标
      this.deleteDialog = false;
      delete this.option.yAxis.data;
      delete this.option.xAxis.data;
      this.option.series = [];
      this.option.legend.data = [];
      this.chartData.xcoors = [];
      this.chartData.coordinates = [];
      this.legend.data = [];
      this.seriesSelected = [];
      this.myChart.setOption(this.option, true);
      this.tipShow = false;
    },
    clearCoor(outterIndex, index) {
      //坐标归0
      this.chartData.coordinates[outterIndex].coors[index].y = "";
      if (!this.seriesSelected.includes(outterIndex)) {
        this.seriesSelected.push(outterIndex);
      }
      this.tipShow = true;
    },

    clearAll() {
      this.clearDialog = false;
      this.chartData.coordinates[parseInt(this.editableTabsValue)].coors.forEach(item=>item.y='')
      if (!this.seriesSelected.includes(parseInt(this.editableTabsValue))) {
        this.seriesSelected.push(parseInt(this.editableTabsValue));
      }
      this.tipShow = true;
    },

    submitChartDataForm(formName) {
      //提交
      for (let outterIndex of this.seriesSelected) {
        if (this.chartData.coordinates[outterIndex]) {
          let yData = [];
          for (let coor of this.chartData.coordinates[outterIndex].coors) {
            yData.push(coor.y);
          }
          if (
            !this.legend.data.includes(
              this.chartData.coordinates[outterIndex].name
            )
          ) {
            this.legend.data.push(this.chartData.coordinates[outterIndex].name);
          }
          this.option.legend = this.legend;
          Object.assign(this.option.series[outterIndex], {
            name: this.chartData.coordinates[outterIndex].name,
            data: yData
          });
        } else {
          console.log("找不到");
        }
        this.myChart.setOption(this.option, true);
        this.tipShow = false;
        this.seriesSelected = [];
      }
    },
    submitXCoorsForm() {
      let xData = [];
      for (let xcoor of this.chartData.xcoors) {
        xData.push(xcoor.x);
      }
      if (
        this.option.xAxis.data ||
        !(this.option.yAxis.data || this.option.xAxis.data)
      ) {
        Object.assign(this.option.xAxis, { data: xData });
      } else {
        Object.assign(this.option.yAxis, { data: xData });
      }
      this.submitChartDataForm();
      this.tipShow = false;
    },
    inputChangeX() {
      this.tipShow = true;
    },
    inputChangeY(outterIndex) {
      this.tipShow = true;
      if (!this.seriesSelected.includes(outterIndex)) {
        this.seriesSelected.push(outterIndex);
      }
    },
    dragUpdate(event) {
      this.tipShow = true;
      for (let coordinate of this.chartData.coordinates) {
        let temp = {};
        temp = coordinate.coors[event.oldIndex];
        coordinate.coors[event.oldIndex] = coordinate.coors[event.newIndex];
        coordinate.coors[event.newIndex] = temp;
      }
      for (let i = 0; i < this.chartData.coordinates.length; i++) {
        this.seriesSelected.push(i);
      }
    }
  },
  watch:{
    option:function(){
      let xdata
      if(this.option.xAxis.data){
        xdata = this.option.xAxis.data
      }else{
        xdata = this.option.yAxis.data
      }
      this.chartData.xcoors = []
      this.chartData.coordinates = []
      this.legend.data = []
      xdata.forEach(item=>{
        this.chartData.xcoors.push({x:item})
      })
      this.option.series.forEach(item=>{
        let coors = []
        item.data.forEach(n=>{
          coors.push({y:n})
        })
        this.legend.data.push(item.name)
        this.chartData.coordinates.push({name:item.name,coors:coors})
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.coor-input {
  width: 9em;
  margin-right: 0.3em;
}
.name,
.value {
  display: inline-block;
  margin-bottom: 0.5em;
  color: rgba(78, 79, 83, 0.9);
}
.name {
  margin-left: 7.5em;
}
.value {
  margin-left: 7em;
}
.tip {
  font-size: .4em;
  color: rgb(240, 84, 90);
  display: inline-block;
  z-index: 10;
}
.el-form-item.el-form-item--mini {
  margin-bottom: 5px;
}
.el-button + .el-button {
  margin-left: 0.3em;
}
.data-form {
  border-left: 1px solid rgb(213, 215, 225);
  padding: 0 0.5em;
  background-color: white;
  height: calc(100vh - 3em);
  overflow: scroll;
}
.header {
  font-size: 0.9em;
  height: 2.8em;
  width: 100%;
  line-height: 2.8em;
  color: rgb(53, 137, 255);
  position: fixed;
  display: block;
  background-color: white;
  z-index: 10;
}
section{
  margin: 2.5em 0 0 0;
}
</style>