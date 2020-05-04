<template>
  <div>
    <el-button class="reset" type="warning" circle icon="el-icon-refresh-right" @click="reset()"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    reset() {
      this.$emit('reset')
    }
  }
};
</script>

<style scoped>
.reset {
  position: fixed;
  right: 10px;
  bottom: 70px;
}
.reset:hover::before{
    content:'重置';
    position: absolute;
    width: 40px;
    height: 20px;
    left: -50px;
    top: 10px;
    background-color: rgb(223,145,47);
    border-radius: 6px;
    line-height: 20px;
}
.reset:hover::after{
    content:'';
    position: absolute;
    left: -12px;
    top: 13px;
    border-radius: 6px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid rgb(223,145,47);
}
</style>