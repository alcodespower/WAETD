let localData = require("../../Datas/news.js")
const app = getApp();

Page({

  data: {
    ColorList: app.globalData.ColorList,
    TabCur: 0,
    showSkeleton: true, //骨架屏显示隐藏
    scrollLeft: 0,
    top: 0,
    isShowLoad:true,
    navList: [{
      index: 0,
      title: "菁菁校园"
    }, {
      index: 1,
      title: "心闻速递"
    }, {
      index: 2,
      title: "服务指南"
    }],
    scrollLeft: 0,
    cardCur: 0,
    newsdata: [],
    workerId: 0,
    news_content: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://www.nytdc.edu.cn/uploadfile/2019/1113/20191113101325632.png'
    }, {
      id: 1,
      type: 'image',
      url: 'http://www.nytdc.edu.cn/uploadfile/2019/1113/20191113030127260.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://www.nytdc.edu.cn/uploadfile/2019/0829/20190829041443565.png'
    }, {
      id: 3,
      type: 'image',
      url: 'http://www.nytdc.edu.cn/uploadfile/2019/1111/20191111104358485.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'http://www.tdxy.com.cn/uploadfile/2015/0318/20150318031409504.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'http://www.nytdc.edu.cn/uploadfile/2017/1114/20171114083631805.png'
    }, {
      id: 6,
      type: 'image',
      url: 'http://www.tdxy.com.cn/uploadfile/2014/0317/20140317101756814.jpg'
    }],
  },
  // bindViewTap: function (event) {
  //   event.currentTarget.dataset.alphaBeta ===1 // - 会转为驼峰写法
  //   event.currentTarget.dataset.alphabeta === 2 // 大写会转为小写
  //   console.log(event.currentTarget.dataset.alphaBeta)
  // },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    console.log(this.data.TabCur)
  },
  swiperTab: function(e) {
    console.log(e)
    this.setData({
      TabCur: e.detail.current
    })
  },
  onPageScroll: function(e) {
    // let that = this;
    // that.setData({
    //   top: e.detail.scrollTop
    // });
    // console.log("doit")
    // console.log(this.data.top)
  },


  get_item_id(e) {
    this.setData({
      workerId: e.currentTarget.dataset.workerId,
    })


    console.log(this.data.workerId)
    this.toNewsDetail()
  },
  to_login(){
    wx.navigateTo({
      url: '/pages/login/login',
      success: function(res) {
        wx.showLoading({
          title: 'loading',
        })
      },
      fail: function(res) {},
      complete: function(res) {
        setTimeout(()=>{
          wx.hideLoading()
        },1000)
      },
    })
  },
  toNewsDetail() {
    // e.currentTarget.dataset.workerId // - 会转为驼峰写法
    // console.log(e.currentTarget.dataset.workerId)
    this.setData({
      news_content: this.data.newsdata[this.data.workerId]
    })
    wx.navigateTo({
      url: '/pages/homepage/newsdetail?news_content=' + JSON.stringify(this.data.news_content),
      success: res => {
        console.log(res)
        console.log(this.data.workerId)
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad() {
    const that = this;
    setTimeout(() => { //3S后隐藏骨架屏
      that.setData({
        showSkeleton: false,
        isShowLoad:false
      })
      console.log(this.data.showSkeleton)
    }, 3000)
    
    console.log(this.data.isShowLoad)

    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    this.setData({
      newsdata: localData.testJsonList
    })
    console.log(this.data.newsdata)
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // // towerSwiper触摸开始
  // towerStart(e) {
  //   this.setData({
  //     towerStart: e.touches[0].pageX
  //   })
  // },
  // // towerSwiper计算方向
  // towerMove(e) {
  //   this.setData({
  //     direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
  //   })
  // },
  // // towerSwiper计算滚动
  // towerEnd(e) {
  //   let direction = this.data.direction;
  //   let list = this.data.swiperList;
  //   if (direction == 'right') {
  //     let mLeft = list[0].mLeft;
  //     let zIndex = list[0].zIndex;
  //     for (let i = 1; i < list.length; i++) {
  //       list[i - 1].mLeft = list[i].mLeft
  //       list[i - 1].zIndex = list[i].zIndex
  //     }
  //     list[list.length - 1].mLeft = mLeft;
  //     list[list.length - 1].zIndex = zIndex;
  //     this.setData({
  //       swiperList: list
  //     })
  //   } else {
  //     let mLeft = list[list.length - 1].mLeft;
  //     let zIndex = list[list.length - 1].zIndex;
  //     for (let i = list.length - 1; i > 0; i--) {
  //       list[i].mLeft = list[i - 1].mLeft
  //       list[i].zIndex = list[i - 1].zIndex
  //     }
  //     list[0].mLeft = mLeft;
  //     list[0].zIndex = zIndex;
  //     this.setData({
  //       swiperList: list
  //     })
  //   }
  // }
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    
    console.log(this.data.workerId)

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