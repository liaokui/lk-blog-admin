import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import './assets/icon/iconfont.css'

// Vue.use(ElementUI)

import {
  Button, Card, Form, FormItem, Input, Loading, Message, Menu, MenuItem, Scrollbar, Breadcrumb,
  BreadcrumbItem, Table, TableColumn, Pagination, Tag, RadioGroup, RadioButton, Upload, Select,
  Option, Progress, Dialog, Row, Col, MessageBox
} from 'element-ui';
// import 'normalize.css'

import * as filters from './utils/filters'
import { getToken } from './utils/auth'
 
Vue.prototype.$ELEMENT = { zIndex: 3000 };
// Vue.prototype.$ELEMENT = { size: 'defalut', zIndex: 3000 };
Vue.use(Button)
Vue.use(Card)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Loading)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Scrollbar)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Tag)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Upload)
Vue.use(Select)
Vue.use(Option)
Vue.use(Progress)
Vue.use(Dialog)
Vue.use(Row)
Vue.use(Col)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;

Vue.config.productionTip = false



// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
     if (getToken()) {
        next()
      } else {
        next({ path: '/login' })
      }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
