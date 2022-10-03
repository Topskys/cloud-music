const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,


    //vue-cli3.0 解决跨域问题
    devServer: {
        proxy: {
            '/api': {
                // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/  // 后台接口域名
                target: 'https://autumnfish.cn/', //改用本地服务器连接nodejs
                // target: 'http://m.kugou.com/',
                // target: 'http://mobilecdnbj.kugou.com/v3',
                ws: true, //如果要代理 websockets，配置这个参数
                // secure: false, // 如果是https接口，需要配置这个参数
                changeOrigin: true, // 允许跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

})