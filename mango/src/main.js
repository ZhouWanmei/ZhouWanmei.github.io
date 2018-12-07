import Vue from 'vue'
import router from './router'
import App from './App'
import store from './store'
//引入bmob js-sdk
import './assets/js/key' 
// 导入Mint UI插件
import { Swipe, SwipeItem,MessageBox,Search } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Search.name, Search);


Vue.config.productionTip = false
// 导入axios
import Axios from 'axios'
// 将axios挂载到Vue上
Vue.prototype.$axios = Axios;

router.beforeEach((to, from, next) => {
  // 判断登录状态
  //获取用户登录成功后储存的登录标志
  let getFlag = localStorage.getItem("Flag");
  //如果登录标志存在且为isOnline，即用户已登录
  if(getFlag === "isOnline"){
  
    //设置vuex登录状态为已登录
    store.state.isOnline = true;
    next();
  
  //如果登录标志不存在，即未登录
  }else{
    store.state.isOnline = false;
    //用户想进入购物车的页面，则定向到登录界面
    if(to.meta.isOnline){
      if(to.name == "cart"){
        //mint-ui友好提示
        MessageBox.alert('请先登录!').then(action => {
          //用户需进入登录的界面
          next({
            path: '/login-register'
          })
        });
      }
    }
  }
  // 切换标题
  switch(to.name){
    case 'home': store.commit('changeTitle','芒果商城');break;
    case 'sort': store.commit('changeTitle','分类');break;
    case 'cart': store.commit('changeTitle','购物车');break;
    case 'mine': store.commit('changeTitle','个人中心');break;
    case 'details': store.commit('changeTitle','商品详情');break;
    case 'personal': store.commit('changeTitle','个人资料修改');break;
    case 'mineOrder': store.commit('changeTitle','订单列表');break;
    case 'address': store.commit('changeTitle','收货地址');break;
    case 'collection': store.commit('changeTitle','我的收藏');break;
    case 'loginRegister': store.commit('changeTitle','登录/注册'); break;
    case 'search': store.commit('changeTitle','搜索');break;
    case 'account': store.commit('changeTitle','结算');break;
  }
  // 判断是否有底部导航
  if(to.name == "home" || to.name == "sort" || to.name == "cart" || to.name == "mine" || to.name == "all" || to.name == "coconut" || to.name == "dried" || to.name == "flowers" || to.name == "guifei" || to.name == "haidun"|| to.name == "jinhuang" || to.name == "kaite" || to.name == "xiangya" || to.name == "loginRegister") {
    store.state.isMain = true;
  }else {
    store.state.isMain = false;
  }
  // 判断是否在详情页
  if(to.name == "details") {
    store.state.isDetail = true;
  }else {
    store.state.isDetail = false;
  }
  // 判断是否在结算页面
  if(to.name == "account") {
    store.state.isAccount = true;
  }else {
    store.state.isAccount = false;
  }
  // 判断是否有返回上一级按钮
  if (to.name == "details"|| to.name == "personal" || to.name == "address" || to.name == "collection" || to.name == "search" || to.name == "account" || to.name == "mineOrder" || to.name == "awaitPayment" || to.name == "awaitSendGoods" || to.name == "awaitReceivingGoods" || to.name == "completed" || to.name == "afterSale") {
    store.state.icon = true;
  }else {
    store.state.icon = false;
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
