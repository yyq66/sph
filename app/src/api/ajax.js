// 对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nprogress from "nprogress"
// 引入进度条的样式（进度条插件中自带的样式）
import "nprogress/nprogress.css";
// nprogress 是一个对象
// start:进度条开始  done:进度条结束

// 在当前模块中引入store仓库
import store from "@/store"

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    
    // 配置对象
    // 基础路径：在发送请求的时候，路径上都会带上 /api
    // baseURL:"/api",
    baseURL:process.env.NODE_ENV === 'production' ? 'http://gmall-h5-api.atguigu.cn/api' : '/api',
    // 代表请求超时的时间为 5s，超时即为失败
    timeout:5000,
})


// 请求拦截器:在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config：配置对象，对象里有一个属性很重要：headers请求头
    if(store.state.detail.uuid_token){
        // 请求头添加一个字段（userTempId），跟后台商量好的名字
        config.headers.userTempId = store.state.detail.uuid_token
    }
    // 获取用户登录信息（需要带token给服务器）
    if(store.state.user.token){
        config.headers.token = store.state.user.token;
    }
    // 进度条开始动
    nprogress.start();
    return config;
})

// 响应拦截器
requests.interceptors.response.use(
    (response)=>{
        // 进度条结束
        nprogress.done();
        return response.data
    },
    (error)=>{
        // 响应失败的回调函数
        return Promise.reject(new Error("请求失败！"))
    }
)

// 对外暴露
export default requests;
