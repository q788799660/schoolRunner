function formatDate(date){
  let time = new Date(date)
  let year = time.getFullYear();
  let month = time.getMonth() < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
  let Day = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
  let hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  let minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  let result = year + '-' + month + '-' + Day  + ' ' + hours + ':' + minute;
  return result
}
function getImageInfo(url) {
  return new Promise((reslove,reject)=>{
    wx.getImageInfo({
      src: url,
      success: reslove,
      fail: reject
    })
  })
}
var time = null;
function debounce(fn,delay) {
  return function() {
    if(time) clearTimeout(time);
    time = setTimeout(()=>{
      fn.apply(this,arguments)
    },delay)
  }()
}
module.exports = {
  formatDate,
  getImageInfo,
  debounce
}