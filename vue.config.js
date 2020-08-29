module.exports = {
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: '@import "~@/assets/scss/base.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://data.tycg.gov.tw/api',
        //ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
