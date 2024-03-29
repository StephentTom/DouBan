// pages/movie_detail/movieDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 反序列化(字符串转json对象)
    let jsonObj = JSON.parse(options.movie)
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: jsonObj.title
    });
    // 更新UI  
    this.setData({
      movie: jsonObj
    })
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

  }
})