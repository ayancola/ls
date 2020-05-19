import {BaseModel} from "./BaseModel";

class CartModel extends BaseModel {
    constructor() {
        super();
    }

    cartNum(callBack) {
        this.Wxrequest.request({url: "store.server.php?m=cartNum"}).then((res) => {
            typeof callBack == "function" ? callBack(res) : "";
        }).catch(error => console.log(error));
    }

    getCartList(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getCartList"}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    removeCart(cart_id,callBack){
        this.Wxrequest.request({url: "store.server.php?m=removeCart",data:[cart_id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    createOrders(arr,callBack){
        this.Wxrequest.request({url: "store.server.php?m=createOrders",data:[arr]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    add(cart_id,num,callBack){
        this.Wxrequest.request({url: "store.server.php?m=addNum",data:[cart_id,num]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }
    reduceNum(cart_id,num,callBack){
        this.Wxrequest.request({url: "store.server.php?m=reduceNum",data:[cart_id,num]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


}

export {CartModel}