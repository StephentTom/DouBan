// pages/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBookVideoes: [
      {
        flag: 0,
        imageSrc: "/assets/images/me/me_movie",
        subtitle: "观影分析",
        readCount: 0,
        flagCount: 10,
      }
    ]
  },

  /**
   * 登录事件 ES6函数写法
   */
  loginAction() {
    wx.navigateTo({
      url: '/pages/login/login',
    }); 
  }
})