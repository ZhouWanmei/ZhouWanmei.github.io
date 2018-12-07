<template>
    <button 
        :class="{
            'editBtn':isEdit,
            'sureAddressBtn':isSureAddress,
            'loginBtn':isLogin,
            'registerBtn':isRegister,
            'logoutBtn':isLogout,
            }" 
        type="button"
        >
        {{text}}
    </button>
</template>

<script>
import router from '../router';
export default {
    name: "Button",
    data() {
        return {}
    },
    props: ["isEdit","isSureAddress","isLogin","isRegister","isLogout","text"]
}
</script>

<style lang="less" scoped>

button {
    width: 92%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 20px 15px 40px 15px;
    color: #fff;
    letter-spacing: 3px;
    border-radius: 5px; 
}
.editBtn,.sureAddressBtn,.loginBtn,.registerBtn {
    background: #359A35;  
}
.logoutBtn {
    background: #CC3333;
}
</style>

