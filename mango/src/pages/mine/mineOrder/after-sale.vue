<template>
    <div class="after-sale">
        <noOrder></noOrder>
    </div>
</template>

<script>
import noOrder from '../../../components/no-order';
export default {
    name: "AfterSale",
    data() {
        return {}
    },
    components: {
        noOrder
    }
}
</script>

<style lang="less" scoped>
.after-sale {
    width: 100%;
    height: 100%;
}
</style>

