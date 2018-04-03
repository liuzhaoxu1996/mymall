/*
 * @Author: liuzhaoxu1996
 * @Date:   2018-04-03 00:07:36
 * @Last Modified by:   liuzhaoxu1996
 * @Last Modified time: 2018-04-04 00:14:55
 */
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

// 获取环境变量. dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法  
var getHtmlConfig = function(name) {
    return {
        template: './src/view/'+ name +'.html',
        filename: 'view/'+ name +'.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    };
}
// webpack config
var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        filename: 'js/[name].js',
        publicPath: '/dist',
        path: __dirname + '/dist'
    },
    externals: {
        jquery: "window.jQuery"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
            {test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: '/js/base.js'
        }),
        new ExtractTextPlugin("css/[name].css"),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};
if(WEBPACK_ENV = 'dev') {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
}




module.exports = config;