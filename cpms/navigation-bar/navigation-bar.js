// cpms/navigation-bar/navigation-bar.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navTitle: String,
    navTitleColor: {
      type: String,
      value: 'black' // 默认值
    },
    navBarColor: {
      type: String,
      value: 'white'
    },
    statusBarColor: {
      type: String,
      value: 'white'
    },
    backImageSrc: {
      type: String,
      value: '/assets/images/others/other_nav_back.png'
    },
    homeImageSrc: {
      type: String,
      value: '/assets/images/others/other_nav_home.png'
    },
    isHiddenBack: { // Boolean 不怎么好使, 改为字符串
      type: String,
      value: 'true'
    },
    isHiddenHome: {
      type: String,
      value: 'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: { // 声明属性
    statusBarStyle: '', // 状态栏样式
    navBarStyle: '',    // 导航栏样式
    navTitle: '',       // 导航栏标题
    navTitleColor: '',  // 导航栏标题颜色
    isHiddenBack: '',   // 是否隐藏back按钮
    isHiddenHome: '',   // 是否隐藏home按钮
    backImageSrc: '',   // 左侧返回图片
    homeImageSrc: '',   // 左侧home图片

    // 自定义导航栏, 解决内容被导航栏遮住
    // topMargin: wx.sysInfo.navBarHeight + wx.sysInfo.statusBarHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _backAction: function() {
      wx.navigateBack({
        delta: 1 // 当delta大于10层(微信小程序限制最十层)时, 则会跳转首页
      });
      // 外界监听此事件
      this.triggerEvent('tapBack')
    },

    _homeAction: function() {
      // redirectTo:fail can not redirectTo a tabbar page
      wx.switchTab({
        url: '/pages/home/home'
      }); 
      // 外界监听此事件
      this.triggerEvent('tapBack')
    }
  },

  /**
   * 自定义组件的生命周期
   * 自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function() {
      // 状态栏
      const statusBarStyle = `height: ${wx.sysInfo.statusBarHeight}px; background-color: ${this.properties.statusBarColor};`
      // 导航栏
      const navBarStyle =  `height: ${wx.sysInfo.navBarHeight}px; background-color: ${this.properties.navBarColor};`

      this.setData({
        statusBarStyle: statusBarStyle,
        navBarStyle: navBarStyle,
        navTitle: this.properties.navTitle,           // 导航栏标题
        navTitleColor: this.properties.navTitleColor, // 导航栏标题颜色
        isHiddenBack: this.properties.isHiddenBack,   // 是否隐藏back按钮
        isHiddenHome: this.properties.isHiddenHome,   // 是否隐藏home按钮
        backImageSrc: this.properties.backImageSrc,   // 左侧返回图片
        homeImageSrc: this.properties.homeImageSrc,   // 左侧home图片
      })
    },

    // 在组件实例被从页面节点树移除时执行
    detached: function() {
      
    },
  }
})
