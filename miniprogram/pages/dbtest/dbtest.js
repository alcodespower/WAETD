// pages/dbtest/dbtest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sign:[],
    resmessage:''

  },
  formsubmit:function(data){
    console.log(data.detail.value)
    this.setData({
      sign: data.detail.value
    })
    console.log(this.data.sign)
    var username = data.detail.value.username
    var phone = data.detail.value.phone
    var password = data.detail.value.password
    var password_again = data.detail.value.password_again
    var face_url = data.detail.value.face_url;
    wx.request({
      url: 'https://php.iweb365.top/index.php/Home/User/sign' ,
      method: 'POST',
      dataType: 'json',
      data:this.data.sign,
      header: {
        'content-type': 'application/x-www-form-urlencoded' //修改此处即可
      },
      success: res => {
        console.log(res)
        this.setData({
          resmessage:res.data.msg
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // wx.cloud.callFunction({
    //   name: 'mysql',
    //   success: function(res) {
    //     console.log(res.result)
    //   },
    //   fail: console.error
    // })



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