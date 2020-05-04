<template>
  <div>
    <el-button class="save" type="primary" circle icon="el-icon-folder" @click="save()"></el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props:['isNew','option'],
  methods: {
    save() {
      if (!localStorage.options) {
        localStorage.options = JSON.stringify([]);
      }
      let options = JSON.parse(localStorage.options);
      if (this.isNew) {
        options.push({ type: this.$route.params.type, option: this.option });
      } else {
        options[this.$route.params.number].option = this.option;
      }
      localStorage.options = JSON.stringify(options);
      this.$router.push({ name: "userCenter" });
    }
  }
};
</script>

<style scoped>
.save{
  position: fixed;
  right: 10px;
  bottom: 20px;
}
</style>