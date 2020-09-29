// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import "./plugins";
import '../static/css/global.css' /*引入公共样式*/
import './assets/iconfont/iconfont.css'

// 全局引入自定义组件
/**表格 */
import wkTable from "./components/wkTable"
Vue.component('wk-table',wkTable)
/**高级下拉菜单（Q2） */
import wkDropdown from "./components/wkDropdown"
Vue.component('wk-dropdown',wkDropdown)
/**数据字典 */
import wkCodeSelect from "./components/wkCodeSelect"
Vue.component('wk-code-select',wkCodeSelect)

import axios from 'axios'
import {post,fetch,patch,put} from './request/http'

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
