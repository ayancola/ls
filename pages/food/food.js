// pages/room_detail/room_detail.js
const app = getApp();
import {IndexModel} from "../../utils/model/IndexModel";

var WxParse = require('../../utils/wxParse/wxParse.js');
var indexModel = new IndexModel();
Page({

    data: {
        w_100: app.data.w_100,
        photo_list: '',

    },
    previewImg: function (e) {
        var currentUrl = e.currentTarget.dataset.imgurl;
        var imglist = [];
        this.data.is_preview = true;
        if (this.data.photo_list.length > 0) {
            for (var i = 0; i < this.data.photo_list.length; i++) {
                imglist.push(this.data.photo_list[i]['images']);
            }
            wx.previewImage({
                current: currentUrl, // 当前显示图片的http链接
                urls: imglist// 需要预览的图片http链接列表
            })
        }

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
        indexModel.getFood((data) => {
            WxParse.wxParse('content', 'html', data.content, this, 0);
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