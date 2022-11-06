<template>
    <div class="spec-preview">
        <img :src="imgObj.imgUrl" />
        <div class="event" @mousemove="handler"></div>
        <div class="big">
            <img :src="imgObj.imgUrl" ref="bigImg"/>
        </div>
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
import {throttle} from "lodash"
export default {
    name: "Zoom",
    props: {
        "imgList": {
            require: true,
            default: () => {
                return [{}]
            }
        }
    },
    data() {
        return {
            index:0
        }
    },

    methods: {
        // 使用了节流，每20ms内只能调用一个回调函数
        handler:throttle(function(event){
                // 修改元素的left和top属性值
                let left = event.offsetX-this.$refs.mask.offsetWidth/2;
                let top = event.offsetY-this.$refs.mask.offsetHeight/2;
                if(left <= 0){
                    left = 0
                }
                if(left >= this.$refs.mask.offsetWidth){
                    left = this.$refs.mask.offsetWidth;
                }
                if(top <= 0){
                    top = 0
                }
                if(top >= this.$refs.mask.offsetHeight){
                    top = this.$refs.mask.offsetHeight;
                }
                this.$refs.mask.style.left = left + "px";
                this.$refs.mask.style.top = top + "px";

                // 修改放大后的图片位置
                // 仅用于图片放大两倍
                let bigImg = this.$refs.bigImg;
                bigImg.style.left = -left*2 + "px"
                bigImg.style.top = -top*2 + "px"
            },20)
    },

    // 解决假报错（也就是还没有获取到数据时值为undefined.xxx的现象）
    computed:{
        imgObj(){
            console.log(this.imgList)
            return this.imgList[this.index] || {}
        }
    },

    mounted() {
        this.$bus.$on("changeUrl", (index) => {
            this.index = index
        });
    }
}
</script>

<style lang="less">
.spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
        width: 100%;
        height: 100%;
    }

    .event {
        // background-color: red;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .mask {
        width: 50%;
        // width: 100px;
        height: 50%;
        background-color: rgba(0, 255, 0, 0.3);
        position: absolute;
        left: 0;
        top: 0;
        display: none;
    }

    .big {
        width: 100%;
        height: 100%;
        position: absolute;
        top: -1px;
        left: 100%;
        border: 1px solid #aaa;
        overflow: hidden;
        z-index: 998;
        display: none;
        background: white;

        img {
            width: 200%;
            max-width: 200%;
            height: 200%;
            position: absolute;
            left: 0;
            top: 0;
        }
    }

    .event:hover ~ .mask,
    .event:hover ~ .big {
        display: block;
    }
}
</style>