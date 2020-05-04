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
</style>