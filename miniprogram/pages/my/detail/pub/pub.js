const db = wx.cloud.database();
const jobDetail = db.collection('jobDetail')
Page({
  data: {
    show: false,
    title: '',
    phone: '',
    address: '',
    tag: '',
    context: '',
    columns: ['写作', '服务生', '快递分拣', '送餐员', '家教', '其他']
  },

  onLoad: function (options) {

  },
  onTitle(e) {
    this.setData({
      title: e.detail
    })
  },
  onPhone(e) {
    this.setData({
      phone: e.detail
    })
  },
  onAddress(e) {
    this.setData({
      address: e.detail
    })
  },
  onTag(e) {
    this.setData({
      tag: e.detail
    })
  },
  onContext(e) {
    this.setData({
      context: e.detail.value
    })
  },
  isShow() {
    this.setData({
      show: true
    })
  },
  pub() {
    let date = new Date().getTime();
    
    let tag = this.data.tag;
    let t = '';
    let {address,title,phone,context} = this.data;
    if(!this.checkPhone(phone)){
      wx.showToast({
        title: '手机号不正确',
        icon: 'none'
      })
      return;
    }
    switch (tag) {
      case '写作':
        t = 'write'
        break;
      case '家教':
        t = 'teach'
        break;
      case '快递分拣':
        t = 'fastMail'
        break;
      case '服务生':
        t = 'waiter'
        break;
      case '送餐员':
        t = 'takeOut'
        break;
      default:
        t = this.data.tag;
        break;
    };
    jobDetail.add({
      data:{
        address,
        title,
        phone,
        context,
        date,
        tagName:tag,
        tag:t
      }
    }).then((res)=>{
      wx.showToast({
        title: '发布成功',
        icon: 'success'
      })
    })
  },
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    
    this.setData({
      tag: value,
      show: false
    })
  },
  onCancel() {
    this.setData({
      show: false
    })
  },
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  checkPhone(phone){
    let reg = /1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}/g
    return reg.test(reg);
  }
})