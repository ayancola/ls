// pages/my_coupon/my_coupon.js
import {ShopModel} from "../../utils/model/ShopModel";

const app = getApp();
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
        nav: ['全部', '未使用', '已使用', '已过期'],
        window_show: false,
        coupon_txt: "",
        all_list: [],
        list: [
       
        ]

    },

    show: function (e) {
        var that = this;
        var index = shopModel.us.getDataSet(e, "index");
        if (typeof index != "undefined" && typeof this.data.list[index].remark != "undefined") {
            this.setData({
                coupon_txt: this.data.list[index].remark,
            })
        }
        this.setData({

            window_show: !that.data.window_show
        })
    },
    use_coupon: function () {
        wx.switchTab({
            url: '/pages/room_list/room_list',
        })
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
        var index = this.data.active_index;
        var tmp = [];
        if (index == 0) {
            this.setData({
                list: this.data.all_list
            });
        } else if (index == 1) {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].has_use == false && this.data.all_list[i].has_date == false) {
                    tmp.push(this.data.all_list[i]);
                }
            }
            this.setData({
                list: tmp
            });
        } else if (index == 2) {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].has_use == true && this.data.all_list[i].has_date == false) {
                    tmp.push(this.data.all_list[i]);
                }
            }
            this.setData({
                list: tmp
            });
        } else {
            for (var i = 0; i < this.data.all_list.length; i++) {
                if (this.data.all_list[i].has_use == false && this.data.all_list[i].has_date == true) {
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
        shopModel.getMyRush((data) => {
            console.log(data);
            this.setData({
                all_list: data
            });
            this.showList();
        });

    },

    sercviceCall:function(){
        app.sercviceCall();
    }
})