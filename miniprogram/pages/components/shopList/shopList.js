// miniprogram/pages/components/shopList/shopList.js
const db=wx.cloud.database()
const utils = require('../../../utils/utils.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    menu:{},
    latitude:"",
    longitude:"",
    listmap:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let id=options.id
      db.collection("detail").where({id:id}).get().then(res=>{
        // res.data[0].list.detailInfo.newrating   获取星级评论
        utils.star(res.data[0].list.detailInfo.newrating)
         
        //处理菜单
         let a= res.data[0].list.detailInfo.menu[0].filter(item=>{
               return item.subtype===2
          })
          res.data[0].list.detailInfo.menu.push(a)
          console.log(res.data[0].list);
          this.setData({list:res.data[0].list})

      })
  },
// 地图跳转
tapmap(e){
  console.log(e.currentTarget.dataset.data);
  this.setData({listmap:e.currentTarget.dataset.data})
  wx.getLocation({
    type: 'gcj02', //返回可以用于wx.openLocation的经纬度
    success : (res) =>{
      const latitude = this.data.listmap.lat
      const longitude = this.data.listmap.lng
      const uname = this.data.listmap.name
      const address = this.data.listmap.addr
      wx.openLocation({
        latitude,
        longitude,
        scale: 10,
        name:uname,
        address:address
      })
    }
   })
},
// 支付页面跳转
tappay(){
  wx.navigateTo({
    url: './pay/pay',
  })

},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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