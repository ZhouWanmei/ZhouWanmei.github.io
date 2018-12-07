<template>
    <div class="mine-order">
        <!-- 路由链接 -->
        <ul class="mine-order-menu flex-row-col-cen">
            <li><router-link to="/await-payment">待付款</router-link></li>
            <li><router-link to="/await-send-goods">待发货</router-link></li>
            <li><router-link to="/await-receiving-goods">待收货</router-link></li>
            <li><router-link to="/completed">已完成</router-link></li>
            <li><router-link to="/after-sale">售后</router-link></li>
        </ul>
        <!-- 路由出口 -->
        <section class="mine-order-content">
            <router-view></router-view>
        </section>
    </div>
</template>
<script>
export default {
    name:"MineOrder",
    data() {
        return {}
    }
}
</script>

<style lang="less" scoped>
.mine-order {
    width: 100%;
    height: 100%;
    .mine-order-menu {
        width: 100%;
        height: 64px;
        line-height: 64px;
        background: #fff;
        border-bottom: 1px solid #999;
        padding: 0 15px;
        box-sizing: border-box;
        li {
            width: 20%;
            a {
                width: 100%;
                height: 100%;
                display: inline-block;
                color: #333;
                  
            }
            a.active{
                color: #f00;
                position: relative;
                &::after {
                    display: inline-block;
                    width: 100%;
                    height: 1px;
                    content: "";
                    background: #f00;
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }
            }
            
        }
    }
    .mine-order-content {
        width: 100%;
        height: calc(100% - 65px);
    }
}
</style>

