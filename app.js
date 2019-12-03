//app.js
App({
  onLaunch: function () {
    // 创建自定义wx.xxx对象
    wx.sysInfo = {}

    // 获取手机系统info
    this.getSystemInfo()
  },

  // 全局变量
  globalData: {
    bdAK: "1lY3kMKXRWM2Vlf10c55BStCSKXDDr76",
    city: '福州市',
    userInfo: null
  },

  // 域名
  setURL: (url)=> {
    return `https://douban-api.uieee.com/${url}`
  },

  // 获取手机系统info
  getSystemInfo: function() {
    try {
      const res = wx.getSystemInfoSync()
        // 设备型号
        wx.sysInfo.model = res.model
        // 屏幕宽度
        wx.sysInfo.screenWidth = res.screenWidth
        // 屏幕高度
        wx.sysInfo.screenWidth = res.screenHeight
        // 状态栏的高度(默认是px)
        wx.sysInfo.statusBarHeight = res.statusBarHeight
        // 设备 devtools->PC端, ios->苹果端, android->安卓端
        wx.sysInfo.platform = res.platform
        // 导航栏bar高度
        wx.sysInfo.navBarHeight = res.platform == "ios"? 44 : 48
    } catch (e) {
      console.log('获取设备信息失败')
    }
  },

  // 调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息
  getLogin: function() {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },

  // 获取用户的当前设置
  getUserSetting: function() {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 获取用户信息已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({ 
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  }
})