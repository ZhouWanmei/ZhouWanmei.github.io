<template>
    <div class="wk-platform-frontend">
        <top-bar></top-bar>
        <div class="app-wrapper">
            <side-bar></side-bar>
            <div class="app-right" :class="$store.state.settings.layout ? 'app-right-max' : 'app-right-min'">
                <Tags></Tags>
                
                <app-main></app-main>

                <el-footer class="app-footer">Copyright  @2020 by zhouwm</el-footer>
            </div>
        </div>
        
        
    </div>
</template>

<script>
    import { SideBar,TopBar,AppMain,Tags } from "../components";
    export default {
        name: "Layout",
        components: {
            SideBar,
            TopBar,
            AppMain,
            Tags
        },
        data() {
            return {
                
            };
        },
    };
</script>

<style scoped>
.wk-platform-frontend {
    width: 100%;
    display: flex;
}
.wk-platform-frontend,.wk-platform-frontend >>> .el-container {
    width: 100%;
    height: 100%;
}
.app-wrapper {
    width: 100%;
    height: 100%;
}
.app-right {
    width: 100%;
    background: rgba(244,244,244,1);
    padding-top: 74px;
    height: calc(100% - 74px);
}
.app-right-min {
    width: calc(100% - 201px);
    margin-left: 201px;
}
.app-right-max {
    width: calc(100% - 64px);
    margin-left: 64px;
}

.app-footer {
    min-height: 55px;
    line-height: 55px;
    color: rgba(0,0,0,.45);
    text-align: center;
    border-top: 1px dashed #dcdfe6;
}
</style>
