<template>
    <div class="cart">
        <!-- 没有订单 -->
        <section class="no-goods" v-if="noDatas">
            <img src="../../images/cart/no-goods.png" alt="">
            <p>啥都没有</p>
            <p><router-link to="/">去逛逛？</router-link></p>
        </section>
        <!-- 有订单 -->
        <section class="have-goods" v-else>
            <ul class="goods-list">
                <li class="clearFix" v-for="(order,index) in orderDatas" :key="index" :data-index="order.objectId">
                    <i class="radio  fl iconfont icon-radio02"  @click="selected(order.unitPrice * order.buyNumber,$event)" :data-index="index" :data-id="order.mangoID"></i>
                    <orderItem :order="order" :isOrder="true" :isPay="false"></orderItem>
                </li>
            </ul>
        </section>
        

        <section class="settlement clearFix">
            <i class="allRadio fl iconfont icon-radio02" @click="selectedAll($event)"></i><span class="all-select">全选</span>
            <span class="total">总计：￥<span>{{total.toFixed(2)}}</span></span>
            
            <span class="account fr" @click="delOrAccBtn">{{isEdit ? '删除' : '结算'}}</span>
            <span class="edit fr" @click="editBtn">{{isEdit ? '完成' : '编辑'}}</span>
        </section>
    </div>
</template>
<script>
import router from '../../router'
import orderItem from '../../components/orderItem'
import { Toast } from 'mint-ui';
export default {
    name: "Cart",
    data() {
        return {
            noDatas: true,
            orderDatas: [],
            jsonDatas: [],
            value: "",
            total: 0.00,
            isEdit: false,
            // 单选选中数量
            seclectedNum: 0
        }
    },
    components: {
        orderItem
    },
    methods: {
        selected(price,$event) {
            let radioIcon = $($event.srcElement);
            if(radioIcon.hasClass('icon-radio')) {
                radioIcon.removeClass('icon-radio').addClass('icon-radio02');
                this.$data.total = this.$data.total - Number(price);
                this.$data.seclectedNum = this.$data.seclectedNum - 1;
                if(this.$data.total < 0){
                    this.$data.total = 0;
                }
            }else {
                radioIcon.addClass('icon-radio');
                this.$data.total = this.$data.total + Number(price);
                this.$data.seclectedNum = this.$data.seclectedNum + 1;
            }
            
        },
        selectedAll(e) {
            let radioIcon = $(e.srcElement);
            let icons = $('.radio');
            
            if(radioIcon.hasClass('icon-radio')) {
                radioIcon.removeClass('icon-radio').addClass('icon-radio02');
                icons.removeClass('icon-radio').addClass('icon-radio02');
                this.$data.total = 0;
            }else {

                radioIcon.addClass('icon-radio');
                if (icons.hasClass('icon-radio')){
                    this.$data.total = this.$data.total;
                }else{
                    icons.addClass('icon-radio');
                    
                    this.$data.orderDatas.forEach((mango) => {
                        this.$data.total = this.$data.total + mango.unitPrice * mango.buyNumber;
                   });
                }
                
            }
        },
        editBtn() {
            this.$data.isEdit = !this.$data.isEdit;
            
        },
        delOrAccBtn() {
            
            let icons = $('.radio');
            let goodsIdxs = [],orderIds = [];
            if ((icons.hasClass('icon-radio'))) {
                $('.icon-radio').each((index,item) => {
                    // 获取商品下标
                    let _index =  $(item).data('index');
                    goodsIdxs.push(_index);
                     // 获取订单ID
                    let orderID = $(item).parent().data('index');
                    orderIds.push(orderID);
                    // 删除
                    if (this.$data.isEdit) {
                        const query = Bmob.Query('order');
                        orderIds.forEach(orderId => {
                            query.destroy(orderId).then(res => {
                            Toast({
                                iconClass: 'iconfont icon-caozuochenggong',
                                message: '删除成功',
                                position: 'middle',
                                duration: 1000
                            });
                            
                        }).catch(err => {
                            console.log(err)
                        })
                        });
                        // 在数据层删除数据
                        goodsIdxs.forEach(goodsIdx => {
                            this.$data.orderDatas.splice(goodsIdx,1);
                        });
                        
                        $('.radio').removeClass('icon-radio').addClass('icon-radio02');  
                        this.$data.total = 0;
                    }else {// 结算
                        router.push(`/account/${orderIds}`);
                    }    
                });
            }
            
        }
    },
    watch: {
        seclectedNum(val) {
            if(val == this.$data.orderDatas.length) {
                $('.allRadio').addClass('icon-radio');
            }else {
                $('.allRadio').removeClass('icon-radio')
            }
        }
        
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
            
            
            res.forEach(order => {
                if(order.userName == JSON.parse(localStorage.bmob).username) {
                    this.$data.jsonDatas.forEach(mango => {
                        if(order.mangoID == mango.mangoID && order.isBuy == false  && order.isSubmit == false && order.isPay == false) {
                            this.$data.orderDatas.push(order);
                        }
                    });
                }
                
                
            });
            if (this.$data.orderDatas.length != 0) {
                this.$data.noDatas = false;
            }
        });
    },
    watch: {
        orderDatas(val){
            if(val.length == 0) {
                this.$data.noDatas = true;
            }
        }
    },
    beforeRouteEnter(to,from,next) {
      $('.content').addClass('account-bar');
        next();
    },
    beforeRouteLeave(to,from,next) {
      $('.content').removeClass('account-bar');
        next();
    }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_942460_jceutebppoa.css';
.cart {
    position: relative;
    width: 100%;
    height: 100%;
    // 单选框
    .radio,.allRadio {
        display: inline-block;
        font-size: 24px;
        position: absolute;
        top: 50%;
        left: 15px;
        transform: translateY(-50%);
    }
    .icon-radio {
        color: orangered;
    }
    // 价格
    .total-price,.total {
        color: #f00;
    }
    // 有商品
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
    // 没有商品
    .no-goods {
        
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        
        
    }
    // 结算
    .settlement {
        width: 100%;
        height: 44px;
        line-height: 44px;
        background: #fff;
        border-top: 1px solid #999;
        position: fixed;
        left: 0;
        bottom: 47px;
        text-align: left;

        span {
            display: inline-block;
        }
        .all-select {
            margin-left: 42px;
        }
        .total {
            margin-left: 8px;
        }
        .edit,.account {
                width: 20%;
                height: 100%;
                text-align: center;
                color: #fff;
            }
            .edit {
                background: #00f;
            }
            .account {
                background: #f00;
            }
    }
    
}
</style>


