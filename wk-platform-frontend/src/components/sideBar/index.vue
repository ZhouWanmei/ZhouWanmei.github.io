<template>
    <div class="side-bar">
        <el-menu default-active="1-4-1" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="$store.state.settings.layout" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
    data() {
        return {
            items: [
                {
                    icon: 'el-icon-menu',
                    index: '3',
                    title: '用户管理',
                    subs: [
                        {
                            index: '/roleManage',
                            title: '角色管理'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style  scoped>
.side-bar {
    z-index: 999;
    position: fixed;
    top: 0;
    height: 100%;
    left: 0;
    margin-top: 74px;
}
.side-bar >>> .el-menu {
    height: 100%;
    background: rgb(50, 65, 87);
    color: rgb(191, 203, 217);
}
.side-bar >>> .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.side-bar >>> .el-menu-item {
    color:rgba(255,255,255,1);
}

.side-bar >>> .el-menu-item:focus,.side-bar >>> .el-menu-item:hover {
    background-color: rgb(40, 52, 70);
}
.side-bar >>> .el-menu-item.is-active {
    color: rgb(32, 160, 255);
    background-color: rgb(50, 65, 87);
    position: relative;
}

.logo {
    height: 35px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    margin: 20px auto;
}
</style>
