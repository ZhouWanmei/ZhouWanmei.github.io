<template>
    <div class="clearFix" :class="{'orderItem':isOrder,'payItem':isPay}">
         <img class="fl" :src="order.mangoImg" :alt="order.mangoName">
        <section class="other-infos fr">
            <p class="name">{{order.mangoName}}</p>
            <p class="standard">规格：<span class="standardItem">{{order.standard}}</span></p>
            <p class="number-price clearFix">
                <span class="number fl">x{{order.buyNumber}}</span>
                <span class="total-price fr">￥：<span>{{order.unitPrice * order.buyNumber}}</span></span>
            </p>
        </section>
    </div>
</template>

<script>
export default {
    name: "orderItem",
    props: ["order","isOrder","isPay"],
    data() {
        return {
            
        }
    },
    mounted() {
        let acountTotalPrice = 0;
        $('.total-price span').each((index,item) => {
        acountTotalPrice = acountTotalPrice + Number($(item).text());
        });
        $('.account-total').text(acountTotalPrice.toFixed(2))
    },
}
</script>

<style lang="less" scoped>
img {
        border-radius: 50%;
    }
    section{
        display: inline-block;
    }
    .other-infos {
        .standard {
            margin: 8px 0;
        }

    }
    // 价格
    .total-price {
        color: #f00;
    }
.orderItem {
    img {
        width: 25%;
        margin-left: 40px;
    }
    section{
        width: calc(100% - 40%);
    }
    .other-infos {
        .name {
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: normal;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }

    }
}

.payItem {
    img {
        width: 25%;
    }
    section{
        width: calc(100% - 30%);
    }
    .other-infos {
        .name {
            // overflow: hidden;
            // text-overflow: ellipsis;
            // white-space: normal;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

    }
}
</style>

