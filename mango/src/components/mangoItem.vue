<template>

    <router-link :to="{name: 'details', params: {id: `${mangoObj.mangoID}`}}">
        <img :src="mangoObj.img" :alt="mangoObj.name">
        <p class="name">{{mangoObj.name}}</p>
        <p class="price">￥{{mangoObj.price}}</p>
    </router-link>
    
</template>
<script>
export default {
    name: 'Flower',
    data() {
        return {
            
        }
    },
    props: ["mangoObj"]
}
</script>
<style lang="less" scoped>
a{
    color: #333;
    img{
        width: 100%;
        height: 115px;
    }
    .name{
        width: 100%;
        margin: 5px 0;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
    .price{
        color: #ED2D37;
    }
}
</style>


