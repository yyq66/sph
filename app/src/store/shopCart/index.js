import { reqCartList, reqDeleteCart } from "@/api";
import { reqCheckCart } from "@/api";

const actions = {
    // 获取购物车数据
    async getShopCart({commit}){
        let result = await reqCartList();
        // console.log("获取了购物车信息",result.data)
        if(result.code === 200){
            commit("GETSHOPCART",result.data);
        }
    },
    
    // 修改购物车中的选中状态
    async checkCart({commit},{skuId,isChecked}){
        let result = await reqCheckCart(skuId,isChecked);
        // console.log("向服务器发送了修改购物车的选中状态的请求");
        if(result.code === 200){
            return "ok"
        }else{
            return Promise.reject(new Error("修改失败~"))
        }
    },

    // 修改全选状态
    allChecked({dispatch,getters},isChecked){
        let promiseArr = [];
        // console.log(isChecked)
        isChecked = isChecked ? "1" : "0";
        getters.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked !== isChecked){
                var promise = dispatch("checkCart",{skuId:item.skuId,isChecked:isChecked})
            }
            // 将每一次修改产品状态返回的Promise添加到数组中
            promiseArr.push(promise);
        });
        return Promise.all(promiseArr);
    },
    
    // 删除购物车中的某一个产品
    async deleteCartByskuId({commit},skuId){
        let result = await reqDeleteCart(skuId);
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("删除失败~"))
        }
    },
    
    // 删除全部选中的产品
    deleteAllCheckedCart(context){
        let promiseArr = [];
        context.getters.shopCartList.cartInfoList.forEach(item => {
            if(item.isChecked === 1){
                let promise = context.dispatch("deleteCartByskuId",item.skuId)
                // 将每一次删除产品返回的Promise添加到数组中
                promiseArr.push(promise);
            }
        });
        // 如果promiseArr中的所有Promise都返回成功，则Promise.all()也返回成功，如果有一个失败，则返回失败
        return Promise.all(promiseArr);

    },

};
const mutations = {
    GETSHOPCART(state,shopCartList){
        // console.log(shopCartList)
        state.shopCartList = shopCartList
    }
};
const state = {
    shopCartList:[],
};
const getters = {
    shopCartList(state){
        return state.shopCartList[0] || {}
    },
};

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}