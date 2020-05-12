// pages/details/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    click_info: [],
    phone_hidden: '',
    isshow_login: false,
    user_confirm: [],
    isWAETDER: 'false'
  },
  phone_hidden() {
    var num = this.data.click_info.contact
    var phone = num.substring(0, 3) + '***' + num.substring(7)
    this.setData({
      phone_hidden: phone
    })
    // console.log(this.data.phone_hidden)
  },
  showlogin() {
    this.setData({
      isshow_login: true
    })
    console.log("i have do it!")
  },
  hidelogin() {
    this.setData({
      isshow_login: false
    })
    console.log("i have do it!")

  },
  user_confirm(e) {
    // console.log(e.detail.value)
    this.setData({
      user_confirm: e.detail.value
    })
    console.log(this.data.user_confirm)

    wx.request({
      url: 'https://py.iweb365.top/get_info?account=' + this.data.user_confirm.zf_id + '&passwd=' + this.data.user_confirm.zf_passwd,
      method: 'GET',
      dataType: 'json',
      // header: {
      //   'content-type': 'application/x-www-form-urlencoded'
      // },
      success: res => {
        console.log(res.data)
        if (res.data.real_name) {
          wx.setStorage({ //存储到本地
            key: "user_confirm",
            data: this.data.user_confirm
          })
          wx.showModal({
            title: '验证成功',
            content: '您好，' + res.data.real_name + "，联系方式已对您开放",
            success: () => {
              var that = this
              if (res.cancel) {
                //点击取消,默认隐藏弹框 
              } else {
                //点击确定
                console.log("i have do it !")
                that.setData({
                  isshow_login: false,
                  phone_isshow: true
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '重试以登录',
            content: '网络开小差咯~',
          })
        }

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.getStorage({
      key: 'user_confirm',
      success: res => {
        this.setData({
          phone_isshow: true,
          isWAETDER: true
        })
        console.log(this.data.isWAETDER)
      },
    })


    let click_info = JSON.parse(options.click_info)
    let that = this
    that.setData({
      click_info: click_info
    })
    console.log(this.data.click_info)
    this.phone_hidden()
    console.log(this.data.phone_hidden)
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