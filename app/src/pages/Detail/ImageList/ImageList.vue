<template>
    <div class="swiper-container" ref="mySwiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(img,index) in imgList" :key="img.id">
                <img :src="img.imgUrl" :class="{active:currentIndex === index}" @click="changeCurrentIndex(index,img.imgUrl)">
            </div>
        </div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>

import Swiper from 'swiper'
export default {
    name: "ImageList",
    props: ["imgList"],
    data(){
        return {
            currentIndex:0,

        }
    },
    watch: {
        // 监听数据：可以保证数据一定拥有，但是不能保证v-for遍历结构是否完整
        imgList: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    new Swiper(this.$refs.mySwiper, {
                        slidesPerView:3,   // 设置slider容器能够同时显示的slides数量(carousel模式)
                        // 在carousel mode(轮播模式)下定义slides的数量多少为一组。
                        // 也就是每次切换图片的数量
                        slidesPerGroup:1, 

                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev',
                        },

                    })
                })

            }
        }
    },
    methods:{
        changeCurrentIndex(index){
            this.currentIndex = index;
            this.$bus.$emit("changeUrl",index)
        }
    }
}
</script>

<style lang="less" scoped>
.swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
        width: 56px;
        height: 56px;

        img {
            width: 100%;
            height: 100%;
            border: 1px solid #ccc;
            padding: 2px;
            width: 50px;
            height: 50px;
            display: block;

            &.active {
                border: 2px solid #f60;
                padding: 1px;
            }

            /* &:hover {
                border: 2px solid #f60;
                padding: 1px;
            } */
        }
    }

    .swiper-button-next {
        left: auto;
        right: 0;
    }

    .swiper-button-prev {
        left: 0;
        right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
        box-sizing: border-box;
        width: 12px;
        height: 56px;
        background: rgb(235, 235, 235);
        border: 1px solid rgb(204, 204, 204);
        top: 0;
        margin-top: 0;
        &::after {
            font-size: 12px;
        }
    }
}
</style>