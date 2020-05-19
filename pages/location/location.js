// pages/location/location.js
const app = getApp()
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
        active_index: '0',
        nav: [ '一键导航','周边景点'],
        user_id: 0,
        share_id: 0, //是否是别人分享进来的
        location_list: [],
        markers: [],
    },
    change: function (e) {
        app.change(e, this);
    },
    open_map: function (e) {
        var that = this;
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                //console.log(e.currentTarget.dataset.index)
                const i = e.currentTarget.dataset.index
                const latitude = that.data.location_list[i].map_list.latitude
                const longitude = that.data.location_list[i].map_list.longitude
                const name = that.data.location_list[i].map_list.name
                const address = that.data.location_list[i].map_list.address
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
    location_map: function (e) {
        var that = this;
        console.log(that.data.markers);

        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success(res) {
                //console.log(e.currentTarget.dataset.index)
                const latitude = that.data.markers[0].latitude
                const longitude = that.data.markers[0].longitude
                const name = that.data.markers[0].name
                const address = that.data.markers[0].address
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

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        shopModel.getUserInfo((data) => {
            this.data.user_id = data.id;
        });
        shopModel.getMarker((data) => {
            this.setData({
                location_list:data.location_list,
                markers:data.markers
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