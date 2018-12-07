<template>
    <div class="kaite">
        <ul class="mango-list kaite-list clearFix">
            <li v-for="(mango, index) in kaiteDatas" :key="index">
                <mangoItem :condition="true" :mangoObj="mango"></mangoItem>
            </li>
        </ul>
    </div>
</template>
<script>
import mangoItem from '../../components/mangoItem';
export default {
    name: 'Kaite',
    data() {
        return {
            kaiteDatas : []
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
                if(element.type == "kaite"){
                    this.$data.kaiteDatas.push(element);
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
.kaite {
    width: 100%;
    height: 100%;
    background: #fff;
    .mango-list {
        padding: 15px 15px;
        background: #fff;
        
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


