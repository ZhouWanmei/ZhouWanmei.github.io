<template>
    <div class="await-receiving-goods">
        <noOrder></noOrder>
    </div>
</template>

<script>
import noOrder from '../../../components/no-order';
export default {
    name: "AwaitReceivingGoods",
    data() {
        return {}
    },
    components: {
        noOrder
    }
}
</script>

<style lang="less" scoped>
.await-receiving-goods {
    width: 100%;
    height: 100%;
}
</style>

