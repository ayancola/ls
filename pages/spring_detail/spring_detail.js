// pages/room_detail/room_detail.js
const app = getApp()
import {ShopModel} from "../../utils/model/ShopModel";

var shopModel = new ShopModel();
var WxParse = require('../../utils/wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        is_confirm_book: true,
        is_integral: 0, //是否是积分商品
        is_ready: 0, //是否是从预订而来
        is_rush: 0,
        product_id: 0,
        rush_id: 0,
        w_100: app.data.w_100,
        fit: app.data.fit,
        fill: app.data.fill,
        title: '成人票',
        active_index: 0,
        choose_day: '',
        num: '1',
        time: {
            today: '',
            tomorrow: '',
            after_tomorrow: '',
            today1: '',
            tomorrow1: '',
            after_tomorrow1: '',
            after_after_tomorrow: '',
            end_day: '',
            other_day: '',
        },
        banner_img: [],
        integral_shop: false,//是否积分点进来
        money: {
            int_money: '2800',//旧价
            now_money: '1680',//现价
            integral: '4000000',
        },
        total_money: "",
        room_info: {
            quick_buy: false,//是否抢购中
            facilitate_text: '随买随用：23:00 前可预订本日门票\n无需换票：无需换票，凭订单入园',
            technology_text: '入园时间：09:00 - 23:30\n入园地址：温泉中心前台',
            other_text: '发票说明：此产品可开具发票'
        },
        endTime: '2020-01-02 10:06:10',//2018/11/22 10:40:30这种格式也行,没计时设置为空值
        timer: "",
        order_url: "/pages/order/order",
        rNum: '1',
        selVal: 1,
        room_num: ['1','2','3','4', '5', '6', '7', '8', '9', '10'],
        user_id: 0,
        share_id: 0, //是否是别人分享进来的
    },

    bindDateChange: function (e) {
        var other_day = "time.other_day"
        var timeStr = new Date(e.detail.value);
        var year = timeStr.getFullYear();
        var month = timeStr.getMonth()+1;
        var day = timeStr.getDate();
        if(month < 10){
            month = '0'+month;
        }
        if(day < 10){
            day = '0'+day;
        }
        var md = month+'月'+day+'日';
        console.log(md);
        this.setData({
            active_index: e.currentTarget.dataset.index,
            choose_day: e.detail.value,
            [other_day]: md
        });
        app.globalData.shopDate = this.data.choose_day;
        this.getShopDetail();
    },

    change: function (e) {
        this.setData({
            active_index: e.currentTarget.dataset.index,
            choose_day: e.currentTarget.dataset.time
        });
        app.globalData.shopDate = this.data.choose_day;
        this.getShopDetail();
        // this.total();
    },
    total: function () {
        var that = this;
        this.data.num = this.data.selVal;
        app.globalData.shopNum = this.data.selVal;
        if (this.data.is_integral == 0) {
            var total = that.data.money.now_money * that.data.num;
            total = total.toFixed(2);
        } else {
            if (this.data.money.now_money > 0) { //现金+积分
                var total = that.data.money.integral * that.data.num;
                total = total.toString() + "积分";
                var money = that.data.money.now_money * that.data.num;
                money = money.toFixed(2);
                money = money.toString() + "元";
                total = total + "+" + money;
            } else {
                var total = that.data.money.integral * that.data.num;
                total = total.toString() + "积分";
            }
        }
        that.setData({
            total_money: total,
        });
    },
    bindRoomNum: function (e) {
        var n = this.data.room_num[e.detail.value];
        this.setData({
            rNum: n,
            selVal: n
        });
        this.getShopDetail();
        this.total();
    },
    reduce: function (e) {
        var that = this
        if (that.data.num <= 1) {
            app.tips('已到达最小值');
        } else {
            this.setData({
                num: Number(that.data.num) - 1,
            })
        }
        app.globalData.shopNum = this.data.num;
        this.total();

    },
    add: function (e) {
        var that = this
        if (that.data.num >= 99) {
            app.tips('已到达最大值');
        }
        else {
            this.setData({
                num: Number(that.data.num) + 1,
            })
        }
        app.globalData.shopNum = this.data.num;
        this.total();
    },

    checkShopRush: function () {
        if (this.data.is_rush) {
            shopModel.checkShopRush(this.data.product_id, this.data.rush_id, this.data.num, (data) => {
                if (data.is_allow) {
                } else {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })
                }
            });
        }
    },
    //开始计时
    countDown: function () {
        var that = this;
        var nowTime = new Date().getTime();//现在时间（时间戳）
        var endTime = new Date(that.data.endTime).getTime();//结束时间（时间戳）
        var time = (endTime - nowTime) / 1000;//距离结束的毫秒数
        // 获取天、时、分、秒
        let day = parseInt(time / (60 * 60 * 24));
        let hou = parseInt(time % (60 * 60 * 24) / 3600);
        let min = parseInt(time % (60 * 60 * 24) % 3600 / 60);
        let sec = parseInt(time % (60 * 60 * 24) % 3600 % 60);
        // console.log(day + "," + hou + "," + min + "," + sec)
        //day = that.timeFormin(day),
        hou = that.timeFormin(hou),
            min = that.timeFormin(min),
            sec = that.timeFormin(sec)
        that.setData({
            day: day,
            hou: that.timeFormat(hou),
            min: that.timeFormat(min),
            sec: that.timeFormat(sec)
        })
        // 每1000ms刷新一次
        if (time > 0) {
            that.setData({
                countDown: true
            })
            setTimeout(this.countDown, 1000);
        } else {
            that.setData({
                countDown: false
            })
        }
    },
    //小于10的格式化函数（2变成02）
    timeFormat(param) {
        return param < 10 ? '0' + param : param;
    },
    //小于0的格式化函数（不会出现负数）
    timeFormin(param) {
        return param < 0 ? 0 : param;
    },
    fun_date: function (aa) {
        var date1 = new Date(),
            time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var time2 = (date2.getMonth() + 1) + "月" + date2.getDate() + "日";
        return time2
    },
    fun_date1: function (aa) {
        var date1 = new Date(),
            time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + aa);
        var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
        return time2
    },

    show_confirm_tips: function () {
        wx.showToast({
            title: this.data.tips,
            image: "",
            icon: "none",
            duration: 2000
        });
    },


    getShopDetail(){
        var that = this;
        shopModel.getShopDetail(this.data.is_rush, this.data.product_id, this.data.rush_id, this.data.is_integral, this.data.is_ready,this.data.choose_day,this.data.selVal, (data) => {
            WxParse.wxParse('content', 'html', data.content, this, 0);
            if (this.data.is_rush == 1 || this.data.is_rush == '1') {
                this.data.endTime = data.rush_end_time;
            }
            this.data.order_url = this.data.order_url + "?type=shop&is_integral="+this.data.is_integral+"&rush_id=" + this.data.rush_id + "&id=" + this.data.product_id;
            this.setData({
                title: data.name,
                banner_img: data.img,
                room_params: data.room_params,
                money: data.money,
                product_id: this.data.product_id,
                is_rush: this.data.is_rush,
                rush_id: this.data.rush_id,
                is_ready: this.data.is_ready,
                is_integral: this.data.is_integral,
                endTime: this.data.endTime,
                order_url: this.data.order_url,
                is_confirm_book: data.is_allow_book,
                tips: data.tips
            });
            if (this.data.is_confirm_book == false) {
                this.show_confirm_tips();
            }
            that.countDown();
            this.total();
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;

        var product_id = options.id;
        var is_rush = options.is_rush;
        var rush_id = options.rush_id;
        var is_ready = options.ready;

        var is_integral = options.is_integral;
        if (is_ready == undefined || is_ready != '1') {
            is_ready = 0;
        }else{
            is_ready = 1;
        }
        if (is_integral == undefined || is_integral != '1') {
            is_integral = 0;
        }else{
            is_integral = 1;
        }
        if (is_rush == undefined || is_rush != '1' || is_rush != 1 || rush_id == '') {
            is_rush = 0;
            rush_id = 0;
        } else {
            is_rush = 1;
        }

        this.data.is_rush = is_rush;
        this.data.product_id = product_id;
        this.data.rush_id = rush_id;
        this.data.is_ready = is_ready;
        this.data.is_integral = is_integral;

        // that.countDown();
        that.fun_date(1);
        var today = "time.today";
        var today1 = "time.today1";
        var tomorrow = "time.tomorrow";
        var tomorrow1 = "time.tomorrow1";
        var after_tomorrow = "time.after_tomorrow";
        var after_tomorrow1 = "time.after_tomorrow1";
        var after_after_tomorrow = "time.after_after_tomorrow";
        var end_day = "time.end_day";
        that.setData({
            choose_day: that.fun_date1(0),//选中日期
            [today]: that.fun_date(0),
            [today1]: that.fun_date1(0),
            [tomorrow]: that.fun_date(1),
            [tomorrow1]: that.fun_date1(1),
            [after_tomorrow]: that.fun_date(2),
            [after_tomorrow1]: that.fun_date1(2),
            [after_after_tomorrow]: that.fun_date1(3),
            [end_day]: that.fun_date1(60),

        });
        app.globalData.shopNum = this.data.num;
        app.globalData.shopDate = this.data.choose_day;

        var share_id = options.share_id; //父级
        if (share_id == undefined || share_id == "") {
            share_id = 0;
        }
        wx.setStorageSync("share_id", share_id);
        this.getShopDetail();


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
    },

    onHide: function () {
        if (this.data.timer != '') {
            clearTimeout(this.data.timer);
        }
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        if (this.data.timer != '') {
            clearTimeout(this.data.timer);
        }
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