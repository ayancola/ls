// pages/order/order.js
const app = getApp();

import {RoomModel} from "../../utils/model/RoomModel";
import {OrderModel} from "../../utils/model/OrderModel";

var orderModel = new OrderModel();
var roomModel = new RoomModel();

Page({

    data: {
        rush_id: 0,
        product_id: 0,
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        index: 0,
        order_desc: '每个订单只能使用一张抵用券。抵用券不能与优惠券同时使用。'
    },
    reduce: function (e) {
        var that = this;
        if (that.data.rush_num<= 1) {
            app.tips('已到达最小值');
        } else {
            that.data.rush_num = Number(that.data.rush_num ) - 1;
            this.getDetail();
        }
    },

    add: function (e) {
        var that = this;
        this.data.rush_num = Number(that.data.rush_num) + 1;
        this.getDetail();
    },

    onLoad: function (options) {
        this.setData({
            rush_id: options.rush_id,
            product_id: options.id,
            rush_num: options.rush_num,
        });
    },

    getDetail: function () {
        roomModel.getRushDetail(this.data.product_id, this.data.rush_id, this.data.rush_num, (data) => {
            this.setData({
                room_info: data,
                total_money: data.total_money,
                is_confirm_book: data.is_allow_book,
                tips: data.tips,
                is_ready: data.is_ready,
                rush_num:this.data.rush_num
            });
        });
    },

    onShow: function () {
        if (this.data.is_paying) {
            return true;
        }
        this.data.is_paying = false;
        this.getDetail();
    },

    payBefore: function () {
        var that = this;
        orderModel.PayRushOrder(this.data.product_id, this.data.rush_id, this.data.rush_num, (data) => {
            if (data.my_status == 0) {
                var jsConfig = data.jsConfig;
                wx.requestPayment({
                    timeStamp: jsConfig.timeStamp,
                    nonceStr: jsConfig.nonceStr,
                    package: jsConfig.package,
                    signType: jsConfig.signType,
                    paySign: jsConfig.paySign,
                    success: function (res2) {
                        wx.showToast({
                            title: '支付成功',
                            icon: 'none',
                            duration: 1500,
                            success: function () {
                            }
                        });
                        orderModel.us.showModal(function(){
                            wx.switchTab({
                                url: "/pages/room_list/room_list"
                            });
                        },"立刻进行预订吗？","支付成功",function(){
                            that.onShow();
                        })
                    },
                    fail: function (res) {
                        wx.showToast({
                            title: '支付不成功',
                            icon: 'none',
                            duration: 1500,
                            success: function () {
                            }
                        });
                    },
                    complete: function (res) {
                        that.is_paying = false;
                        if (res.errMsg == 'requestPayment:cancel') {
                            wx.showToast({
                                title: '支付不成功',
                                icon: 'none',
                                duration: 1500,
                                success: function () {
                                    that.onShow();
                                }
                            });
                        }

                    },
                });
            } else {
                wx.showToast({
                    title: '支付不成功',
                    icon: 'none',
                    duration: 1500,
                    success: function () {
                    }
                });
                this.data.is_paying = false;
            }
        }, () => {
        });
    },

    pay_order: function () {
        if (this.data.is_paying) {
            return false;
        }
        if (!this.data.is_confirm_book) {
            wx.showToast({
                title: this.data.tips,
                icon: 'none',
                duration: 1500,
            });
            return true;
        }
        this.payBefore();
    },

    sercviceCall: function () {
        app.sercviceCall();
    }

})