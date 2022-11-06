<template>
    <div class="cart">
        <h4>全部商品</h4>
        <div class="cart-main">
            <div class="cart-th">
                <div class="cart-th1">全部</div>
                <div class="cart-th2">商品</div>
                <div class="cart-th3">单价（元）</div>
                <div class="cart-th4">数量</div>
                <div class="cart-th5">小计（元）</div>
                <div class="cart-th6">操作</div>
            </div>
            <div class="cart-body">
                <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
                    <li class="cart-list-con1">
                        <input type="checkbox" name="chk_list" :checked="cart.isChecked" @change="updateChecked(cart.skuId,$event)">
                    </li>
                    <li class="cart-list-con2">
                        <img :src="cart.imgUrl">
                        <div class="item-msg">{{cart.skuName}}</div>
                    </li>
                    <li class="cart-list-con4">
                        <span class="price">{{cart.skuPrice}}.00</span>
                    </li>
                    <li class="cart-list-con5">
                        <a class="mins" @click="handler('mins',-1,cart)">-</a>
                        <input autocomplete="off" type="text" :value="cart.skuNum" minnum="1" class="itxt" @change="handler('change',$event.target.value*1,cart)">
                        <a class="plus" @click="handler('plus',+1,cart)">+</a>
                    </li>
                    <li class="cart-list-con6">
                        <span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
                    </li>
                    <li class="cart-list-con7">
                        <a class="sindelet" @click="deleteCartById(cart.skuId)">删除</a>
                        <br>
                        <a>移到收藏</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-tool">
            <div class="select-all">
                <input class="chooseAll" type="checkbox" :checked="isAllCheck&&cartInfoList.length!=0" @change="allChecked">
                <span>全选</span>
            </div>
            <div class="option">
                <a @click="deleteAll">删除选中的商品</a>
                <a href="#none">移到我的关注</a>
                <a href="#none">清除下柜商品</a>
            </div>
            <div class="money-box">
                <div class="chosed">已选择
                    <span>{{sumType}}</span>件商品
                </div>
                <div class="sumprice">
                    <em>总价（不含运费） ：</em>
                    <i class="summoney">{{totalPrice}}</i>
                </div>
                <div class="sumbtn">
                    <router-link class="sum-btn" to="/trade">结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import {debounce} from "lodash";
import {throttle} from "lodash";
export default {
    name: 'ShopCart',
    data(){
        return {

        }
    },

    methods:{
        getData(){
            this.$store.dispatch("shopCart/getShopCart");
        },
        // 修改商品的选中状态 (防抖)
        updateChecked:debounce(async function(skuId,event){
            let isChecked;
            if(event.target.checked === true){
                isChecked = "1"
            }else{
                isChecked = "0"
            }
            try {
                await this.$store.dispatch("shopCart/checkCart",{skuId:skuId,isChecked:isChecked})
                this.getData()
            } catch (error) {
                console.log(error)
            }
        },50),
        
        // 修改产品数量 （节流）
        // type：区分加、减、输入框
        // disNum：变化量（输入框中的并不是变化量，而是最终值）
        // cart：产品信息
        handler:throttle(async function(type,disNum,cart){
            switch(type){
                case 'mins':
                    // 产品个数大于1，传给服务器-1，否则为0
                    disNum = cart.skuNum > 1 ? -1 : 0;
                    break;
                case 'plus':
                    disNum = disNum;
                    break;
                case 'change':
                    // let reg = /^1-9]\d*$/;
                    if(isNaN(disNum) || disNum < 1){
                        disNum = 0;
                    }else{
                        disNum = parseInt(disNum)-cart.skuNum
                    }
                    
            }
            try{
                await this.$store.dispatch("detail/addOrUpdateShopCart",{skuId:cart.skuId,skuNum:disNum})

                this.getData();
            }catch(e){
                console.log(e.message)
            }
        },1000),

        // 通过skuId删除某一产品
        async deleteCartById(skuId){
            try {
                await this.$store.dispatch("shopCart/deleteCartByskuId",skuId);
                this.getData();
            } catch (error) {
                console.log(error)
            }
        },

        // 全选框值的修改
        async allChecked(event){
            try {
                await this.$store.dispatch("shopCart/allChecked",event.target.checked);
                this.getData();
            } catch (error) {
                console.log(error.message)
            }
            /* try {
                if(event.target.checked){
                    this.cartInfoList.forEach(async (item)=>{
                        let result = await this.$store.dispatch("shopCart/checkCart",{skuId:item.skuId,isChecked:1})
                        this.getData();
                    })
                }else{
                    this.cartInfoList.forEach(async (item)=>{
                        await this.$store.dispatch("shopCart/checkCart",{skuId:item.skuId,isChecked:0})
                        this.getData();

                    })
                }
            } catch (error) {
                console.log(error)
            } */
            
        },

        // 删除选中的全部产品
        async deleteAll(){
            try {
                await this.$store.dispatch("shopCart/deleteAllCheckedCart")
                this.getData();
            } catch (error) {
                console.log(error)
            }
        }
    },
    computed:{
        ...mapGetters("shopCart",["shopCartList"]),
        cartInfoList(){
            return this.shopCartList.cartInfoList || []
        },
        // 购物车中选中商品的数量
        sumType(){
            let sum = 0;
            this.cartInfoList.forEach(item => {
                if(item.isChecked === 1){
                    sum++;
                }
            });
            return sum
        },
        // 购物车中选中商品的总价
        totalPrice(){
            let sum = 0;
            this.cartInfoList.forEach(item => {
                if(item.isChecked === 1){
                    sum += item.skuPrice * item.skuNum
                }
            });
            return sum
        },
        // 底部的全选框是否勾选
        isAllCheck(){
            // 只要有一个不等于1，则返回false，全都等于1，则返回true
            return this.cartInfoList.every((item)=>{
                return item.isChecked == 1
            })
        }
    },


    mounted(){
        this.getData();
    },
}
</script>

