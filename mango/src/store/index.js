import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: "芒果商城",
        // 四大主页底部
        isMain: true,
        // 头部返回图标 
        icon: false,
        // 详情页底部
        isDetail: false,
        //  登录状态
        isOnline: false,
        // 结算页面底部
        isAccount: false,
        // 是否收藏
        isCollection: false
    },
    mutations: {
        changeTitle(state,title){
            state.title = title;
        },
        isMain(state,isMain){
            state.isMain = isMain;
        },
        addBackIcon(state,isAdd) {
            state.icon = isAdd;
        },
        detail(state,isDetail){
            state.isDetail = isDetail;
        },
        isOnline(state,flag) {
            state.isOnline = flag;
        },
        account(state,isAccount) {
            state.isAccount = isAccount;
        },
        Collection(state,isCollection) {
            state.isCollection = isCollection;
        }
    }
});