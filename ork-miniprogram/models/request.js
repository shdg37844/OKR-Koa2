function request(options) {
  const token = wx.getStorageSync('token');

  const requestOptions = {
    ...options,
    header: {
      ...options.header, 
      'authorization': `Bearer ${token}`
    }
  };
  
  return new Promise((resolve, reject) => {
    wx.request({
      ...requestOptions,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
}

module.exports = request;



module.exports = request;
