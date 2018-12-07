<template>
    <div class="address">
        <section class="mine-datas">
            <!-- 姓名 -->
            <section class="name">
                <label>姓名</label>
                <input type="text" placeholder="请填写你的真实姓名">
            </section>
            <!-- 联系电话 -->
            <section class="tel">
                <label>联系电话</label>
                <input type="tel" placeholder="请填写我们联系你的电话号码">
            </section>
            <!-- 邮政编码 -->
            <section class="postal-code">
                <label>邮政编码</label>
                <input type="text" placeholder="请填写你所在地区的邮政编码">
            </section>
            <!-- 地区 -->
            <section class="address">
                <!-- 省 -->
                <select name="province">
                    <option value="四川省" selected>四川省</option>
                    <option value="广东省">广东省</option>
                    <option value="广西省">广西省</option>
                    <option value="湖南省">湖南省</option>
                    <option value="河北省">河北省</option>
                </select>
                <!-- 市 -->
                <select name="city">
                    <option value="成都市" selected>成都市</option>
                    <option value="攀枝花市">攀枝花市</option>
                    <option value="宜宾市">宜宾市</option>
                    <option value="绵阳市">绵阳市</option>
                </select>
                <!-- 区 -->
                <select name="area">
                    <option value="金牛区" selected>金牛区</option>
                    <option value="武侯区">武侯区</option>
                    <option value="高新区">高新区</option>
                    <option value="锦江区">锦江区</option>
                    <option value="双流区">双流区</option>
                </select>
            </section>
            <!-- 详细地址 -->
            <section class="detail-address">
                <label>详细地址</label>
                <input type="text" placeholder="请填写详细的街道、楼栋、门牌号">
            </section>
            <!-- 确认地址 -->
            <Button :isSureAddress="true" :text="text"></Button>
        </section>
    </div>
</template>

<script>
// 导入按钮组件
import Button from '../../components/button'
export default {
    name: "Address",
    data() {
        return {
            text:"确认地址"
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

        select {
            width: 25%;
            margin-right: 5%;
        }
    }

}
</style>

