<template>
    <div class="app-main">
        <el-main>
            <router-view/>
        </el-main>
    </div>
</template>

<script>
export default {
    name: 'AppMain',
    data () {
        return {
        
        }
    }
}
</script>

<style scoped>
.app-main {
    height: calc(100% - 92px);
    /* margin: 16px; */
    /* background: #fff; */
    box-sizing: border-box;
}

.app-main >>> .el-main{
    background: rgba(244,244,244,1);
}
</style>
