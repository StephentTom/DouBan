// cpms/slot/m-tag.js
Component({

   /**
   * 启用插槽
   */
  options: {
    multipleSlots: true // 在自定义组件时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    title: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  },

  lifetimes: {
    attached: function() {
      this.setData({
        title: this.properties.title
      })
    }
  }
})
