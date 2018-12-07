import Vue from 'vue'
import Router from 'vue-router'

// 导入四大主组件
import Home from '@/pages/home'
import Sort from '@/pages/sort/sort'
import Cart from '@/pages/cart/shoppingCart'
import Mine from '@/pages/mine/mine'

// 导入其他组件
import Search from '@/pages/search'
import Details from '@/pages/details'
import Personal from '@/pages/mine/personal-datas'
import Address from '@/pages/mine/receiving-address'
// 我的订单
import MineOrder from '@/pages/mine/mineOrder/mine-order'


import AwaitPayment from '@/pages/mine/mineOrder/await-payment'
import AwaitSendGoods from '@/pages/mine/mineOrder/await-send-goods'
import AwaitReceivingGoods from '@/pages/mine/mineOrder/await-receiving-goods'
import Completed from '@/pages/mine/mineOrder/completed'
import AfterSale from '@/pages/mine/mineOrder/after-sale'

import Collection from '@/pages/mine/collection'

import All from '@/pages/sort/all'
import Flower from '@/pages/sort/flowers'
import Coconut from '@/pages/sort/coconut'
import Jinhuang from '@/pages/sort/jinhuang'
import Kaite from '@/pages/sort/kaite'
import Guifei from '@/pages/sort/guifei'
import Xiangya from '@/pages/sort/xiangya'
import Haidun from '@/pages/sort/haidun'
import Dried from '@/pages/sort/dried'

import LoginRegister from '@/pages/mine/login-register'
import Account from '@/pages/cart/account'


Vue.use(Router)



export default new Router({
  linkActiveClass: 'active',
  
  routes: [
    {//主页
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        isOnline: true
      }
    },
    {//分类页
      path: '/sort',
      name: 'sort',
      component: Sort,
      redirect: '/all',
      children: [
        {//全部
          path: '/all',
          name: 'all',
          component: All,
          meta: {
            isOnline: true
          }
        },
        {//金百花
          path: '/flowers',
          name: 'flowers',
          component: Flower,
          meta: {
            isOnline: true
          }
        },
        {//椰香
          path: '/coconut',
          name: 'coconut',
          component: Coconut,
          meta: {
            isOnline: true
          }
        },
        {//金煌
          path: '/jinhuang',
          name: 'jinhuang',
          component: Jinhuang,
          meta: {
            isOnline: true
          }
        },
        {//凯特
          path: '/kaite',
          name: 'kaite',
          component: Kaite,
          meta: {
            isOnline: true
          }
        },
        {//贵妃
          path: '/guifei',
          name: 'guifei',
          component: Guifei,
          meta: {
            isOnline: true
          }
        },
        {//象牙
          path: '/xiangya',
          name: 'xiangya',
          component: Xiangya,
          meta: {
            isOnline: true
          }
        },
        {//海顿
          path: '/haidun',
          name: 'haidun',
          component: Haidun,
          meta: {
            isOnline: true
          }
        },
        {//芒果干
          path: '/dried',
          name: 'dried',
          component: Dried,
          meta: {
            isOnline: true
          }
        },
      ]
    },
    {//购物车
      path: '/shoppingCart',
      name: 'cart',
      component: Cart,
      meta: {
        isOnline: true
      }
    },
    {//我的
      path: '/mine',
      name: 'mine',
      component: Mine,
      meta: {
        isOnline: true
      }
    },
    {//详情页
      path: '/details/:id',
      name: "details",
      component: Details,
      meta: {
        isOnline: true
      }
    },
    {//个人资料
      path: '/personal-datas',
      name: 'personal',
      component: Personal,
      meta: {
        isOnline: true
      }
    },
    {//收货地址
      path: '/receiving-address',
      name: 'address',
      component: Address,
      meta: {
        isOnline: true
      }
    },
    {//我的订单
      path: '/mine-order',
      name: 'mineOrder',
      component: MineOrder,
      redirect: '/await-payment',
      children: [
        {//待付款
          path: '/await-payment',
          name: 'awaitPayment',
          component: AwaitPayment,
        },
        {//待发货
          path: '/await-send-goods',
          name: 'awaitSendGoods',
          component: AwaitSendGoods,
        },
        {//待收货
          path: '/await-receiving-goods',
          name: 'awaitReceivingGoods',
          component: AwaitReceivingGoods,
        },
        {//已完成
          path: '/completed',
          name: 'completed',
          component: Completed,
        },
        {//售后
          path: '/after-sale',
          name: 'afterSale',
          component: AfterSale,
        },
      ],
      meta: {
        isOnline: true
      }
    },
    {//我的收藏
      path: '/collection',
      name: 'collection',
      component: Collection,
      meta: {
        isOnline: true
      }
    },
    {//登录注册
      path: '/login-register',
      name: 'loginRegister',
      component: LoginRegister,
      meta: {
        isOnline: false
      }
    },
    {//搜索
      path: '/search',
      name: 'search',
      component: Search,
      meta: {
        isOnline: true
      }
    },
    {//结算中心
      path: '/account/:orderIds',
      name: 'account',
      component: Account,
      meta: {
        isOnline: true
      }
    }
  ]
})
