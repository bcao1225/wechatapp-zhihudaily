//index.js
//获取应用实例
var WxParse = require('../../wxParse/wxParse.js');
var zhihuUrl="http://news-at.zhihu.com/api/4/news/";
var zhihuweb="http://daily.zhihu.com/story/"
var baseUrl="http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=";
var app = getApp()
Page({
  data: {
    imgUrl:"",
    title:"",
    image_source:"",
    userInfo: {}
  },

  onLoad: function (args) {

    console.log('onLoad')
    var that = this
    this.getData(args.id);
  },

  getData(id){
    let that =this
    console.log(zhihuUrl+id)
    wx.request({
      url: zhihuUrl+id,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){

        console.log(res.data)
        var body = res.data.body;
        body=body.replace(/http(s)?:\/\/pic/g,baseUrl+"https://pic");

        var html="<head>"+
        "<meta charset=\"utf-8\">"+
        "<style type=\"text/css\">"+
        " </style>"+
        "</meta>"+
        "<body>"+
        body+
        "</body></html>"
        var image=res.data.image;
        console.log(image)

        that.setData({
          imgUrl:baseUrl+image,
          title:res.data.title,
          image_source:res.data.image_source
        })
        WxParse.wxParse("html" , "html", body, that,0)
        
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  }

  
})
