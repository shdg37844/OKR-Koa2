const request = require('./request.js');

function login() {
  return new Promise((resolve, reject) => {
    wx.login({
      success: res => {
        request({
          url: 'http://localhost:3000/api/login', 
          method: 'POST',
          data: {
            code: res.code
          },
        }).then(response => {
          const { token } = response.data;
          if (token) {
            wx.setStorageSync('token', token); 

            //console.log('Token saved:', token); 
          } else {
            console.log('No token received');
          }
          resolve(token);
        }).catch(err => {
          reject(err);
        });
      },
      fail: err => {
        reject(err);
      }
    });
  });
}


// function login() {
//   wx.login({
//     success: res => {
//       const token = wx.getStorageSync('token') || '';
//       wx.request({
//         url: 'http://localhost:3000/api/login',
//         method: 'POST',
//         header: {
//           'Content-Type': 'application/json',
//           'authorization': `Bearer ${token}`
//         },
//         data: {
//           code: res.code
//         },
//         success: function(response) {
//           const { token } = response.data;
//           if (token) {
//             wx.setStorageSync('token', token);
//             wx.switchTab({
//               url: '/pages/todo/todo'
//             });
//           } else {
//             console.log('No token received');
//           }
//         },
//         fail: function(err) {
//           console.error('登录请求失败:', err);
//         }
//       });
//     },
//     fail: err => {
//       console.error('wx.login 失败:', err);
//     }
//   });
// }


module.exports = {
  login
};
