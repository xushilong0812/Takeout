// miniprogram/pages/list/tapImg/tapImg.js
const app=getApp()
const db =wx.cloud.database()//使用云函数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:""
  },
//更换头像
tapImg(){

  wx.chooseImage({
    count: 1,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success :(res) =>{
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
     
      this.setData({username:tempFilePaths[0]})
    }
  })
},
handleBtn(){
    wx.showLoading({
      title: '上传中',
    })
  let cloudPath='userPhoto/'+app.userInfo._openid+Date.now()+'.jpg'
  wx.cloud.uploadFile({
    cloudPath,
    filePath:this.data.username
  }).then((res)=>{
    let fileID=res.fileID
    if(fileID){
      db.collection('users').doc(app.userInfo._id).update({
        data:{
          userPhone:fileID
        }
      }).then((res)=>{
        wx.showLoading()//关闭
        wx.showToast({
          title: '上传成功',
          
        })
        const pages = getCurrentPages();//获取页面栈 执行
        const beforePage = pages[pages.length - 2];  //前一个页面

        wx.navigateBack({ //跳转到前一个页面
          success: function () {
            //调用前一个页面的方法beforePage.userinfo()
        
          }
          })
        app.userInfo.userPhone=fileID

        console.log(fileID,app.userInfo);
        
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
    
    this.setData({username:app.userInfo.userPhone})
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