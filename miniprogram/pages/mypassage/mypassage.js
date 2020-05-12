// pages/mypassage/mypassage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    user_id: '',
    one_all_message: [],
    delete_message: false,
    messageid: 0,
    delete_id: '',
    delete_success: false,
  },
  // message_id(e){
  //   console.log(e.currentTarget)
  // },
  delete_message(e) {
    this.setData({
      delete_message: true
    })
    var messageid = e.currentTarget.dataset.messageid // e.currentTarget
    console.log(messageid)
    this.setData({
      delete_id: messageid
    })
  },
  confirm_delete(e) {
    console.log("假装已经删除")
    console.log(this.data.delete_id)
    console.log(this.data.user_id)
    wx.request({
      url: 'https://php.iweb365.top/index.php/Home/Message/delete_message',
      method: 'POST',
      dataType: 'json',
      data: {
        id: this.data.delete_id,
        user_id: this.data.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        this.setData({
          delete_success: true
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/mypassage/mypassage',
          })
        }, 1000)



      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  get_one_all_message: function() {
    wx.request({
      url: 'https://php.iweb365.top/index.php/Home/Message/get_one_user_all_messages',
      method: 'POST',
      data: {
        user_id: this.data.user_id
      },
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        // console.log(res.data.data)
        this.setData({
          one_all_message: res.data.data

        })
        console.log(this.data.one_all_message)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  onLoad: function(options) {
    // 获取用户发布
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        const code = res.code;
        // 设置appid
        const appId = "wxb44248c21c69eff4";
        // const appid = res.appid;
        //设置secret 
        var that = this
        const secret = "2886f055e5a321cee3a06bc8d2cc9d82";
        wx.request({
          url: 'https://py.iweb365.top/Openid?code=' + code,
          data: {
            // code:code
          },
          method: 'get',
          header: {
            'content-type': 'json'
          },
          success: function(res) {
            const openId = res.data.openid; //返回openid
            console.log(res.data)
            that.setData({
              user_id: res.data.openid
            })
            console.log(that.data.user_id)
            that.get_one_all_message()

          }
        })
      }
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