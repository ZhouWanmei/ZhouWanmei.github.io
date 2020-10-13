<template>
    <div class="login-box">
        
        <el-form ref="form" :model="form" :rules="rules" class="form-box">
            <img class="logo" src="../assets/logo.png" alt="">

            <div class="form-head flex-display">
                <h2>注册</h2>
                <span>
                    我有账号 <el-link type="primary" @click="login">去登陆</el-link>
                </span>
            </div>
            <div>
                <el-form-item prop="name">
                    <el-input v-model="form.name" placeholder="输入手机号/邮箱"></el-input>
                </el-form-item>
                <el-form-item style="position: relative;" prop="password1">
                    <el-input :type="isPassword1 ? 'password' : 'text'" v-model="form.password1" placeholder="输入密码"></el-input>
                    <i class="iconfont password-icon" @click="changeType1" :class="isPassword1 ? 'biyanjing' : 'zhengyanicon'"></i>
                </el-form-item>
                <el-form-item style="position: relative;" prop="password2">
                    <el-input :type="isPassword2 ? 'password' : 'text'" v-model="form.password2" placeholder="再次输入密码"></el-input>
                    <i class="iconfont password-icon" @click="changeType2" :class="isPassword2 ? 'biyanjing' : 'zhengyanicon'"></i>
                </el-form-item>
                <el-form-item prop="verifyCode" class="verifyCodeItemCss">
                    <el-input class="verify_css" placeholder="请输入4位验证码" v-model="form.verifyCode"></el-input>
                    <div id="v_container"></div>
                </el-form-item>
                
                <el-form-item>
                    <el-button class="login-btn" type="primary" @click="registerBtn('form')">注册</el-button>
                </el-form-item>

                <el-form-item class="login-status-box">
                    <el-checkbox v-model="form.loginStatus">同意</el-checkbox>
                    <el-link type="info" :underline="false">用户协议及隐私政策</el-link>
                </el-form-item>

            </div>
        </el-form>
    </div>
    </template>

<script>
    import { GVerify } from '../../static/js/verifyCode';
    export default {
        name: "Register",
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
                    password1: '',
                    password2: '',
                    verifyCode: '',
                    loginStatus: false
                },

                rules: {
                    name: [
                        { required: true, message: '输入手机号/邮箱', trigger: 'blur' }
                    ],
                    password1: [
                        { required: true, message: '输入密码', trigger: 'blur' }
                    ],
                    password2: [
                        { required: true, message: '输入确认密码', trigger: 'blur' }
                    ],
                    verifyCode: [
                        { required: true, message: '验证码', trigger: 'blur' }
                    ],
                },
                
                isPassword1: true,
                isPassword2: true,

                show: false,
                count: '',

                status: [{ validator: checkStatus, trigger: "change" }]
            };
        },
        mounted () {
            this.verifyCode = new GVerify('v_container')
        },
        methods: {
            onMpanelSuccess() {

            },
            onMpanelError() {

            },
            changeType1() {
                this.isPassword1 = !this.isPassword1;
            },
            changeType2() {
                this.isPassword2 = !this.isPassword2;
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
            registerBtn(formName) {
                var that = this
 
                // 获取验证码
                var verifyCode = this.form.verifyCode
                var verifyFlag = this.verifyCode.validate(verifyCode)
                if (!verifyFlag) {
                    that.$notify.error({
                        title: '系统提示',
                        message: '验证码输入错误'
                    })
                    return;
                } else {
                    that.$notify({
                        title: '系统提示',
                        message: '验证码输入正确',
                        type: 'success'
                    })
                }
 
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
            login() {
                this.$router.push({
                    path: '/'
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
    .retrieve-password {
        line-height: 19px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
    }

    .verify_css {
        width: 53%;
    }
    #v_container {
        width: 160px;
        height: 40px;
        display: inline-flex;
        position: relative;
        top: 1rem;
        margin-top: -2rem;
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
</style>
