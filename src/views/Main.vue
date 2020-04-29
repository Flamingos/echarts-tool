<template>
  <div class="container">
    <div @click="jump('bar')">
      <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
        <img src="@/assets/bar.png" />
        <span>柱状图</span>
      </el-card>
    </div>
    <div @click="jump('line')">
      <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
        <img src="@/assets/line.png" />
        <span>折线图</span>
      </el-card>
    </div>
    <div @click="jump('pie')">
      <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
        <img src="@/assets/pie.png" />
        <span>饼图</span>
      </el-card>
    </div>
    <div @click="jump('scatter')">
      <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
        <img src="@/assets/scatter.png" />
        <span>散点图</span>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    jump(type) {
      switch (type) {
        case "bar":
          this.$router.push({ name: "bar", params: { type: "bar", isNew: true } });
          break;
        case "line":
          this.$router.push({ name: "line", params: { type: "line", isNew: true } });
          break;
        case "pie":
          this.$router.push({ name: "pie", params: { type: "pie", isNew: true } });
          break;
        case "scatter":
          this.$router.push({ name: "scatter", params: { type: "scatter", isNew: true } });
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f0f0f0;
}
.card {
  width: 15em;
  height: 14em;
  margin: 1em;
  cursor: pointer;
}
.card img {
  width: 100%;
  height: 12em;
  display: block;
}
.card span {
  display: block;
  text-align: center;
  line-height: 2em;
}
</style>