// pages/shop/shop.js
const app = getApp();
import {ShopModel} from "../../utils/model/ShopModel";

var Moment = require("../../utils/moment.js");
var shopModel = new ShopModel();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        nav: ['限时优惠', '优惠券', '积分商城'],
        active_index: '0',
        tab_nav: ['正在热抢', '即将开始'],
        tab_index: '0',
        window_show: false,
        window_txt: "",

        coupon_txt: "",
        user_id: 0,
        share_id: 0, //是否是别人分享进来的
        start: [],

        ready: [],
        my_integral: "0",
        integral_list: [],

        my_coupon: [],
        coupon_list: {
            use_details: '',
            list: []
        }
    },
    show: function (e) {
        var index = shopModel.us.getDataSet(e, "index");
        var that = this;
        if (this.data.active_index == 1) {
            if (typeof index != "undefined" && typeof this.data.coupon_list[index].remark != "undefined") {
                this.data.window_txt = this.data.coupon_list[index].remark;
                this.setData({
                    window_txt: this.data.window_txt,
                })
            }
        }
        this.setData({
            window_show: !that.data.window_show
        });
    },
    get_coupon: function (e) {
        var that = this;
        var tab_index = e.currentTarget.dataset.index;
        var coupon_id = shopModel.us.getDataSet(e, "id");
        if (e.currentTarget.dataset.state == false) {
            shopModel.toGetCoupon(coupon_id, (data) => {
                var get_name = "coupon_list.list[" + tab_index + "].has_get"
                that.setData({
                    [get_name]: true
                });
                app.tips('领取成功');
                shopModel.getCouponList((data) => {
                    this.setData({
                        coupon_list: data.coupon_list.list,
                        my_coupon: data.my_coupon
                    });
                });

            });
        }
        else {
            app.link_tab('/pages/room_list/room_list');
        }
    },
    change: function (e) {
        app.change(e, this);
    },
    tab_change: function (e) {
        this.setData({
            tab_index: e.currentTarget.dataset.index
        });
        this.getRushInfo();

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
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    link_detail: function (e) {
        var url = shopModel.us.getDataSet(e, "url");
        shopModel.us.wxroute(url, 1);
    },

    getRushInfo() {
        shopModel.getRushInfo((data) => {
            this.setData({
                start: data.start,
                ready: data.ready
            });
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        var that = this;
        var param_id = wx.getStorageSync("param_id");
        if (param_id === '') {

        } else {
            that.setData({
                active_index: param_id
            });
        }

        wx.removeStorageSync("param_id");
        this.getRushInfo();

        shopModel.getCouponList((data) => {
            this.setData({
                coupon_list: data.coupon_list.list,
                my_coupon: data.my_coupon
            });
        });

        var integral_list = shopModel.getCache("pointList");
        if (integral_list === false) {
            shopModel.getShopPoint((data) => {
                this.setData({
                    integral_list: data.integral_list,
                });
                shopModel.setCache("pointList", data.integral_list);
            });
        } else {
            this.setData({
                integral_list: integral_list
            });
        }

        shopModel.getMyTntegral((data) => {
            this.setData({
                my_integral: data.my_integral
            });
        });


        var coupon_txt = shopModel.getCache("couponTxt");
        if (coupon_txt === false) {
            shopModel.getCouponTxt((data) => {
                var txt = data.txt;
                shopModel.setCache("couponTxt", txt);
                this.setData({
                    coupon_txt: txt
                });
            });
        } else {
            this.setData({
                coupon_txt: coupon_txt
            });
        }

        shopModel.getUserInfo((data) => {
            this.data.user_id = data.id;
        });

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
        var that = this;
        return {
            title: '龙山温泉酒店',
            path: '/pages/index/index?is_share=1&share_id=' + this.data.user_id,
            imageUrl: 'http://www.fenglu-alu.com/images/lsimg/share.jpg' //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
        }
    },

    sercviceCall:function(){
        app.sercviceCall();
    }

})