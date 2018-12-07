<template>
    <section class="conuter-box clearFix">
        <span class="reduce fl" @click="reduceBtn">-</span>
        <input class="number" type="number" v-model="value">
        <span class="add fr"  @click="addBtn">+</span>
    </section>
</template>

<script>
import { MessageBox } from 'mint-ui';
export default {
    name: "conuterItem",
    data() {
        return {
            value: 1
        }
    },
    methods: {
        reduceBtn() {
            if(this.$data.value == 1){
                this.$data.value = 1;
            }else {
                this.$data.value--;
            }
        },
        addBtn() {
            if(this.$data.value >= 5) {
                 MessageBox.alert("一次最多只能购买5件哦！", "提示");
                 return;
            }else {
                this.$data.value++;
            }
        }
    }
}
</script>

<style lang="less" scoped>
.conuter-box {
    width: 122px;
    .number,.reduce,.add {
        display: inline-block;
        height: 35px;
        line-height: 35px;
        text-align: center;
    }
    .number {
        width: 50px;
        background: #ddd;
        margin: 0 1px;
    }
    .reduce,.add {
        width: 35px;
        background: #eee;
    }
    
}
</style>

