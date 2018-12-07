<template>
    <div class="search">
        <mt-search v-model="value" :autofocus="true" :show="true">
            <ul class="mango-list kaite-list clearFix">
                <li v-for="(item,index) in result" :key="index">
                    <mangoItem :condition="true" :mangoObj="item"></mangoItem>
                </li>
            </ul>
        </mt-search>

    </div>
</template>
<script>
import mangoItem from '../components/mangoItem';
export default {
    name: "Search",
    data() {
        return {
            // 搜索keywords
            value: null,
            // 搜索结果
            result: [],
            // 全部数据
            mangos: []
        }
    },
    created() {
        // 数据请求
        this.$axios.get('./static/json/mangos.json')
        .then(res => {
            res.data.forEach(element => {
                this.$data.mangos.push(element);
            });
            
        })
        .catch(error => {
            console.log(error);
        })
        
    },
    watch:  {
        value(val) {
            this.$data.result = [];
            let mangoList = this.$data.mangos.filter(element => {
                var reg = new RegExp(val, "i");
                return reg.test(JSON.stringify(element));  
            });
            mangoList.forEach(element => {
                this.$data.result.push(element);
            });
        }
    },
    components: {
        mangoItem
    },
}
</script>

<style lang="less" scoped>
.search {
    width: 100%;
    background: #fff;


    .mango-list {
        padding: 0 15px;

        li {
            float: left;
            width: 47%;
            margin-bottom: 15px;
        }
        li:not(:nth-child(2n)) {
            margin-right: 5%;
        }
    }
}
</style>

