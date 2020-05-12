const app = getApp();
Component({
  /**
   * 组件的一些选项
   */
  options: {
    addGlobalClass: true,
    multipleSlots: true
  },

  /**
   * 组件的对外属性
   */
  properties: {
    bgColor: {
      type: String,
      default: ''
    },
    isCustom: {
      type: [Boolean, String],
      default: false
    },
    // isHomepage: {
    //   type: [Boolean, String],
    //   default: false
    // },
    isShowleft: {
      type: [Boolean, String],
      default: false
    },
    isBack: {
      type: [Boolean, String],
      default: false
    },
    bgImage: {
      type: String,
      default: ''
    },

    // props: {
    //   // 定义一个导航url属性，如果有这个属性就使用这个跳转url
    //   url: {
    //     type: String,
    //     default: ''
    //   }
    // },

  },
  /**
   * 组件的初始数据
   */
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    Custom: app.globalData.Custom,
    isshow: ''
  },
  /**
   * 组件的方法列表
   */
  methods: {
    BackPage() {
      wx.navigateBack({
        delta: 1
      });
    },
    toHome() {
      wx.reLaunch({
        url: '/pages/homepage/homepage',
      })
    },
    toHomepage() {
      wx.reLaunch({
        url: '/pages/homepage/homepage',
      })
    },

    isLeftaction: function() {
      this.triggerEvent('myevent', {
        isshow: "true"
      });
    },
    showModal: function () {
      this.triggerEvent('showModal', {
        modalName: 'bottomModal'
      });
    }

  }
})