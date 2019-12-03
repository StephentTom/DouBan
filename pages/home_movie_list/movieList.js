// pages/home_movies_list/movieList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // json字符串转为对象
    // const obj = JSON.parse(options.sectionModel)

    // 设置当前页面导航栏title
    wx.setNavigationBarTitle({
      title: options.title
    });
    // 获取缓存, 并设置更新UI
    wx.getStorage({
      key: options.url,
      success: (result) => {
        this.setData({
          movies: result.data
        })
      }
    });
  },

  /**
   * 点击item事件
   */
  movieAction: function(event) {
    // 传对象到下个界面 方案:
    // 1. 直接传对象但会被识别为字符串; 因此需要把json对象转为字符串(推荐)
    // 2. 存本地 wx.setStorage/wx.setStorageSycn
    // 3. 用设置成全局变量

    // 序列化(对象转字符串)
    let JSONString = JSON.stringify(event.currentTarget.dataset.movie)
    wx.navigateTo({
      url: `/pages/movie_detail/movieDetail?movie=${JSONString}`
    });
      
    // 下个界面 反序列化(字符串转json)
    // let json = JSON.parse(options.movie)
  }
})