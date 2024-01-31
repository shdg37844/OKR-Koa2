// pages/okr_edit/okr_edit.js
const app = getApp();
const token = wx.getStorageSync('token');

Page({
  data: {
    objectives:[],
    keyresults:[],
    objectiveValue:'',
    KRValue:[''],
    id:null,
  },
  handleObjectiveChange(event) {
    let newObjValue = { ...this.data.objectiveValue, Ocontent: event.detail.value };
    this.setData({
      objectiveValue: newObjValue
    });
  },
  handleKRChange(event) {
    let index = event.currentTarget.dataset.index;
    let KRValue = this.data.KRValue
    let newKRValue = { ...KRValue[index], KRcontent: event.detail.value }
    KRValue[index] = newKRValue;
    this.setData({
      KRValue: KRValue
    });
  },
  onTapDel(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let KRValue = this.data.KRValue;
    
    wx.request({
      url: `http://localhost:3000/api/keyresult/${id}`,
      method: 'DELETE',
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {
        KRValue.splice(index,1);
        this.setData({
          KRValue: KRValue
        })
      }
    });
  },
  onTapAdd:function(e){
    let KRValue = this.data.KRValue;
    KRValue.push('');
    this.setData({
      KRValue:KRValue
    })

   },
   handleSave() {
    let id = this.data.id;
    let objectiveValue = this.data.objectiveValue;
    let KRValue = this.data.KRValue;

    if (!objectiveValue || KRValue.every(kr => !kr)) {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空',
      });
      return;
    }

    wx.request({
      url: 'http://localhost:3000/api/okr/' +id,
      method: 'PUT',
      data:{
        Ocontent:objectiveValue,
        KRcontent:KRValue,
        KRcompleted:0
      },
      header: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      },
      success:(res) => {

        wx.showToast({
          title: '修改成功！',
          icon: 'none',
        });
      }
    })
   },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.objective_id;
    this.getSelectedData(id);
    this.setData({
      id: id 
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
        //console.log('resss',res.data.data.objective[0])
        let keyresults = res.data.data.keyresults;
        //console.log('krrrr',res.data.data.keyresults)
        this.setData({
          objectives:objectives,
          objectiveValue:objectives,
          keyresults:keyresults,
          KRValue:keyresults
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