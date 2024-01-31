// pages/todo_keyresult/todo_keyresult.js
const token = wx.getStorageSync('token');

Page({
  data: {
    todo_id:null,
    obj_id:null,
    objectives:[],
    keyresults:[],
  },
  Connect(e){
    let keyresults = this.data.keyresults;
    let index = e.currentTarget.dataset.id;
    //console.log('返回kr',keyresults)
    let arrayIndex = keyresults.findIndex(item => item.id === index)
    let id = this.data.todo_id;
    let that = this; 
    if (keyresults[arrayIndex].active === false) {
      wx.request({
        url: `http://localhost:3000/api/todo/${id}/keyresult`,
        method: 'POST',
        header: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        data: {
          todo_id:this.data.todo_id,
          kr_id:index,
        },
        success: function(res) {
          keyresults[arrayIndex].active = true;
          that.setData({ 
            keyresults:keyresults
          });
        },
      })
    }else if (keyresults[arrayIndex].active === true) {
      let associationId = keyresults[arrayIndex].associationId;
      let that = this;
      wx.request({
        url: `http://localhost:3000/api/todo/${id}/keyresult`,
        method: 'DELETE',
        data:{
          associationId:associationId
        },
        header: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        success: function(res) {
          keyresults[arrayIndex].active = false;
          that.setData({ 
            keyresults:keyresults
          });
        },
      })
    }
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let obj_id = options.objective_id;
    let todo_id = options.todo_id;
    this.setData({
      todo_id: todo_id,
      obj_id: obj_id,
    });
    this.getSelectedData(obj_id);
    this.getKRWithActive(todo_id);
    
  },
  getSelectedData(id) {
    wx.request({
      url: 'http://localhost:3000/okr/' + id,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let objectives = res.data.data.objective[0];
        let keyresults = res.data.data.keyresults;
        this.setData({
          objectives:objectives,
          keyresults:keyresults,
        })
      }
    })
  },
  getKRWithActive(id) {
    wx.request({
      url: `http://localhost:3000/todo/${id}/keyresult?obj_id=${this.data.obj_id}`,
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let keyresults = res.data.data;
        this.setData({
          keyresults:keyresults,
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
  onShow(options) {
    let obj_id = options.objective_id;
    let todo_id = options.todo_id;
    this.setData({
      todo_id: todo_id,
      obj_id: obj_id,
    });
    this.getSelectedData(obj_id);
    this.getKRWithActive(todo_id);
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