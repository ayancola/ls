import {BaseModel} from "./BaseModel";

class RoomModel extends BaseModel{
    constructor() {
        super();
    }


    getRoomList(checkInDate,checkOutDate,num,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getRoomList",data:[checkInDate,checkOutDate,num]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }



    getRoomDetail(is_rush,id,rush_id,is_integral, is_ready,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getRoomDetail",data:[is_rush,id,rush_id,is_integral, is_ready]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getCommonDetail($id, $checkIn, $checkOut, $num,callBack,errCallBack){
        this.Wxrequest.request({url: "store.server.php?m=getCommonDetail",data:[$id, $checkIn, $checkOut, $num]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => {
            errCallBack();
        });
    }

    getRushDetail($id, $rush_id, $num,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getRushDetail",data:[$id, $rush_id, $num]}).then((res) => {
            console.log(res);
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getIntegralDetail($id, $checkIn, $checkOut, $num,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getIntegralDetail",data:[$id, $checkIn, $checkOut, $num]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }



}

export {RoomModel}