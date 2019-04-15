var t = getApp();
// console.log(t.globalData.appimg)
var refrom ='';
var reurl = '/pages/index/index';
Page({
    data: {
        globalimg: t.globalData.appimg,
        close: 0,
        text: ""
    },
    onLoad: function(t) {
      if (t.refrom){
        refrom = t.refrom;
        reurl = t.reurl;
      }
        console.log(t), this.setData({
            close: t.close,
            text: t.text
        });
    },
    onShow: function() {
        var e = t.getCache("sysset").shopname;
        wx.setNavigationBarTitle({
            title: e || "提示"
        });
    },
    bind: function() {
        var t = this, e = setInterval(function() {
            wx.getSetting({
                success: function(n) {
                    var a = n.authSetting["scope.userInfo"];
                    a && (wx.reLaunch({
                      url: reurl
                    }), clearInterval(e), t.setData({
                        userInfo: a
                    }));
                }
            });
        }, 1e3);
    }
});