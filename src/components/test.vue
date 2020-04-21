<template>
  <div>
    <div ref="chart" style="width:600px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      option: {}
    };
  },
  mounted() {
    this.$echarts.init(this.$refs.chart).setOption(this.option);
  }
};
</script>