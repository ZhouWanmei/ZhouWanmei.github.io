<template>
    <div class="personal">
        <section class="mine-datas">
            <!-- 昵称 -->
            <section class="name">
                <label>昵称</label>
                <input type="text" value="芒果小妞">
            </section>
            <!-- 邮箱 -->
            <section class="email">
                <label>E-mail</label>
                <input type="email" placeholder="请填写你的安全邮箱">
            </section>
            <!-- 性别 -->
            <section class="gender">
                <label>性别</label>
                <section>
                    <label>男</label>
                    <label>女</label>
                    <label class="selected">保密</label>
                </section>
            </section>
            <!-- 生日 -->
            <section class="birthday">
                <label>生日</label>
                <input type="date">
            </section>
            <!-- 身份证号码 -->
            <section class="ID">
                <label>身份证号</label>
                <input type="text" placeholder="请输入你的18位身份证号码">
            </section>
            <!-- 个人描述 -->
            <section class="des">
                <label>个人描述</label>
                <textarea name="" id="" cols="30" rows="10">谈谈你对自己的认识</textarea>
            </section>
            <!-- 确认修改 -->
            <Button :isEdit="true" :text="text"></Button>
        </section>
    </div>
</template>

<script>
// 导入按钮组件
import Button from '../../components/button'
export default {
    name: "Personal",
    data() {
        return {
            text:"确认修改"
        }
    },
    components: {
        Button
    }
}
</script>

<style lang="less" scoped>


.mine-datas {
    text-align: left;
    section {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        box-sizing: border-box;
        border-bottom: 1px solid #999;
        background: #fff;

        label {
            display: inline-block;
            width: 20%;
            color: #999;
        }

        input {
            color: #333;
            height: 97%;
            width: calc(100% - 22%);
        }
    }

    .gender {
        section {
            display: inline-block;
            width: 192px;
            height: 29px;
            padding: 0;
            line-height: 29px;
            border: 1px solid #999;
            border-radius: 30px;
            label {
                width: 60px;
                height: 100%;
                text-align: center;
                &:nth-child(1){
                    border-top-left-radius: 30px;
                    border-bottom-left-radius: 30px;
                    border-right: 1px solid #999;
                }
                &:nth-child(3){
                    border-top-right-radius: 30px;
                    border-bottom-right-radius: 30px;
                }
            }

            .selected {
                background: #359A35;
                color: #fff;
            }
        }
    }

    .des {
        height: auto;

        label {
            vertical-align: top;
        }

        textarea {
            padding-top: 15px;
        }
    }
}


</style>

