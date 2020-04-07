// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  //获取临时路径
  const filePath = event.tempFilePaths;
  const cloudPath = `jobDoc/${Date.now()}-${Math.floor(Math.random(0, 1) * 1000)}` + filePath.match(/\.[^.]+?$/)[0]
  cloud.uploadFile({
    cloudPath,
    filePath,
    success: res => {
      return res
    }
  })
}