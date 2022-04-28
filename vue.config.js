module.exports = {
  css: {
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/base.scss";
        @import "~@/assets/scss/media.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/taoyuan-ubike/'
    : '/',
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
