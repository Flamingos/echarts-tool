import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入element-ui
import 'element-ui/lib/theme-chalk/index.css'
import {
  Row,
  Col,
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Button,
  Message,
  Radio,
  RadioGroup,
  Form,
  FormItem,
  Input,
  Dialog,
  Card,
  Switch,
  Slider,
  CollapseItem,
  Collapse,
  RadioButton,
  Avatar
} from 'element-ui';
Vue.use(Row).use(Col).use(Table).use(TableColumn).use(Tabs).use(TabPane).use(Button).use(Radio).use(RadioGroup).use(Form).use(FormItem).use(Input).use(Dialog).use(Card).use(Switch).use(Slider).use(Collapse).use(CollapseItem).use(RadioButton).use(Avatar)

Vue.prototype.$message = Message

Vue.prototype.$echarts = require('echarts')

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')