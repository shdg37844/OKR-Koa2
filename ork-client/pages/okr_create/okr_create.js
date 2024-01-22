// pages/okr_create/okr_create.js
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
    console.log('indexxxx',index)
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

  handleAdd() {
    let objectiveValue = this.data.objectiveValue;
    let KRValue = this.data.KRValue;
    let Ocompleted = 0;
    let KRcompleted = 0;
    let createTime = new Date();

    if (!objectiveValue || KRValue.every(kr => !kr)) {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空',
      });
      return;
    }

    wx.request({
      url: 'http://localhost:3000/api/okr',
      method: 'POST',
      data: {
        Ocontent:objectiveValue,
        KRcontent:KRValue,
        create_at:createTime.toISOString(),
        Ocompleted:Ocompleted,
        KRcompleted:KRcompleted
      },
      success:(res) => {
        const ObjectiveId = res.data.data[0];
        const newObjective = { 
          id: ObjectiveId,
          Ocontent: objectiveValue,
          KRcontent:KRValue,
          create_at: createTime.toISOString(),
          Ocompleted:Ocompleted,
          KRcompleted:KRcompleted
         };
         app.globalData.objectives.push(newObjective);

        wx.showToast({
          title: '新增成功！',
          icon: 'none',
          duration: 500
        });
        this.setData({
          objectiveValue:'',
          KRValue:'',
          objectives: [...app.globalData.objectives],
          keyresults:[...app.globalData.keyresults]
        });
        setTimeout(() => {
          wx.switchTab({
            url: '/pages/okr/okr'
          });
        },500);
    }
    })
    

  },


  onLoad(options) {
    this.getObjectiveData();
    this.getKRData();
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
   getKRData() {
    wx.request({
      url: 'http://localhost:3000/keyresult',
      method: 'GET',
      success:(res) => {
        app.globalData.keyresults = res.data.data;
        this.setData({
          keyresults:app.globalData.keyresults
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