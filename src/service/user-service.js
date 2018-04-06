/*
 * @Author: lius 
 * @Date: 2018-04-05 00:00:26 
 * @Last Modified by:   liuzhaoxu1996
 * @Last Modified time: 2018-04-05 01:34:38
 */
'use strict';
var _mm = require('util/mm.js');

var _user = {
  // 检查登录状态
  checkLogin: function(resolve, reject) {
    _mm.request({
      url: _mm.getServerUrl('/user/get_user_info.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  },
  logout: function() {
    _mm.request({
      url: _mm.getServerUrl('/user/logout.do'),
      method: 'POST',
      success: resolve,
      error: reject
    });
  }
};
module.exports = _user;