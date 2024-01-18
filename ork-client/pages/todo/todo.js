// pages/todo/todo.js
const app = getApp();

Page({
  data: {
    showActionsheet: false,
    groups: [
        { text: '关联', value: 1 },
        { text: '完成', value: 2 },
        { text: '删除', value: 3 }
    ],
    todo:[],
    value:'',
    index:null,
  },
  btnClick(e) {
    let index = e.detail.index;
    if (this.data.groups[index].value === 1) {
      // let url = '/pages/todo_keyresult/todo_keyresult'
      // wx.navigateTo({url})
    }else if (this.data.groups[index].value === 2) {
      this.todoDone();
    }else if (this.data.groups[index].value === 3) {
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
  handleChange(event) {
    this.setData({
      value:event.detail.value
    });
  },
  handleAdd() {
    let value = this.data.value;
    let completed = 0;
    let createTime = new Date();
    let todo = this.data.todo;

    if (!value) {
      wx.showToast({
        icon: 'none',
        title: '内容不能为空',
      });
      return;
    }
  
    wx.request({
      url: 'http://localhost:3000/api/todos',
      method: 'POST',
      data: {
        todo: value,
        create_at: createTime.toISOString(),
        completed:completed
      },
      success: (res) => {
        const insertedId = res.data.data[0];
        const newTodo = { 
          id: insertedId,
          todo: value,
          create_at: createTime.toISOString(),
          completed:completed
         };
         app.globalData.todo.push(newTodo);
        this.setData({
          value: '',
          todo: [...app.globalData.todo],
        });
        wx.showToast({
          title: '添加成功！',
          icon: 'none',
        });
      },
    });
  },
  delete() {
    let id = this.data.index
    let todo = this.data.todo;

    wx.request({
      url: `http://localhost:3000/api/todos/${id}`,
      method: 'DELETE',
      success: (res) => {
        let deleteIndex = app.globalData.todo.findIndex(item => item.id === id)
        if (deleteIndex !== -1) {
          app.globalData.todo.splice(deleteIndex,1); 
          this.setData({
            todo:app.globalData.todo,
            showActionsheet: false
          });
        }
      },
    });
  },
  todoDone(e) {
    let id = this.data.index;
    //let todo = this.data.todo;
    wx.request({
      url: `http://localhost:3000/api/todos/${id}`,
      method: 'PUT',
      data: {
        completed:1
      },
      success: (res) => {
        let updateIndex = app.globalData.todo.findIndex(item => item.id === id)
        app.globalData.todo[updateIndex].completed = 1
        this.setData({
          showActionsheet: false,
          todo:app.globalData.todo
        });
      },
      fail: function (error) {
        console.error('请求失败', error);
      }
    });
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