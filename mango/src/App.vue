<template>
  <div id="app">
    <!-- 网页标题 -->
    <section class="title-bar clearFix" :class="{'titleColor':this.$store.state.icon && !this.$store.state.isBar}">
      <i v-if="this.$store.state.icon" class="fl iconfont icon-iconfontjiantou1" @click="backToPrve"></i>
      <h1 class="title">{{this.$store.state.title}}</h1>
    </section>
    <!-- 路由出口 -->
    <section class="content" :class="{'bar':!this.$store.state.isBar}">
      <router-view/>
    </section>
    <!-- 路由链接 -->
    <!-- 四大主页底部导航 -->
    <ul v-if="this.$store.state.isMain" class="menu-bar flex-row-col-cen">
      <li><router-link exact :to="urls.home"><i class="iconfont icon-home-page"></i>商城</router-link></li>
      <li><router-link :to="urls.sort"><i class="iconfont icon-leimupinleifenleileibie"></i>分类</router-link></li>
      <li><router-link :to="urls.cart"><i class="iconfont icon-daohanggouwuche"></i>购物车</router-link></li>
      <li><router-link :to="this.$store.state.isOnline ? urls.mine : urls.loginRegister"><i class="iconfont icon-wode2"></i>我</router-link></li>
    </ul>
    <!-- 详情页底部导航 -->
    <ul v-else-if="this.$store.state.icon && this.$store.state.isDetail" class="menu-bar flex-row-col-cen">
      <li class="home-page"><router-link exact :to="urls.home"><i class="iconfont" :class="$route.meta.isActive ? 'icon-zhuye' : 'icon-home-page'"></i>首页</router-link></li>
      <li class="collection"><a @click="Collection"><i class="iconfont" :class="this.$store.state.isCollection ? 'icon-shoucang2' : 'icon-shoucang3'"></i>{{this.$store.state.isCollection ? "已收藏" : "收藏"}}</a></li>
      <li class="add-cart"><a @click="addCartOrBuy($event)">加入购物车</a></li>
      <li class="immediately-buy"><a @click="addCartOrBuy($event)">立即购买</a></li>
    </ul>
    
    <!-- 结算页底部导航 -->
    <ul v-else-if="this.$store.state.isAccount" class="account menu-bar flex-row-col-cen">
      <li class="total"><span>总计：￥<span class="account-total"></span></span></li>
      <li class="submit" @click="submit"><a>提交</a></li>  
    </ul>
     
  </div>
</template>

