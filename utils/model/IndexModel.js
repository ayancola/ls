import {BaseModel} from "./BaseModel";

class IndexModel extends BaseModel {
    constructor() {
        super();
    }

    getIndexBanner(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getIndexBanner"}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }


    getIndexDesc(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getIndexDesc"}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getIndexHotRoom(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getIndexHotRoom"}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }
    getActivityDetail(id,callBack){
        this.Wxrequest.request({url: "store.server.php?m=getActivityDetail",data:[id]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getFood(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getFood",data:[]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getIndexHotVilla(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getIndexHotVilla",data:[]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }

    getIndexHotSpring(callBack){
        this.Wxrequest.request({url: "store.server.php?m=getIndexHotSpring",data:[]}).then((res) => {
            typeof callBack == "function" ? callBack(res.data) : "";
        }).catch(error => console.log(error));
    }
}

export {IndexModel}