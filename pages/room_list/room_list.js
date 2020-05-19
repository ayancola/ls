// pages/room_list/room_list.js
var Moment = require("../../utils/moment.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
const app = getApp();
import {RoomModel} from "../../utils/model/RoomModel";
import {ShopModel} from "../../utils/model/ShopModel";
import {BaseModel} from "../../utils/model/BaseModel";
var WxParse = require('../../utils/wxParse/wxParse.js');
var roomModel = new RoomModel();
var shopModel = new ShopModel();
var baseModel = new BaseModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        active_index: '0',
        checkInDate: "",
        checkOutDate: "",
        inDate: "",
        outDate: "",
        day: '',
        nav: ['客房', '别墅', '温泉'],
        num: '1',
        share_id: 0, //是否是别人分享进来的
        user_id: 0,
        rNum: '1',
        selVal: 1,
        room_num: ['1','2','3','4', '5', '6', '7', '8', '9', '10'],

        spring_list: [],

        room_list:[],
        villa_list:[]

    },

    change: function (e) {
        app.change(e, this);
    },
    link: function (e) {
        app.link(e.currentTarget.dataset.url);
    },

    bindRoomNum: function (e) {
        var n = this.data.room_num[e.detail.value];
        app.globalData.bookNum = n;
        this.setData({
            rNum: n,
            selVal: n
        });
        this.getRoomList();
    },
    changeRoomNum: function (e) {
        var index = e.currentTarget.dataset.selval;
        this.setData({
            selVal: index,
            rNum: '3+',
        })
        app.globalData.bookNum = index;
        this.getRoomList();
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var share_id = options.share_id; //父级
        if (share_id == undefined || share_id == "") {
            share_id = 0;
        }
        wx.setStorageSync("share_id", share_id);
        baseModel.Wxrequest.request({url: "store.server.php?m=getWenquan", data: []}).then((res) => {
            var wenquan = res.data.content;
            WxParse.wxParse('content', 'html', wenquan, this, 0);
        }).catch(error => console.log(error));


    },



    getRoomBefore(){
        let getDate = app.globalData.ROOM_SOURCE_DATE;
        var num = app.globalData.bookNum;
        this.setData({
            checkInDate: getDate.checkInDate,
            checkOutDate: getDate.checkOutDate,
            num: num,
            selVal: num,
            rNum: num,
        });
        var startDate = new Date(this.data.checkInDate);
        var endDate = new Date(this.data.checkOutDate);
        var diff = endDate.getTime() - startDate.getTime();//时间差的毫秒数
        var diff_day = Math.floor(diff / (24 * 3600 * 1000));
        this.setData({
            diff_day: diff_day
        });

    },
    getRoomList() {
        this.getRoomBefore();
        roomModel.getRoomList(this.data.checkInDate, this.data.checkOutDate, this.data.num, (data) => {
            var room_data = data.room_list;
            var villa_data = data.villa_list;
            room_data =roomModel.us.wxjsonDecode(room_data, "room_params");
            villa_data =roomModel.us.wxjsonDecode(villa_data, "room_params");
            this.setData({
                room_list:room_data,
                villa_list:villa_data
            });
        });
    },

    getVillaList:function(){
        this.getRoomBefore();
        roomModel.getVillaList(this.data.checkInDate, this.data.checkOutDate, this.data.num, (data) => {
            data = roomModel.us.wxjsonDecode(data, "room_params");
            this.setData({
                room_list: data
            });
        });
    },



    getSpringList: function () {
        var spring_list = shopModel.getCache("springList");
        if (spring_list === false) {
            shopModel.getSpringList((data) => {
                console.log(data);
                shopModel.setCache("springList", data);
                this.setData({
                    spring_list: data
                });
            });
        } else {
            this.setData({
                spring_list: spring_list
            });
        }
    },


    link_to_calendar: function (e) {
        var url = roomModel.us.getDataSet(e, "url");
        roomModel.clearCache("roomList");
        wx.navigateTo({
            url: url
        });
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        shopModel.getUserInfo((data) => {
            this.data.user_id = data.id;
        });
        var that = this;
        var ishop_id = wx.getStorageSync("ishop_id");
        console.log(ishop_id);
        if (ishop_id === '') {
        } else {
            that.setData({
                active_index: wx.getStorageSync("ishop_id")
            });
        }
      if (this.options.type!=undefined){
          var active_index = this.options.type;
            that.setData({
          active_index: active_index
        });
        }
       
        
        wx.removeStorageSync("ishop_id");
        this.getRoomList();
        this.getSpringList();
    },

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
        var that = this;
        return {
            title: '龙山温泉酒店',
            path: '/pages/index/index?is_share=1&share_id=' + this.data.user_id,
            imageUrl: 'http://www.fenglu-alu.com/images/lsimg/share.jpg' //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
        }
    },

    link_to_point:function(){
        wx.navigateTo({
                  url: '/pages/integral/integral',
                })
        },
    
    link_to_coupon:function(){
        wx.setStorageSync("param_id", 1);
        wx.switchTab({
                url: "/pages/shop/shop"
            });
        },

        choose_fp: function () {
            var that = this
            wx.getSetting({
                success(res) {
                    console.log(res)
                    if (res.authSetting['scope.invoiceTitle'] == false) {
                        wx.openSetting({
                            success: (res) => {
                                if (res.authSetting["scope.invoiceTitle"]) {
                                    that.fapiao(that);
                                }
    
                            }
                        })
                    }
                    else {
                        that.fapiao(that);
                    }
                },
            })
    
        },

        fapiao: function (that) {
            wx.chooseInvoiceTitle({
                success: (res) => {
                    console.log(res)
                    var type = "fapiao.type"
                    var title = "fapiao.title"
                    var taxNumber = "fapiao.taxNumber"
                    var companyAddress = "fapiao.companyAddress"
                    var telephone = "fapiao.telephone"
                    var bankName = "fapiao.bankName"
                    var bankAccount = "fapiao.bankAccount"
                    that.setData({
                        [type]: res.type,
                        [title]: res.title,
                        [taxNumber]: res.taxNumber,
                        [companyAddress]: res.companyAddress,
                        [telephone]: res.telephone,
                        [bankName]: res.bankName,
                        [bankAccount]: res.bankAccount,
                        switch1Checked: true
                    })
                    wx.setStorageSync('fp_name', res.title);
                },
                fail: (err) => {
                    //console.error(err)
                }
            })
    
        },
    sercviceCall:function(){
        app.sercviceCall();
    }
    


})