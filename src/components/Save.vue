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
.save:hover::before{
    content:'保存';
    position: absolute;
    width: 40px;
    height: 20px;
    left: -50px;
    top: 10px;
    background-color: rgb(53,136,254);
    border-radius: 6px;
    line-height: 20px;
}
.save:hover::after{
    content:'';
    position: absolute;
    left: -12px;
    top: 13px;
    border-radius: 6px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid rgb(53,136,254);
}
</style>