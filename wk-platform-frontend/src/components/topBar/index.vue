<template>
    <div class="top-bar">
        <el-header class="flex-display">
            <div class="top-bar-left flex-display">
                <i @click="changeLayout" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>

                <span class="system-title">后台管理系统</span>
            
            </div>

            
            
            <div class="top-bar-right flex-display">
                <el-tooltip content="通知" placement="bottom">
                    <i class="top-bar-icon iconfont icon-message"></i>
                </el-tooltip>

                <el-tooltip content="帮助" placement="bottom">
                    <i class="top-bar-icon iconfont icon-question"></i>
                </el-tooltip>
                
                

                <!-- 用户头像 -->
                <div class="user-avator"><img src="../../assets/img.jpg"></div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided  command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                
            </div>
        </el-header>
    </div>
</template>

<script>
export default {
    name: 'TopBar',
    data () {
        return {
            isCollapse: false,
            name: 'zhouwm',
        }
    },
    computed:{
        username(){
            let username = localStorage.getItem('ms_username');
            return username ? username : this.name;
        }
    },
    methods: {
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if(command == 'loginout'){
                localStorage.removeItem('ms_username')
                this.$router.push('/login');
            }
        },
        changeLayout() {
            this.isCollapse = !this.isCollapse;
            this.$store.dispatch("settings/changeLayout", this.isCollapse);
        }
    }
}
</script>

<style scoped>
.top-bar {
    position: fixed;
    top: 0;
    z-index: 998;

    width: 100%;
}

.top-bar >>> .el-header {
    width: 100%;
    height:74px !important;
    background:#242f42;
    line-height: 74px;
    color: #fff;
}

.system-title {
    font-size: 22px;
    color: #fff;
    margin-left: 20px;
}

.top-bar-icon {
    margin-right: 20px;
    font-size: 16px;
    cursor: pointer;
}

.top-bar-icon:hover {
    opacity: .8;
}

.top-bar >>> .el-dropdown-link {
    cursor: pointer;
    color: #fff;
}
.top-bar >>> .el-icon-arrow-down {
    font-size: 12px;
}

.top-bar-left {
    width: 50%;
    height: 100%;
}

.top-bar-right {
    width: 50%;
    height: 100%;
    justify-content: flex-end;
}

.user-name{
    margin-left: 10px;
}
.user-avator{
    margin-left: 20px;
}
.user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
}
.el-dropdown-link{
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item{
    text-align: center;
}

</style>
