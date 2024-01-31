// pages/okr_detail/okr_detail.js
const token = wx.getStorageSync('token');

Page({
  data: {
    obj_id:null,
    objectives:[],
    keyresults:[],
    todos:[],
    krIds:[],
  },

  kyDone(e) {
    let id = e.currentTarget.dataset.id;
    let keyresults = this.data.keyresults;

    wx.request({
      url: `http://localhost:3000/api/keyresult/${id}`,
      method: 'PUT',
      data: {
        KRcompleted:1
      },
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success: (res) => {
        let updateIndex = keyresults.findIndex(item => item.id === id)
        keyresults[updateIndex].KRcompleted = 1
        this.setData({
          showActionsheet: false,
          keyresults:keyresults
        });
      },
    });
  },

  onLoad(options) {
    let obj_id = options.objective_id;
    this.getSelectedData( obj_id);
    this.setData({
      obj_id: obj_id 
    });
  },

  getSelectedData(id) {
    wx.request({
      url: 'http://localhost:3000/okr/' +id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let objectives = res.data.data.objective[0];
        let keyresults = res.data.data.keyresults;
        let krIds = keyresults.map(item => item.id);
        //console.log('krid',krIds)
        this.setData({
          objectives:objectives,
          keyresults:keyresults,
          krIds:krIds
        },() => {
          // 在数据设置完成后再调用 getTodos
          this.getTodos();
      })
      }
    })
  },

  getTodos() {
    let keyresults = this.data.keyresults
    let kr_ids  = keyresults.map(item => item.id)
    wx.request({
      url: 'http://localhost:3000/api/todo/keyresult',
      method: 'POST',
      data: {
        kr_ids:kr_ids
      },
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let todos = res.data.data
        console.log('返回的',res.data.data)
        this.setData({
          todos:todos
        })
      }
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