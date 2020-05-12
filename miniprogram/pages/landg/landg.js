// pages/landg/landg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    isWAETDER: '',
    sys_date: '',
    day_note: '',
    info_time: '--:--',
    info_date: '2020-01-01',
    touch_x: 0,
    touch_y: 0,
    roll_x: 0,
    roll_y: 0,
    imgList: [],
    modalName: '',
    floorstatus: 0,
    isshow: false,
    all_message: [],
    short_title: '',
    lost_place: '',
    phone: '',
    info: [],
    face_url: 'https://wx.qlogo.cn/mmhead/Q3auHgzwzM41Rpuh8ltNEsic9L4ZSrTsoJ7RZhiaVljVyz7WGsnb1Pkg/64',
    nickname: "真是个小可爱",
    user_id: '',
    content_url: '',
    pick_index: 0,
    goods_title: '钥匙',
    miss_place: '扬教1',
    // textareaAValue: '我在扬教1-1404丢失钥匙一把，希望好心人拾获联系我！！！很重要的钥匙！！！',
    textareaAValue: '',
    total_like: 99,
    // send_timestamp:'2020-03-20',
    picker: ['丢失在找', '拾获寻主'],
    left_list: {
      'part1': "只显示待认领",
      'part2': '只显示已拾获',
      'part3': '不限标签'
    },


    // showleft: app.globalData.Showleft,
  },
  toUserhome() {
    wx.navigateTo({
      url: '/pages/userhome/userhome',
      success: () => {
        this.setData({
          isshow: false
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },



  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
    this.setData({
      face_url: e.detail.userInfo.avatarUrl,
      nickname: e.detail.userInfo.nickName
    })
  },
  // form提交
  post_new: function() {
    wx.request({
      url: 'https://php.iweb365.top/index.php/Home/Message/get_information',
      method: 'POST',
      dataType: 'json',
      data: {
        "user_id": this.data.user_id,
        "username": this.data.nickname,
        "face_url": this.data.face_url,
        "goods_c": this.data.pick_index,
        "goods_title": this.data.info.goods_title,
        "content_url": this.data.content_url,
        "miss_place": this.data.info.miss_place,
        "date": this.data.info_date,
        "time": this.data.info_time,
        "contact": this.data.info.contact,
        "content": this.data.textareaAValue,
        "total_like": this.data.total_like,
        // "send_timestamp":this.data.send_timestamp
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.mes)
        console.log(res.data)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  get_all_message: function() {
    wx.request({
      url: 'https://php.iweb365.top/index.php/Home/Message/get_all_messages',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        console.log(res.data.data)
        this.setData({
          all_message: res.data.data
        })
        console.log(this.data.all_message)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  formsubmit(data) {

    // console.log(data.detail.value)
    this.setData({
      info: data.detail.value
    })
    console.log(this.data.info)
    var goods_title = data.detail.value.goods_title
    var miss_place = data.detail.value.miss_place
    var contact = data.detail.value.contact
    console.log(this.data.info)
    this.hideModal()
    // this.get_all_message()
    this.upload_image()

  },
  touchStart(e) {
    // console.log(e)
    this.setData({
      "touch_x": e.changedTouches[0].clientX,
      "touch_y": e.changedTouches[0].clientY
    });
  },
  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    this.setData({
      roll_x: this.data.touch_x - x,
      roll_y: this.data.touch_x - y
    })
    console.log(this.data.roll_x)
    console.log(this.data.roll_y)
  },
  PickerChange(e) {
    console.log(e.detail.value);
    this.setData({
      pick_index: e.detail.value
    })
  },
  onMyEvent: function(e) {
    //通过事件接收
    this.setData({
      modalName: '',
      isshow: e.detail.isshow,
    })
    console.log(this.data.isshow)
  },

  closeleft: function() {
    this.setData({
      isshow: false
    })
  },
  showModal(e) {
    this.setData({
      modalName: 'bottomModal',
      isshow: false
    })
  },
  // isLeftaction() {
  //   this.setData({
  //     showleft: true
  //   })
  //   console.log(this.data.showleft)
  // },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  TimeChange(e) {
    this.setData({
      info_time: e.detail.value
    })
    console.log(this.data.info_time)
  },
  DateChange(e) {
    this.setData({
      info_date: e.detail.value
    })
    console.log(this.data.info_date)
  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], //从相册选择,相机
      success: res => {
        // this.urlTobase64(res.tempFilePaths[0])
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths),
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },

  upload_image: function() {
    var images_list = []; //设置了一个空数组进行储存服务器端图片路径
    var that = this;
    for (var i = 0; i < that.data.imgList.length; i++) { //由于微信小程序一次只能上传一张图片，上传两张图片就要执行2次wx.uploadFile
      if (that.data.imgList.length == 1) { //当上传图片为1
        wx.uploadFile({
          url: 'https://php.iweb365.top/index.php/Home/Message/upload_img',
          filePath: that.data.imgList[i],
          name: 'photo',
          formData: null,
          success: function(res) {
            //console.log(res.data)
            //后端返回图片上传到服务器上边的地址的json
            //图片json转换数组
            var jsonObj = JSON.parse(res.data)
            console.log(jsonObj.url)
            images_list.push(jsonObj.url);
            if (that.data.imgList.length == images_list.length) { //只有当图片全部上传成功才能提交表单，因为表单只需要提交一次
              var images_str = images_list.join(",") //把存放图片地址的数组转化为以逗号分隔的字符串

              that.setData({
                content_url: images_str
              })
              console.log(that.data.content_url)
              that.post_new()
            }

          },
          fail: function(error) {}
        })
      }
    }
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除此图片？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
    console.log(this.data.textareaAValue)
  },


  onPageScroll: function(e) {
    // console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
    // console.log(this.data.floorstatus)
  },
  goTop: function(e) { // 一键回到顶部
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  get_words() {
    console.log(this.data.sys_date)
    wx.request({
      url: 'https://py.iweb365.top/words?title=' + this.data.sys_date,
      method: "get",
      success: res => {
        console.log(res.data)
        this.setData({
          day_note: res.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    console.log("当前时间戳为：" + timestamp);

    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

    console.log("当前时间：" + Y + '-' + M + '-' + D);
    var that = this;
    this.setData({
      sys_date: Y + '-' + M + '-' + D
    })
    console.log(this.data.sys_date)
    this.get_words()
    this.get_all_message()
    setTimeout((options) => {
      wx.lin.renderWaterFlow(this.data.all_message, false, () => {
        console.log('渲染成功')
      })
    }, 1000)
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
      }),
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
            url: 'https://py.iweb365.top/Openid?code='+code,
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
            }
          })
        }
      })
    wx.getStorage({
      key: 'user_confirm',
      success: res => {
        that.setData({
          isWAETDER: true
        })
        console.log(res)
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