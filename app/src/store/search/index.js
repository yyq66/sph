import { reqSearchInfo } from "@/api/index"
export default {
    namespaced:true,
    actions:{
        // params 用默认参数，如果传参则使用传递来的参数，如果没有传参，则使用默认值
        async getSearchInfo({commit},params={}){
            // 当前这个reqSearchInfo函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
            let result = await reqSearchInfo(params);
            if(result.code === 200){
                // console.log(result)
                
                commit("GETSEARCHINFO",result.data)
            }
        }
    },
    mutations:{
        GETSEARCHINFO(state,searchInfo){
            state.searchInfo = searchInfo;
        }
    },
    state:{
        searchInfo:{},
    },
    // 简化仓库中的数据
    getters:{
        // 形参state是当前仓库中的state
        goodsList(state){
            return state.searchInfo.goodsList || []
        },
        attrsList(state){
            return state.searchInfo.attrsList || []
        },
        trademarkList(state){
            return state.searchInfo.trademarkList || []
        },
        
    }
}