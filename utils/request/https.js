

const baseURL = 'https://douban-api.uieee.com/';


class Https {
  // 初始化构建函数
  constructor() {
    
  }

  // 私有 _
  _reuqest = (method, url, params)=> {
    const _url = baseURL + url;
  
    wx.showLoading({mask: true});
    return new Promise((resolve, reject)=>{
      var reqTask = wx.request({
        url: _url,
        data: params,
        header: {'Content-type':'json'},
        method: method,
        dataType: 'json',
        success: (result) => {
          resolve(result)
        },
        fail: () => {
          reject('请求失败')
        },
        complete: () => {
          wx.hideLoading();
        }
      });
    })
  }

  async get(url, params) {
    try {
      return await this._reuqest('GET', url, params)
    } catch (error) {
      return new Promise.reject(error)
    } 
  }

  async post(url, params) {
    try {
      return await this._reuqest('POST', url, params)
    } catch (error) {
      return new Promise.reject(error)
    }
  }
};

export default new Https()


