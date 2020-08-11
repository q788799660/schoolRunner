# tcb-hackthon-schoolRun（校园小跑）

#### 介绍
大学生各类兼职不靠谱？一款基于云开发的微信小程序——校园兼职，功能有 搜索兼职，发布兼职，上传简历，我的投的等等。
#### 界面效果图
![rename](https://images.gitee.com/uploads/images/2020/0811/181421_6593bf59_4896788.png "rename.png")
![index](https://images.gitee.com/uploads/images/2020/0406/093813_3079185c_4896788.png "index.png")
![my](https://images.gitee.com/uploads/images/2020/0811/181405_9139e201_4896788.png "my.png")
![pub](https://images.gitee.com/uploads/images/2020/0406/093831_c847068d_4896788.png "pub.png")
![toudi](https://images.gitee.com/uploads/images/2020/0406/093854_c63bf907_4896788.png "toudi.png")
![upload](https://images.gitee.com/uploads/images/2020/0811/181440_1aedfdd3_4896788.png "upload.png")
![detail2](https://images.gitee.com/uploads/images/2020/0406/093746_f23d66a5_4896788.png "detail2.png")
![detail](https://images.gitee.com/uploads/images/2020/0406/093735_a653546d_4896788.png "detail.png")
![all](https://images.gitee.com/uploads/images/2020/0811/181254_80f019b0_4896788.png "list.png")
![about](https://images.gitee.com/uploads/images/2020/0406/093415_80dbcfea_4896788.png "about.png")
#### 安装教程

1.   **下载源码** 

  ![克隆下载](https://images.gitee.com/uploads/images/2020/0406/083352_9660b277_4896788.png "(N51ZJ[6E`N@U~U{6@D5QTP.png")
2.  **在微信开发者工具中导入项目** 

  ![导入项目](https://images.gitee.com/uploads/images/2020/0406/084212_d8d34294_4896788.png "UFOX36H_SBKY@HK9})5`_VK.png")
3.   **项目本地配置以及项目配置** 

>  ![本地配置](https://images.gitee.com/uploads/images/2020/0406/084028_f25bed17_4896788.png "MQ)1XH4U4~3}VWZ){A35GB7.png")
>     ![项目配置](https://images.gitee.com/uploads/images/2020/0406/084114_455e307a_4896788.png "XFXC_J42B9X8ZKL)%A@~1VW.png")
4.   **云开发控制台中选择云开发环境名称并在app.js中进行初始化环境** 

    

> ![选择云开发环境](https://images.gitee.com/uploads/images/2020/0406/084546_b3a11a13_4896788.png "0INU_5`[XPC1}85(%]H_MG8.png")

> 如果没有云开发环境，需新建 **云开发环境** ，点击微信开发者工具的“云开发”图标，在弹出框里点击“开通”，同意协议后，会弹出创建环境的对话框。这时会要求你输入 **环境名称和环境ID** ，以及当前云开发的基础环境配额, **环境ID** 自动生成即可

![新建云开发环境](https://images.gitee.com/uploads/images/2020/0406/085123_6ff7853a_4896788.png "4(1MT0NWNA95ZCCZ2`4NEJB.png")

>   修改miniprogram文件夹中的 **app.js** 中的云开发环境

 ![修改环境](https://images.gitee.com/uploads/images/2020/0406/085317_6bdf633b_4896788.png "S6QYEOWZ]70YL[K@4)NXLHK.png")


5.  **在云开发控制台新建三个数据库(info,jobDetail,jobList)** 

  | 集合名称  | 集合描述           | 集合权限                     |
  | --------- | ------------------ | ---------------------------- |
  | info      | 用户信息           | 所有用户可读，仅创建者可读写 |
  | jobDetail | 发布的招聘详细信息 | 自定义权限                   |
  | jobList   | 用户简历列表       | 自定义权限               |

![](https://imgkr.cn-bj.ufileos.com/225a4d9b-bab2-423b-a7ad-ecf3adfec686.png)


  其中自定义权限配置

  ![自定义权限](https://images.gitee.com/uploads/images/2020/0406/091308_070581e2_4896788.png "O3JC`]Z)O}ZE2KD88_I7`4Y.png")

6. **新建并部署云函数**
  
  在 cloudfunctions 中找到 `login` 和 `upload` 文件夹，右击后选择 `创建并部署：所有文件`
  
![](https://imgkr.cn-bj.ufileos.com/72d0a4b7-d04c-4aa9-ab50-9429d1abc422.png)

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_schoolRunner 分支
3.  提交代码
4.  新建 Pull Request
5.  欢迎各方大佬共同参与开发

#### 联系作者

1.  如使用出现任何问题，欢迎骚扰QQ780006473 或 wx：q788799660
2.  如果您觉得还可以的话， **star** 一下给个鼓励呗
