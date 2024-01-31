// pages/okr/okr.js
const app = getApp();
const token = wx.getStorageSync('token');

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
    keyresults:[],
    index:null
  },

  btnClick(e) {
    let btnindex = e.detail.index;
    let index = this.data.index;
    if (this.data.groups[btnindex].value === 1) {
      let url = `/pages/okr_detail/okr_detail?objective_id=${index}`
      wx.navigateTo({url})
      this.setData({
        showActionsheet: false
      })
    }else if (this.data.groups[btnindex].value === 2) {
      let url = `/pages/okr_edit/okr_edit?objective_id=${index}`
      wx.navigateTo({url})
      this.setData({
        showActionsheet: false
      })
    }else if (this.data.groups[btnindex].value === 3) {
      this.okrDone();
    }else if (this.data.groups[btnindex].value === 4) {
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
      index:index
    })
  },
  okrDone() {
    let id = this.data.index;
    let objectives = this.data.objectives;

    wx.request({
      url: `http://localhost:3000/api/okr/${id}`,
      method: 'PUT',
      data: {
        Ocompleted:1
      },
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success: (res) => {
        let updateIndex = objectives.findIndex(item => item.id === id)
        objectives[updateIndex].Ocompleted = 1
        this.setData({
          showActionsheet: false,
          objectives:objectives
        });
      },
    });
  },
  delete() {
    let id = this.data.index
    let objectives = this.data.objectives
    wx.request({
      url: `http://localhost:3000/api/okr/${id}`,
      method: "DELETE",
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let deleteIndex = objectives.findIndex(item => item.id === id);
        if (deleteIndex !== -1) {
          objectives.splice(deleteIndex,1);
          this.setData({
            objectives:objectives,
            showActionsheet: false
          });
        }
      }
    })
  },

  onLoad(options) {
    this.getObjectiveData();
    this.getKeyresultData();
  },
  getObjectiveData() {
    wx.request({
      url: 'http://localhost:3000/objective',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let objectives = res.data.data;
        this.setData({
          objectives:objectives
        })
      }
    })
   },
   getKeyresultData() {
    wx.request({
      url: 'http://localhost:3000/keyresult',
      method: 'GET',
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        let keyresults = res.data.data;
        this.setData({
          keyresults:keyresults
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
    this.getObjectiveData();
    this.getKeyresultData();
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