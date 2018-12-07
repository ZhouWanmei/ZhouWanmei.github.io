<template>
    <div class="mine">
        <!-- 头像部分 -->
        <section class="mine-photo-bg">
            <section class="mine-photo">
                <section class="img-box">
                    <section class="img">
                        <img src="../../images/mine/1119228.png" alt="" class="photo">
                    </section>
                    <p class="name">芒果小妞</p>
                </section>
            </section>
        </section>
        <!-- 个人信息款项 -->
        <section class="personal-datas">
            <!-- 路由链接 -->
            <router-link class="datas" to="/personal-datas">设置个人资料<i class="iconfont icon-youjiantou"></i></router-link>
            <router-link class="address" to="/receiving-address">收货地址管理<i class="iconfont icon-youjiantou"></i></router-link>
        </section>
        <!-- 我的订单 -->
        <section class="personal-datas">
            <router-link class="datas" to="/mine-order">我的订单<i class="iconfont icon-youjiantou"></i></router-link>
            <p class="datas">我的评价<i class="iconfont icon-youjiantou"></i></p>
        </section>
        <!-- 收藏 -->
        <section class="personal-datas">
            <p class="datas mine-collection"><router-link to="/collection">商品收藏<i class="iconfont icon-youjiantou"></i></router-link></p>
            <p class="datas">店铺收藏<i class="iconfont icon-youjiantou"></i></p>
            <p class="datas">浏览记录<i class="iconfont icon-youjiantou"></i></p>
        </section>

        <!-- 退出登录 -->
        <Button :isLogout="true" :text="text" @click.native="logout"></Button>
    </div>
</template>
<script>
// 导入路由
import router from '../../router';
// 导入按钮组件
import Button from '../../components/button'
// 导入mint-ui
import { MessageBox } from 'mint-ui';
export default {
    name: "Mine",
    data() {
        return {
            text:"退出登录"
        }
    },
    components: {
        Button
    },
    methods: {
        logout() {
            MessageBox.confirm('你确定要退出?').then(action => {
                if(confirm) {
                    Bmob.User.logout();
                    localStorage.setItem("Flag","");
                    router.push('./login-register');
                }else {
                    return;
                }
            });
            
        }
    }
}
</script>

<style lang="less" scoped>
// 导入阿里图标
@import '//at.alicdn.com/t/font_942460_uzpfk4gyhi.css';
/* 头像 */
.mine-photo-bg {
    width: 100%;
    height: 165px;
    overflow: hidden;
    background: url('../../images/mine/1119228.png') no-repeat;
    background-size: 55%;
    position: relative;

    .mine-photo {
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 225, 0.7);
        position: absolute;
        top: 0;
        left: 0;
        
        .img-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);

            .img{
                width: 115px;
                height: 115px;
                border-radius: 50%;
                background: #fff;
                img{
                    width: 100%;
                }
            
            }
        }
        .name {
            color: rgb(240, 100, 123);
        }
    }
}

.personal-datas {
    background: #fff;
    margin-top: 10px;
    border-top: 1px solid #999;
    a, p {
        display: inline-block;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        color: #333;
        text-align: left;
        border-bottom: 1px solid #999;
        box-sizing: border-box;

        i{
            float: right;
        }
    }
}

.mine-collection {
    a {
        padding: 0;
        border: none;
    }
}
</style>


