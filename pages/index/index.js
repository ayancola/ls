//index.js
//获取应用实例
import {ShopModel} from "../../utils/model/ShopModel";

const app = getApp()
import {IndexModel} from "../../utils/model/IndexModel";

var Moment = require("../../utils/moment.js");
var shopModel = new ShopModel();
var indexModel = new IndexModel();

Page({
    data: {
        banner_img: [],
        modalName:'',
        w_100: app.data.w_100,
        fit: app.data.fit,
        share_id: 0, //是否是别人分享进来的
        user_id:0,
        nav: [
            {
                icon: 'http://www.fenglu-alu.com/images/lsimg/icon1_1.png',
                text: '限时抢购',
                link: '/pages/shop/shop?active_index=0'
            },
            {
                icon: 'http://www.fenglu-alu.com/images/lsimg/icon1_2.png',
                text: '优惠券',
                link: '/pages/shop/shop?active_index=1'
            },
            {
                icon: 'http://www.fenglu-alu.com/images/lsimg/icon1_3.png',
                text: '积分商城',
                link: '/pages/shop/shop?active_index=2'
            }
        ],
        room: [],
        shop_list: [
            {img: 'http://www.fenglu-alu.com/images/lsimg/icon3_11.png',txt:'匠心客房',txt2:'拥有72间主楼客房，满足不同入住需求，提供舒适的体验。'},
            {img: 'http://www.fenglu-alu.com/images/lsimg/icon3_21.png',txt:'半山别墅',txt2:'拥有18栋各式别墅。依山傍水，怡人美景。'},
            {img: 'http://www.fenglu-alu.com/images/lsimg/icon3_31.png',txt:'养生温泉',txt2:'纯天然硫磺温泉，38个特色温泉池。草木相映，鸟语花香。'},
            {img: 'http://www.fenglu-alu.com/images/lsimg/icon3_41.png',txt:'生态美食',txt2:'山坑鱼、山坑螺、新兴米粉等原生态食材，精心烹饪。'},
        ],
        periphery: [
            {img: 'http://www.fenglu-alu.com/images/xcx/img2_1.jpg', text: '国恩寺',},
            {img: 'http://www.fenglu-alu.com/images/xcx/img2_2.jpg', text: '六祖故居',},
        ],
        slist: [],
        slist2: [],
        slist3:[],
        HotVilla:[],
    },
    get_coupon: function (e) {
        var that = this;
        var tab_index = e.currentTarget.dataset.index;
        var coupon_id = shopModel.us.getDataSet(e, "id");
        if (e.currentTarget.dataset.state == false) {
            shopModel.toGetCoupon(coupon_id, (data) => {
                var get_name = "coupon_list.list[" + tab_index + "].has_get"
                that.setData({
                    [get_name]: true
                });
                app.tips('领取成功');
            });
        }
        else {
            app.link_tab('/pages/room_list/room_list');
        }
    },

    showModal: function() {
        this.setData({
          modalName: 'Image'
        })
   },
    hideModal: function() {
        this.setData({
          modalName: ''
        })
    },

    viewimg: function (e) {
        let $index = e.currentTarget.dataset.index;
        let img_arr = [];
        for (var i = 0; i < this.data.periphery.length; i++) {
            img_arr.push(this.data.periphery[i].img);
        }
        wx.previewImage({
            current: this.data.periphery[$index].img, // 当前显示图片的http链接
            urls: img_arr // 需要预览的图片http链接列表
        })
    },
    onPullDownRefresh: function () {
        indexModel.clearCache("indexDesc");
        indexModel.clearCache("indexBanner");
        indexModel.clearCache("indexRoom");
        this.onShow();
    },

    //事件处理函数
    onLoad: function (options) {
      var share_id = options.share_id; //父级
        if (share_id == undefined || share_id == "") {
            share_id = 0;
        }
        wx.setStorageSync("share_id",share_id);

    },

    onShow: function () {
        indexModel.getIndexBanner((data) => {
            var banner = data.banner;
            var spring_banner = data.spring_banner;
            var slist2 = data.topic_banner;
            var slist3 = data.buttom_banner;
            for (var i = 0; i < banner.length; i++) {
                if (banner[i].wx_linkurl != '' && banner[i].wx_linkurl_type != '0') {
                    banner[i]['is_link'] = true;
                    if (banner[i].wx_linkurl_type == '1') {
                        banner[i]['link_type'] = "navigate";
                    } else if (banner[i].wx_linkurl_type == '2') {
                        banner[i]['link_type'] = "redirect";
                    } else {
                        banner[i]['link_type'] = "switchTab";
                    }
                } else {
                    banner[i]['is_link'] = false;
                    banner[i]['link_type'] = "";
                }
            }

            for (var j = 0; j < spring_banner.length; j++) {
                if (spring_banner[j].wx_linkurl != '' && spring_banner[j].wx_linkurl_type != '0') {
                    spring_banner[j]['is_link'] = true;
                    if (spring_banner[j].wx_linkurl_type == '1') {
                        spring_banner[j]['link_type'] = "navigate";
                    } else if (spring_banner[j].wx_linkurl_type == '2') {
                        spring_banner[j]['link_type'] = "redirect";
                    } else {
                        spring_banner[j]['link_type'] = "switchTab";
                    }
                } else {
                    spring_banner[j]['is_link'] = false;
                    spring_banner[j]['link_type'] = "";
                }
            }

            for (var k = 0; k < slist2.length; k++) {
                if (slist2[k].wx_linkurl != '' && slist2[k].wx_linkurl_type != '0') {
                    slist2[k]['is_link'] = true;
                    if (slist2[k].wx_linkurl_type == '1') {
                        slist2[k]['link_type'] = "navigate";
                    } else if (slist2[k].wx_linkurl_type == '2') {
                        slist2[k]['link_type'] = "redirect";
                    } else {
                        slist2[k]['link_type'] = "switchTab";
                    }
                } else {
                    slist2[k]['is_link'] = false;
                    slist2[k]['link_type'] = "";
                }
            }
            this.setData({
                banner_img:banner,
                slist:spring_banner,
                slist2:slist2,
                slist3:slist3
            });
        });


        var indexRoom = indexModel.getCache("indexRoom");
        if (indexRoom === false) {
            indexModel.getIndexHotRoom((data) => {
                data = indexModel.us.wxjsonDecode(data, "room_params");
                this.setData({
                    room: data
                });
                indexModel.setCache("indexRoom", data);
            });
        } else {
            this.setData({
                room: indexRoom
            });
        }




        var indexHotVilla = indexModel.getCache("indexHotVilla");
        if (indexHotVilla === false) {
            indexModel.getIndexHotVilla((data) => {
                data = indexModel.us.wxjsonDecode(data, "room_params");
                this.setData({
                    HotVilla: data
                });
                indexModel.setCache("indexHotVilla", data);
            });
        } else {
            this.setData({
                HotVilla: indexHotVilla
            });
        }




        shopModel.getUserInfo((data)=>{
            this.data.user_id = data.id;
        });
    },
    getUserInfo: function (e) {
    },
    _link: function (e) {
        var active_index = e.currentTarget.dataset.index; //daiguoqu
        wx.setStorageSync("param_id", active_index);
        wx.switchTab({
            url: "/pages/shop/shop"
        });
    },
    link_to_room: function (e) {
        var url = indexModel.us.getDataSet(e, "url");
        if (wx.getStorageSync("ROOM_SOURCE_DATE") === "") {
            wx.setStorage({
                key: 'ROOM_SOURCE_DATE',
                data: {
                    checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
                    checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
                }
            });
        }
        if (wx.getStorageSync("bookNum") === "") {
            wx.setStorage({
                key: 'bookNum',
                data: 1
            });
        }
        wx.navigateTo({
            url: url
        });
    },
    i_shop_link: function (e) {
        var active_index = e.currentTarget.dataset.index; //daiguoqu
        if (active_index != 3) {
            wx.setStorageSync("ishop_id", active_index);
            wx.switchTab({
                url: "/pages/room_list/room_list"
            });
        }else{
            wx.navigateTo({
                url: "/pages/food/food"
            });
        }
    },

    previewImg: function (e) {
        var currentUrl = e.currentTarget.dataset.imgurl;
        var imglist = [];
        this.data.is_preview = true;
        if (this.data.slist.length > 0) {
            for (var i = 0; i < this.data.slist.length; i++) {
                imglist.push(this.data.slist[i]['images']);
            }
            wx.previewImage({
                current: currentUrl, // 当前显示图片的http链接
                urls: imglist// 需要预览的图片http链接列表
            })
        }

    },

    previewImg2: function (e) {
        var currentUrl = e.currentTarget.dataset.imgurl;
        var imglist = [];
        this.data.is_preview = true;
        if (this.data.slist2.length > 0) {
            for (var i = 0; i < this.data.slist2.length; i++) {
                imglist.push(this.data.slist2[i]['images']);
            }
            wx.previewImage({
                current: currentUrl, // 当前显示图片的http链接
                urls: imglist// 需要预览的图片http链接列表
            })
        }

    },


    link_to_point:function(){
        wx.navigateTo({
                  url: '/pages/integral/integral',
                })
        },
    
    link_to_coupon:function(){
        wx.setStorageSync("param_id", 1);
        wx.switchTab({
                url: "/pages/shop/shop"
            });
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
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        var that = this;
        return {
            title: '龙山温泉酒店',
          path: '/pages/index/index?is_share=1&share_id=' + that.data.user_id,
          imageUrl: 'http://www.fenglu-alu.com/images/lsimg/share.jpg' //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
        }
    },

    sercviceCall:function(){
        app.sercviceCall();
    }


})
