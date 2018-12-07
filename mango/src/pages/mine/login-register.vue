<template>
    <div class="login-register">
        <h2 class="title">
            <span class="cursor" @click="changState($event)">登录</span>
            <span @click="changState($event)">注册</span>
        </h2>
        <!-- 登录 -->
        <form class="login" v-if="isLogin">
            <section class="username-box">
                <i class="iconfont icon-shouji"></i>
                <input class="username" type="text" placeholder="请输入您的手机号" key="loginUsername" length="11">
            </section>
            <section class="password-box">
                <i class="iconfont icon-icon2"></i>
                <input class="password" type="password" placeholder="请输入您的密码" key="password" maxlength="10" minlength="6">
            </section>
            <Button :isLogin="true" :text="loginText" @click.native="login"></Button>
        </form>
        <!-- 注册 -->
        <form class="register" v-else>
            <section class="username-box">
                <i class="iconfont icon-shouji"></i>
                <input class="username-r" type="text" placeholder="请输入您的手机号" key="registerUsername" length="11">
            </section>
            <section class="nickname-box">
                <i class="iconfont icon-xingmingyonghumingnicheng"></i>
                <input class="nickname" type="text" placeholder="请输入您的昵称">
            </section>
            <section class="fir-password-box" key="firPassword">
                <i class="iconfont icon-mima"></i>
                <input class="fir-password" type="password" placeholder="请输入您的密码" maxlength="10" minlength="6">
            </section>
            <section class="sec-password-box" key="secPassword">
                <i class="iconfont icon-icon2"></i>
                <input class="sec-password" type="password" placeholder="请确认您的密码" maxlength="10" minlength="6">
            </section>
            <Button :isRegister="true" :text="registerText"  @click.native="register"></Button>
        </form>
    </div>
</template>

<script>
// 导入路由
import router from '../../router';
// 导入按钮组件
import Button from '../../components/button';
// 导入mint-ui
import { Toast,MessageBox } from 'mint-ui';
export default {
    name: "LoginRegister",
    data() {
        return {
            isLogin: true,
            loginText: "登录",
            registerText: "确认注册"
        }
    },
    components: {
        Button
    },
    methods: {
        // 切换登录注册
        changState(e) {
            this.$data.isLogin = !this.$data.isLogin;
            $(e.srcElement).addClass('cursor').siblings().removeClass('cursor');
        },
        // 登录
        login() {
            // 定义一个用户对象
            let user = {
                username: '',
                password: ''
            };
            user.username = $('.username').val();
            user.password = $('.password').val();
            // 表单验证
            let flag = false;
            if(/^1[34578]\d{9}$/.test(user.username) && /^[\w,.!@#$%^&*]{6,10}$/.test(user.password)) {
                flag = true;
            }
            if(flag) {
                Bmob.User.login($('.username').val(),$('.password').val()).then(res => {
                localStorage.setItem("Flag","isOnline");
                Toast({
                    iconClass: 'iconfont icon-caozuochenggong',
                    message: '登录成功',
                    position: 'middle',
                    duration: 1000
                });
                router.push('./mine');
                }).catch(err => {
                    //mint-ui友好提示
                    MessageBox.alert(err.error, "提示");
                });
            }else {
                //mint-ui友好提示
                MessageBox.alert("请输入正确的账号或密码", "提示");
            }

        },
        // 注册
        register() {
            // 创建用户对象
            let params = {
                username: $('.username-r').val(),
                nickname: $('nickname').val(),
                password: $('.fir-password').val(),
                secPassword: $('.sec-password').val(),
            }
            let _flag = false,
                usernameReg = /^1[34578]\d{9}$/.test(params.username),
                nicknameReg = /^[\u0000-\uFFFF\w]+$/.test(params.nickname),
                passwordReg = /^[\w,.!@#$%^&*]{6,10}$/.test(params.password);
            
            if(usernameReg && nicknameReg && passwordReg && (params.secPassword === params.password)) {
                _flag = true;
            }
            if(_flag) {
                // 注册
                Bmob.User.register(params).then(res => {
                    // 将登录状态存到本地
                    localStorage.setItem("Flag","isOnline");
                    // 提示注册成功
                    Toast({
                        iconClass: 'iconfont icon-caozuochenggong',
                        message: '注册成功',
                        position: 'middle',
                        duration: 1000
                    });
                    // 跳转到个人信息页面
                    router.push('./mine');
                }).catch(err => {
                    //mint-ui友好提示
                    MessageBox.alert(err.error, "提示");
                });
            } else {
                //mint-ui友好提示
                MessageBox.alert("请输入正确的格式", "提示");
            }   
        }
    }
}
</script>

<style lang="less" scoped>
// 导入阿里图标
@import '//at.alicdn.com/t/font_942460_r3fqsa4zzuo.css';
.login-register {
    background: #fff;
    font-size: 16px;
    padding: 0 15px;
    // 标题
    h2 {
        font-size: 18px;
        font-weight: normal;
        height: 70px;
        line-height: 70px;
        border-bottom: 1px solid #999;

        span {
            display: inline-block;
            padding: 0 40px;
            position: relative;
        }
        span.cursor::after {
            display: block;
            content: "";
            width: 100%;
            height: 2px;
            background: #359A35;
            position: absolute;
            left: 0;
            bottom: -1px;
            
        }
    }

    // 表单
    form {
        section {
            height: 70px;
            text-align: left;
            border-bottom: 1px solid #999;
            padding-left:  8px;
            box-sizing: border-box;
            
            i,input {
                display:inline-block;
                height: 99%;
            }

            i {
                width: 8%;
            }

            input {
                width: 80%;
            }
        }
    }
}

</style>

