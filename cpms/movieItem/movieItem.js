// cpms/movieItem/movieItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 自定义影片对象属性
    movie: {
      type: Object,
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击item事件
    _didSelectedItem: function(event) {
      // 从this.data.movie 与 this.properties.movie都是一样的
      
      var myEventDetail = {} // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项

      // tapItem方法名必须与使用此组件的界面, 用到此组件的点击事件名一致; 
      // 例子: bind:tapItem="xxx"
      this.triggerEvent('tapItem')
    }
  }
})
