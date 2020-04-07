const db = wx.cloud.database();
const jobDetail = db.collection('jobDetail');
const info = db.collection('info')
const util = require('../utils/utils')
Page({
  data :{
    swiper:[{
      img:"../../images/swiper/swiper1.jpg"
    },{
      img:"../../images/swiper/swiper2.jpg"
    },{
      img:"../../images/swiper/swiper3.jpg"
    }
  ],
    list:[{
      img:"/images/icon/write.png",
      text:"写作",
      tag:"write"
    },{
      img:"/images/icon/teach.png",
      text:"家教",
      tag:'teach'
    },{
      img:"/images/icon/fastMail.png",
      text:"快递分拣",
      tag:"fastMail"
    },{
      img:"/images/icon/waiter.png",
      text:"服务生",
      tag:"waiter"
    },{
      img:"/images/icon/takeOut.png",
      text:"送餐员",
      tag:"takeOut"
    },{
      img:"/images/icon/invite.png",
      text:"邀请",
      tag:"invite"
    }
  ],
    fire:[],
    new:[],
    activeNames: ['1'],
    notice:"公告",
    fireTime:''
  },
  onLoad(){
    this.getjobDetail();
  },
  getjobDetail(){
    jobDetail.orderBy('date','desc').limit(7).get().then((res)=>{
      let re = res.data;
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i];
        res.data[i].date = util.formatDate(element.date);
      }
      this.setData({
        new: re
      })
    })
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },
  detail(e){
    let id = e.currentTarget.dataset.id;
    let type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  },
  tagDetail(e){
    let name = e.currentTarget.dataset.name;
    
    if(name === 'invite'){
      wx.showToast({
        title: '功能待完善',
        icon: 'none'
      })
      // wx.navigateTo({
      //   url: '../my/detail/invite/invite',
      // })      
    }else{
      wx.navigateTo({
        url: '../tagList/tagList?name=' + name,
      })
    }
  },
  search(){
    wx.navigateTo({
      url: '../search/search',
    })
  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getjobDetail();
    //模拟加载
    setTimeout(function () {
      // complete
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    }, 1500);
  }
})
