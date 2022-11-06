<template>
    <div class="type-nav">
        <div class="container">
            <!-- 事件委派|事件委托 -->
            <div @mouseleave="leaveIndex" @mouseenter="showNav">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <!-- 利用第三方Animate.css库实现动画效果 -->
                <!-- 
                    在transition中配置：
                        name="animate__animated animate__bounce" 
                        enter-active-class="animate__backInDown"
                        leave-active-class="animate__bounceOutUp"
                -->
                <transition>
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2">
                            <!-- 事件委派：将a标签的编程式导航写到就近的父元素身上 -->
                            <div
                                @click="goSearch"
                                class="item"
                                v-for="(c1, index) in categoryList.slice(0, 15)"
                                :key="c1.categoryId"
                                @mouseenter="changeIndex(index)"
                                :class="{ cur: currentIndex === index }"
                            >
                                <h3>
                                    <!-- 自定义属性 -->
                                    <a
                                        :data-categoryname="c1.categoryName"
                                        :data-category1id="c1.categoryId"
                                        >{{ c1.categoryName }}
                                    </a>
                                </h3>
                                <!-- 二级、三级 -->
                                <div
                                    class="item-list clearfix"
                                    :style="{
                                        display:
                                            currentIndex === index
                                                ? 'block'
                                                : 'none',
                                    }"
                                >
                                    <div class="subitem">
                                        <dl
                                            class="fore"
                                            v-for="c2 in c1.categoryChild"
                                            :key="c2.categoryId"
                                        >
                                            <dt>
                                                <a
                                                    :data-categoryname="c2.categoryName"
                                                    :data-category2id="c2.categoryId"
                                                    >{{ c2.categoryName }}</a
                                                >
                                            </dt>
                                            <dd>
                                                <em
                                                    v-for="c3 in c2.categoryChild"
                                                    :key="c3.categoryId"
                                                >
                                                    <a
                                                        :data-categoryname="c3.categoryName"
                                                        :data-category3id="c3.categoryId"
                                                        >{{c3.categoryName}}</a
                                                    >
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
// import {mapActions} from "vuex"
import { throttle } from "lodash";
import "animate.css";

export default {
    name: "TypeNav",
    data() {
        return {
            // 存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show: true,
        };
    },
    props: ["isSearch"],
    methods: {
        // 鼠标进入修改响应式数据
        // throttle回调函数别用箭头函数，会导致上下文this问题
        changeIndex: throttle(function (index) {
            // index ：鼠标移入某一个一级分类的元素的索引值
            // 正常情况下（用户慢慢操作）：鼠标进入，每一个一级分类h3都会触发鼠标进入事件
            // 非正常情况（用户操作很快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
            // 就是由于用户行为过快，导致浏览器反应不过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
            this.currentIndex = index;
            // console.log("鼠标进入" + index)
        }, 20),
        // 一级分类鼠标移出的事件回调
        leaveIndex() {
            this.currentIndex = -1;
            // 路径中含有/search，隐藏三级列表
            // if (this.$route.path.indexOf("/search") === 0) {
            // if (this.$route.path.indexOf("/search") === 0 || this.$route.path.indexOf("/detail") === 0) {
            if (this.$route.path != "/home") {
                this.show = false;
            }
        },
        // 进行路由跳转的方法
        goSearch(event) {
            // 最好的解决方案：编程式导航 + 事件委派
            /* 
                    利用事件委派存在一些问题：
                        1.点击的不一定是a标签（即点击其他标签也可以跳转）
                        2.如何获取参数（1,2,3级菜单产品的 name 和 id）

                    要求只有点击a标签时，才会进行路由跳转，
                        解决方案：通过给 a 标签添加自定义属性来确定是a标签
                                    参数也是通过自定义属性传递，区分一级、二级、三级分类的标签也是通过自定义属性完成
                
                */

            // 第一个问题：确定子节点中的 a 标签：添加上自定义属性data-categoryName，其余不是a标签的子节点没有自定义属性
            let element = event.target;
            // 节点中有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } =
                element.dataset;

            if (categoryname) {
                // 路由跳转的参数
                let location = { name: "search" };
                let query = { categoryName: categoryname };
                // 一级、二级、三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else if (category3id) {
                    query.category3Id = category3id;
                }
                // 当路由跳转的时候，如果带有params参数，则也同时传递params参数
                if (this.$route.params) {
                    location.params = this.$route.params;
                }
                // 整理完整参数
                location.query = query;
                // 路由跳转
                this.$router.push(location);
            }
        },

        //
        showNav() {
            this.show = true;
        },
    },
    // 组件挂载完毕：可以向服务器发送请求
    mounted() {
        // 通知Vuex发送请求，获取数据，存储在仓库中
        // console.log("TypeNav组件挂载了")
        this.show = this.$route.path != "/home" ? false : true;
    },
    computed: {
        // 采用命名空间的写法
        // ...mapState("home",["categoryList"]),

        // 函数写法：右侧需要一个函数，当时用这个计算属性的时候，函数会立即执行一次
        // 会注入一个参数 state，其实即为大仓库中的数据
        ...mapState({
            categoryList: (state) => {
                return state.home.categoryList;
            },
        }),
    },
};
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
                // text-decoration: none;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;
            //   overflow: hidden;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }

                .cur {
                    background-color: pink;
                }
            }
        }

        a {
            cursor: pointer;
        }

        // 过渡动画的样式
        // 过渡动画开始状态
        .v-enter {
            height: 0;
            // transform: rotate(0deg) scale(0.1);
        }
        .v-enter-to {
            height: 461px;
            // transform: rotate(360deg);
        }
        .v-enter-active {
            overflow: hidden;
            transition: all 0.5s linear;
        }
        .v-leave {
            height: 461px;
            // transform: rotate(0deg);
        }
        .v-leave-to {
            height: 0;
            // transform: rotate(360deg) scale(0.1);
        }
    }
}
</style>