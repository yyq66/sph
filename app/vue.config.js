const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 打包时不生成map文件
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      "/api":{
        target:"http://gmall-h5-api.atguigu.cn"
      }
    }
  },
  
})
