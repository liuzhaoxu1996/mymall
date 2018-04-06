/*
 * @Author: liuzhaoxu1996
 * @Date:   2018-04-03 00:07:36
 * @Last Modified by: lius
 * @Last Modified time: 2018-04-06 17:33:07
 */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 获取环境变量. dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name, title) {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    title: title,
    inject: true,
    hash: true,
    chunks: ['common', name]
  };
};
// webpack config
var config = {
  entry: {
    common: ['./src/page/common/index.js'],
    index: ['./src/page/index/index.js'],
    login: ['./src/page/login/index.js'],
    result: ['./src/page/result/index.js']
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name].js',
    publicPath: '/dist'
  },
  externals: {
    jquery: 'window.jQuery'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
        loader: 'url-loader?limit=100&name=resource/[name].[ext]'
      },
      {
        test: /\.string\??.*$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image'
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果'))
  ]
};
if ((WEBPACK_ENV = 'dev')) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
