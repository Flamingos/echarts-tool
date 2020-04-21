<template>
  <el-card class="axis-card" :body-style="{padding:'0 20px'}">
      <span>标题</span>
    <div class="card-item">
      <div>是否显示标题</div>
      <el-switch v-model="title.show" active-color="#13ce66" @change="titleShow"></el-switch>
    </div>
    <div class="card-item">
      <div>主标题文本</div>
      <el-input
        size="mini"
        v-model="title.text"
        @change="titleText"
      ></el-input>
    </div>
    <div class="card-item">
      <div>副标题文本</div>
      <el-input
        size="mini"
        v-model="title.subtext"
        @change="titleSubtext"
      ></el-input>
    </div>
    <div class="card-item">
      <div>标题位置</div>
      <el-radio-group v-model="title.titlePos" size="mini" @change="titlePosChange">
        <el-radio-button label="left"></el-radio-button>
        <el-radio-button label="center"></el-radio-button>
        <el-radio-button label="right"></el-radio-button>
      </el-radio-group>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        title: {
          show: true,
          text: "示例",
          subtext: "副标题",
          titlePos: "left"
        },
    };
  },
  props: [ "option", "myChart"],
  methods: {
    titleShow() {
      Object.assign(this.option.title, {
        show: this.title.show
      });
      this.myChart.setOption(this.option, true);
    },
    titleText() {
      Object.assign(this.option.title, {
        text: this.title.text
      });
      this.myChart.setOption(this.option, true);
    },
    titleSubtext() {
      Object.assign(this.option.title, {
        subtext: this.title.subtext
      });
      this.myChart.setOption(this.option, true);
    },
    titlePosChange() {
      Object.assign(this.option.title, {
        left: this.title.titlePos
      });
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