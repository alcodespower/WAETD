Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    data:[1,2]

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onProduct() {
      console.log(this.data.data)
      wx.navigateTo({
        url: '/pages/details/details?click_info=' + JSON.stringify(this.data.data),
        success: function() {
          
        }
      })
    }

  }
})