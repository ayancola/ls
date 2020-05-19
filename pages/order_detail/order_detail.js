// pages/order_detail/order_detail.js
const app = getApp();
import {OrderModel} from "../../utils/model/OrderModel";

var orderModel = new OrderModel();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        type: 1,
        id: 0,
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        show: false,
        state: '待确认',
        order_num: '0456515247567462',
        order_date: '2020年2月3日',
        pay_style: '在线支付',
        num: '1',
        money: '715.4',
        room_name: '豪华双人房',
        start_date: '2020.12.25',
        end_date: '2020.12.27',
        night: '2',
        name: 'xxx瑜伽小公举',
        tel: '15627862748',
        fapiao: '广东南海鹏博资讯有限公司',
        yh: '新年满700元减14.6元券',
        desc: '温度要够烫！',
        info: {}
    },
    show: function () {
        var that = this;
        this.setData({
            show: !that.data.show
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var type = options.type;
        this.data.type = type;
        this.data.id = id;
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    repay: function () {
        orderModel.Repay(this.data.type, this.data.id, (data) => {
            var jsConfig = data.jsConfig;
            wx.requestPayment({
                timeStamp: jsConfig.timeStamp,
                nonceStr: jsConfig.nonceStr,
                package: jsConfig.package,
                signType: jsConfig.signType,
                paySign: jsConfig.paySign,
                success: function (res) {
                    orderModel.us.wxroute("/pages/order_success/order_success", 2);
                },
                fail: function (res) {
                    wx.showToast({
                        title: '支付不成功',
                        icon: 'none',
                        duration: 1500,
                    })
                },
                complete: function (res) {
                    if (res.errMsg == 'requestPayment:cancel') {
                        wx.showToast({
                            title: '支付不成功',
                            icon: 'none',
                            duration: 1500,
                        });
                    }
                },
            })
        });
    },

    cancelOrder: function () {
        var that = this;
        orderModel.us.showModal(function () {
            orderModel.cancelOrder(that.data.type, that.data.id, () => {
                wx.showToast({
                    title: '取消成功',
                    icon: 'success',
                    duration: 1000,
                });
                that.onShow();
            });
        },"确认取消吗？");
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
       
        orderModel.getOrderDetail(this.data.type, this.data.id, (data) => {
            this.setData({info: data});
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