import {BaseModel} from "./BaseModel";

class OrderModel extends BaseModel {
    constructor() {
        super();
    }

    confirmRoomOrder($product_id, $rush_id, $is_integral, $checkIn, $checkOut, $num, coupon_id, callBack) {
        this.Wxrequest.request({
            url: "store.server.php?m=confirmRoomOrder",
            data: [$product_id, $rush_id, $is_integral, $checkIn, $checkOut, $num, coupon_id]
        }).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => {

        });
    }

    confirmShopOrder($product_id, $rush_id, $is_integral, $checkIn, $num, coupon_id, callBack) {
      console.log("cc");
      console.log($product_id);
      console.log("aa");
      console.log($rush_id);
      console.log("bb");
        this.Wxrequest.request({
            url: "store.server.php?m=confirmShopOrder",
            data: [$product_id, $rush_id, $is_integral, $checkIn, $num, coupon_id]
        }).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => {

        });
    }


    getPayDesc(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getPayDesc", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getPhoneNumber(iv, encryptedData, callBack) {
        this.Wxrequest.request({url: "store.server.php?m=getPhoneByWechat", data: [iv, encryptedData]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    PayShopOrder($product_id, $rush_id, $is_integral, $checkIn, $num, $coupon_id, $orderlist, callBack, errCallBack) {
        this.Wxrequest.request({
            url: "store.server.php?m=PayShopOrder",
            data: [$product_id, $rush_id, $is_integral, $checkIn, $num, $coupon_id, $orderlist]
        }).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => {
            errCallBack(error);
        });
    }

    PayRoomOrder($product_id, $rush_id, $is_integral, $checkIn, $checkOut, $num, $coupon_id, $orderlist, callBack, errCallBack) {
        this.Wxrequest.request({
            url: "store.server.php?m=payRoomOrder",
            data: [$product_id, $rush_id, $is_integral, $checkIn, $checkOut, $num, $coupon_id, $orderlist]
        }).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => {
                errCallBack();
            }
        );
    }

    getMyOrder(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getMyOrder", data: []}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getOrderDetail(type,id,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getOrderDetail", data: [type,id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    Repay(type,id,callBack){
        this.Wxrequest.request({url: "store.server.php?m=Repay", data: [type,id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    cancelOrder(type,id,callBack){
        this.Wxrequest.request({url: "store.server.php?m=cancelOrder", data: [type,id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    PayRushOrder(product_id,rush_id,rush_num,callBack){
        this.Wxrequest.request({url: "store.server.php?m=PayRushOrder", data: [product_id,rush_id,rush_num]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }




}

export {OrderModel}