// pages/landg/landg.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    time: '--:--',
    date: '2020-01-01',
    imgList: [],
    textareaAValue: '',
    modalName: '',
    floorstatus: 0,
    isshow: false,
    picker: ['待认领', '寻找中'],
    left_list:{
      'part1':"只显示待认领",
      'part2':'只显示已拾获',
      'part3':'不限标签'
    },
    
    // showleft: app.globalData.Showleft,
    demo: [{
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559893694567&di=decd597a4206cdc46ff1c58f93d54a4e&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F49453126d099fdb7ae6489e01449281c004af3761e10e-tvDbXH_fw658',
        title: '显瘦中长款系带风衣',
        describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。',
        count: '888',
        delCount: '666'
      },
      {
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559893694566&di=9a26e26b870f520a931c93a817879427&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F11a8881842e35c7ff188fbf13f220d5f.jpeg',
        title: '酵素洗纯棉四件套',
        describe: '100%新疆精梳棉，柔软、厚实、光泽度好，颜色高级，2色可选颜色高级，2色可选,高级，2色可选',
        count: '459',
        delCount: '359'
      },
      {
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587576424521&di=c443c9fb3f791e48eeff20ba3a826f29&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F04%2F60%2F33%2F98586c9d54b5df4.jpg',
        title: '环保棉做的男女款衬衫',
        describe: '环保的高级长绒精梳棉，亲肤透气，安全无刺激，版型时髦有型，多款多色可选,环保的高级长绒精梳棉，亲肤透气，安全无刺激',
        count: '888',
        delCount: '666'
      },
      {
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559893795164&di=bbaa2db719d648f652058efb157735eb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F2cf875136ae0f6f9babe8fffff24730c00e27c6850d50-8AgKsJ_fw658',
        title: '自带线的快充移动电源',
        describe: '自带两条快充线，支持大部分快充设备充电，还能充笔记本电脑，有微电流模式,电脑，有微电流模式',
        count: '888',
        delCount: '666'
      },
      {
        image: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1644129458,1397664167&fm=11&gp=0.jpg',
        title: '显瘦中长款系带风衣',
        describe: '柔软顺滑、上身挺括显瘦，垂坠飘逸、不易皱好打理。不易皱好打理。',
        count: '888',
        delCount: '666'
      },
      {
        image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1559895137091&di=c7db1a52ecbe3886bf79b39e3da162a4&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20160204%2FImg436843528.jpg',
        title: '酵素洗纯棉四件套',
        describe: '100%新疆精梳棉，柔软、厚实、光泽度好，颜色高级，2色可选,100%新疆精梳棉，柔软、厚实、光泽度好，颜色高级，2色可选',
        count: '459',
        delCount: '359'
      }
    ]


  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  onMyEvent: function (e) {
    //通过事件接收
    this.setData({
      isshow: e.detail.isshow
    })
    console.log(this.data.isshow)
  },
  closeleft:function(){
    this.setData({
      isshow:false

    })
  },
  showModal(e) {
    this.setData({
      modalName: 'bottomModal',
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
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
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
    console.log(e)
    if (e.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
    console.log(this.data.floorstatus)
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.lin.renderWaterFlow(this.data.demo, false, () => {
      console.log('渲染成功')
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