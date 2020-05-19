// pages/room_detail/room_detail.js
const app = getApp();
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()

import {RoomModel} from "../../utils/model/RoomModel";

var roomModel = new RoomModel();
var Moment = require("../../utils/moment.js");
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({
    data: {
        product_id: 0,
        rush_id: 0,
        is_ready: 0,
        is_confirm_book: false,
        tips: "",
        is_integral: 0,
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        title: '禅风山居',
        banner_img: [],
        num: '1',
        day: '',
        rNum: '1',
        selVal: 1,
        room_num: ['1', '2'],
        integral_shop: false,//是否积分点进来
        money: {
            int_money: '2800',//旧价
            now_money: '1680',//现价
            total_money: '280000',//总价
            integral: '4000000',
        },
        total_money: "",
        room_params: [],
        all_nums: 1,
        checkInDate: "",
        checkOutDate: "",
        room_shebei: {
            quick_buy: false,//是否抢购中
            villa: true,//是否别墅户型
            info: {
                area: '48',
                breakfast: '两份',
                people: '两成人',
                spring: '两位',
                bed: '大床（1张）',
                window: '有窗',
                rooms: '108间',
            },
            introduction:'',
            facilitate_text: '童趣·儿童乐园、乒乓球室、桌球室、3D影视中心、棋牌室、笙歌·KTV、露天泳池、网球场、康体中心、禅堂、红木精品展厅、会议厅',
            technology_text: '入住/离店入住时间：14:00以后\n离店时间：12:00以前\n儿童政策：不接受18岁以下客人单独入住。\n膳食安排：自助早餐 RMB 338\n宠物：不可携带宠物',
        },
        origial_url:"/pages/order_sale/order_sale",
        order_url: "/pages/order_sale/order_sale",
        ellipsis: true,
        share_id: 0, //是否是别人分享进来的
        user_id:0,
        xg_num:'1',
        use_tip:'本活动解释权归龙山温泉酒店所有。'
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var product_id = options.id;
        var rush_id = options.rush_id;
        this.data.product_id = product_id;
        this.data.rush_id = rush_id;
    },
    link_to_calendar: function (e) {
        var url = roomModel.us.getDataSet(e, "url");
        wx.navigateTo({
            url: url
        });
    },

    bindRoomNum: function (e) {
        var n = this.data.room_num[e.detail.value];
        this.setData({
            rNum: n,
            selVal: n,
            num: n
        });
        app.globalData.bookNum = this.data.selVal;
        this.getRushDetail();
    },
    changeRoomNum: function (e) {
        var index = e.currentTarget.dataset.selval;
        this.setData({
            selVal: index,
            rNum: '3+',
        });
        app.globalData.bookNum = this.data.selVal;
        this.getRushDetail();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    show_confirm_tips: function () {
        wx.showToast({
            title: this.data.tips,
            image: "",
            icon: "none",
            duration: 2000
        });
    },

    getRushDetail: function () {
        roomModel.getRushDetail(this.data.product_id, this.data.rush_id, this.data.selVal, (data) => {
            this.data.order_url = this.data.origial_url + "?type=room&is_integral=" + this.data.is_integral + "&rush_id=" + this.data.rush_id + "&id=" + this.data.product_id + "&rush_num=" + this.data.selVal;
            WxParse.wxParse('content', 'html', data.content, this, 0);
            this.setData({
                room_info: data,
                total_money: data.total_money,
                order_url: this.data.order_url,
                is_confirm_book: data.is_allow_book,
                tips: data.tips,
                is_ready: data.is_ready,
                room_num: data.room_num,
                diff_day:data.book_days
            });
            // if (this.data.is_confirm_book == false&&) {
            //     this.show_confirm_tips();
            // }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var that = this;
        var num = this.data.num;
        this.setData({
            product_id: this.data.product_id,
            rush_id: this.data.rush_id,
            is_integral: this.data.is_integral,
            selVal: num,
            rNum: num
        });
        this.getRushDetail();
    },
    ellipsis: function () {
        var value = !this.data.ellipsis;
        this.setData({
            ellipsis: value
        })
    },
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        if (this.data.timer != '') {
            clearTimeout(this.data.timer);
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.data.timer != '') {
            clearTimeout(this.data.timer);
        }
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

    },

    sercviceCall:function(){
        app.sercviceCall();
    }


})