<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in dataList" :key="item.id">
                <img :src="item.imgUrl"/>
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
    import Swiper from "swiper"
    export default {
        name:"Carousel",
        props:["dataList"],
        watch:{
            dataList:{
                immediate:true,
                handler(oldValue,newValue){
                    // 执行handler方法，代表组件实例身上已经有了bannerList属性
                    // 当前这个函数执行，只能保证bannerList数据已经有了，但是v-for是否已经执行结束无法判断
                    // 只有 v-for 执行完毕，页面中的结构才算完整，如果创建swiper实例是不能解决问题的
                    // $nextTick 将回调延迟到下次 DOM 更新 循环之后 执行。在 修改数据之后 立即使用它，然后等待 DOM 更新
                    this.$nextTick(() => {
                        // 当执行这个回调的时候：保证服务器中的数据已经返回了，且 v-for 也一定执行完毕了（页面中的结构完整了）
                        let mySwiper = new Swiper(this.$refs.mySwiper, {
                        
                            // direction: 'vertical', // 垂直切换选项
                            //mousewheel: true, //滚轮
                            autoplay: { //自动开始
                                delay: 2500, //时间间隔
                                disableOnInteraction: false, //*手动操作轮播图后不会暂停*
                            },
                            loop: true, // 循环模式选项
                    
                            // 如果需要分页器
                            pagination: {
                                el: '.swiper-pagination',
                                clickable: true, // 分页器可以点击
                            },
                    
                            // 如果需要前进后退按钮
                            navigation: {
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            },
                            
                            // 如果需要滚动条
                            scrollbar: {
                                el: '.swiper-scrollbar',
                            },
                        })
                    })
                    
                }
            }
        }
    }
</script>

<style>

</style>