var us = require("../underscore/underscore");

import {BaseModel} from "../model/BaseModel";
var  baseModel = new BaseModel();
class Download {

    constructor() {

    }

    downloadFileUrl($class_id,callBack) {
        baseModel.Wxrequest.request({url: "store.server.php?m=getClassInfoFile",data:[$class_id]}).then((res) => {
            typeof callBack == "function" ? callBack(res) : "";
        }).catch(error => console.log(error));
    }


}

export {Download}