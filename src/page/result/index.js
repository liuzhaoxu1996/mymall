/*
 * @Author: lius 
 * @Date: 2018-04-06 17:35:17 
 * @Last Modified by: lius
 * @Last Modified time: 2018-04-06 17:56:53
 */
'use strict';
require('./index.css')
var navSide = require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function () {
  var type = _mm.getUrlParam('type') || 'default',
    $element = $('.' + type + '-success');
  // 显示对应的提示元素
  $element.show();
})