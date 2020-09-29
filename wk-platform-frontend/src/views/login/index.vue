<template>
    <div  class="login-container">
        <el-form
            ref="form"
            :model="form"
            :rules="rules"
            class="login-form"
            label-position="left"
            >
           
            <el-button
                class="login-btn"
                type="primary"
                @click="handleLogin"
            >
                登录
            </el-button>
            <router-link to="/register">
                <div style="margin-top: 20px;">注册</div>
            </router-link>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            const validateusername = (rule, value, callback) => {
                if ("" == value) {
                callback(new Error("用户名不能为空"));
                } else {
                callback();
                }
            };
            const validatePassword = (rule, value, callback) => {
                if (!isPassword(value)) {
                callback(new Error("密码不能少于6位"));
                } else {
                callback();
                }
            };
            return {
                title: '后台管理系统',
                form: {
                    username: "",
                    password: "",
                    },
                    rules: {
                    username: [
                        {
                        required: true,
                        trigger: "blur",
                        validator: validateusername,
                        },
                    ],
                    password: [
                        {
                        required: true,
                        trigger: "blur",
                        validator: validatePassword,
                        },
                    ],
                },
                passwordType: "password",
            };
        },
        methods: {
            handleLogin() {
                this.$router.push('/roleManage');
            }
        }
    };
</script>

<style scoped>

</style>
