// 当前这个模块：API进行统一管理
import requests from "./ajax"
import mockRequests from "./mockAjax"

// 三级联动的接口
// api/product/getBaseCategoryList  get请求  无参数

export const reqCategoryList = ()=>{
    
    // 发请求
    // 返回的是一个promise对象
    return requests({
        method:"get",
        url:"/product/getBaseCategoryList",
    })
}

// 获取 banner(Home首页轮播图接口)
export const reqBannerList = ()=>{
    
    // 发请求
    // 返回的是一个promise对象
    return mockRequests({
        method:"get",
        url:"/banner",
    })
}

// 获取 floor 数据
export const reqFloorList = ()=>{
    
    // 发请求
    // 返回的是一个promise对象
    return mockRequests({
        method:"get",
        url:"/floor",
    })
}

// 获取 goods搜索模块数据   地址：api/list  请求方式：post  需要带参数
// 当前这个函数需要接受外部传递的参数
// 当前这个接口（获取搜索模块的数据），需要给服务器传递一个默认参数（至少是一个空对象）
export const reqSearchInfo = (params)=>requests({
    method:"post",
    url:"/list",
    data:params
})

// 获取商品详情 Detail数据
export const reqDetail = (skuId)=>{
    return requests({
        method:"get",
        url:`/item/${skuId}`,
        // url:`/item`,
    })
}


// 将数据添加到购物车
export const addToCart = (skuId,skuNum) => {
    return requests({
        method:"post",
        url:`/cart/addToCart/${skuId}/${skuNum}`
    })
}

// 获取购物车数据
export const reqCartList = () => {
    return requests({
        method:"get",
        url:"/cart/cartList",
    })
}

// 修改购物车中商品的选中状态
export const reqCheckCart = (skuId,isChecked) => {
    return requests({
        method:"get",
        url:`/cart/checkCart/${skuId}/${isChecked}`
    })
}

// 删除购物车中的某一个商品
export const reqDeleteCart = (skuId) => {
    return requests({
        method:"delete",
        url:`/cart/deleteCart/${skuId}`
    })
}

// 获取注册时的验证码
export const reqRegisterCode = (phone) => {
    return requests({
        method:"get",
        url:`/user/passport/sendCode/${phone}`,
    })
}

// 用户注册
export const reqUserRegister = (params) => {
    return requests({
        method:"post",
        url:'/user/passport/register',
        data:params
    })
}

// 用户登录
export const reqUserLogin = (params) => {
    return requests({
        method:"post",
        url:"/user/passport/login",
        data:params
    })
}

// 获取用户登录信息
export const reqUserInfo = () => {
    return requests({
        method:"get",
        url:"/user/passport/auth/getUserInfo",
    })
}

// 退出登录
export const reqUserLogout = () => {
    return requests({
        method:"get",
        url:"/user/passport/logout",
    })
}

// 获取用户地址信息
export const reqUserAddress = () => {
    return requests({
        method:"get",
        url:"/user/userAddress/auth/findUserAddressList",
    })
}

// 获取交易页商品信息
export const reqOrderInfo = () => {
    return requests({
        method:"get",
        url:"/order/auth/trade",
    })
}

// 提交订单
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        method:"post",
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data:data,
    })
}

// 获取订单支付信息
export const reqPayInfo = (orderId) => {
    return requests({
        method:"get",
        url:`/payment/weixin/createNative/${orderId}`,
    })
}

// 获取订单支付是否成功的信息
export const reqPayStatus = (orderId) => {
    return requests({
        method:"get",
        url:`/payment/weixin/queryPayStatus/${orderId}`,
    })
}

// 获取我的订单列表
export const reqOrderList = (page,limit) => {
    return requests({
        method:"get",
        url:`/order/auth/${page}/${limit}`
    })
}