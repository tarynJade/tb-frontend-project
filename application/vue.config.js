const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    },
    client: {
      webSocketURL: 'auto://0.0.0.0:0/ws'
    },
    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 8080
  },
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})