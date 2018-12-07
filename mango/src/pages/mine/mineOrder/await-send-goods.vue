<template>
    <div class="await-send-goods">
        <noOrder></noOrder>
    </div>
</template>

<script>
import noOrder from '../../../components/no-order';
export default {
    name: "AwaitSendGoods",
    data() {
        return {}
    },
    components: {
        noOrder
    }
}
</script>

<style lang="less" scoped>
.await-send-goods {
    width: 100%;
    height: 100%;
}
</style>

