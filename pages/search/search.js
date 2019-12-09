// pages/search/search.js

import httpsTool from '../../utils/request/https';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 解决导航栏遮住page中内容
    topMargin: wx.sysInfo.navBarHeight + wx.sysInfo.statusBarHeight,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 搜索事件
   */
  searchAction: function(event) {
    console.log(event.detail)

    httpsTool.get('v2/movie/weekly')
    .then((res)=>{
      console.log('结果:', res)
    }).catch(error=>{
      console.log('fail:', error)
    })   
  }
})