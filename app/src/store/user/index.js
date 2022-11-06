/* 
    登录与注册的模块
*/

import { reqRegisterCode,reqUserInfo,reqUserLogin,reqUserRegister,reqUserLogout, reqUserAddress } from "@/api";
import { getToken, setToken,removeToken } from "@/utils/token";


const actions = {
    // 注册时获取验证码
    async getRegisterCode({commit},phone){
        let result = await reqRegisterCode(phone);
        // console.log(result.data)
        if(result.code === 200){
            commit("GETCODE",result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error("发送验证码失败~"))
        }
    },

    // 用户注册
    async userRegister({commit},params){
        // console.log("aaa")
        let result = await reqUserRegister(params);
        // console.log(result);
        if(result.code === 200){
            return 'ok'
        }else{
            return Promise.reject(new Error("注册请求失败~"))
        }
    },

    // 用户登录
    async userLogin({commit},params){
        let result = await reqUserLogin(params);
        // console.log("登录返回的结果",result)
        if(result.code === 200){
            // 将token本地存储
            commit("USERLOGIN",result.data.token)
            setToken(result.data.token)
            return "ok"
        }else{
            return Promise.reject(new Error("fail"))
        }
    },

    // 获取用户的登录信息
    async userInfo({commit}){
        let result = await reqUserInfo();
        // console.log(result)
        if(result.code === 200){
            commit("USERINFO",result.data);
            return 'ok';
        }else{
            return Promise.reject(new Error("fail"))
        }
    },

    // 退出登录
    async userLogout({commit}){
        let result = await reqUserLogout();
        console.log("退出登录",result);
        if(result.code === 200){
            commit("CLEAR");
            return "ok"
        }else{
            return Promise.reject(new Error("fail"));
        }
    },

};
const mutations = {
    GETCODE(state,code){
        state.code = code;
    },
    USERLOGIN(state,token){
        state.token = token;
    },
    USERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    CLEAR(state){
        state.token = "";
        state.userInfo = {};
        removeToken()
    },
};
const state = {
    code:"",
    token:getToken(),
    userInfo:{},
};
const getters = {};
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters,
}
