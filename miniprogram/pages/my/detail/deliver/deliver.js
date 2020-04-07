const util = require('../../../utils/utils');
const db = wx.cloud.database();
const jobDetail = db.collection('jobDetail');
const _ = db.command;
const app = getApp();
Page({

  data: {
    list: []
  },

  onLoad: function (options) {
    this.getJobDetail();
  },
  getJobDetail(){
    let { openid } = app.globalData;
    jobDetail.where({
      jobDocList: _.elemMatch({
        openid
      })
    }).get().then((res)=>{
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        let date = element.jobDocList[0].date;
        element.jobDocList[0].date = util.formatDate(date)
      }
      this.setData({
        list: res.data
      })
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getJobDetail();
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})