// pages/welcome/welcome.js
const user = require('../../models/user.js');

Page({
  data: {
    
  },

  onLoad(options) {
    const token = wx.getStorageSync('token') || ''

    if(token) {
      wx.switchTab({
        url: '/pages/todo/todo',
      })
    }
  },
  loginBtn() {
    user.login().then(() => {
      wx.switchTab({
        url: '/pages/todo/todo'
      });
    }).catch(err => {
      console.log('登录失败:', err);
    });
  },




  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})