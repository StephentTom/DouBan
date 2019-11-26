// pages/login.js 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 微信登录事件 ES5
   */
  wxLoginAction: function() {
    
  },
  /**
   * 豆瓣登录事件 ES5
   */
  doubanLoginAction: function() {

  },
  /**
   * 底部协议事件 ES6函数写法
   */
  procotolAction() {
    wx.navigateTo({
      // 从根目录开始
      url: '/pages/agreement/agreement'
    });
  }
})