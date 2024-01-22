function request(options) {
  const token = wx.getStorageSync('token');
  const requestOptions = {
    ...options,
    header: {
      ...options.header, 
      'Authorization': `Bearer ${token}`
    }
  };

  console.log('Sending request with options:', requestOptions); 

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