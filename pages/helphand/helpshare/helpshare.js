// pages/helphand/helpshare/helpshare.js
var a, e, i = getApp(),
  s = i.requirejs("core"),
  n = i.requirejs("wxParse/wxParse"),
  o = i.requirejs("biz/diypage"),
  r = i.requirejs("biz/diyform"),
  d = i.requirejs("biz/goodspicker"),
  c = (i.requirejs("foxui"),
    i.requirejs("jquery"));
var f = getApp();
var userinfo = '';
var cs="";
var hlpid=""
var bnickname=""
var shareopenid = "";
var sharemid = "";
var message='';
var reurl='';
Page({

  data: {
    globalimg: i.globalData.appimg,
    dis: 'none',
    disp: 'none',
    explainDis:'none',
    failDis:'none',
    mid: '',
    step: '',
    messgae: '',
    nickname: '',
    avatarl: '',
    passive_openid: '',
    myid: '',
      count:'',
      steptoday:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (t) {
    var a = decodeURIComponent(t.scene);
    if (!t.mid && a) {
      var i = s.str2Obj(a);
      hlpid = i.mid;
    }else{
      //   被助力人的openid
      hlpid = t.hlpid
    }
    userinfo = f.getCache('userinfo');
    reurl = '/pages/helphand/helpshare/helpshare?hlpid=' + hlpid + '&mid=' + hlpid;

    "" == f.getCache("userinfo") && wx.redirectTo({
      url: "/pages/message/auth/index?refrom=helpshare&reurl="+reurl
    });
      if (userinfo.openid ==t.hlpid && userinfo.openid) {
          wx.redirectTo({
              url: '../friendhelp/friendhelp',
          })
      }
      
    console.log(t)
    // 被助力人的昵称
    bnickname=t.nickname
    // 被助力人的mid
      cs=t.mid;
      var ttt = this;
      s.get("member/info/getMemberInfo", {
          passive_openid: hlpid
    }, function (m){
        shareopenid = m.openid;
        sharemid = m.id;
        bnickname = m.nickname;
      ttt.setData({
          id:m.id,
          nickname: m.nickname,
          avatar: m.avatar
      })
    })

      s.get("refresh_step", {
        openid:userinfo.openid
      }, function (eve) {
          console.log(eve)
          ttt.setData({
              count:eve.result.step_count,
              steptoday: eve.result.step_today
          })
      })
    
  },
  showbtn: function () {
    this.setData({
      disp: "block"
    })
  },
  applybtn: function () {
    this.setData({
      disp: "none",
      dis: "block"
    })
  },
  cancelbtn: function () {
    this.setData({
      disp: "none",
    })
  },
//   步数说明
    stepExplain:function(){
        this.setData({
            explainDis:"block"
        })
    },
    // 关闭步数说明按钮
    stepClose:function(){
        this.setData({
            explainDis: "none"
        })
    },
    failClose:function(){
        this.setData({
            failDis: "none"
        })
    },
  jump: function () {
    this.setData({
      url: '../pages/index/index'
    })
  },
  
  // 获取用户输入的用户名
  stepInput: function (e) {
    this.setData({
      step: e.detail.value
    })
  },
  msgInput: function (e) {
    this.setData({
      messgae: e.detail.value
    })
  },
  tap: function () {
    if (this.data.step == '') {
      wx.showToast({
        title: '步数不能为空',
        icon: 'success',
        duration: 2000
      })

    } 
 var aaa=this
      s.get("help/index/addhelp", {
        remark: this.data.message,
        step: this.data.step,
        openid: userinfo.openid,
        mids:cs
      }, function (ee) {
        console.log(ee)
        
          if (ee.error != 0) {
             aaa .setData({
                  failDis: 'block',
                 message:ee.message
              })
          }
      })
      
      if (this.data.step != ''){
          wx.navigateTo({
            //   url: '../powerlist/powerlist?openid=' + hlpid + '&mid=' + cs + '&nickname=' + bnickname,
              url: '../powerlist/powerlist?openid=' + shareopenid + '&mid=' + sharemid + '&nickname=' + bnickname,
          })
      }
       
     

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})