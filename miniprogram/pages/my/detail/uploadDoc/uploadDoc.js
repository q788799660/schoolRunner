const db = wx.cloud.database();
const jobList = db.collection('jobList');
const app = getApp();
const util = require('../../../utils/utils')
Page({

  data: {
    icon: ["/images/icon/arrow_down.png","/images/icon/arrow_up.png"],
    show: true,
    myJobList: [{
      title: 'asd',
      url: 'asd',
      date: 'asd'
    }]
  },

  onLoad: function (options) {
    jobList.where({
      _openid: app.globalData.openid
    }).get().then((res)=>{
      let myJobList = res.data;
      this.setData({
        myJobList
      })
    })
  },
  upload(){
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success:(res)=>{
        let tempFilePaths = res.tempFiles[0].path
        let title = res.tempFiles[0].name;
        let date = new Date().getTime();
        let time = util.formatDate(date)
        wx.cloud.uploadFile({
          filePath: tempFilePaths,
          cloudPath:`jobDoc/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + tempFilePaths.match(/\.[^.]+?$/)[0]
        }).then((res)=>{
          let jobDoc = res.fileID
          jobList.add({
            data:{
              title,
              date: time,
              url: jobDoc
            }
          }).then((res)=>{
            wx.showToast({
              title: '上传成功',
              icon: 'success'
            })
          })
        })
      }
    })

  },
  onChange: function(params) {
    let show = this.data.show;
    this.setData({
      show: !show
    })
  },
  openDoc(e){
    
    let i = e.currentTarget.dataset.index;
    let fileID = this.data.myJobList[i].url
    wx.cloud.getTempFileURL({
      fileList: [fileID],
      success: res => {
        
        let url = res.fileList[0].tempFileURL;
        wx.downloadFile({
          url,
          success: function (res) {
            const filePath = res.tempFilePath
            wx.openDocument({
              filePath,
              success: function (res) {
                
              }
            })
          }
        })
      }
    })

  },

})