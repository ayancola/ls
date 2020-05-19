  var add_moreimg = {
    choose_img: function (count, that, callback){
      //需要一个pics:[],img_length:0
      var pic_arry=that.data.pics;
      var list_length=that.data.pics.length;
      if (list_length<count){
        wx.chooseImage({
          count: count - list_length,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success(res) {
            // tempFilePath可以作为img标签的src属性显示图片
            const tempFilePaths = res.tempFilePaths;
            for (var i = 0; i < tempFilePaths.length; i += 1){
              pic_arry.push(tempFilePaths.slice(i,i+1))
            }
            list_length = that.data.pics.length;
            that.setData({
              pics: pic_arry,
              img_length: list_length,
            });
            callback(res.tempFilePaths);
          }
        })
      }
    },
    replace_img: function (e, that, callback) {//替换图片
      var src = e.currentTarget.dataset.src;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          for (var i = 0; i < that.data.pics.length; i++) {
            if (src == that.data.pics[i]) {
              var set_arr = 'pics['+i+']';
              that.setData({
                [set_arr]: tempFilePaths,
              });
              break;
            }
          }
          callback(res.tempFilePaths);
        }
      })
    },
    del_img: function (e, that, callback){//删除图片
      var src = e.currentTarget.dataset.src;
      var del_arr=that.data.pics;
      for (var i = 0; i < that.data.pics.length; i++) {
        if (src == that.data.pics[i]) {
          del_arr.splice(i,1);
          var list_length = that.data.pics.length;
          that.setData({
            pics:del_arr,
            img_length: list_length
          });
          break;
        }
      }
      callback();
    },
  }
module.exports = add_moreimg;