// cpms/navigation-bar/navigation-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    navTitle: {
      type: String
    },
    navTitleColor: {
      type: String,
      value: 'black'
    },
    navBarColor: {
      type: String,
      value: 'white'
    },
    statusBarColor: {
      type: String,
      value: 'white'
    },
    isHiddenBack: { // Boolean 不怎么好使
      type: String,
      value: 'true'
    },
    isHiddenHome: {
      type: Boolean,
      value: 'true'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 声明属性
    statusBarStyle: '', // 状态栏样式
    navBarStyle: '' // 导航栏样式
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  /**
   * 自定义组件的生命周期
   * 自小程序基础库版本 2.2.3 起，组件的的生命周期也可以在 lifetimes 字段内进行声明（这是推荐的方式，其优先级最高）
   */
  lifetimes: {
    // 在组件实例进入页面节点树时执行
    attached: function() {
      // 状态栏
      const statusBarStyle = `height: ${wx.sysInfo.statusBarHeight}px;`
      // 导航栏
      const navBarStyle =  `height: ${wx.sysInfo.navBarHeight}px;`

      this.setData({
        statusBarStyle: statusBarStyle,
        navBarStyle: navBarStyle
      })
    },

    // 在组件实例被从页面节点树移除时执行
    detached: function() {
      
    },
  }

})
