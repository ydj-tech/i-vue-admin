'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave: false,
    runtimeCompiler: true,
    configureWebpack: {
        devtool: 'source-map'
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 9000,
        proxy: {
            '/api/g2': {
                target: 'https://view.inews.qq.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/api/g2': '/g2'
                }
            },
            '/api': {
                target: 'https://api.isensor.aiyunbao.net',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    chainWebpack(config) {
        // set svg
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
