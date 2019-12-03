// pages/home/home.js


// 多嵌套箭头函数 需要注意this



const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 所有电影
    allMovies: [
      {
        title: "影院热映",
        url: "v2/movie/in_theaters",
        movies: []
      },
      {
        title: "新片榜",
        url: "v2/movie/new_movies",
        movies: []
      },
      {
        title: "口碑榜",
        url: "v2/movie/weekly",
        movies: []
      },
      {
        title: "北美票房榜",
        url: "v2/movie/us_box",
        movies: []
      },
      {
        title: "Top250",
        url: "v2/movie/top250",
        movies: []
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 从缓存中获取数据
    this.getLocalData()
    // 服务器数据
    // this.getCity((city)=>{
    //   this.getMovies(0, {city: city})
    // })
    // this.getMovies(1)
    // this.getMovies(2)
    // this.getMovies(3)
    // this.getMovies(4) 
  },

  /**
   * 根据city获取数据
   */
  getMovies: function(idx, params) {
    wx.request({
      url: app.setURL(this.data.allMovies[idx].url),
      data: params,
      header: {'Content-type':"json"},
      success: (result) => {
        let all_movies = this.data.allMovies
        let movies = result.data.subjects

        // 清除本地缓存中赋值给movies数组的数据(不然数据会双倍->本地数据+网络请求数据)
        all_movies[idx].movies = []

        // 处理星星评分
        for (let index = 0; index < movies.length; index++) {
          // js中的 && 与 || 区别于ios中的, 这里解释是movies[index].subject如果存在(满足), 就不会执行movies[index];
          // 由于接口返回的json有不同, 所以这里做处理
          let movie = movies[index].subject || movies[index]
          // 星星
          this.updateStars(movie)
          // 更新数据
          all_movies[idx].movies.push(movie)
        }
        // 更新UI
        this.setData({
          allMovies: all_movies
        })
        // 异步存储
        wx.setStorage({
          key: this.data.allMovies[idx].url,
          data: all_movies[idx].movies,
          success: (result) => {
            
          },
          fail: () => {},
        });  
      },
      fail: () => {
        const title = this.data.allMovies[idx].title
        wx.showToast({
          title: `获取${title}失败`,
          icon: 'none',
          mask: 'true',
          duration: 1500
        });
      }
    }); 
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
  },

  /**
   * 获取本地缓存数据
   */
  getLocalData: function() {
    for (let index = 0; index < this.data.allMovies.length; index++) {
      let key = this.data.allMovies[index].url
      this.data.allMovies[index].movies = wx.getStorageSync(key) || []
    }
    this.setData({
      allMovies : this.data.allMovies
    })
  },

  /**
   * 查看更多事件
   */
  moreAction: function(event) {
    let sectionJson = event.currentTarget.dataset.sectionmodel;

    // 把Json转为字符串json
    // sectionJson = JSON.stringify(sectionJson)
    // 传整个json
    // wx.navigateTo({
    //   url: `/pages/home_movie_list/movieList?sectionModel=${sectionJson}`
    // }); 

    wx.navigateTo({
      url: `/pages/home_movie_list/movieList?title=${sectionJson.title}&url=${sectionJson.url}`
    });
  },

  /**
   * 点击影片事件
   */
  movieAction: function(event) {
    // json对象序列化
    let jsonString = JSON.stringify(event.currentTarget.dataset.movie)
    wx.navigateTo({
      url: `/pages/movie_detail/movieDetail?movie=${jsonString}`
    });
  }
})