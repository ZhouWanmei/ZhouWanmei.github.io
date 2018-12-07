<template>
    <div class="collection">
        <ul class="mango-list kaite-list clearFix">
            <li v-for="(mango, index) in collectionDatas" :key="index">
                <mangoItem :condition="true" :mangoObj="mango"></mangoItem>
            </li>
        </ul>
        <section v-if="noCollection" class="no-collection">
            <p>你还没有收藏任何商品哦</p>
        </section>
    </div>
</template>

<script>
import mangoItem from '../../components/mangoItem';
export default {
    name: "Collection",
    data() {
        return {
            allDatas: [],
            collectionDatas: [],
            noCollection: true
        }
    },
    components: {
        mangoItem
    },
    created() {
        // 数据请求
        this.$axios.get('./static/json/mangos.json')
        .then(res => {
            res.data.forEach(element => {
                this.$data.allDatas.push(element);
            });
            
        })
        .catch(error => {
            console.log(error);
        })

        const query = Bmob.Query("collection");
        query.find().then(res => {
            if(res.length != 0) {
                this.$data.noCollection = false;
            }
            res.forEach(item => {
                if(item.userName == JSON.parse(localStorage.bmob).username) {
                    this.$data.collectionDatas.push(item);
                }
            });
        });
        
    }

}
</script>

<style lang="less" scoped>
.collection {
    width: 100%;
    height: 100%;
    
    .mango-list {
        padding: 15px 15px;
        li {
            float: left;
            width: 47%;
            margin-bottom: 15px;
            background: #fff;
        }
        li:not(:nth-child(2n)) {
            margin-right: 5%;
        }
    }
}
</style>

