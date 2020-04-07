const db = wx.cloud.database();
const jobDetail = db.collection('jobDetail')
const util = require('../utils/utils')
Page({

  data: {
    new:[],
    page: 0
  },
  onLoad(options){
    this.getNew();
  },
  getNew(){
    jobDetail.get().then((res)=>{
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        res.data[i].date = util.formatDate(element.date);
      }
      this.setData({
        new: res.data
      })
    }).catch(res=>{
      
    })
  },
  // 上拉触底
  onReachBottom: function() {
    let page = this.data.page + 20;
    jobDetail.skip(page).get().then((res)=>{
      let newData = res.data;
      let oldData = this.data.new;
      this.setData({
        new: oldData.concat(newData),
        page
      })
    })
  },
  detail(e){
    
    let {id,type} = e.target.dataset;
    wx.navigateTo({
      url: '../detail/detail?id='+ id + '&type=' + type
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getNew();
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})