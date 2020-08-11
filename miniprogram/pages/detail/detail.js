const db = wx.cloud.database();
const _ = db.command;
const jobDetail = db.collection('jobDetail');
const jobList = db.collection('jobList')
const util = require("../utils/utils")
let app = getApp();
Page({
  data: {
    info: {},
    time: '',
    show: false,
    title: [],
    id: ''
  },

  onLoad: function (options) {
    let id = options.id;
    this.setData({
      id
    })
    this.getjobDetail(id)
  },
  getjobDetail(id){
    jobDetail.where({
      _id: id
    }).get().then((res) => {
      let info = res.data[0];
      let time = util.formatDate(info.date);
      this.setData({
        info,
        time
      })
    })
  },
  join() {
    jobList.get().then((res) => {
      if (res.data === 0) {
        wx.showToast({
          title: '请先上传简历'
        })
      } else {
        let title = [];
        for (let index = 0; index < res.data.length; index++) {
          title.push(res.data[index].title)
        }
        this.setData({
          show: true,
          columns: res.data,
          title
        })
      }
    })
  },
  onConfirm(e) {
    let {
      openid
    } = app.globalData;
    let {
      index,
      value
    } = e.detail;
    let date = new Date().getTime();
    let url = this.data.columns[index].url;
    let obj = {
      date,
      value,
      url,
      openid
    }
    //通过openid判断此职位用户是否重复投递
    jobDetail.where({
      //查询数组中的与此id相等，并且数组中openid对象相等的值的个数
      //如果等于0，说明还没有投，否则已经投过此职位
      _id: this.data.id,
      jobDocList: _.all([
        _.elemMatch({
          openid
        })     
      ])
    }).count().then((res) => {
      if (res.total === 0) {
        //还没投
        jobDetail.doc(this.data.id).update({
          data: {
            jobDocList: _.push(obj)
          }
        }).then((res) => {
          this.setData({
            show: false
          })
          wx.showToast({
            title: '报名成功'
          })
        })
      } else {
        this.setData({
          show: false
        })
        //已经投过此兼职
        wx.showToast({
          title: '您已报名此职位，无需重复报名',
          icon: 'none'
        })
      }
    }).catch(err=>{
      wx.showToast({
        title: '出错啦',
        icon: 'none'
      })
    })
  },
  onCancel(){
    this.setData({
      show: false
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    let id = this.data.id;
    this.getjobDetail(id)
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})