<template>
    <div class="home">
        <!-- 轮播图 -->
        <section class="rotation">
            <mt-swipe :auto="4000">
                <mt-swipe-item><img src="../images/home/sg.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../images/home/mg.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../images/home/ag.jpg" alt=""></mt-swipe-item>
                <mt-swipe-item><img src="../images/home/bg.jpg" alt=""></mt-swipe-item>
            </mt-swipe>
        </section>
        <!-- 搜索 -->
        <section class="search-box">    
            <router-link to="/search"><i class="iconfont icon-sousuo"></i>搜索</router-link>
        </section>
        <!-- 产品分类菜单 -->
        <ul class="mango-sort-menu clearFix">
            <li><router-link to="/flowers"><img src="../images/home/sort-bar.png" alt="">金百花</router-link></li>
            <li><router-link to="/coconut"><img src="../images/home/sort-sun.png" alt="">椰香芒</router-link></li>
            <li><router-link to="/jinhuang"><img src="../images/home/sort-study.png" alt="">金煌芒</router-link></li>
            <li><router-link to="/kaite"><img src="../images/home/sort-muyu.png" alt="">凯特芒</router-link></li>
            <li><router-link to="/guifei"><img src="../images/home/sort-friend.png" alt="">贵妃芒</router-link></li>
            <li><router-link to="/xiangya"><img src="../images/home/autumn-festival.png" alt="">象牙芒</router-link></li>
            <li><router-link to="/haidun"><img src="../images/home/mango-beast.png" alt="">海顿芒</router-link></li>
            <li><router-link to="/dried"><img src="../images/home/mango-spirit.png" alt="">芒果干</router-link></li>
        </ul>
        <!-- 金百花芒果 -->
        <mangoType :datas="flowerDatas" :title="titles.flower"></mangoType>
        <!-- 凯特芒果 -->
        <mangoType :datas="kaiteDatas" :title="titles.kaite"></mangoType>
        
        <!-- 热销芒果干 -->
        <mangoType :datas="driedDatas" :title="titles.dried"></mangoType>
    
    </div>
</template>
<script>
// 导入组件
import mangoType from '../components/mangoType'

let model = {
    driedDatas : [],
    kaiteDatas : [],
    flowerDatas : [],
    titles: {
        kaite: "凯特芒果",
        dried: "热卖芒果干",
        flower: "金百花芒果",
    }
};


export default {
    name: "Home",
    components: {
        mangoType
    },
    data() {
        return model;
    },
    created() {
        // 数据请求
        this.$axios.get('./static/json/mangos.json')
        .then(res => {
            res.data.forEach(element => {
                if(element.type == "dried"){
                    model.driedDatas.push(element);
                }else if(element.type == "kaite"){
                    model.kaiteDatas.push(element);
                }else if(element.type == "flower"){
                    model.flowerDatas.push(element);
                }
            });
            
        })
        .catch(error => {
            console.log(error);
        })
        
    }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_942460_uzpfk4gyhi.css';
/* 轮播图 */
.rotation {
    width: 100%;
    height: 200px;
    img{
        width: 100%;
        height: 200px;
    }
}
/* 搜索 */
.search-box {
    width: 100%;
    height: 60px;
    
    
    a{
        display: inline-block;
        width: 90%;
        height: 40px;
        line-height: 40px;
        border-radius: 8px;
        margin: 10px 0;
        text-align: center;
        background: #fff;
        color: #999;

        i{
            font-size: 22px;
        }
    }
}

/* 分类菜单 */
.mango-sort-menu {
    padding: 15px 15px;
    background: #fff;
    li{
        width: 17.5%;
        float: left;
        margin-bottom: 15px;

        a {
            color: #333;
        }
        img{
            background-color: #fff;
            width: 100%;
            height: 60px;
            border-radius: 50%;
            margin-bottom: 3px;
        }
    }
    li:not(:nth-child(4n)){
        margin-right: 10%;
    } 
    
}
</style>


