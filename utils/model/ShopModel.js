import {BaseModel} from "./BaseModel";

class ShopModel extends BaseModel {
    constructor() {
        super();
    }


    getSpringList(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getSpringList", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getMeditationList(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getMeditationList", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getShopDetail(is_rush, product_id, rush_id,is_integral,is_ready,checkIn, num,callBack) {
        this.Wxrequest.request({
            url: "store.server.php?m=getShopDetail",
            data: [is_rush, product_id, rush_id,is_integral,is_ready,checkIn,num]
        }).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    checkShopRush($product_id, $rush_id, $num, callBack) {
        this.Wxrequest.request({
            url: "store.server.php?m=checkShopRush",
            data: [$product_id, $rush_id, $num]
        }).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getRushInfo(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getRushInfo", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getCouponList(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getCouponList", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    toGetCoupon(coupon_id, callBack) {
        this.Wxrequest.request({url: "store.server.php?m=toGetCoupon", data: [coupon_id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getShopPoint(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getShopPoint", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getCouponTxt(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getCouponTxt", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getMyCoupon(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getMyCoupon", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getMyRush(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getMyRush", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getMyTntegral(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getMyTntegral", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }
    getMyPointsList(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getMyPointsList", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getMarker(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getMarker", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getLocationDetail(id,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getLocationDetail", data: [id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }
}

export {ShopModel}