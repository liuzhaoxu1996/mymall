/*
 * @Author: lius 
 * @Date: 2018-04-06 11:55:04 
 * @Last Modified by: lius
 * @Last Modified time: 2018-04-06 13:00:24
 */
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
// 通用页面头部
var header = {
  init: function() {
    this.bindEvent();
  },
  onload: function () {
    var keyword = _mm.getUrlParam('keyword');
    // keyword 存在， 则回填输入框
    if(keyword) {
      $('#search-input').val(keyword);
    };
  },
  bindEvent: function() {
    var _this = this;
    // 点击搜索按钮之后，做搜索提交
    $('#search-btn').click(function() {
      _this.searchSubmit();
    });
    // 输入回车后，做搜索提交
    $('#search-input').keyup(function (e) {
      if(e.keyCode === 13) {
        _this.searchSubmit();
      }
    })
  },
  // 搜索的提交
  searchSubmit: function () {
    var keyword = $.trim($('#search-input').val());
    // 如果提交的时候有keyword，正常跳转到list页
    if(keyword) {
      window.location.href = './list.html?keyword=' + keyword;
    } else{
      _mm.geHome();
    }
  }
};
header.init();
