//app.js
import IMEventHandler from 'utils/imeventhandler.js'
import { calcTimeHeader, clickLogoJumpToCard } from 'utils/util.js'
var util = require('./utils/util.js')
var config = require('./utils/config.js')
var subscriber = require('./utils/event.js')
var network_until = require('./utils/network_util.js');

App({
  /**
   * 初始化完成只会触发一次
   */
  onLaunch: function () {
    // wx.getSystemInfo({
    //   success: function (res) {
    //     let arr = res.SDKVersion.split('.')
    //     let num = parseInt(arr[0]) * 10 + parseInt(arr[1])
    //     if (num < 19) {
    //       wx.showModal({
    //         title: '提示',
    //         content: '当前微信版本过低，请升级到最新微信版本后重试。',
    //       })
    //     }
        
    //   }
    // })
    this.initIM();
  },
  /**
   * 启动或前台进入后台
   */
  onShow() {
    // wx.reLaunch({
    //   url: '/pages/login/login',
    // })
  },
  /**
   * 前台进入后台
   */
  onHide() {
  },
  onError(err) {
    // console.log('小程序出错了', err)
  },
  //确保GlobalData是存在的
  safeOpenId: function (callBack) {
    var that = this;
    if (this.globalData.openId) {
      typeof callBack == "function" && callBack(that.globalData)
    } else {
      // 登录
      wx.login({
        success: res_login => {
          //取到openId
          wx.request({
            url: network_until.ServerlURL + 'getOpenid.html?code=' + res_login.code,
            data: {},
            success: function (obj) {
              //从后台拿到了openId
              console.log('=========set openId==========');
              console.log(obj);
              that.globalData.openId = obj.data.openid;
              that.globalData.userInfo = obj.data.userinfo;

              //安全回调
              typeof callBack == "function" && callBack(that.globalData)
              console.log(that.globalData.openId);
              console.log('=========set openId==========');
            },
            header: {
              'Content-type': 'application/json'
            }
          });

        }
      })
    }
  },
  initIM: function (callBack) {
    var app = this;
    if (app.globalData.isImInit) {
      //安全回调
      typeof callBack == "function" && callBack(app.globalData)
    } else {
      this.safeOpenId(function () {
        //IM登陆
        if (app.globalData.isLogin === false) {
          //app.imlogin({ context: app, token: app.globalData.userinfo.im_token, accid: app.globalData.userinfo.im_accid });
          console.log('===========app.globalData=============');
          console.log(app.globalData);
          console.log('=============app.globalData===========');
          app.globalData.isLogin = true
          setTimeout(() => {
            if (app.globalData.isLogin === true) {
              wx.showToast({
                title: '请检查网络',
                icon: 'none',
                duration: 1500
              })
            }
          }, 15 * 1000);
          console.log('==========app.globalData.userInfo.im_token=============');
          console.log(app.globalData.userInfo.im_token);
          console.log('============app.globalData.userInfo.im_token===========');
          console.log('==========app.globalData.userInfo.im_accid=============');
          console.log(app.globalData.userInfo.im_accid);
          console.log('============app.globalData.userInfo.im_accid===========');
          //订阅UPDATE_RECENT_CHAT_ON_MSG消息，统计消息数量
          //UPDATE_RECENT_CHAT_ON_SESSION无需处理
          new IMEventHandler({
            token: app.globalData.userInfo.im_token,
            account: app.globalData.userInfo.im_accid,
            app: app,
            onSyncDone: function () {
              app.globalData.isLogin = false
              app.globalData.isImInit = true
              wx.hideLoading()
              //安全回调
              typeof callBack == "function" && callBack(app.globalData)
            }
          })
        }
      });

    }

  },
  globalData: {
    openId: null,
    userInfo: null,//用户信息体系 xcx_info_ready 为 0 代表帐号信息未完善
    location: null,
    realtimeLocation: null,
    // userInfo.xcx_city  		   故乡
    // userInfo.xcx_age           年龄
    // userInfo.xcx_star_sign     星座
    // userInfo.birthday          生日
    // userInfo.sex               性别
    // userInfo.nickname          昵称
    // userInfo.avatar            头像
    // userInfo.xcx_tag           标签
    // userInfo.xcx_level         五星级别
    // userInfo.xcx_info_ready    信息是否完善
    //云信IM用到的
    isImInit: false,
    isLogin: false, // 当前是否是登录状态
    currentChatTo: '', // 记录当前聊天对象account，用于标记聊天时禁止更新最近会话unread
    loginUser: {},//当前登录用户信息
    friends: [],//好友列表，
    friendsWithCard: {}, // 带有名片信息的好友列表（转发时使用）
    friendsCard: {},//带有名片信息的好友列表
    onlineList: {},//在线人员名单 account: status
    blackList: {},//黑名单列表
    config,//存储appkey信息
    nim: {},//nim连接实例
    subscriber, //消息订阅器
    notificationList: [], // 通知列表
    recentChatList: [],//最近会话列表
    rawMessageList: {}, //原生的所有消息列表(包含的字段特别多)
    messageList: {},//处理过的所有的消息列表
    accountUnreadMap: [],
    userInfoNavTag: "",//跳转标识 用户信息完善之后，需要跳到哪个页面去
    isMsgTabInit: false//标记消息Tab是否已经初始化
  }
})
/** Demo数据
 * onlineList: {hzfangtiankui: "Android[Wifi]在线", kuguaying: "iOS[Wifi]在线"}
 * loginUser: {account:'', nick:'',avatar:'',birth:'',email:'',gender:'',sign:'',tel:'',createTime:'',updateTime:''}
 * friends: [{account:'',createTime:'',updateTime:'',valid:true}]
 * friendsWithCard: {account: {account:'', nick:'',avatar:'',birth:'',email:'',gender:'',sign:'',tel:'',createTime:'',updateTime:''}} 字段可能不全，需要检测
 * friendsCard: {account: {account:'', nick:'',avatar:'',birth:'',email:'',gender:'',sign:'',tel:'',createTime:'',updateTime:''}} 字段可能不全，需要检测
 * blacklist: {account: {account:'',createTime:'',updateTime:''}} account做key方便查找
 * rawMessageList:{
 *  account: {time1:{},time2:{}}
 * }
 * messageList: {
 *   loginUser: {
 *      account: {time1:{from,to,type,scene,text,sendOrReceive,displayTimeHeader}, time2:{from,to,type,scene,text,sendOrReceive,displayTimeHeader}}
 *   }
 * }
 * recentChatList: {
 *  to: {time1:{from,to,type,scene,text,sendOrReceive,displayTimeHeader}, time2:{from,to,type,scene,text,sendOrReceive,displayTimeHeader}}
 * }
 * notificationList: [{category,from,time,to,type}]
 */