<template>
    <div class="account-box">
        <!-- 选择收货地址 -->
        <section class="selectedAddress clearFix">请选择收货地址<i class="fr iconfont icon-youjiantou"></i></section>
        <!-- 优惠券 -->
        <section class="coupon clearFix">优惠券<span class="fr">目前无可用优惠券<i class="iconfont icon-youjiantou"></i></span></section>
        <!-- 支付方式 -->
        <section class="payment-method clearFix">支付方式<span class="fr">在线支付<i class="iconfont icon-youjiantou"></i></span></section>
        <!-- 订单 -->
        <section class="goods-box">
            <ul class="goods-list">
                <li class="clearFix" v-for="(order,index) in payDatas" :key="index">
                    <orderItem :order="order" :isOrder="false"  :isPay="true"></orderItem>
                </li>
            </ul>
        </section>
        <!-- 运费 -->
        <section class="freight clearFix">运费：<span class="fr">请先选择收货地址</span></section>
        <section class="message">
            <p>买家留言</p>
            <section contentEditable="true">请填写备注</section>
        </section>
    </div>
</template>

<script>
import orderItem from '../../components/orderItem'
export default {
    name: "Account",
    data() {
        return {
            payDatas: [],
            jsonDatas: [],
        }
    },
    components: {
        orderItem
    },
     created() {
        //数据请求
        this.$axios.get('./static/json/mangos.json')
        .then(res => {
            res.data.forEach(element => {
                this.$data.jsonDatas.push(element);
            });
        })
        .catch(error => {
            console.log(error);
        })
       const query = Bmob.Query("order");
        query.find().then(res => {
            if (res.length != 0) {
                this.$data.isDatas = true;
            }
            
            res.forEach((order,index) => {
                this.$route.params.orderIds.split(',').forEach(orderId => {
                    if (order.objectId == orderId){
                        this.$data.payDatas.push(order);
                    }
                });
            });
        });
    }
    
}
</script>

<style lang="less" scoped>
.account-box {
    padding: 0;
    text-align: left;
    // line-height: 49px;
    section {
        padding: 0 15px;
        background: #fff;
        margin-bottom: 10px;
    }
    .selectedAddress,
    .coupon,
    .payment-method,
    .freight {
        line-height: 45px;

        span {
            color: #666;
        }
    }
    .goods-box {
        padding: 0;
        .goods-list {
            background: #fff;
            color: #666;
            text-align: left;
            li {
                border-bottom: 1px solid #999;
                padding: 15px 15px 20px;
                position: relative;
                
                
            }
        }
    }
    .message {
        padding: 15px 15px;
        background: #fff;
        line-height: 28px;
        section {
            height: 80px;
            color: #666;
            padding-left: 0;
        }
    }
}
</style>

