module.exports = {
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
