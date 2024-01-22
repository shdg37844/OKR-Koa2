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
          }
        }).then(response => {
          const { token } = response.data;
          if (token) {
            wx.setStorageSync('token', token); 
            console.log('Token saved:', token); 
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

module.exports = {
  login
};
