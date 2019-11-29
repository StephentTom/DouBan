// pages/home/home.js


const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 电影
    movies: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCity(this.getMovies)
  },

  /**
   * 根据经纬度获取城市
   */ 
  getCity: function(callback) { 
    wx.getLocation({
      success: (result) => {
        const latitude = result.latitude
        const longitude = result.longitude
        // 根据经纬度获取城市(利用百度地图 逆地理编码) 
        // http://lbsyun.baidu.com/apiconsole/key
        // http://lbsyun.baidu.com/index.php?title=webapi/guide/webservice-geocoding-abroad
        // 逆地理编码GET请求
        wx.request({
          url: 'https://api.map.baidu.com/reverse_geocoding/v3',
          data: {
            ak: app.globalData.bdAK,
            output: 'json',
            coordtype: 'wgs84ll',
            // ES6拼接方法
            location: `${latitude},${longitude}`
            // location: latitude+","+longitude
          },
          success: (res) => { // let: 变量 const: 常量
            let city = res.data.result.addressComponent.city
            app.globalData.city = city
            // 去除市字, 字符串截取
            city = city.substring(0, city.length-1)
            callback && callback(city)
          },
          fail: () => {
            console.log("获取城市失败")
          }
        });
      },
      fail: () => {
        wx.showModal({
          title: '授权失败',
          content: '为了更好的使用体验，请到设置中开启位置信息授权',
          showCancel: false,
          confirmText: '设置',
          confirmColor: '#3CC51F',
          success: (result) => {
            if (result.confirm) {
              // 进入设置界面

            }
          },
        }); 
      }
    });
  }, 

  /**
   * 根据城市获取数据
   */
  getMovies: function(city) {
    wx.request({
      url: app.setURL("v2/movie/in_theaters"),
      data: {city: city},
      header: {'Content-type':"json"},
      success: (result) => {
        console.log("热映:", result)

        let movies = result.data.subjects
        // 星星评分设置
        movies.forEach(movie => {
          this.updateStars(movie)
        });
        // 更新数据
        this.setData({
          movies: movies
        })
      },
      fail: () => {
        wx.showToast({
          title: '获取【正在热映】失败',
          icon: 'none',
          mask: 'true',
          duration: 1500
        });
      }
    }); 
  },

  /**
   * 根据movie对象中的stars分数设置星星状态
   */
  updateStars: function(movie) {
    // 转为整数(取整)
    let score = parseInt(movie.rating.stars)
    // 如果评分为0 则无星星 显示暂无评分
    if (score == 0) return;

    // 获取on(个数) half(显示与不显示 bool) off(个数)
    let on = parseInt(score / 10);
    let half = (score % 10) != 0;
    let off = half? (5 - on -1) : 5 - on;

    // 为movie对象添加个star状态属性
    movie.starStatus = {}
    movie.starStatus.on = on;
    movie.starStatus.half = half;
    movie.starStatus.off = off;
  }
})