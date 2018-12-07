<template>
    <div class="details">
        <section class="base-infos">
             <i class="iconfont icon-daohanggouwuche gouwuche" @click="goToCart"></i>
            <img class="mango-img" :src="mangoDatas.img" :alt="mangoDatas.name" :data-url="mangoDatas.img">
            <p class="name">{{mangoDatas.name}}</p>
            <p class="price">￥<span class="unit-price">{{mangoDatas.price}}</span></p>
        </section>
        <p class="specifications" @click="showMask">选择<span>规格</span><i class="iconfont icon-youjiantou"></i></p>
        
        <section class="detail-infos">
            <h2>商品详情</h2>
            <ul>
                <li v-for="(image,index) in images" :key="index">
                    <img :src="image" alt="">
                </li>
            </ul>
            
        </section>
        <!-- 遮罩层 -->
        <section class="mask">
            <section class="mango-infos-box">
                <section class="mango-infos">
                    <img :src="mangoDatas.img" alt="">
                    <span class="price">￥{{mangoDatas.price}}</span>
                    <i class="iconfont icon-guanbi" @click="closeMask"></i>
                </section>
                <section class="format">
                    <p>规格</p>
                    <section class="taste" v-if="mangoDatas.taste">
                        <span class="choiceStandard"  :class="{'standard': !index}"  v-for="(item,index) in mangoDatas.taste" :key="index" @click="clickChecked(item,$event)">{{item}}</span>
                    </section>
                    <span  v-else class="default standard">默认</span>
                    
                </section>
                <section class="numbers claerFix">
                    <span>数量</span>
                    <conuterItem class="fr"></conuterItem>
                </section>
            </section>
        </section>
    </div>
</template>
<script>
// 导入数量组件
import conuterItem from '../components/counterItem';
import router from '../router'
export default {
    name: "Details",
    data() {
        return {
            mangoDatas: {},
            images: []
            
        } 
    },
    components: {
        conuterItem
    },
    methods: {
        showMask(){
            $('.mask').css({"display":"block"});
        },
        closeMask() {
            $('.mask').css({"display":"none"});
        },
        clickChecked(item,e) {
            $(e.srcElement).addClass('standard').siblings().removeClass('standard');

        },
        goToCart() {
            router.push('/shoppingCart');
        }
        
    },
    created() {
        // 数据请求
        this.$axios.get('./static/json/mangos.json')
        .then(res => {
            res.data.forEach(element => {
                if(element.mangoID == this.$route.params.id){
                    this.$data.mangoDatas = element;
                    this.$data.images = element.details.images;
                }
            });
        })
        .catch(error => {
            console.log(error);
        })

        
        
    },
    mounted() {
        const query = Bmob.Query("collection");
        query.find().then(res => {
            res.forEach(item => {
                if(item.mangoID == Number(this.$route.params.id)) {
                    this.$store.state.isCollection = !this.$store.state.isCollection;
                    $('.collection a').css({"color":"#f00"});
                }
            });
        });
    }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_942460_ltopwz08w88.css';
.details {
    text-align: left;
    
    .base-infos{
        background: #fff;
        font-weight: bold;
        .gouwuche {
                display: inline-block;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-size: 26px;
                position: absolute;
                top: 84px; 
                right: 20px;
                background: rgba(255,255,255,0.8);
                border-radius: 50%;
                z-index: 3;
            }


        img{
            width: 100%;
            height: 400px;
        }
        
        .name {
            margin-top: 10px;
            line-height: 30px;
            padding: 0 15px;
        }
        .price {
            color: #ED2D37;
            padding: 20px 15px;
        }
    }
    .specifications {
        width: 100%;
        height: 50px;
        line-height: 50px;
        margin: 10px 0;
        background: #fff;
        position: relative;
        padding: 0 15px;
        box-sizing: border-box;

        span{
            color: #666;
            font-size: 14px;
            margin-left: 20px;
        }

        i{
            position: absolute;
            right: 15px;
        }
    }
    .detail-infos {
        background: #fff;
        

        h2 {
            font-size: 16px;
            font-weight: normal;
            line-height: 50px;
            padding: 0 15px;
            border-bottom: 1px solid #999;
        }
        ul {
            padding-top: 20px;
            li {
                img {
                    width: 100%;
                }
            }
        }
    }
    
}

// 遮罩
.mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 64px;
    left: 0;
    z-index: 99;
    background: rgba(0, 0, 0, 0.5);
    display: none;

    .mango-infos-box {
        width: 100%;
        height: 55%;
        background: #fff;
        position: absolute;
        left: 0;
        bottom: 0;

        .mango-infos {
            width: 100%;
            height: 15%;
            border-bottom: 1px solid #999;
            padding: 15px 10px 15px;
            position: relative;

            

            img{
                width: 100px;
                height: 100px;
                position: absolute;
                left: 15px;
                top: -25px;
                border-radius: 3px;
            }

            .price {
                 color: #ED2D37;
                 margin-left:130px;
            }

            i {
                position: absolute;
                right: 40px;
                top: 50%;
                transform: translate(0,-50%);
            }
        }

        // 规格
        .format {
            padding: 15px 15px 50px;

            

            span {
                display: inline-block;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border-radius: 5px;
                margin-top: 10px;
                
            }

            .taste {
                span {
                    border: 1px solid #999;
                    padding: 0 8px;
                    margin-right: 8px; 
                }
                

                

            }
            .default {
                width: 70px;
                letter-spacing: 3px;
            }

            .standard {
                border: none;
                background: #f00;
                color: #fff;
            }
        }

        // 数量
        .numbers {
            padding: 0 15px;
        }
    }
}
</style>



