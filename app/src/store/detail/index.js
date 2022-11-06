import { reqDetail } from "@/api/index";
import {addToCart} from "@/api"
import { getUUID } from "@/utils/uuid_token";



const actions = {
    // 获取产品的详细信息
    async getDetail({commit},id){
        let result = await reqDetail(id)
        console.log("产品详细信息",result);
        if(result.code === 200){
            commit("GETDETAIL",result.data);
        }
    },

    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await addToCart(skuId,skuNum);
        // console.log(result)
        // 当前这个函数如果执行，则返回的是Promise
        if(result.code === 200){
            // 返回成功的标记
            return "ok"
        }else{
            // 返回失败的标记
            return Promise.reject(new Error("添加或修改失败~"))
        }
    },
};

const mutations = {
    GETDETAIL(state,detailData){
        state.detailData = detailData;
    },
};

const state = {
    detailData:{},
    uuid_token:getUUID(),
};

const getters = {
    valuesSkuJson(state){
        return state.detailData.valuesSkuJson || {}
    },
    categoryView(state){
        return state.detailData.categoryView || {}
    },
    spuSaleAttrList(state){
        return state.detailData.spuSaleAttrList || {}
    },
    skuInfo(state){
        return state.detailData.skuInfo || {}
    },

};

export default{
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}