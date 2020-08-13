## 部署说明

#### 下载代码
`git@gitee.com:dxudong/tcb-hackthon-schoolRun.git`
#### 微信开发者工具下载
  [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
  可以用开发版
#### 调试基础库
    用到的调试基础库为 2.12.0
#### 将代码导入到开发者工具
打开 **微信开发者工具** ，点击菜单“项目 > 导入项目”，按照提示导入小程序代码。具体请参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

#### 参数修改
代码导入时，填入自己的appid，或者继续使用项目代码中的appid。如果更换了appid，请登录[微信公众平台](https://mp.weixin.qq.com/)修改相应的 **request合法域名** 和 **uploadFile合法域名** 等作为自己的服务端域名。

#### 创建云环境
如果更换了appid，请创建云开发环境并在app.js中配置相应的环境ID。具体操作请参考[官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)

#### 云数据库
**在云开发控制台新建三个数据库(info,jobDetail,jobList)** 

| 集合名称  | 集合描述           | 集合权限                     |
| --------- | ------------------ | ---------------------------- |
| info      | 用户信息           | 所有用户可读，仅创建者可读写 |
| jobDetail | 发布的招聘详细信息 | 自定义权限                   |
| jobList   | 用户简历列表       | 自定义权限               |


#### 云存储
> 运行小程序会使用相应功能会自动向云存储上传相应文件

