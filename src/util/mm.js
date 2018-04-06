/*
 * @Author: liuzhaoxu1996
 * @Date:   2018-04-04 10:20:50
 * @Last Modified by: lius
 * @Last Modified time: 2018-04-04 20:11:17
 */
'use strict';

var Hogan = require('hogan');
var conf = {
  serverHost: ''
};
var _mm = {
  request: function(param) {
    var _this = this;
    $.ajax({
      type: param.method || 'get',
      url: param.url || '',
      dataType: param.type || 'json',
      data: param.data || '',
      success: function(res) {
        // 请求成功
        if (res.status === 0) {
          typeof param.success === 'function' &&
            param.success(res.data, res.msg);
        } else if (res.status === 10) {
          // 需要登录
          _this.doLogin();
        } else if (res.status === 1) {
          //
          typeof param.error === 'function' && param.error(res.msg);
        }
      },
      error: function(err) {
        typeof param.error === 'function' && param.error(err.statusText);
      }
    });
  },
  // 获取服务器地址
  getServerUrl: function(path) {
    return conf.serverHost + path;
  },
  getUrlParam: function(name) {
    // happymmall.com/product/list?keyword=xxx&page=1;
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  },
  renderHtml: function(htmlTemplate, data) {
    var template = Hogan.compile(htmlTemplate),
      result = template.render(data);
    return result;
  },
  //成功提示
  successTips: function (msg) {
    alert(msg || '操作成功！')
  },
  //错误提示
  errorTips: function (msg) {
    alert(msg || '哪里不对了吧！')
  },
  // 字段的验证，支持非空判断、手机、邮箱 
  validate: function (value, type) {
    var value = $.trim(value);
    // 非空验证
    if(type === 'require') {
      return !!value;
    }
    // 手机号验证
    if(type === 'phone') {
      return /^1\d{10}$/.test(value);
    }
    // 邮箱的格式验证
    if(type === 'email') {
      return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
    }
  },
  // 统一登录处理
  doLogin: function() {
    window.location.href =
      './login.html?redirect' + encodeURIComponent(window.location.href);
  },
  goHome: function () {
    window.location.href = './index.html';
  },
};

module.exports = _mm;