<script>
import router from './router'
import { Toast,MessageBox } from 'mint-ui';
export default {
  name: 'App',
  data() {
    return {
      urls:{
        home: '/',
        sort: '/sort',
        cart: '/shoppingCart',
        mine: '/mine',
        loginRegister: '/login-register'
      },
      // 是否上线
      isOnline: localStorage.getItem("Flag") == "isOnline"
      
      
      
    }
  },
  methods: {
    // 返回上一页
    backToPrve() {
      this.$router.go(-1);
    },
    // 加入购物车或立即购买
    addCartOrBuy(e) {
      if($('.mask').css("display") == "none"){
        $('.mask').css({"display":"block"});
      }else if($('.mask').css("display") == "block") {
        if(localStorage.Flag == "") {
          //mint-ui友好提示
          MessageBox.alert('请先登录!').then(action => {
            //用户需进入登录的界面
            router.push('/login-register');
          });
          return;
        
        }else {
          // 加入购物车
            if($(e.srcElement).text() == "加入购物车"){
              let flag = false;
              // 记录相同订单的ID
              let commonId = null;
              // 记录相同订单的购买数量
              let commonNum = null;
              const query = Bmob.Query("order");
              query.find().then(res => {
                  if(res.length != 0) {
                    for(let i = 0; i < res.length; i++) {
                      if(res[i].userName == JSON.parse(localStorage.bmob).username && res[i].mangoID == Number(this.$route.params.id) && res[i].standard == $('.standard').text()) {
                        flag = true;
                        commonId = res[i].objectId;
                        commonNum = res[i].buyNumber;
                        if(flag) {
                          break;
                        }else {
                          flag = false;
                        }
                      }
                    }
                    if(flag) {
                      query.get(commonId).then(res => {
                        res.set('buyNumber',commonNum + Number($('.number').val()))
                        res.save()
                        Toast({
                          iconClass: 'iconfont icon-caozuochenggong',
                          message: "添加成功",
                          position: 'middle',
                          duration: 500
                        });
                        $('.mask').css({"display":"none"});
                      }).catch(err => {
                        console.log(err)
                      })
                    }else {
                      this.saveOrder("添加成功",true,false,false,false)
                    }
                  }else {
                    this.saveOrder("添加成功",true,false,false,false)
                  }
              });
              
            }
            // 立即购买
            if($(e.srcElement).text() == "立即购买") {
              this.saveOrder("",false,true,false,false)
            }
        }
      }  
    },
    // 收藏
    Collection() {
        if(localStorage.Flag == "") {
          //mint-ui友好提示
          MessageBox.alert('请先登录!').then(action => {
            //用户需进入登录的界面
            router.push('/login-register');
          });
          return;
        }
        const query = Bmob.Query('collection');
        if($('.collection a i').hasClass('icon-shoucang2')){
          this.$store.state.isCollection = !this.$store.state.isCollection;
            $('.collection a').css({"color":"#333"});
            query.equalTo("mangoID","==", Number(this.$route.params.id));
            query.find().then(res => {
                if(res.length > 0) {
                    res.forEach(item => {
                        if(item.mangoID == Number(this.$route.params.id)) {
                            query.destroy(item.objectId).then(res => {
                              Toast({
                                iconClass: 'iconfont icon-caozuochenggong',
                                message: '已取消收藏',
                                position: 'middle',
                                duration: 500
                              });
                            }).catch(err => {
                            console.log(err)
                            })
                        }
                    });
                }
                
            });
        }else{
            this.$store.state.isCollection = !this.$store.state.isCollection;
            $('.collection a').css({"color":"#f00"});
            query.set("userName",JSON.parse(localStorage.bmob).username)
            query.set("mangoID",Number(this.$route.params.id))
            query.set("img",$('.mango-img').data('url'))
            query.set("name",$('.name').text())
            query.set("price",Number($('.unit-price').text()))
            query.save().then(res => {
                Toast({
                  iconClass: 'iconfont icon-caozuochenggong',
                  message: '已收藏',
                  position: 'middle',
                  duration: 500
                });
            }).catch(err => {
                console.log(err)
            })
      }
        
    },
    
    // 保存订单
    saveOrder(tipsStr,isTips,isBuy,isSubmit,isPay) {
          const query = Bmob.Query('order');
          query.set("userName",JSON.parse(localStorage.bmob).username)
          query.set("mangoID",Number(this.$route.params.id))
          query.set("mangoImg",$('.mango-img').data('url'))
          query.set("mangoName",$('.name').text())
          query.set("buyNumber",Number($('.number').val()))
          query.set("standard",$('.standard').text())
          query.set("unitPrice",Number($('.unit-price').text()))
          query.set("isBuy",isBuy)
          query.set("isSubmit",isSubmit)
          query.set("isPay",isPay)
          query.save().then(res => {
            if(isTips) {
              Toast({
                iconClass: 'iconfont icon-caozuochenggong',
                message: tipsStr,
                position: 'middle',
                duration: 500
              });
            }else {
              router.push( `/account/${res.objectId}`);
            }
            $('.mask').css({"display":"none"});
          }).catch(err => {
            console.log(err)
          }) 
    },
    // 提交订单
    submit() {
      let ordersId = this.$route.params.orderIds.split(',');
      console.log(ordersId);
      const query = Bmob.Query("order");
      ordersId.forEach(id => {
        query.get(id).then(res => {
          res.set('isSubmit',true)
          res.save()
          router.push("/await-payment");
        }).catch(err => {
          console.log(err)
        })
      });
      
    }
  }
  
}
</script>

<style lang="less">
@import './css/normalized.css';
@import '//at.alicdn.com/t/font_942460_v54hlfssgr.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  overflow: hidden;  
  
}
// 标题
.title-bar{
  width: 100%;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background: #F5F5F5;
  box-sizing: border-box;
  z-index: 99;
  i{
    display: inline-block;
    font-size: 18px;
    font-weight: bold;
    margin-left: 15px;
  }
  .title{
    display: inline-block;
    font-size: 18px;
    font-weight: normal;
  }
}
.titleColor {
  background: #359A35;
  color: #fff;
}
// 内容
.content{
  width: 100%;
  height: calc(100% - 64px - 49px);
  overflow-y: scroll;
  background: #EDEEF1; 
  z-index: 1;
}

.bar {
    height: calc(100% - 64px) !important;
}

.account-bar {
  height: calc(100% - 157px) !important;
}
// 底部导航
.menu-bar{
  width: 100%;
  height: 48px;
  padding-top: 4px;
  box-sizing: border-box;
  border-top: 1px solid #999;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 99;
  background: #F5F5F5;

  li{
    width: calc(100% / 4);
    height: 100%;
    
    a{
      display: block;
      width: 100%;
      height: 100%;
      font-size: 12px;
      color: #333;
      
      i {
        font-size: 20px;
        display: block;
      }
    }
    a.active{
      color: #DB5203;
    }
  }

  // 详情页
  .home-page,.collection {
    width: 12.5%;
  }
  .add-cart,.immediately-buy {
    height: 100%;
    width: 37.5%;
    line-height: 48px;
    padding: 0;

    a{
      color: #fff;
      letter-spacing: 3px;
    }
  }
  .add-cart {
    background: orangered;
  }
  .immediately-buy {
    background: red;
  }
}

// 结算页面底部
.account {
  text-align: left;
  line-height: 49px;
  
  background: #fff;
  padding-top: 0;
  .total {
    padding-left: 15px;
    box-sizing: border-box;
    color: #f00;
    width: 70%;
  }
  .submit {
    background: #f00;
    text-align: center;
    letter-spacing: 5px;
    width: 30%;
    float: right;

    a {
      color: #fff;
    }
  }
}
.icon-shoucang2 {
  color: #f00;
}
</style>
