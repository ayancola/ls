// pages/integral/integral.js
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
        all_list: [],
        integral_list: []
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
    showList:function(){

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        shopModel.getMyPointsList((data) => {
            console.log(data);
            this.setData({
                integral_list: data
            });
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