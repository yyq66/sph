// 引入路由组件
// import Home from "@/pages/Home"

// 路由懒加载写法
const foo = () => {
    // 返回值是一个Promise
    return import("@/pages/Home")
}

// import Login from "@/pages/Login"
// import Register from "@/pages/Register"
// import Search from "@/pages/Search"
// import Detail from "@/pages/Detail"
// import AddCartSuccess from "@/pages/AddCartSuccess"
// import ShopCart from "@/pages/ShopCart"
// import Trade from "@/pages/Trade"
// import Pay from "@/pages/Pay"
// import PaySuccess from "@/pages/PaySuccess"
// import Center from "@/pages/Center"
// import MyOrder from "@/pages/Center/MyOrder"
// import TeamOrder from "@/pages/Center/TeamOrder"

export default [
    {
        path: "/home",
        // component: Home,
        component: foo,
        // 用于控制Footer组件是否显示
        meta: { show: true }
    },
    {
        path: "/login",
        // 路由懒加载
        component: () => import("@/pages/Login"),
        meta: {show: false}
    },
    {
        path: "/register",
        component: () => import("@/pages/Register"),
        meta: {show: false}
    },
    {
        path: "/search/:keyword?",
        name: "search",
        component: () => import("@/pages/Search"),
        meta: {
            show: true
        },
        // 路由组件能不能传递props数据?
        // 布尔值：
        // props:true,

        // 对象写法：额外的给路由组件传递一些props
        /* props:{
            a:100,
            b:200
        } */

        // 函数写法
        // props:function($route){
        //     return {
        //         keyword:$route.params.keyword,
        //         k:$route.query.k
        //     }
        // }
    },
    {
        path: "/detail/:skuId",
        name: "detail",
        component: () => import("@/pages/Detail"),
        meta: {show: true},
        props: function ($route) {
            return {
                skuId: $route.params.skuId
            }
        }

    },
    {
        path: "/addcartsuccess/:skuNum",
        name: "addcartsuccess",
        component: () => import("@/pages/AddCartSuccess"),
        meta: {show: true,}
    },
    {
        path: "/shopcart",
        component: () => import("@/pages/ShopCart"),
        meta: {show: true,}
    },
    {
        path: "/trade",
        component: () => import("@/pages/Trade"),
        meta: {show: true,},
        beforeEnter:(to,from,next)=>{
            // 去交易页面，必须是从购物车中跳转
            if(from.path === "/shopcart"){
                next()
            }else{
                // 其他路由组件而来的，则停留在当前
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: () => import("@/pages/Pay"),
        meta: {show: true,},
        beforeEnter:(to,from,next)=>{
            if(from.path === "/trade"){
                next();
            }{
                next(false);
            }
        }
    },
    {
        path: "/paysuccess",
        component: () => import("@/pages/PaySuccess"),
        meta: {show: true,},
    },
    {
        path: "/center",
        component: () => import("@/pages/Center"),
        meta: {show: true,},
        children:[
            {
                path:"myorder",
                component:() => import("@/pages/Center/MyOrder"),
            },
            {
                path:"teamorder",
                component:() => import("@/pages/Center/TeamOrder")
            },
            {
                path:"",
                redirect:"myorder"
            }
        ]
    },


    // 重定向，在项目跑起来的时候，访问 / 时，立马让他定向到首页
    {
        path: "/",
        // component:Home
        redirect: "/home"
    }
]