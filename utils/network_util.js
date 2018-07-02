import util from 'util.js';
const ServerlURL = 'https://yuema.zuime.com/index.php/xcx/api/';
const ServerlURLFile = 'https://yuema.zuime.com/index.php/xcx/';

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _get(url, success, fail) {

  console.log("------start---_get----");
  wx.request({
    url: url,
    header: {
      // 'Content-Type': 'application/json'
    },
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });

  console.log("----end-----_get----");
}

/**
 * url 请求地址
 * success 成功的回调
 * fail 失败的回调
 */
function _post_from(url, data, success, fail) {
  console.log("----_post--start-------");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });
  console.log("----end-----_get----");
}

/**
* url 请求地址
* success 成功的回调
* fail 失败的回调
*/
function _post_json(url, data, success, fail) {
  console.log("----_post--start-------");
  wx.request({
    url: url,
    header: {
      'content-type': 'application/json',
    },
    method: 'POST',
    data: data,
    success: function (res) {
      success(res);
    },
    fail: function (res) {
      fail(res);
    }
  });

  console.log("----end----_post-----");
}
function jsonToForm(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
} 
module.exports = {
  _get: _get,
  _post_json: _post_json,
  _post_from: _post_from,
  jsonToForm: jsonToForm,
  ServerlURL: ServerlURL,
  ServerlURLFile: ServerlURLFile
}
// https://xcx.dabantime.com:90/index.php/xcx/api/demo.html