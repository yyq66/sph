/* 
    订单模块
*/

import { reqUserAddress,reqOrderInfo } from "@/api";

const actions = {

    // 获取用户地址信息
    async getUserAddress({commit}){
        let result = await reqUserAddress();
        console.log(result)
        if(result.code === 200){
            
            commit("USERADDRESS",result.data);
            return 'ok'
        }else{
            return Promise.reject(new Error("fail"))
        }
    },

    // 获取交易页信息
    async getOrderInfo({commit}){
        let result = await reqOrderInfo();
        console.log(result)
        if(result.code === 200){
            commit("ORDERINFO",result.data);
        }
    },


};
const mutations = {
    USERADDRESS(state,userAddress){
        state.userAddress = userAddress;
    },
    ORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo;
    }
};
const state = {
    userAddress:[],
    orderInfo:{}
};
const getters = {
    detailArrayList(state){
        return state.orderInfo.detailArrayList || []
    }
};
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}
