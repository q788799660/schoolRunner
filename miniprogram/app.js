//app.js
App({
  onLaunch: function () {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'icloud-pw23n',
        traceUser: true,
      })
    }
    this.getUser()
    this.globalData = {}
  },
  getUser() {
    wx.cloud.callFunction({
      name: 'login'
    }).then((res) => {
      this.globalData.openid = res.result.openid;
    })
  },

})