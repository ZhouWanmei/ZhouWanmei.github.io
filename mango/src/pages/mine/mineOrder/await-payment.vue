<template>
    <div class="await-payment">
        <noOrder v-if="noDatas"></noOrder>
        <section v-else class="have-order">
            <ul>
                <li class="list-item" v-for="(order,index) in awaitPayDatas" :key="index" :data-index="index" :data-id="order.objectId">
                    <p class="order-id">
                        <span>订单号：<span>{{order.objectId}}</span></span>
                        <!-- <span class="create-date">{{new Date()}}</span> -->
                    </p>
                    <orderItem class="order-infos" :order="order" :isOrder="false"  :isPay="true"></orderItem>
                    <p class="order-pay clearFix">
                        <span>合计：<span class="total-price">￥{{order.unitPrice * order.buyNumber}}</span></span>
                        <span class="fr">
                            <span class="cancel" @click="cancelPay($event)">取消</span>
                            <span class="pay">付款</span>
                        </span>
                    </p>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
import noOrder from '../../../components/no-order';
import orderItem from '../../../components/orderItem';
import { MessageBox } from 'mint-ui';
export default {
    name: "AwaitPayment",
    data() {
        return {
            // 无付款订单
            noDatas: true,
            awaitPayDatas: []
        }
    },
    methods: {
        cancelPay(e) {
            $(e.srcElement).parents().each((index,el) => {
                if($(el).hasClass("list-item")) {
                    //mint-ui友好提示
                    MessageBox.confirm('你确定要删除该条数据？').then(action => {
                        if(action == "confirm") {
                            // 删除model层数据
                            this.$data.awaitPayDatas.splice($(el).data("index"),1);
                            // 删除数据库数据
                            const query = Bmob.Query('order');
                            query.destroy($(el).data("id")).then(res => {
                                console.log(res)
                            }).catch(err => {
                                console.log(err)
                            })
                        }else {
                            return;
                        }
                    });
                    
                }
            });
        }
    },
    created() {
        //数据请求
       const query = Bmob.Query("order");
        query.find().then(res => {
            res.forEach(order => {
                if(order.userName == JSON.parse(localStorage.bmob).username && order.isSubmit == true) {
                    this.$data.awaitPayDatas.push(order);
                }
                
                
            });
            if (this.$data.awaitPayDatas.length != 0) {
                this.$data.noDatas = false;
            }
        });
    },
    components: {
        noOrder,
        orderItem
    }
}
</script>

<style lang="less" scoped>
.await-payment {
    width: 100%;
    height: 100%;
    text-align: left;

    .have-order {
        ul {
            li {
                padding: 0 15px;
                background: #fff;
                border-bottom: 1px solid #999;
                margin-bottom: 10px;
                .order-infos {
                    padding: 20px 0;
                }
                p {
                    width: 100%;
                    height: 60px;
                    box-sizing: border-box;
                    line-height: 60px;
                    color: #666;
                }
                p.order-id {
                    border-bottom: 1px solid #aaa;
                }
                p.order-pay {
                    border-top: 1px solid #aaa;
                    .total-price {
                        color: #000;
                    }

                    .cancel,.pay {
                        padding: 8px 15px;
                        border: 1px solid #999;
                        border-radius: 3px;
                    }
                    .cancel {
                        margin-right: 15px;
                    }
                }
            }
            li:last-child {
                margin-bottom: 150px;
            }
        }
    }
}
</style>

