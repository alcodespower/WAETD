// pages/userhome/userhome.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    face_url: '',
    nickname: '',
    isshow_login: false,
    user_confirm: [],
    isWAETD: false

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
            content: '您好，' + res.data.real_name + "，已完成正方认证！",
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
                wx.redirectTo({
                  url: '/pages/userhome/userhome',
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
  howtoPlay() {
    wx.showModal({
      title: '提示',
      content: '暂无更多'
    })
  },

  login_succeed() {
    wx.showModal({
      title: '提示',
      content: '您已完成正方认证！'
    })

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
  toMypassage: function() {
    wx.navigateTo({
      url: '/pages/mypassage/mypassage',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
              that.setData({
                face_url: res.userInfo.avatarUrl,
                nickname: res.userInfo.nickName
              })
            }
          })
        }
      }
    })
    wx.getStorage({
      key: 'user_confirm',
      success: res => {
        this.setData({
          user_confirm: res.data,
          isWAETD: true
        })
        console.log(res.data)
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