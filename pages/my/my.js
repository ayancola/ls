// pages/my/my.js
const app = getApp();
import {ShopModel} from "../../utils/model/ShopModel";

var shopModel = new ShopModel();


Page({

    /**
     * 页面的初始数据
     */
    data: {
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        login: false,//是否已登录
        add_list: {
            address: '',
        },
        fapiao: {
            type: '',
            title: '',
            taxNumber: '',
            companyAddress: '',
            telephone: '',
            bankName: '',
            bankAccount: ''
        },
        points: 0
    },
    _link: function (e) {
        var active_index = e.currentTarget.dataset.index; //daiguoqu
        wx.setStorageSync("param_id", active_index);
        wx.switchTab({
            url: "/pages/shop/shop"
        });
    },
    choose_add: function () {
        var that = this;
        wx.getSetting({
            success(res) {
                console.log(res)
                if (res.authSetting['scope.address'] == false) {
                    wx.openSetting({
                        success: (res) => {
                            if (res.authSetting["scope.address"]) {
                                that.choose_address(that);
                            }

                        }
                    })
                }
                else {
                    that.choose_address(that);
                }
            },
        })
    },
    choose_address: function (that) {
        wx.chooseAddress({
            success: function (res) {
                var address = "add_list.address";
                var text = res.provinceName + res.cityName + res.countyName + res.detailInfo
                that.setData({
                    [address]: text
                })
                wx.setStorageSync('add', text);
            },
            fail: function (res) {
            },
            complete: function (res) {
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

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
        var that = this;
        if (wx.getStorageSync('add') != '') {
            var address = "add_list.address";
            var text = wx.getStorageSync('add')
            that.setData({
                [address]: text
            })
        }
        if (wx.getStorageSync('fp_name') != '') {
            var title = "fapiao.title"
            var text = wx.getStorageSync('fp_name')
            that.setData({
                [title]: text
            })
        }
        shopModel.getMyTntegral((data) => {
            this.setData({
                points: data.my_integral
            });
        });

    },
    i_order_link: function (e) {
        var active_index = e.currentTarget.dataset.index; //daiguoqu
        wx.setStorageSync("iorder_id", active_index);
        wx.navigateTo({
            url: "/pages/my_order/my_order"
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

    },
    sercviceCall:function(){
        app.sercviceCall();
    }
})