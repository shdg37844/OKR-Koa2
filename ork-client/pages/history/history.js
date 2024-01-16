// pages/history/history.js
const app = getApp();

Page({
  data: {
    showActionsheet: false,
    groups: [
      { text: '删除', value: 1 }
    ],
    todo:[],
    index:null
  },
  btnClick(e) {
    let index = e.detail.index;
    if (this.data.groups[index].value === 1) {
      this.delete();
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
      index: index,
    })
  },
  delete() {
    let id = this.data.index

    wx.request({
      url: `http://localhost:3000/api/todos/${id}`,
      method: "DELETE",
      success:(res) => {
        let deleteIndex = app.globalData.todo.findIndex(item => item.id === id);
        if (deleteIndex !== -1) {
          app.globalData.todo.splice(deleteIndex,1);
          this.setData({
            todo:app.globalData.todo,
            showActionsheet: false
          });
        }
      }
    })
  },
 
  onLoad(options) {
    this.getAllTodos();
  },
  getAllTodos() {
    wx.request({
      url: 'http://localhost:3000/todos',
      method: 'GET',
      success:(res) => {
        app.globalData.todo = res.data.data;
        this.setData({
          todo:app.globalData.todo
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