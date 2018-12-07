<template>
    <div class="sort">    
        <!-- 路由链接 -->
        <div class="wraper">
            <i class="menu-icon iconfont icon-icon-bars" @click="showMenu"></i>
            <ul v-if="isShow" class="menu">
                <li><router-link exact to="/all">全部</router-link></li>
                <li><router-link to="/flowers">金百花</router-link></li>
                <li><router-link to="/coconut">椰香</router-link></li>
                <li><router-link to="/jinhuang">金煌</router-link></li>
                <li><router-link to="/kaite">凯特</router-link></li>
                <li><router-link to="/guifei">贵妃</router-link></li>
                <li><router-link to="/xiangya">象牙</router-link></li>
                <li><router-link to="/haidun">海顿</router-link></li>
                <li><router-link to="/dried">芒果干</router-link></li>
            </ul>
            <!-- 路由出口 -->
            <div class="mango">
                <transition>
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "Sort",
    data() {
        return {
            value: "",
            isShow: false
            
        }
    },
    methods: {
        showMenu() {
            this.$data.isShow = !this.$data.isShow;
        }
    }
}
</script>

<style lang="less" scoped>
@import '//at.alicdn.com/t/font_942460_59sqayt5b2h.css';
.sort {
    width: 100%;
    height: 100%;
    position: relative;
    .wraper {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        // 菜单按钮
        .menu-icon {
            font-size: 22px;
            color: #333;
            position: fixed;
            left: 20px;
            top: 20px;
            z-index: 99;
        }
        .menu {
            width: 30%;
            position: fixed;
            left: 0;
            top: 64px;
            background: rgba(255, 255, 255, 0.9);
            
            
            li {
                line-height: 30px;
                a {
                    display: inline-block;
                    width: 100%;
                    height: 100%;
                    color: #333;
                    
                }
                .active {
                    background: orange; 
                    color: #fff;      
                }  
            }
            
        }
        .mango {
            width: 100%;
            height: 100%;
        }
    }
}
</style>


