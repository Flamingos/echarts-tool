import Vue from 'vue'
import VueRouter from 'vue-router'
import Line from '@/views/Line.vue'
import Bar from '@/views/Bar.vue'
import Main from '@/views/Main.vue'
import Pie from '@/views/Pie.vue'
import Scatter from '@/views/Scatter.vue'
import UserCenter from '@/views/UserCenter.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
  {
    path: '/line',
    name: 'line',
    component: Line,
    meta:{
      keepAlive:true
    }
    /*beforeEnter:(to,from,next)=>{
      if(from.path != '/main'){
        next('/main')
      }else{
        next()
      }
    }*/
  },
  {
    path: '/bar',
    name: 'bar',
    component: Bar,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/main',
    name: 'main',
    component: Main
  },
  {
    path: '/pie',
    name: 'pie',
    component: Pie,
    meta:{
      keepAlive:true
    },
    /*beforeEnter:(to,from,next)=>{
      if(from.path != '/main'){
        next('/main')
      }else{
        next()
      }
    }*/
  },
  {
    path: '/scatter',
    name: 'scatter',
    component: Scatter,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/usercenter',
    name: 'userCenter',
    component: UserCenter,
    meta:{
      keepAlive:false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
