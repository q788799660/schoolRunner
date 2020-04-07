const db = wx.cloud.database();
const jobDetail = db.collection('jobDetail')
const util = require('../utils/utils')
Page({
  data: {
    info:[],
    name:''
  },
  onLoad: function (options) {
    let name = options.name;
    this.setData({
      name
    })
    this.getjobDetail(name)
  },
  getjobDetail(name){
    jobDetail.where({
      tag:name
    }).get().then((res)=>{
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        res.data[i].date = util.formatDate(element.date);
      }
      this.setData({
        info: res.data
      })
    })
  },
  detail(e){
    let {id,type} = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id='+ id + '&type=' + type
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getjobDetail(this.data.name)
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})