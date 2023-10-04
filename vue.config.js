const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'C:/Users/user/eclipse-workspace/sep19/src/main/resources/static',
  devServer: {
    proxy: 'http://localhost:80'
  }
})
