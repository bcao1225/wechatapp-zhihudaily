

var utils = require('../../utils/util.js')
var app = getApp()

var zhihuUrl_last="http://news-at.zhihu.com/api/4/news/latest"
var zhihuUrl_before="http://news-at.zhihu.com/api/4/news/before/"


var now=new Date()
Page({
  data: {
    baseUrl:"http://read.html5.qq.com/image?src=forum&q=5&r=0&imgflag=7&imageUrl=",
    stories:[],
    top_stories:[],
    interval:1500,
    duration:500,
    loading:false,
    isBtnShow:false

  },
  getData:function(url,callback){
    let that =this
    wx.request({
      url: url,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        callback(res)
        // that.setData({
        //    top_stories: res.data.top_stories,
        //    stories: [{ header: '今日热闻' }].concat(res.data.stories)
        // })
        console.log(res.data)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function () {
    console.log('onLoad')
     this.refresh();
   
  },
  onPullDownRefresh:function(){
    this.refresh();
  },
  refresh(){
    // 下拉刷新
    var that = this
    this.getData(zhihuUrl_last,function(res){
       that.setData({
           top_stories: res.data.top_stories,
           stories: [{ header: '今日热闻' }].concat(res.data.stories),
           isBtnShow:true
        })
        now=new Date()

    });
  },
  onReachBottom:function(){
    // this.loadmore()
  },
  loadmore:function(){
    // 滑动到底部
    var that = this
    that.setData({ loading: true })
    var date=Number(utils.formatDate(now))
    var url=zhihuUrl_before+date
    console.log(url)
    this.getData(url,function(res){
      var list=that.data.stories.concat([{ header: res.data.date }]).concat(res.data.stories)
      that.setData({
        stories:list,
        loading:false
      })

      var str=res.data.date
      var s=[str.substring(0,4),str.substring(4,6),str.substring(6)].join("/")
      now=new Date(s)


    })
  }
})
