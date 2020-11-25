// pages/list.js
const db =wx.cloud.database()//使用云函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:[],
    show:1,
    list: [
      [
        {
          title: "外卖",
          imgUrl: "../../img/top1.png"
        }, {
          title: "美食",
          imgUrl: "../../img/top1.png"
        }, {
          title: "酒店",
          imgUrl: "../../img/top1.png"
        }, {
          title: "休闲玩乐",
          imgUrl: "../../img/top1.png"
        }, {
          title: "电影",
          imgUrl: "../../img/top1.png"
        }
      ],
      [
        {
          title: "秒杀",
          imgUrl: "../../img/top2.png"
        }, {
          title: "包邮",
          imgUrl: "../../img/top2.png"
        }, {
          title: "特惠",
          imgUrl: "../../img/top2.png"
        }, {
          title: "神卷",
          imgUrl: "../../img/top2.png"
        }, {
          title: "遍历",
          imgUrl: "../../img/top2.png"
        }
      ]
    ],
    navHeight: '',
    menuButtonInfo: {},
    searchMarginTop: 0, // 搜索框上边距
    searchWidth: 0, // 搜索框宽度
    searchHeight: 0 // 搜索框高度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
   
    this.setData({
      menuButtonInfo: wx.getMenuButtonBoundingClientRect()
    })
    console.log(this.data.menuButtonInfo)
    const { top, width, height, right } = this.data.menuButtonInfo
    wx.getSystemInfo({
      success: (res) => {
        const { statusBarHeight } = res
        const margin = top - statusBarHeight
        console.log( height + statusBarHeight + (margin * 2));
        this.setData({
          navHeight: (height + statusBarHeight + (margin * 2)),
          searchMarginTop: statusBarHeight + margin, // 状态栏 + 胶囊按钮边距
          searchHeight: height,  // 与胶囊按钮同高
          searchWidth: right - width // 胶囊按钮右边坐标 - 胶囊按钮宽度 = 按钮左边可使用宽度
        })
      
      },
    })
  },
  //页面今日特价/猜你喜欢
  tapshow:function(e){
 this.setData({show:e.target.dataset.show})
    console.log(e.target.dataset);
    
  },
  //跳转到详情页
  taprouter(e){
    console.log(e.currentTarget.dataset.id);
     wx.navigateTo({//传递详情页数据
       url: '../components/shopList/shopList?id='+e.currentTarget.dataset.id,
     })
    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   db.collection('shop_list').doc({}).get().then(res=>{
     this.setData({shop:res.data.list})
     console.log(res.data.list);
     
   })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})