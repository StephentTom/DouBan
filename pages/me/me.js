// pages/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myBookVideoes: [
      {
        id: 0,
        imageSrc: "/assets/images/me/me_movie.png",
        subtitle: "观影分析",
        readCount: 0,
        flagDesc: "标记10部影片\n开启观影分析",
      },
      {
        id: 1,
        imageSrc: "/assets/images/me/me_book.png",
        subtitle: "读书分析",
        readCount: 0,
        flagDesc: "标记10本书\n开启读书分析",
      },
      {
        id: 2,
        imageSrc: "/assets/images/me/me_music.png",
        subtitle: "音乐分析",
        readCount: 0,
        flagDesc: "标记10张唱片\n开启音乐分析",
      },
    ]
  },

  /**
   * 登录事件 ES6函数写法
   */
  loginAction() {
    wx.navigateTo({
      url: '/pages/login/login',
    }); 
  },

  /**
   * 立即开启事件 ES6函数写法
   */
  startAction(event) {
    let model = event.currentTarget.dataset.model
    
    if (model.id == 0) {
      console.log('观影分析');
    } else if (model.id == 1) {
      console.log('读书分析');
    } else {
      console.log('音乐分析');
    }
  }
})