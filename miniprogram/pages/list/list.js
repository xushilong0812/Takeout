// pages/list.js
const app=getApp()  //使用全局app
const db =wx.cloud.database()//使用云函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'../../img/user.png',
    name:"yAA20dasdasd",
    show:false,
   
  },
  // 跳转到登录页
  tapName:function(){
    console.log(2);
    wx.navigateTo({
      url:"../list/login/login",
    })
    
  },
  //登录成功 被 login页执行   设置用户信息  
  userInfo:function(data){
    console.log(1);
    if(data==''){
      let e=data
      this.setData({
        username:e?e.userPhone:'../../img/user.png',
        name:e?e.userName:"",
        show:e?true:false
      })
      
    }else{
      let e=app.userInfo
      this.setData({
        username:e?e.userPhone:'../../img/user.png',
        name:e?e.userName:"",
        show:e?true:false
      })
    }

  },
  // 退出登录
  taplogOut:function(){

    if(this.data.show){
      wx.navigateTo({
        url:"../list/out/out?show="+this.data,
      })
    }else{
      wx.navigateTo({
        url:"../list/login/login",
      })
    }
   
  },
  onReady:function(){
      //查找数据库信息，使用云函数，并显示在界面上
      wx.cloud.callFunction({
        name:'login',
          data:{
          }
      }).then(res=>{
        const openid=res.result.openid
        db.collection('users').where(
          {_openid:openid}
        ).get().then(res=>{
          app.userInfo=Object.assign(app.userInfo,res.data[0])
      this.setData({
        username:app.userInfo.userPhone,
        name:app.userInfo.userName,
        show:true
      })
        })
      })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */


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