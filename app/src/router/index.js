import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// 引入路由信息
import routes from "./routes"

import store from "@/store"

// 先将VueRouter原型对象的 push 和 replace 保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写 push 和 replace
// push需要传参，第一个参数：跳转的路径
// 第二个参数：成功的回调
// 第三个回调：失败的回调
// 因为push返回的是一个promise对象，所以需要传成功、失败的回调函数
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve && reject){
        // 使用 call 方法是为了保证push的上下文是VueRouter类的实例
        originPush.call(this,location,resolve,reject)
    }else{
        // 如果没有传回调函数，手动传入两个回调即可治本
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.repalce = function(location,resolve,reject){
    if(resolve && reject){
        // 使用 call 方法是为了保证push的上下文是VueRouter类的实例
        originReplace.call(this,location,resolve,reject)
    }else{
        // 如果没有传回调函数，手动传入两个回调即可治本
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
const router = new VueRouter({
    mode:"hash",
    // mode:"history",
    routes,
    // 滚动行为
    scrollBehavior(to,from){
        // 返回值的y，代表着滚动条位于上方
        return {y:0}
    }
})

// 全局前置路由守卫
router.beforeEach(async (to,from,next) => {
    // to: 将要跳转到的路由信息
    // from：从哪个路由来的信息
    // next()：放行函数  next() :直接放行    next(path):放行到执行的路由    next(false):中断当前导航

    // 是否登录（是否有token）
    // 用户已经登录
    if(store.state.user.token){
        if(to.path === "/login" || to.path === "/register"){
            next("/")
        }else{
            // 用户登录信息是否为空对象
            if(Object.keys(store.state.user.userInfo).length === 0){
                try {
                    await store.dispatch("user/userInfo");
                    // 获取到了信息再放行
                    next();
                } catch (error) {
                    // token失效：需要清除用户信息，然后重新登录
                    await store.dispatch("user/userLogout")
                    next("/login")
                }
            }else{
                next();
            }
        }

        

    }else{
        // 用户未登录
        // 不能去交易相关、支付相关、个人中心
        if(to.path == "/pay" || to.path == "/paysuccess" || to.path.indexOf("/center") != -1 || to.path == "/trade"){
            // 登录后跳转到之前点击的页面
            next("/login?redirect=" + to.path);
        }else{
            next();
        }
    }
    // next();
})

// 全局后置路由守卫
router.afterEach((to,from,next) => {

})

export default router;