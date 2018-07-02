// pages/index/index.js
var app = getApp()
var util = require('../../utils/util.js');
var network_until = require('../../utils/network_util.js');
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  initGroupChating:function(){
    app.safeOpenId(function () {
      //取到openId
      wx.request({
        url: network_until.ServerlURL + 'createGroup.html',
        data: { openId: app.globalData.openId },
        success: function (obj) {

        },
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        }
      });
    });
  },
  startGroupChating: function () {
    app.safeOpenId(function () {
      //取到openId
      wx.request({
        url: network_until.ServerlURL + 'joinGroup.html',
        data: { openId: app.globalData.openId },
        success: function (obj) {

        },
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        }
      });
    });
  },
  startP2PChating:function(){
    app.safeOpenId(function(){
      //取到openId
      wx.request({
        url: network_until.ServerlURL + 'startP2PChating.html',
        data: { openId: app.globalData.openId},
        success: function (obj) {

        },
        method: 'POST',
        header: {
          'Content-type': 'application/json'
        }
      });
    });   
  }
})