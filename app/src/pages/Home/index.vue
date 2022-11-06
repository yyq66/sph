<template>
    <div>
        <!-- 三级联动全局组件，三级联动已经祖册为全局组件，不需要再通过import引入 -->
        <TypeNav/>
        <ListContainer/>
        <TodayRecommend/>
        <Rank/>
        <Like/>
        <Floor v-for='floor in floorList' :key='floor.id' :list='floor'/> 
        <Brand/>
    </div>
</template>

<script>
    import ListContainer from "./ListContainer"
    import TodayRecommend from "./TodayRecommend"
    import Rank from "./Rank"
    import Like from "./Like"
    import Floor from "./Floor"
    import Brand from "./Brand"

    import {mapState} from "vuex"


    export default {
        name:"Home",
        components:{
            ListContainer,
            TodayRecommend,
            Rank,
            Like,
            Floor,   
            Brand
        },
        computed:{
            ...mapState("home",["floorList"])
        },
        mounted(){
            this.$store.dispatch("home/getFloor");
            // 获取用户登录信息在首页展示
            // if(this.$store.state.user.token){
                // this.$store.dispatch("user/userInfo")
            // }
        },
        
    }
</script>

<style>

</style>