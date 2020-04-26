// pages/login/login.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    sno: '',
    pwd: '',
    isShow_pwd: false,
    request_info: '',
    info_data: [],
    schedule_data: [],
    length: 1

  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  show_pwd(e) {
    this.setData({
      isShow_pwd: e.detail.value
    })
    console.log(this.data.isShow_pwd)
  },
  get_input_sno(e) {
    this.setData({
      sno: e.detail.value
    })

    console.log(this.data.sno)
  },
  get_input_pwd(e) {
    this.setData({
      pwd: e.detail.value
    })

    console.log(this.data.pwd)
  },

  submit() {
    console.log(this.data.sno)
    console.log(this.data.pwd)
    wx.setStorage({
      key: 'sno',
      data: this.data.sno,
    })
    wx.setStorage({
      key: 'pwd',
      data: this.data.pwd,
    })

    this.setData({
      request_info: '?sno=' + this.data.sno + '&pwd=' + this.data.pwd
    })

    console.log(this.data.request_info)
    this.get_info_data()
    this.get_schedule_data()


  },

  get_info_data() {
    wx.request({
      url: 'http://140.143.163.124:6680/info_data' + this.data.request_info,
      method: 'GET',
      dataType: 'json',
      success: res => {
        console.log(res.data)
        this.setData({
          info_data: res.data
        })
        wx.setStorage({
          key: 'info_data',
          data: this.data.info_data,
        })
        if (this.data.info_data.real_name) {
          this.hideModal()
          this.setData({
            isLogin: true
          })
        } else {
          console.log("fail")
          wx.showLoading({
            title: '重试...',
            mask: true,
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
          setTimeout(()=>{
            wx.hideLoading()
          }
          ,1000)
        }
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  
  get_schedule_data() {
    wx.request({
      url: 'http://140.143.163.124:6680/schedule_data' + this.data.request_info,
      method: 'GET',
      dataType: 'json',
      success: res => {
        console.log(res.data)
        this.setData({
          schedule_data: res.data
        })
        wx.setStorage({
          key: 'schedule_data',
          data: this.data.schedule_data,
        })
      },

      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {


    console.log(app.globalData.isTest)
    wx.getStorage({
      key: 'sno',
      success: res => {
        this.setData({
          // isLogin:true,
          sno: res.data
        })
        console.log(res.data)
      },
    })
    wx.getStorage({
      key: 'pwd',
      success: res => {
        this.setData({
          // isLogin: true,
          pwd: res.data
        })
        console.log(res.data)
      },
    })
    // wx.getStorage({
    //   key: 'pwd',
    //   success: res => {
    //     this.setData({
    //       // isLogin: true,
    //       pwd: res.data
    //     })
    //     console.log(res.data)
    //   },
    // })
    wx.getStorage({
      key: 'info_data',
      success: res => {
        this.setData({
          info_data: res.data
        })
        if (this.data.info_data.real_name) {
          // this.hideModal()
          this.setData({
            isLogin: true
          })
        } else {
          console.log("fail")
        }
        console.log(this.data.info_data.real_name)
      },
    })
    wx.getStorage({
      key: 'schedule_data',
      success: res => {
        this.setData({
          // isLogin: true,
          schedule_data: res.data
        })
        console.log(this.data.schedule_data)
      },
    })




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})