// pages/location_detail/location_detail.js
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
        img: '',
        name: '国恩寺',
        desc: '国恩寺是惠能于唐高宗弘道元年（683年）建，名为“报恩寺”。唐中宗神龙二年（706年）下诏赐名为“国恩寺”（今门额上书“敕赐国恩寺”）。国恩寺是惠能于唐高宗弘道元年（683年）建，名为“报恩寺”。唐中宗神龙二年（706年）下诏赐名为“国恩寺”（今门额上书“敕赐国恩寺”）。国恩寺是惠能于唐高宗弘道元年（683年）建，名为“报恩寺”。唐中宗神龙二年（706年）下诏赐名为“国恩寺”（今门额上书“敕赐国恩寺”）。国恩寺是惠能于唐高宗弘道元年（683年）建，名为“报恩寺”。唐中宗神龙二年（706年）下诏赐名为“国恩寺”（今门额上书“敕赐国恩寺”）。',
        jl: '约1.0公里，车程2分钟',
        location_name: '国恩寺',
        piao: '免费',
        open: '08:00-17:30',
        address: '佛山市南海区',
        latitude: 23.025413,
        longitude: 113.110828,
    },
    open_map: function (e) {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                const latitude = that.data.latitude
                const longitude = that.data.longitude
                const name = that.data.location_name
                const address = that.data.address
                wx.openLocation({
                    latitude,
                    longitude,
                    name,
                    address,
                    scale: 10
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        shopModel.getLocationDetail(id,(data) => {
            this.setData({
                img: data.img,
                name: data.name,
                desc: data.desc,
                desc2:data.desc2,
                latitude: data.latitude,
                longitude: data.longitude,
                address:data.address
            });
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
    sercviceCall:function(){
        app.sercviceCall();
    }
})