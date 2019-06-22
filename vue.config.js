module.exports = {
  devServer: {
    proxy: {
      '/api': {
        ws: false,
        target: 'http://localhost:3200',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}