var Moment = require("./utils/moment.js");
import {BaseModel} from "./utils/model/BaseModel";
var baseModel = new BaseModel();
App({
    data: {
        fill: 'aspectFill',//cover
        fit: 'aspectFit',//contain
        w_100: 'widthFix',//w-100

    },

    globalData: {
        service_phone:"0766-2299888",
        shopNum: 1,
        shopDate: "",
        bookNum: 1,
        ROOM_SOURCE_DATE: {
            checkInDate: "",
            checkOutDate: ""
        }
    },

    onLaunch: function () {
        this.globalData.ROOM_SOURCE_DATE = {
            checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
            checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
        }
        this.globalData.shopDate = Moment(new Date()).format('YYYY-MM-DD'); //每次启动时默认是今天
        this.globalData.bookNum = 1;
        this.globalData.shopNum = 1;
        baseModel.Wxrequest.request({url: "store.server.php?m=getServicePhone"}).then((res) => {
           var phone = res.data.service_phone;
           this.globalData.service_phone = phone;
        }).catch(error => console.log(error));
    },

    sercviceCall:function(){
        wx.makePhoneCall({
            phoneNumber: this.globalData.service_phone
        })
    },
    change: function (e, that) {
        that.setData({
            active_index: e.currentTarget.dataset.index
        })
    },
    link: function (url) {
        wx.navigateTo({
            url: url
        })
    },
    link_redirect: function (url) {
        wx.redirectTo({
            url: url
        })
    },
    link_tab: function (url) {
        wx.switchTab({
            url: url
        })
    },
    tips: function (title) {
        wx.showToast({
            title: title,
            icon: 'none',
            duration: 1000,
        });
    },


})