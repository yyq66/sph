<template>
    <div class="floor">
        <div class="py-container">
            <div class="title clearfix">
                <h3 class="fl">{{list.name}}</h3>
                <div class="fr">
                    <ul class="nav-tabs clearfix">
                        <li class="active" v-for="nav,index in list.navList" :key='index'>
                            <a :href="nav.url" data-toggle="tab">{{nav.text}}</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-content">
                <div class="tab-pane">
                    <div class="floor-1">
                        <div class="blockgary">
                            <ul class="jd-list">
                                <li v-for='keyword,index in list.keywords' :key="index">{{keyword}}</li>
                            </ul>
                            <img :src="list.imgUrl" />
                        </div>
                        <!-- 轮播图 -->
                        <div class="floorBanner">
                            <Carousel :dataList="list.carouselList"/>
                            
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit" v-for='img,index in list.recommendList.slice(0,2)' :key="index">
                                <img :src="img" />
                            </div>
                        </div>
                        <div class="split center">
                            <img :src="list.bigImg" />
                        </div>
                        <div class="split">
                            <span class="floor-x-line"></span>
                            <div class="floor-conver-pit" v-for='img,index in list.recommendList.slice(2,4)' :key="index">
                                <img :src="img" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    // import Swiper from "swiper"
    export default {
        name:"Floor",
        props:["list"],
        methods:{
            
        },
        mounted(){
            // console.log("floor")
            
        },
        // 通过watch 实例Swiper 是为了和 ListContainer 组件中保持一致，方便将轮播图swiper拆分为组件
        /* watch:{
            list:{
                // 不管数据有无变化，立即执行一次handler函数
                // 是在created钩子前执行，所以页面中还没有结构，需要借助$nextTick钩子，在dom更新后执行
                immediate:true,
                handler(){
                    this.$nextTick(() => {
                        var mySwiper = new Swiper(this.$refs.floor1Swiper,{
                            autoplay:{
                                delay:2000,
                                disableOnInteraction:false,
                            },
                            loop:true,
                            // 分页器
                            pagination:{
                                el:".swiper-pagination",
                                checkable:true,
                            },
                            // 前进后退按钮
                            navigation:{
                                nextEl:".swiper-button-next",
                                prevEl:".swiper-button-prev"
                            },

                            // 滚动条
                            scrollbar:{
                                el:".swiper-scrollbar"
                            }

                        })
                    })
                }
            }
        } */
        
        
    }
</script>

<style scoped lang="less">
    .floor {
        margin-top: 15px;

        .py-container {
            width: 1200px;
            margin: 0 auto;

            .title {
                .fl {
                    float: left;
                    color: #c81623;
                    font-size: 20px;
                    line-height: 30px;
                    margin: 9px 0;
                    font-weight: 700;
                }

                .fr {
                    float: right;

                    .nav-tabs {
                        margin: 10px 0 0;
                        display: inline-block;

                        li {
                            float: left;
                            line-height: 18px;

                            a {
                                padding-top: 1px;
                                font-weight: 400;
                                background-color: #fff;

                                &::after {
                                    content: "|";
                                    padding: 0 10px;
                                }
                            }

                            &:nth-child(7) {
                                a {
                                    &::after {
                                        content: "";
                                    }
                                }
                            }

                            &.active {
                                a {
                                    color: #e1251b;
                                }
                            }
                        }
                    }
                }
            }

            .tab-content {
                border-top: 2px solid #c81623;
                border-bottom: 1px solid #e4e4e4;

                .tab-pane {
                    .floor-1 {
                        height: 360px;
                        display: flex;

                        .blockgary {
                            width: 210px;
                            height: 100%;
                            background: #f7f7f7;

                            .jd-list {
                                padding: 15px 0;
                                overflow: hidden;

                                li {
                                    list-style-type: none;
                                    float: left;
                                    width: 40%;
                                    margin: 0 10px;
                                    border-bottom: 1px solid #e4e4e4;
                                    text-align: center;
                                    line-height: 26px;
                                }
                            }

                            img {
                                width: 100%;
                            }
                        }

                        .floorBanner {
                            width: 330px;
                            height: 100%;
                        }

                        .split {
                            width: 220px;
                            height: 100%;
                            position: relative;

                            .floor-x-line {
                                position: absolute;
                                background: #e4e4e4;
                                width: 220px;
                                height: 1px;
                                top: 180px;
                            }

                            .floor-conver-pit {
                                width: 100%;
                                height: 50%;

                                img {
                                    width: 100%;
                                    height: 100%;
                                    transition: all 400ms;

                                    &:hover {
                                        opacity: 0.8;
                                    }
                                }
                            }
                        }

                        .center {
                            border: 1px solid #e4e4e4;
                        }
                    }
                }
            }
        }
    }
</style>