// pages/okr/okr.js
const app = getApp();

Page({
  data: {
    showActionsheet: false,
    groups: [
        { text: '查看', value: 1 },
        { text: '编辑', value: 2 },
        { text: '已完成', value: 3 },
        { text: '删除', value: 4 }
    ],
    objectives:[],
    index:null
  },

  btnClick(e) {
    let btnindex = e.detail.index;
    if (this.data.groups[btnindex].value === 1) {
      let url = '/pages/okr_detail/okr_detail'
      wx.navigateTo({url})
      this.setData({
        showActionsheet: false
      })
    }else if (this.data.groups[btnindex].value === 2) {
      let index = this.data.index;
      let url = `/pages/okr_edit/okr_edit?objective_id=${index}`
      wx.navigateTo({url})
      this.setData({
        showActionsheet: false
      })
    }else if (this.data.groups[btnindex].value === 3) {

    }else if (this.data.groups[btnindex].value === 4) {

    }else {
      this.setData({
        showActionsheet: false
      })
    }
  },
  Click(e) {
    let index = e.currentTarget.dataset.id;
    this.setData({
      showActionsheet: true,
      index:index
    })
  },

  onLoad(options) {
    this.getObjectiveData();
  },
  getObjectiveData() {
    wx.request({
      url: 'http://localhost:3000/objective',
      method: 'GET',
      success:(res) => {
        app.globalData.objectives = res.data.data;
        this.setData({
          objectives:app.globalData.objectives
        })
      }
    })
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