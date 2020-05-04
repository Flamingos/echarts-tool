<template>
  <div ref="form">
    <aside class="data-form">
      <div class="header">图表数据
        <span v-show="tipShow" class="tip">未保存</span>
      </div>
      <section>
        <el-form size="mini" :model="chartData" :ref="'chartData'" label-width="60px">
          <div>
            <span class="name">类别</span>
            <span class="value">数据</span>
          </div>
          <draggable v-model="chartData.data" :options="options" @update="dragUpdate">
            <el-form-item
              :label="'数据'+(index+1)"
              v-for="(item,index) in chartData.data"
              :key="index"
            >
              <el-input class="coor-input" @input="inputChange" v-model="item.name"></el-input>
              <el-input class="coor-input" @input="inputChange" type="number" v-model="item.value"></el-input>
              <el-button type="danger" @click.prevent="deleteItem(index)" icon="el-icon-delete"></el-button>
              <el-button type="success" class="drag" icon="el-icon-rank"></el-button>
            </el-form-item>
          </draggable>
          <el-form-item>
            <el-button type="primary" @click="submitChartDataForm('chartData')">提交</el-button>
            <el-button @click="addItem()">新增坐标</el-button>
            <el-button @click="deleteDialog = true">全部删除</el-button>
            <el-button @click="addDialog = true">新增多项</el-button>
          </el-form-item>
        </el-form>
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
            <el-button type="primary" @click="addItems()">确 定</el-button>
          </span>
        </el-dialog>
      </section>
    </aside>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  components: { draggable },
  data() {
    return {
      tipShow: false,
      addDialog: false, //对话框
      deleteDialog: false, //对话框
      codeDialogVisible: false, //对话框
      chartData: {
        names: [
          { name: "直接访问" },
          { name: "邮件营销" },
          { name: "联盟广告" },
          { name: "视频广告" },
          { name: "搜索引擎" }
        ],
        data: [
          //表单数据
          { name: "直接访问", value: "335" },
          { name: "邮件营销", value: "310" },
          { name: "联盟广告", value: "234" },
          { name: "视频广告", value: "135" },
          { name: "搜索引擎", value: "154" }
        ]
      },
      addForm: {
        //新增多项
        count: ""
      },
      legend: {
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      },
      options: {
        handle: ".drag"
      }
    };
  },
  props: ["option", "myChart"],
  methods: {
    deleteItem(index) {
      this.chartData.data.splice(index, 1);
      this.legend.data.splice(index, 1);
      this.tipShow = true;
      //this.submitChartDataForm();
    },
    addItem() {
      //新增坐标
      this.chartData.data.push({ name: "", value: "" });
    },
    deleteAll() {
      this.chartData.data = [];
      this.legend.data = [];
      this.submitChartDataForm();
      this.deleteDialog = false;
    },
    addItems() {
      //新增坐标
      for (let i = 0; i < this.addForm.count; i++) {
        this.chartData.data.push({ name: "", value: "" });
      }
      this.addDialog = false;
    },

    submitChartDataForm() {
      //提交
      if (this.chartData.data.length > 0) {
        this.legend.data = [];
        for (let item of this.chartData.data) {
          this.legend.data.push(item.name);
        }
        this.option.legend = this.legend;
        Object.assign(this.option.series[0], {
          data: this.chartData.data
        });
        this.myChart.setOption(this.option, true);
        this.tipShow = false;
      } else {
        console.log("not found");
      }
    },
    inputChange() {
      this.tipShow = true;
    },
    dragUpdate() {
      this.tipShow = true;
    }
  },
  watch:{
    option(){
      this.legend.data = this.option.legend.data
      this.chartData.data = this.option.series[0].data
    }
  }
};
</script>

<style lang="scss" scoped>
.coor-input {
  width: 8.5em;
  margin-right: 0.3em;
}
.drag {
  cursor: move;
}
.name,
.value {
  display: inline-block;
  margin-bottom: 0.5em;
  color: rgba(78, 79, 83, 0.9);
  font-size: 0.9em;
}
.name {
  margin-left: 6.5em;
}
.value {
  margin-left: 5.5em;
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
section {
  margin: 2.5em 0 0 0;
}
</style>