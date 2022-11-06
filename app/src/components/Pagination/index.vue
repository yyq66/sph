<template>
    <div class="fr page">
        <div class="sui-pagination clearfix">
            <ul>
                <!-- s上 -->
                <li class="prev" @click="sendPageNo(pageNo-1)" :class="{disabled:pageNo===1}"><a>«上一页</a></li>
                <li v-if="startAndEndPage[0] > 1"><a @click="sendPageNo(1)">1</a></li>
                <li class="dotted" v-if="startAndEndPage[0] > 2"><span>...</span></li>

                <!-- 中间部分：连续页面 -->
                <li :class="{active:pageNo === s}" v-for="s,index in startAndEndPage" :key="index" @click="sendPageNo(s)">
                    <a>{{s}}</a>
                </li>

                <!-- 下 -->
                <li class="dotted" v-if="startAndEndPage[continues-1] < this.pageTotal-1"><span>...</span></li>
                <li v-if="startAndEndPage[continues-1] <= this.pageTotal-2" @click = "sendPageNo(pageTotal)"><a>{{pageTotal}}</a></li>
                <li class="next" @click="sendPageNo(pageNo+1)" :class="{disabled:pageNo===pageTotal}"><a>下一页»</a></li>
                

            </ul>
            <div><span>共{{pageTotal}}页&nbsp;</span></div>

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
    export default {
        
        name:"Pagination",
        props:["pageSize","pageNo","total","continues"],
        data(){
            return {
                clickPage:1,
                a:120000
            }
        },
        methods:{
            sendPageNo(x){
                this.$emit("pageNo",x);
            },
        },
        computed:{
            // ...mapGetters("search",["goodsList"]),
            // 总数据
            // goodsTotal(){
            //     if(this.goodsList){
            //         return this.goodsList.length
            //     }
            // },
            // 总页数
            pageTotal(){
                return Math.ceil(this.total / this.pageSize)
            },


            // 分页器连续页面开始和结束的值
            startAndEndPage(){
                // 起始数字、结束数字
                let start = 0;
                let end = 0;
                // 总页码没有连续页面多
                if(this.continues > this.pageTotal){
                    start = 1;
                    end = this.pageTotal
                }else{
                    // 总页数大于等于连续页面数
                    start = this.pageNo - parseInt(this.continues/2);
                    end = this.pageNo + parseInt(this.continues/2);
                    // 如果start等于0/1
                    if(start < 1){
                        start = 1;
                        end = this.continues
                    }
                    // end大于总页码
                    if(end > this.pageTotal){
                        start = this.pageTotal - this.continues + 1;
                        end = this.pageTotal
                    }
                }
                let arr = [];
                for(var i = 0;i < this.continues && i < this.pageTotal;i++){
                    arr.push(start+i)
                }
                return arr
            }
        }
    }
</script>

<style lang="less" scoped>
    .page {
        width: 800px;
        height: 66px;
        // background-color: #bfa;
        overflow: hidden;
        // float: right;
        margin: 0 auto;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 700px;
            float: left;

            li {
                // width: 20px;
                line-height: 18px;
                display: inline-block;
                margin-left: 2px;
                cursor: default;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: rgb(159, 238, 247);
                  color: #e1251b;
                  border-color: #fff;
                //   cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                cursor: default;
                pointer-events: none;
                
                a{
                    color: rgb(178, 175, 175);
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            margin-top: 10px;
            float: right;
            // width: 241px;
          }
        }
      }
</style>