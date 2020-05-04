<template>
  <aside class="data-form">
    <div class="header">
      图表数据
      <span v-show="tipShow" class="tip">未保存</span>
    </div>
    <section>
      <el-tabs v-model="editableTabsValue" type="border-card" editable @edit="handleCoorTabs">
        <el-tab-pane
          :key="outterIndex"
          v-for="(item, outterIndex) in chartData.coordinates"
          :label="'系列'+(outterIndex+1)"
          :name="String(outterIndex)"
        >
          <el-form size="mini" :model="item" :ref="'chartData'+outterIndex" label-width="60px">
            <el-form-item label="名称" style="border-bottom:1px solid #f0f0f0;padding-bottom:5px;">
              <el-input class="coor-input" @input="inputChange(outterIndex)" v-model="item.name"></el-input>
            </el-form-item>
            <div>
              <span class="name">数据</span>
              <span class="value">数据</span>
            </div>
              <el-form-item
                :label="'坐标'+(index+1)"
                v-for="(coordinate,index) in item.coors"
                :key="index"
              >
                <el-input
                  class="coor-input"
                  @input="inputChange(outterIndex)"
                  type="number"
                  v-model="coordinate.x"
                ></el-input>
                <el-input
                  class="coor-input"
                  @input="inputChange(outterIndex)"
                  type="number"
                  v-model="coordinate.y"
                ></el-input>
                <el-button
                  type="danger"
                  @click.prevent="deleteItem(outterIndex,index)"
                  icon="el-icon-delete"
                ></el-button>
              </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitChartDataForm('chartData')">提交</el-button>
              <el-button @click="addItem(outterIndex)">新增坐标</el-button>
              <el-button @click="deleteDialog = true">全部删除</el-button>
              <el-button @click="addDialog = true">新增多项</el-button>
            </el-form-item>
          </el-form>
    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%">
          <span>确认删除？</span>
          <span slot="footer">
            <el-button @click="deleteDialog = false">取 消</el-button>
            <el-button type="primary" @click="deleteAll(outterIndex)">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="请输入新增数量" :visible.sync="addDialog" width="30%">
          <el-form :model="addForm">
            <el-form-item label="数量" label-width="40px">
              <el-input v-model.number="addForm.count"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer">
            <el-button type="primary" @click="addItems(outterIndex)">确 定</el-button>
          </span>
        </el-dialog>
        </el-tab-pane>
      </el-tabs>
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
      editableTabsValue: 0,
      chartData: {
        coordinates: [
          //表单数据
          {
            name: "one",
            coors: [
              { x: 161.2, y: 51.6 },
              { x: 167.5, y: 59.0 },
              { x: 159.5, y: 49.2 },
              { x: 157.0, y: 63.0 },
              { x: 155.8, y: 53.6 }
            ]
          },
          {
            name: "two",
            coors: [
              { x: 10, y: 20 },
              { x: 20, y: 10 }
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
        let coors = [];
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
    addItem(outterIndex) {
      this.chartData.coordinates[outterIndex].coors.push({x:'',y:''})
      this.submitXCoorsForm();
    },
    addItems(outterIndex) {
      //新增多项坐标
      this.addDialog = false;
      for (let i = 0; i < this.addForm.count; i++) {
        this.chartData.coordinates[outterIndex].coors.push({x:'',y:''})
      }
      this.submitChartDataForm();
    },
    //删除类别
    deleteItem(outterIndex,index) {
      this.chartData.coordinates[outterIndex].coors.splice(index, 1);
      if(!this.seriesSelected.includes(outterIndex)){
          this.seriesSelected.push(outterIndex)
      }
      this.tipShow = true;
    },
    deleteAll(outterIndex) {
      //删除所有坐标
      this.chartData.coordinates[outterIndex].coors.splice(0,this.chartData.coordinates[outterIndex].coors.length)
      this.deleteDialog = false;
      if(!this.seriesSelected.includes(outterIndex)){
          this.seriesSelected.push(outterIndex)
      }
      this.tipShow = true;
    },
    submitChartDataForm(formName) {
      //提交
      for (let outterIndex of this.seriesSelected) {
        if (this.chartData.coordinates[outterIndex]) {
          let _data = [];
          for (let coor of this.chartData.coordinates[outterIndex].coors) {
            _data.push([coor.x, coor.y]);
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
            data: _data
          });
        } else {
          console.log("找不到");
        }
      }
      this.myChart.setOption(this.option, true);
        this.tipShow = false;
        this.seriesSelected = [];
    },
    inputChange(outterIndex) {
      this.tipShow = true;
      if(!this.seriesSelected.includes(outterIndex)){
          this.seriesSelected.push(outterIndex)
      }
    },
  },
  watch:{
    option(){
      this.legend.data = this.option.legend.data
      this.data = this.option.series[0].data
      this.chartData.coordinates = []
      for(let item of this.option.series){
        this.chartData.coordinates.push({name:item.name,coors:item.data})
      }
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
  font-size: 0.8em;
  color: rgba(78, 79, 83, 0.9);
}
.name {
  margin-left: 7.5em;
}
.value {
  margin-left: 7em;
}
.tip {
  font-size: 0.4em;
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
section {
  margin: 2.5em 0 0 0;
}
</style>