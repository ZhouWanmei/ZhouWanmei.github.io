<template>
    <div class="completed">
        <noOrder></noOrder>
    </div>
</template>

<script>
import noOrder from '../../../components/no-order';
export default {
    name: "Completed",
    data() {
        return {}
    },
    components: {
        noOrder
    }
}
</script>

<style lang="less" scoped>
.completed {
    width: 100%;
    height: 100%;
}
</style>

