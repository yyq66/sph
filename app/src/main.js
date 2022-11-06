import Vue from 'vue'
import App from './App.vue'

// 三级联动组件----全局组件
// 引入三级菜单组件、轮播图组件、分页器全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel"
import Pagination from "@/components/Pagination"
// 注册为全局组件
// 第一个参数：全局组件的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination)

import {Button,MessageBox} from "element-ui";
Vue.component(Button.name,Button);
// Element注册组件时还可以挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入路由
import router from "@/router"

// 引入仓库
import store from "@/store"

// 引入mockServe.js---mock数据
import "@/mock/mockServe"
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一引入
// 统一引入api文件夹里全部的请求函数
import * as API from '@/api'

import lazyloadImg from "@/assets/images/1.gif"


// 引入图片懒加载插件
import VueLazyload from "vue-lazyload"
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading:lazyloadImg
});

// 引入表单验证插件
import "@/plugins/validate"


Vue.config.productionTip = false

window.app = new Vue({
  render: h => h(App),
  // 注册路由
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$router,$route属性
  router,
  // 注册仓库：组件实例的身上会多一个$store属性
  store,
  // 全局事件总线 $bus
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  }
}).$mount('#app')
