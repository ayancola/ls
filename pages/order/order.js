// pages/order/order.js
const app = getApp();

var Moment = require("../../utils/moment.js");


import {OrderModel} from "../../utils/model/OrderModel";

var orderModel = new OrderModel();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        rush_id: 0,
        product_id: 0,
        type: 0,
        coupon_id: 0, //是否使用优惠券
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        index: 0,
        switch1Checked: false,
        switch2Checked: false,
        window_show: false,
        window_show2: false,
        check_index: -1,
        check_index2: -1,
        total_money: '',
        order_list: {
            room_name: '豪华双人房',
            time: '2020年2月5日 - 2020年2月7日',
            pay_show: true,//是否开通选择支付方式
            single_price: '2880',
            num: '2',
            name: '',
            tel: '',
            fapiao: {
                type: '',
                title: '',
                taxNumber: '',
                companyAddress: '',
                telephone: '',
                bankName: '',
                bankAccount: ''
            },
            desc: '',
            desc2: '',
            coupon_list: [
                {
                    reduce_money: '10',
                    use_money: '100',
                    time: '2020年1月1日-2020年6月1日',
                    check: false,
                },
                {
                    reduce_money: '20',
                    use_money: '100',
                    time: '2020年1月1日-2020年6月1日',
                    check: false,
                }
            ],
            vouchers_list: [
                {
                    type: '欢迎英雄归来，188元特惠抢购',
                    roomtype: '豪华大床房',
                    reduce_money: '10',
                    number: '186513185',
                    date: '2020年1月1日-2020年6月1日',
                    check: false,
                },
                {
                    type: '欢迎英雄归来，188元特惠抢购',
                    roomtype: '豪华大床房',
                    reduce_money: '10',
                    number: '186513185',
                    date: '2020年1月1日-2020年6月1日',
                    check: false,
                }
            ],
        },
        is_integral: 0,
        is_to_pay: false,
        checkInDate: "",
        checkOutDate: "",
        bookNum: 1,
        shopNum: 1,
        shopDate: "",
        product_type: 'room',
        pay_type: 0,
        pay_desc: "",
        is_chose_fapiao: false,
        showCon: false,
        is_paying: false,
        xg_num: '2',
        yh_title: '周五尊享豪华大礼包',
        is_ok_to_pay: true,
        is_allow_book: true,
        error_tips: "",
        yh_type: '',
        vouchers_index: 0,
        first_confirm: 0,
        order_name: "",
        order_mobile: ""
    },
    reduce: function (e) {
        var that = this
        var num = that.data.order_list.num
        var num2 = "order_list.num";
        if (that.data.order_list.num <= 1) {
            app.tips('已到达最小值');
        } else {
            that.setData({
                [num2]: Number(that.data.order_list.num) - 1,
            })
        }
        if (this.data.product_type == 'room') { //订购温泉
            this.data.bookNum = this.data.order_list.num;
            app.globalData.bookNum = this.data.bookNum;
        } else {
            this.data.shopNum = this.data.order_list.num;
            app.globalData.shopNum = this.data.shopNum;
        }
        this.confirm_order();
        // that.total();
    },
    add: function (e) {
        var that = this;
        var num = that.data.order_list.num;
        var num2 = "order_list.num";
        if (this.data.is_integral == 0 && this.data.rush_id > 0 && this.data.product_type == 'room') {
            if (that.data.order_list.num >= that.data.order_list.rush_limit) {
                // app.tips('每个用户限购'+that.data.order_list.rush_limit+'份');
                that.setData({
                    [num2]: Number(that.data.order_list.rush_limit),
                })
            } else {
                that.setData({
                    [num2]: Number(that.data.order_list.num) + 1,
                })
            }
        }
        else {
            that.setData({
                [num2]: Number(that.data.order_list.num) + 1,
            })
        }
        if (this.data.product_type == 'room') { //订购温泉
            this.data.bookNum = this.data.order_list.num;
            app.globalData.bookNum = this.data.bookNum;
        } else {
            this.data.shopNum = this.data.order_list.num;
            app.globalData.shopNum = this.data.shopNum;
        }
        this.confirm_order();
        // that.total();
    },
    total: function () {
        var that = this;
        if (this.data.is_integral == 0) {
            var total = that.data.order_list.single_price * that.data.order_list.num;
            total = total.toFixed(2);
        } else {
            if (this.data.money.now_money > 0) { //现金+积分
                var total = that.data.order_list.integral * that.data.order_list.num;
                total = total.toString() + "积分";
                var money = that.data.order_list.single_price * that.data.order_list.num;
                money = money.toFixed(2);
                money = money.toString() + "元";
                total = total + " " + money;
            } else {
                var total = that.data.order_list.integral * that.data.order_list.num;
                total = total.toString() + "积分";
            }
        }
        var onum = "order_list.total_money"
        that.setData({
            [onum]: total,
        });
    },
    changeModalCancel: function (e) {
        this.setData({
            showCon: false
        });
    },


    link_redirect: function () {
        app.link_redirect(/*url*/);
    },
    name: function (e) {
        // var value = "order_list.name";
        // this.setData({
        //     [value]: e.detail.value
        // })
        this.setData({
            'order_name': e.detail.value
        })
    },
    tel: function (e) {
        // var value = "order_list.tel";
        this.setData({
            'order_mobile': e.detail.value
        });

    },
    desc: function (e) {

        var value = "order_list.desc";
        this.setData({
            [value]: e.detail.value,
            desc2: e.detail.value
        })
    },
    pay_change: function (e) {
        var index = e.currentTarget.dataset.index;
        if (index == 0) {
            var pay_type = 0;
        } else {
            var pay_type = 1; //到店支付
        }
        this.setData({
            index: index,
            pay_type: pay_type
        });
    },
    choose_fp: function () {
        var that = this;
        this.data.is_chose_fapiao = true;
        wx.chooseInvoiceTitle({
            success: (res) => {
                var type = "order_list.fapiao.type"
                var title = "order_list.fapiao.title"
                var taxNumber = "order_list.fapiao.taxNumber"
                var companyAddress = "order_list.fapiao.companyAddress"
                var telephone = "order_list.fapiao.telephone"
                var bankName = "order_list.fapiao.bankName"
                var bankAccount = "order_list.fapiao.bankAccount"
                this.setData({
                    [type]: res.type,
                    [title]: res.title,
                    [taxNumber]: res.taxNumber,
                    [companyAddress]: res.companyAddress,
                    [telephone]: res.telephone,
                    [bankName]: res.bankName,
                    [bankAccount]: res.bankAccount,
                    switch1Checked: true
                })
            },
            fail: (err) => {
                wx.getSetting({
                    success: (res) => {
                        if (!res.authSetting['scope.invoiceTitle']) {
                            that.setData({
                                showCon: true
                            })
                        }
                    }
                })


            }
        })
    },
    switch1Change: function (e) {
        this.setData({
            switch1Checked: e.detail.value
        })
    },
    switch2Change: function (e) {
        this.setData({
            switch2Checked: e.detail.value
        })
    },
    show: function () {
        var that = this;
        this.setData({
            window_show: !that.data.window_show
        });

    },
    show2: function () {
        var that = this;
        this.setData({
            window_show2: !that.data.window_show2
        });

    },

    choose_coupon: function (e) {
        var that = this;
        var this_index = e.currentTarget.dataset.index;
        for (var i = 0; i < this.data.order_list.coupon_list.length; i++) {
            var check_name = "order_list.coupon_list[" + i + "].check"
            if (i == this_index) {
                that.setData({
                    [check_name]: !that.data.order_list.coupon_list[i].check
                })
                var check_i
                if (that.data.order_list.coupon_list[i].check == true) {
                    check_i = i
                    that.setData({
                        yh_type: '2'
                    })
                }
                else {
                    check_i = '-1'
                }
                that.setData({
                    check_index: check_i,
                    check_index2: '-1'
                })
            }
            else {
                that.setData({
                    [check_name]: false
                })
            }
        }
        var coupon_id = 0;
        for (var i = 0; i < this.data.order_list.coupon_list.length; i++) {
            if (this.data.order_list.coupon_list[i].check == true) {
                coupon_id = this.data.order_list.coupon_list[i].coupon_id;
            }
        }
        this.setData({
            coupon_id: coupon_id,
            rush_id: 0
        });
        this.show();
        this.confirm_order();
    },

    choose_voucher: function (e) {
        var that = this;
        var this_index = e.currentTarget.dataset.index;
        for (var i = 0; i < this.data.order_list.vouchers_list.length; i++) {
            var check_name = "order_list.vouchers_list[" + i + "].check"
            if (i == this_index) {
                that.setData({
                    [check_name]: !that.data.order_list.vouchers_list[i].check
                })
                var check_i
                if (that.data.order_list.vouchers_list[i].check == true) {
                    check_i = i
                }
                else {
                    check_i = '-1'
                }
                that.setData({
                    check_index2: check_i,
                    check_index: '-1'
                })
            }
            else {
                that.setData({
                    [check_name]: false
                })
            }
        }
        var vouchers_id = 0;
        for (var i = 0; i < this.data.order_list.vouchers_list.length; i++) {
            if (this.data.order_list.vouchers_list[i].check == true) {
                vouchers_id = this.data.order_list.vouchers_list[i].vouchers_id;
            }
        }
        this.setData({
            vouchers_id: vouchers_id,
            rush_id: vouchers_id,
            coupon_id: 0,
            yh_type: '1'
        });
        this.show2();
        this.confirm_order();
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var type = options.type;
        var rush_id = options.rush_id;
        var product_id = options.id;
        var is_integral = options.is_integral;
        // var rush_num = options.rush_num;
        this.data.product_type = type;
        this.data.rush_id = rush_id;
        this.data.product_id = product_id;
        this.data.is_integral = is_integral;
        this.setData({
            rush_id: this.data.rush_id,
            product_id: this.data.product_id,
            is_integral: this.data.is_integral,
            product_type: this.data.product_type,
            // rush_num: rush_num
        });

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    confirm_order: function () {
        this.data.first_confirm = this.data.first_confirm + 1;
        if (this.data.product_type == 'room') { //订购温泉
            orderModel.confirmRoomOrder(this.data.product_id, this.data.rush_id, this.data.is_integral, this.data.checkInDate, this.data.checkOutDate, this.data.bookNum, this.data.coupon_id, (data) => {
                data.desc = this.data.desc2;
                console.log(data);
                var yh_type = 0;
                var check_index2 = -1;
                if (data.rush_id != 0) {
                    check_index2 = 0;
                    yh_type =1;
                }else if(data.coupon_id != 0){
                    yh_type = 2;
                }
                this.setData({
                    order_list: data,
                    is_allow_book: data.is_allow_book,
                    error_tips: data.tips,
                    coupon_id: data.coupon_id,
                    rush_id: data.rush_id,
                    yh_type: yh_type,
                    check_index2:check_index2
                });
                if (this.data.first_confirm == 1) {
                    var value = "order_list.name";
                    this.setData({
                        order_name: data.name,
                        order_mobile: data.tel
                    });
                }
                if (!this.data.is_allow_book) {
                    wx.showToast({
                        title: this.data.error_tips,
                        icon: 'none',
                        duration: 1500,
                    });
                    return true;
                }
            });
        } else {
            orderModel.confirmShopOrder(this.data.product_id, this.data.rush_id, this.data.is_integral, this.data.shopDate, this.data.shopNum, this.data.coupon_id, (data) => {
                data.desc = this.data.desc2;
                var yh_type = 0;
                var check_index2 = -1;
                if (data.rush_id != 0) {
                    check_index2 = 0;
                    yh_type =1;
                }else if(data.coupon_id != 0){
                    yh_type = 2;
                }
                this.setData({
                    order_list: data,
                    is_allow_book: data.is_allow_book,
                    error_tips: data.tips,
                    coupon_id: data.coupon_id,
                    rush_id: data.rush_id,
                    yh_type: yh_type,
                    check_index2:check_index2
                });
                if (this.data.first_confirm == 1) {
                    var value = "order_list.name";
                    this.setData({
                        order_name: data.name,
                        order_mobile: data.tel
                    });
                }
                if (!this.data.is_allow_book) {
                    wx.showToast({
                        title: this.data.error_tips,
                        icon: 'none',
                        duration: 1500,
                    });
                    return true;
                }
            });
        }

        //
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (this.data.is_paying) {
            return true;
        }
        this.data.is_paying = false;
        if (this.data.is_chose_fapiao) {
            this.data.is_chose_fapiao = false;
            return true;
        }
        if (this.data.is_to_pay) {
            this.data.is_to_pay = false;
            return true;
        }

        var curTime = new Date();
        var room_source_date = wx.getStorageSync("ROOM_SOURCE_DATE");
        var starttime = new Date(room_source_date.checkInDate);
        var ROOM_SOURCE_DATE = app.globalData.ROOM_SOURCE_DATE;
        this.data.checkInDate = ROOM_SOURCE_DATE.checkInDate;
        this.data.checkOutDate = ROOM_SOURCE_DATE.checkOutDate;
        console.log(app.globalData.bookNum);
        if (this.data.rush_id > 0) {
            // this.data.bookNum = this.data.rush_num;
            this.data.bookNum = app.globalData.bookNum;
        } else {
            this.data.bookNum = app.globalData.bookNum;
        }
        console.log(this.data.bookNum);
        this.data.shopNum = app.globalData.shopNum;
        this.data.shopDate = app.globalData.shopDate;
        if (!this.data.is_to_pay) {
            this.confirm_order();
        }
        var pay_desc = orderModel.getCache("payDesc");
        if (pay_desc === false) {
            orderModel.getPayDesc((data) => {
                var txt = data.txt;
                orderModel.setCache("payDesc", txt);
                this.setData({
                    pay_desc: txt
                });
            });
        } else {
            this.setData({
                pay_desc: pay_desc
            });
        }


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

    },

    getPhoneNumber: function (e) {
        var that = this;
        if (e.detail.errMsg == "getPhoneNumber:ok") {
            var iv = e.detail.iv;
            var encryptedData = e.detail.encryptedData;
            // var tel_name = "order_list.tel";
            orderModel.getPhoneNumber(iv, encryptedData, (res) => {
                var phone = res.phone;
                // this.setData({
                //     [tel_name]: phone
                // });
                this.setData({
                    'order_mobile': phone
                });
            });
        }
    },

    payBefore: function () {
        if (this.data.product_type == 'room') {
            orderModel.PayRoomOrder(this.data.product_id, this.data.rush_id, this.data.is_integral, this.data.checkInDate, this.data.checkOutDate, this.data.bookNum, this.data.coupon_id, this.data.order_list, (data) => {
                var pay_type = data.pay_type;
                if (data.my_status == 0) {
                    var jsConfig = data.jsConfig;
                    var order_id = data.order_id;

                    wx.requestPayment({
                        timeStamp: jsConfig.timeStamp,
                        nonceStr: jsConfig.nonceStr,
                        package: jsConfig.package,
                        signType: jsConfig.signType,
                        paySign: jsConfig.paySign,
                        success: function (res2) {
                            orderModel.us.wxroute("/pages/order_success/order_success?pay_type="+pay_type, 2);
                        },
                        fail: function (res) {
                            orderModel.notifyOrderToPay(order_id,1,function(){
                            });
                            wx.showToast({
                                title: '支付不成功',
                                icon: 'none',
                                duration: 1500,
                                success: function () {
                                    setTimeout(function () {
                                        orderModel.us.wxroute("/pages/my_order/my_order", 2);
                                    }, 1500)
                                }
                            });

                        },
                        complete: function (res) {
                            if (res.errMsg == 'requestPayment:cancel') {
                                wx.showToast({
                                    title: '支付不成功',
                                    icon: 'none',
                                    duration: 1500,
                                    success: function () {
                                        setTimeout(function () {
                                            orderModel.us.wxroute("/pages/my_order/my_order", 2);
                                        }, 1500)
                                    }
                                });

                            }
                        },
                    });
                } else if (data.my_status == 1) {
                    orderModel.us.wxroute("/pages/order_success/order_success?pay_type="+pay_type, 2);
                } else {
                    orderModel.us.wxroute("/pages/order_success/order_success?pay_type="+pay_type, 2);
                }
            }, () => {
                this.data.is_paying = false;
            });
        } else {
            orderModel.PayShopOrder(this.data.product_id, this.data.rush_id, this.data.is_integral, this.data.shopDate, this.data.shopNum, this.data.coupon_id, this.data.order_list, (data) => {
                var pay_type = data.pay_type;
                if (data.my_status == 0) {
                    var jsConfig = data.jsConfig;
                    var order_id = data.order_id;
                    wx.requestPayment({
                        timeStamp: jsConfig.timeStamp,
                        nonceStr: jsConfig.nonceStr,
                        package: jsConfig.package,
                        signType: jsConfig.signType,
                        paySign: jsConfig.paySign,
                        success: function (res2) {
                            orderModel.us.wxroute("/pages/order_success/order_success?pay_type="+pay_type, 2);
                        },
                        fail: function (res) {
                            orderModel.notifyOrderToPay(order_id,2,function(){
                            });
                            wx.showToast({
                                title: '取消支付',
                                icon: 'none',
                                duration: 1500,
                            });
                            setTimeout(function () {
                                orderModel.us.wxroute("/pages/my_order/my_order", 2);
                            }, 800)
                        },
                        complete: function (res) {
                            if (res.errMsg == 'requestPayment:cancel') {

                                wx.showToast({
                                    title: '取消支付',
                                    icon: 'none',
                                    duration: 1500,
                                });
                                setTimeout(function () {
                                    orderModel.us.wxroute("/pages/my_order/my_order", 2);
                                }, 800)
                            }
                        },
                    });


                } else if (data.my_status == 1) {

                    orderModel.us.wxroute("/pages/order_success/order_success?pay_type="+pay_type, 2);
                } else {
                    orderModel.us.wxroute("/pages/order_success/order_success?pay_type="+pay_type, 2);
                }
            }, () => {
                this.data.is_paying = false;
            });
        }
    },
    pay: function () {
        this.data.is_paying = true;
        this.data.order_list.pay_type = this.data.pay_type;
        this.data.order_list.tel = this.data.order_mobile;
        this.data.order_list.name = this.data.order_name;
        var that = this;
        wx.requestSubscribeMessage({
            tmplIds: ['ffExpG2tnboe__CFLIvqowj4RsARkeQ0vOZGWKD-N2w','UThW01My-m_oMw_ruNr3Uc5HezzTZgIw4j_H-xtUkQk','LjpN2Cle3nzc1Jd_UcrjRvMq6QK6a9XWpxJ9TUgdKhw'],
            success(res) {
                if (res['ffExpG2tnboe__CFLIvqowj4RsARkeQ0vOZGWKD'] == "accept"||res['UThW01My-m_oMw_ruNr3Uc5HezzTZgIw4j_H-xtUkQk'] == "accept"||res['LjpN2Cle3nzc1Jd_UcrjRvMq6QK6a9XWpxJ9TUgdKhw'] == "accept") {
                    that.data.order_list.order_remind = 1;
                } else {
                    that.data.order_list.order_remind = 0;
                }
            },
            fail(res) {
                that.data.order_list.order_remind = 0;
            },
            complete(res) {
                that.payBefore();
            }
        });
    },
    /**
     * 提交订单
     */
    pay_order: function () {
        var order_list = this.data.order_list;
        if (this.data.is_paying) {
            return false;
        }
        if (!this.data.is_allow_book) {
            wx.showToast({
                title: this.data.error_tips,
                icon: 'none',
                duration: 1500,
            });
            return true;
        }

        if (this.data.is_integral == 1) {
            orderModel.us.showModal(() => {
                this.pay();
            }, "确认使用积分进行支付吗？");
        } else {
            this.pay();
        }
    },


    sercviceCall: function () {
        app.sercviceCall();
    }

})