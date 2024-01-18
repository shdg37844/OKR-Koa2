// pages/okr_edit/okr_edit.js
const app = getApp();

Page({
  data: {
    objectives:[],
    keyresults:[],
    objectiveValue:'',
    KRValue:['']
  },
  handleObjectiveChange(event) {
    this.setData({
      objectiveValue: event.detail.value
    });
  },
  handleKRChange(event) {
    let index = event.currentTarget.dataset.index;
    let KRValue = this.data.KRValue
    KRValue[index] = event.detail.value;
    this.setData({
      KRValue: KRValue
    });
  },
  onTapDel(e) {
    let index = e.currentTarget.dataset.index;
    let KRValue = this.data.KRValue;
    KRValue.splice(index,1);
    this.setData({
      KRValue: KRValue
    })
  },
  onTapAdd:function(e){
    let KRValue = this.data.KRValue;
    KRValue.push('');
    this.setData({
      KRValue:KRValue
    })
   },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.objective_id;
    this.getSelectedData(id)
  },
  getSelectedData(id) {
    wx.request({
      url: 'http://localhost:3000/okr/' +id,
      method: 'GET',
      success:(res) => {
        app.globalData.objectives = res.data.data.objective[0];
        app.globalData.keyresults = res.data.data.keyresults;
        this.setData({
          objectives:app.globalData.objectives,
          objectiveValue:app.globalData.objectives,
          keyresults:app.globalData.keyresults,
          KRValue:app.globalData.keyresults
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