// vue.config.js
module.exports = {
  devServer: {
    open: false, // 是否打开浏览器
    https: false,
    proxy: {
      "/api": {
        target: "http://www.mypi.network",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/api",
        },
      },
    },
  },
};
