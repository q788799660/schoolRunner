const db = wx.cloud.database();
const jobDetail = db.collection('jobDetail')
const _ = db.command;
const util = require('../utils/utils')
Page({

  data: {
    new: []
  },
  onLoad: function (options) {

  },
  onChange(e) {
    if (!e.detail) {
      this.setData({
        new: []
      })
      return;
    }
    util.debounce(() => {
      let key = new db.RegExp({
        regexp: e.detail,
        options: "i"
      })
      jobDetail.where({
          title: key
        },
        _.or([{
          context: key
        }])
      ).get().then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          const element = res.data[i];
          res.data[i].date = util.formatDate(element.date);
        }
        this.setData({
          new: res.data
        })
      })
    }, 250)
  },
  onSearch(e) {
    
  },
  detail(e){
    let id = e.target.dataset.id;
    let type = e.target.dataset.type;
    wx.navigateTo({
      url: '../detail/detail?id='+ id + '&type=' + type
    })
  }
})