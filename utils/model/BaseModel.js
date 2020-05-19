var us = require("../underscore/underscore");
import {WxRequest} from "../wxRequest/WxRequest";

class BaseModel {
    constructor() {
        this.us = us;
        this.Wxrequest = new WxRequest();
    }

    setCache(key, value, cache_time =  1000) { //毫秒级别
        return  true;
        var time_value = new Date().getTime() + cache_time;
        wx.setStorageSync(key, value);
        wx.setStorageSync(key + "_ctime", time_value);
    }

    getCache(key) {
        return false;
        try {
            var value = wx.getStorageSync(key);
            var time_value = wx.getStorageSync(key + "_ctime");
            var currenttimestamp = new Date().getTime();
            if (value && time_value && parseInt(time_value) - currenttimestamp > 0) {
                return value;
            } else {
                wx.removeStorageSync(key);
                wx.removeStorageSync(key + "_ctime");
                return false;
            }
        } catch (e) {
            wx.removeStorageSync(key);
            wx.removeStorageSync(key + "_ctime");
            return false;
        }
    }

    clearCache(key) {
        wx.removeStorageSync(key);
        wx.removeStorageSync(key + "_ctime");
        return true;
    }

    getUserInfo(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getUserInfo"}).then((res) => {
            var data = res.data;
            typeof callBack == "function" ? callBack(data) : "";
        }).catch(error => console.log(error));
    }

}


export {BaseModel}