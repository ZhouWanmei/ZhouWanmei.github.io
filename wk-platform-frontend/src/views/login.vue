<template>
    <div class="login-box">
        
        <el-form ref="form" :model="form" :rules="rules" class="form-box">
            <img class="logo" src="../assets/logo.png" alt="">

            <div class="form-head flex-display">
                <h2>登录</h2>
                <span>
                    还没有账号？ <el-link type="primary" @click="register">注册账号</el-link>
                </span>
            </div>
            <div>
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="输入手机号/邮箱"></el-input>
                </el-form-item>


                <el-form-item style="position: relative;" prop="password" v-if="!isVerificationCodeLogin">
                    <el-input :type="isPassword ? 'password' : 'text'" v-model="form.password" placeholder="输入密码"></el-input>
                    <i class="iconfont password-icon" @click="changeType" :class="isPassword ? 'biyanjing' : 'zhengyanicon'"></i>
                </el-form-item>

                <el-form-item class="verifyCode-box" prop="verifyCode" v-if="isVerificationCodeLogin">
                    <el-input v-model="form.verifyCode" placeholder="输入验证码"></el-input>
                    <span>
                        <label v-show="show" class="count" style="color: #66b1ff;">{{count}} s后</label>
                        <label @click="getCode" style="cursor: pointer;">{{show ? '重新获取' : '发送验证码'}}</label>
                    </span>
                </el-form-item>


                <el-form-item class="login-status-box clearfix">
                    <el-checkbox class="fl" v-model="form.loginStatus">记住登录状态</el-checkbox>
                    <el-link v-if="!isVerificationCodeLogin" class="fr retrieve-password" type="primary">找回密码</el-link>
                    <el-link v-if="isVerificationCodeLogin" @click="passwordLogin" class="fr retrieve-password" type="primary">密码登录</el-link>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="loginBtn('form')">登录</el-button>
                </el-form-item>

            </div>
        </el-form>
    </div>
    </template>

<script>
    export default {
        name: "Login",
        data() {
            var checkStatus = (rule, value, callback) => {
                console.log(value);
                if (!value) {
                    return callback(new Error("请拖动滑块完成验证"));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    name: '',
                    password: '',
                    verifyCode: '',
                    loginStatus: false
                },

                rules: {
                    name: [
                        { required: true, message: '输入手机号/邮箱', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '输入密码', trigger: 'blur' }
                    ],
                    verifyCode: [
                        { required: true, message: '验证码', trigger: 'blur' }
                    ],
                },

                isPassword: true,

                show: false,
                count: '',

                isVerificationCodeLogin: false,//是否验证码登录
                
                status: [{ validator: checkStatus, trigger: "change" }]
            };
        },
        methods: {
            onMpanelSuccess() {

            },
            onMpanelError() {

            },
            changeType() {
                this.isPassword = !this.isPassword;
            },
            //验证码登录
            verificationCodeLogin() {
                this.isVerificationCodeLogin = true;
            },
            //密码登录
            passwordLogin() {
                this.isVerificationCodeLogin = false;
            },
            //获取验证码
            getCode(){
                const TIME_COUNT = 60;
                if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = true;
                this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                    } else {
                        this.show = false;
                        clearInterval(this.timer);
                        this.timer = null;
                        }
                    }, 1000)
                }
            },
            loginBtn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({
                            path: '/roleManage'
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            register() {
                this.$router.push({
                    path: '/register'
                });
            }
        },
    };
</script>

<style scoped>
    .login-box {
        width: 100%;
        height: 100%;

        position: relative;
    }
    .form-box {
        width: 427px;
        padding: 35px;
        box-sizing: border-box;

        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);

        text-align: center;
    }
    .logo {
        width: 98px;
	    height: 98px;
        margin-bottom: 20px;
    }
    .form-head {
        margin-bottom: 32px;
        justify-content: space-between;
    }
    .form-head h2 {
        font-size: 24px;
        font-weight: normal;
        color: #000000;
        text-align: left;
    }

    .verifyCode-box span {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);

        display: inline-block;
        padding: 0 28px 0 10px;
        border-left: 1px solid #DCDFE6;
        font-size: 14px;
        line-height: 20px;
        color: #000000;
        cursor: pointer;
    }
    .verifyCode-box span:hover {
        color: #66b1ff;
    }
    .retrieve-password {
        line-height: 19px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
    }
    .password-icon {
        color: #b4bcc7;
        font-size: 14px;
        cursor: pointer;

        position: absolute;
        top: 50%;
        right: 15px;
        transform: translateY(-50%);
    }
    .login-btn {
        width: 100%;
    }
    .other-login-way {
        margin-top: 55px;
    }
    .other-login-way >>> .el-divider__text {
        font-size: 14px;
        color: #011c30;
    }
    .other-login-way-wrapper {
        justify-content: center;
        margin-top: 40px;
    }

    .other-way {
        cursor: pointer;
    }
    .other-way:first-child {
        margin-right: 60px;
    }
    
    
    .other-way .icon {
        display: block;
        font-size: 32px;
        margin: 0 auto 8px auto;
    }
    .other-way span {
        display: block;
        font-size: 14px;
        line-height: 20px;
        color: #bfbfbf;
    }
</style>
