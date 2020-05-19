// pages/my_order/my_order.js
const app = getApp();
import {OrderModel} from "../../utils/model/OrderModel";

var orderModel = new OrderModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        active_index: '0',
        nav: ['全部', '待支付', '待确认', '已预订', '已取消'],
        list: [],
        all_list: []
    },
    change: function (e) {
        app.change(e, this);
        this.showList();
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

    showList() {
        var ishop_id = wx.getStorageSync("iorder_id");
        if (ishop_id === '') {
        } else {
            this.setData({
                active_index: ishop_id
            });
        }
        wx.removeStorageSync("iorder_id");
        var index = this.data.active_index;
        var tmp = [];
        if (index == 0) {
            this.setData({
                list: this.data.all_list
            });
        } else if (index == 1) {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].state == 1) {
                    tmp.push(this.data.all_list[i]);
                }
            }
            this.setData({
                list: tmp
            });
        } else if (index == 2) {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].state == 2) {
                    tmp.push(this.data.all_list[i]);
                }
            }
            this.setData({
                list: tmp
            });
        } else if (index == 3) {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].state == 3) {
                    tmp.push(this.data.all_list[i]);
                }
            }
            this.setData({
                list: tmp
            });
        } else {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].state == 4) {
                    tmp.push(this.data.all_list[i]);
                }
            }
            this.setData({
                list: tmp
            });
        }
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        orderModel.getMyOrder((data) => {
            this.data.all_list = data;
            this.showList();
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