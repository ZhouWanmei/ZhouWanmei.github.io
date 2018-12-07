<template>
    <section class="mango-box kaite">
        <section class="title-box">
            <h2 class="title">{{title}}</h2>
            <router-link class="more" to="/sort">更多 <i class="iconfont icon-youjiantou"></i></router-link>
        </section>
        <ul class="mango-list kaite-list clearFix">
            <li v-for="(mango, index) in datas" :key="index" v-if="index < 3">
                <mangoItem :mangoObj="mango"></mangoItem>
            </li>
        </ul>
    </section>
</template>
<script>
import mangoItem from './mangoItem';
export default {
    name: "mangoType",
    data() {
        return {}
    },
    props: ["datas","title"],
    components: {
        mangoItem
    }
    
}
</script>
<style lang="less" scoped>
@import '//at.alicdn.com/t/font_942460_uzpfk4gyhi.css';
.mango-box {
    margin: 10px 0;
    font-size: 16px;
    background: #fff;
    .title-box {
        position: relative;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #999;
         .title{
            font-size: 18px;
            font-weight: normal;
            letter-spacing: 3px;
            position: relative;

            

            &::before,&::after{
                content: "";
                display: block;
                width: 20px;
                height: 1px;
                background: #999;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
            &::before {
                left: 25%;
            }
            &::after {
                right: 25%;
            }
        }
        a{
            color: #333;
            font-size: 16px;
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translate(0,-50%);
        }
    }
    .mango-list {
        padding: 15px 15px;

        
        li {
            float: left;
            width: 30%;
            margin-bottom: 15px;
            
        }
        li:not(:nth-child(3n)) {
            margin-right: 5%;
        }
    }
}
</style>

