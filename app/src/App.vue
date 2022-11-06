<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from "./components/Header" 
  import Footer from "./components/Footer" 
  export default {
    name:"App",
    /* data(){
      return {
        a:1
      }
    }, */
    components:{
      Header,
      Footer,
    },
    /* beforeCreate(){
      console.log("beforeCreate")
    },
    created(){
      console.log("created")
    },
    beforeMount(){
      console.log("beforeMount")
    }, */
    mounted(){
      // console.log("mounted")
      // 派发一个action 在App路由组件中发送Ajax请求获取三级列表的数据，这样只会发送一次请求
      this.$store.dispatch("home/category");
    },
    /* watch:{
      a:{
        immediate:true,
        handler(){
          console.log("watch")
        }
      }
    } */
  }
</script>

<style lang="css">
  *{
    margin: 0;
    padding: 0;
  }
</style>