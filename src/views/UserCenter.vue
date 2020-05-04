<template>
  <div class="container">
      <div class="card" v-for="(item,index) in options" :key="index" @click="goChart(index,item.type)">
      <el-card shadow="hover" class="card" :body-style="{ padding: '0px' }">
        <h2 class="title">{{item.type}}</h2>
        <span>{{index}}</span>
      </el-card>
    </div>
  </div>
</template>

<script>
import { register } from "@/api/api.js";
export default {
  data() {
    return {
        options:[]
    };
  },
  methods: {
    init() {
      //register({ id: "001" }).then(res => {});
      if(!localStorage.options){
          localStorage.options = JSON.stringify([])
      }
    this.options = JSON.parse(localStorage.options)

    },
    goChart(index,type){
        //localStorage.removeItem('options')
        this.$router.push({name:type, params:{isNew:false, number:index}})
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="scss" scoped>
.container{
    padding: 100px;
    background-color: rgba(53, 137, 255);
}
.card{
  margin: 0 20px;
    display: inline-block;
    width: 100px;
    height: 100px;
    cursor: pointer;
    text-align: center;
}
</style>