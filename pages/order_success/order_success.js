// pages/order_success/order_success.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        pay_type: 0, //0就是 在线支付 1 就是到店支付
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var pay_type = options.pay_type;
        //设置支付方式
        this.setData({
            pay_type: pay_type
        });
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

    },

    sercviceCall: function () {
        app.sercviceCall();
    }
})