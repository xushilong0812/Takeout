// miniprogram/pages/login/login.js
const db =wx.cloud.database()//使用云函数
const app=getApp() //使用全局app
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //获取用户信息
  bindGetUserInfo ({detail:e}) {
    const pages = getCurrentPages();//获取页面栈
    const beforePage = pages[pages.length - 2];  //前一个页面
    wx.navigateBack({ //跳转到前一个页面
      success: function () {
        //调用前一个页面的方法updateTime()。
        db.collection('users').add({
              data:{
                userPhone:e.userInfo.avatarUrl,
                userName:e.userInfo.nickName,
                sex:e.userInfo.gender
              }
        }).then(res => {
          db.collection('users').doc(res._id).get().then(res=>{
                 app.userInfo=Object.assign(app.userInfo,res.data)
                 beforePage.userInfo(e.userInfo); 
          })
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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