<style lang="less" scoped>
.cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
    }

    .cart-main {
        .cart-th {
            background: #f5f5f5;
            border: 1px solid #ddd;
            padding: 10px;
            overflow: hidden;

            & > div {
                float: left;
            }

            .cart-th1 {
                width: 25%;

                input {
                    vertical-align: middle;
                }

                span {
                    vertical-align: middle;
                }
            }

            .cart-th2 {
                width: 25%;
            }

            .cart-th3,
            .cart-th4,
            .cart-th5,
            .cart-th6 {
                width: 12.5%;
            }
        }

        .cart-body {
            margin: 15px 0;
            border: 1px solid #ddd;

            .cart-list {
                padding: 10px;
                border-bottom: 1px solid #ddd;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;


                & > li {
                    float: left;
                }

                .cart-list-con1 {
                    width: 15%;
                }

                .cart-list-con2 {
                    width: 35%;
                    position: relative;

                    img {
                        width: 82px;
                        height: 82px;
                        float: left;
                    }

                    .item-msg {
                        position:absolute;
                        // float: left;
                        width: 150px;
                        left: 82px;
                        top: 50%;
                        transform: translateY(-50%);
                        margin: 0 10px;
                        line-height: 18px;
                    }
                }

                /* .cart-list-con3 {
                    width: 20.8333%;

                    .item-txt {
                        text-align: center;
                    }
                } */

                .cart-list-con4 {
                    width: 12.5%;
                }

                .cart-list-con5 {
                    width: 12.5%;

                    .mins {
                        border: 1px solid #ddd;
                        border-right: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }

                    input {
                        border: 1px solid #ddd;
                        width: 40px;
                        height: 33px;
                        float: left;
                        text-align: center;
                        font-size: 14px;
                    }

                    .plus {
                        border: 1px solid #ddd;
                        border-left: 0;
                        float: left;
                        color: #666;
                        width: 6px;
                        text-align: center;
                        padding: 8px;
                    }
                }

                .cart-list-con6 {
                    width: 12.5%;

                    .sum {
                        font-size: 16px;
                    }
                }

                .cart-list-con7 {
                    width: 12.5%;

                    a {
                        color: #666;
                    }
                }
            }
        }
    }

    .cart-tool {
        overflow: hidden;
        border: 1px solid #ddd;

        .select-all {
            padding: 10px;
            overflow: hidden;
            float: left;

            span {
                vertical-align: middle;
            }

            input {
                vertical-align: middle;
            }
        }

        .option {
            padding: 10px;
            overflow: hidden;
            float: left;

            a {
                float: left;
                padding: 0 10px;
                color: #666;
            }
        }

        .money-box {
            float: right;

            .chosed {
                line-height: 26px;
                float: left;
                padding: 0 10px;
            }

            .sumprice {
                width: 200px;
                line-height: 22px;
                float: left;
                padding: 0 10px;

                .summoney {
                    color: #c81623;
                    font-size: 16px;
                }
            }

            .sumbtn {
                float: right;

                a {
                    display: block;
                    position: relative;
                    width: 96px;
                    height: 52px;
                    line-height: 52px;
                    color: #fff;
                    text-align: center;
                    font-size: 18px;
                    font-family: "Microsoft YaHei";
                    background: #e1251b;
                    overflow: hidden;
                }
            }
        }
    }
}
</style>