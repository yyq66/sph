import { reqBannerList, reqFloorList } from "@/api/index"
import { reqCategoryList } from "@/api/index"

export default {
    namespaced: true,
    actions: {
        category(context, value) {
            const pro = reqCategoryList()
            pro.then(
                (res) => {
                    // console.log(res.data)
                    context.commit("CATEGORY", res.data)
                }
            )
        },
        // 获取轮播图的数据
        async getBanner(context, value) {
            let result = await reqBannerList()
                // console.log(result)
                if(result.code === 200){
                    context.commit("GETBANNER", result.data)
                }
        },
        // 获取floor数据
        async getFloor({commit},value){
            let result = await reqFloorList();
            if(result.code === 200){
                // 提交mutation 
                commit("GETFLOOR",result.data);
                
            }
        }
    },

    mutations: {
        CATEGORY(state, categoryList) {
            state.categoryList = categoryList
        },
        GETBANNER(state, bannerList) {
            state.bannerList = bannerList;
        },
        GETFLOOR(state,floorList){
            // console.log("state中数据修改")
            state.floorList = floorList;
        }

    },

    state: {
        // state中的数据默认初始值别乱写，根据服务器返回的值的类型写
        categoryList: [],
        // 轮播图的数据
        bannerList: [],
        // floor组件的数据
        floorList:[],
    },

    getters: {

    },
}






/* export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
} */