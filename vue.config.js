const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'C:/Users/user/eclipse-workspace/sep19/src/main/resources/static',
  devServer: {
    proxy: {
      '/': {// 페이지에 들어오는 모든 것
      target: 'http://localhost:80',
      ws: false,// web socket 기능 끔
      changeOrigin: true// cors 오류 막기 위해
      }
    }
  }
})
