<template>
  <div>
    <el-row>
      <el-col class="head">
        <span>图表编辑工具</span>
        <span @click="toUser()"><el-avatar id="avatar">A</el-avatar></span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods:{
      toUser(){
          this.$router.push({name:'userCenter'})
      }
  }
};
</script>

<style lang="scss" scoped>
.head {
    position: relative;
  color: white;
  line-height: 3em;
  font-size: 1em;
  height: 3em;
  padding-left: 1em;
  background-color: rgba(53, 137, 255);
}
#avatar {
  position: absolute;
  right: 1em;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>