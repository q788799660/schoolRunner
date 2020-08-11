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
    }],
    clickIndex: -1,
    selectIndex: -1,
    showMask: false,
    newTitle: ''
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
            this.onLoad();
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
  settingList(e){
    if(this.data.clickIndex === e.currentTarget.dataset.index) {
      this.closeSettingList();
      return;
    }
    this.setData({
      clickIndex: e.currentTarget.dataset.index
    })
  },
  del(e) {
    wx.showModal({
      title: '提示',
      content: '是否确认删除',
      success: (res)=>{
        if(res.confirm) {
          this.closeSettingList();
          let {_id} = this.data.myJobList[e.currentTarget.dataset.id];
          db.collection('jobList').doc(_id).remove().then(()=>{
            wx.showToast({
              title: '删除成功',
              duration: 1000,
              icon: 'success'
            })
            this.onLoad();
          }).catch((err)=>{
            console.log(err)
          })
        }else if(res.cancel){
          this.closeSettingList();
        }
      }
    })
  },
  rename() {
    if(this.data.newTitle === '') {
      wx.showToast({
        title: '请填写修改的简历标题',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let {_id} = this.data.myJobList[this.data.selectIndex];
    db.collection('jobList').doc(_id).update({
      data: {
        title: this.data.newTitle
      }
    }).then((e)=>{
      wx.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000
      })
      this.onLoad();
      this.setData({
        showMask: false
      })
    }).catch((err)=>{
      console.log(err)
    })
  },
  isShowAlert(e) {
    if(!this.data.showMask) {
      this.closeSettingList();
    }
    this.setData({
      showMask: !this.data.showMask,
      selectIndex: e.currentTarget.dataset.id
    })
  },
  closeSettingList() {
    this.setData({
      clickIndex: -1
    })
  }
})