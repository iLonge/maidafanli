$(document).ready(
  function(){
    $(".star1").click(function(){
      $(".star-txt").html("一般");
      $(this).css("color","#f5e61f");
      $(".star2").css("color","#ddd");
      $(".star3").css("color","#ddd");
      $(".star4").css("color","#ddd");
      $(".star5").css("color","#ddd");
      $("#getNumber").attr("value",$('.star1').attr('value'));
    });
    $(".star2").click(function(){
      $(".star-txt").html("还不错");
      $(this).css("color","#f5e61f");
      $(".star1").css("color","#f5e61f");
      $(".star3").css("color","#ddd");
      $(".star4").css("color","#ddd");
      $(".star5").css("color","#ddd");
      $("#getNumber").attr("value",$('.star2').attr('value'));
    });
    $(".star3").click(function(){
      $(".star-txt").html("挺好");
      $(this).css("color","#f5e61f");
      $(".star1").css("color","#f5e61f");
      $(".star2").css("color","#f5e61f");
      $(".star4").css("color","#ddd");
      $(".star5").css("color","#ddd");
      $("#getNumber").attr("value",$('.star3').attr('value'));
    });
    $(".star4").click(function(){
      $(".star-txt").html("很好");
      $(this).css("color","#f5e61f");
      $(".star1").css("color","#f5e61f");
      $(".star2").css("color","#f5e61f");
      $(".star3").css("color","#f5e61f");
      $(".star5").css("color","#ddd");
      $("#getNumber").attr("value",$('.star4').attr('value'));
    });
    $(".star5").click(function(){
      $(".star-txt").html("棒极了！");
      $(".am-icon-star").css("color","#f5e61f");
      $("#getNumber").attr("value",$('.star5').attr('value'));
    });

    $(".server-evaluation>li>input").click(function(){
      $(this).addClass("current").siblings().removeClass("current");
      $("#getContent").attr("vlaue",$(this).attr('value'));
    });
  }
);



/**
 * base64图片上传
 */
var UploadImg = function(options) {
    //临时参数
    this.cache = {
        tempImgList: []
    };
    //默认参数
    this.defaults = {
        imgInputId: "inputImage",                           //图片选择框ID
        imgMax:9,                                           //最大允许上传
        imgQuality: 0.6,                                    //压缩图片质量
        imgFormat: "image/jpeg",                            //压缩后图片格式
        imgSize: 700,                                       //压缩图片大小
        imgPreviewSize: 60,                                 //预览图片大小
        imgPrefix: 'img_',                                  //预览图片ID前缀
        imgName: "base64ImgList",                           //后台接收图片名称
        previewDivId: "image_preview_box",                  //图片预览div的ID
        base64DataId: "image-list-data",                    //存放图片base64数据隐藏域ID
        beforeAdd:function(previewDivId,base64DataId){      //添加图片之前回调
          
        },
        addCallback:function(input){       //添加图片成功后回调

        },
        delCallback:function(id){          //删除图片成功后回调

        },
        fullCallback:function(currtQty,maxQty){   //图片数量达到阈值后回调
           
        }

    };
    //接收参数
    this.defaults = $.extend(this.defaults, options || {});
    //初始化
    this.init();
};

UploadImg.prototype = {

    constructor: UploadImg,

    init: function () {
        var self = this,defaults = self.defaults,cache = self.cache;
        self.bindEvent();
    },
    bindEvent: function() {
        var self = this,defaults = self.defaults,cache = self.cache;
        /**
         * 选择图片后触发
         */
        $("#" + defaults.imgInputId).change(function () {
            /**
             * 支持一次选取多个文件
             */
            var len = document.getElementById(defaults.imgInputId).files.length;
            defaults.beforeAdd && $.isFunction(defaults.beforeAdd) && defaults.beforeAdd(defaults.previewDivId,defaults.base64DataId);
            var currtQty = len+$('#'+defaults.base64DataId +' input').length;
            if(currtQty > defaults.imgMax){
                defaults.fullCallback && $.isFunction(defaults.fullCallback) && defaults.fullCallback(currtQty,defaults.imgMax);
                return;
            }
            for (var i = 0; i < len; i++) {
                var file = document.getElementById(defaults.imgInputId).files[i];
                if (file) {
                    var url = window.URL.createObjectURL(file);
                    var tempImg = new Image();
                    tempImg.src = url;
                    cache.tempImgList.push(tempImg);
                    tempImg.onload = function () {
                        self.drawCompressionPicture();
                    };
                }
            }
        });

        /**
         * 点击删除按钮事件
         */
        $(document).on("click", ".delete-img", function () {
            try {
                var id = $(this).parent('div').find('img').attr('id').replace(defaults.imgPrefix, '');
                $('#' + id).remove();
                $(this).parent('div').remove();
                //删除回调函数
                defaults.delCallback && $.isFunction(defaults.delCallback) && defaults.delCallback(id);
            } catch (e) {
                console.info('删除图片失败');
            }

        });
    },
    /**
     * 显示压缩图绘制方法
     */
    drawCompressionPicture: function () {
        var self = this,defaults = self.defaults,cache = self.cache;
        var image = cache.tempImgList.shift();
        //创建临时画布
        var tempCanvas = document.createElement("canvas");
        var preview_ctx = tempCanvas.getContext("2d");
        var img = new Image();
        if (image.width < defaults.imgSize && image.height < defaults.imgSize) {
            //上传图片小于设定值,无需压缩就可以保存
            img.src = image.src;
            if (image.width >= image.height) {
                img.width = defaults.imgPreviewSize;
            } else {
                img.height = defaults.imgPreviewSize;
            }
            //绘制
            tempCanvas.height = image.height;
            tempCanvas.width = image.width;
            preview_ctx.drawImage(image, 0, 0, image.width, image.height);
        } else if (image.width >= image.height) {
            //上传图片宽度大于等于高度,按宽度设置值
            var height = image.height / (image.width / defaults.imgSize);
            tempCanvas.height = height;
            tempCanvas.width = defaults.imgSize;
            preview_ctx.drawImage(image, 0, 0, defaults.imgSize, height);
            img.src = tempCanvas.toDataURL(defaults.imgFormat, defaults.imgQuality);
            img.width = defaults.imgPreviewSize;
        } else {
            //上传图片宽度小于高度,按高度设置值
            var width = image.width / (image.height / defaults.imgSize);
            tempCanvas.width = width;
            tempCanvas.height = defaults.imgSize;
            preview_ctx.drawImage(image, 0, 0, width, defaults.imgSize);
            img.src = tempCanvas.toDataURL(defaults.imgFormat, defaults.imgQuality);
            img.height = defaults.imgPreviewSize;
        }
        //把处理后的图片显示到预览栏中
        var div = "<div class='image_show'><i class='icon-delete delete-img'>X</i><div class='images'></div></div>";
        $("#" + defaults.previewDivId).prepend(div);
        img.id = defaults.imgPrefix + self.guid();
        $("#" + defaults.previewDivId + " .image_show div").eq(0).append(img);
        //获取图片base64数据填充到表单中
        var image_data = tempCanvas.toDataURL(defaults.imgFormat);
        var img_id = img.id.replace(defaults.imgPrefix, '');
        var input = document.createElement("input");
        input.name = defaults.imgName;
        input.type = 'text';
        input.id = img_id;
        image_data = image_data.substring(image_data.indexOf(',') + 1, image_data.length);
        document.getElementById(defaults.base64DataId).appendChild(input);
        document.getElementById(input.id).setAttribute("value", image_data);
        //添加回调函数
        defaults.addCallback && $.isFunction(defaults.addCallback) && defaults.addCallback(input);
    },
    /**
     * 生成ID辅助方法
     * @returns {string}
     * @constructor
     */
    S4: function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },

    /**
     * 生成ID防范
     * @returns {string}
     */
    guid: function () {
        return (this.S4() + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4());
    }

};

/* 图片上传 */
  //px转换为rem
  /*(function(doc, win) {
      var docEl = doc.documentElement,
          resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
          recalc = function() {
              var clientWidth = docEl.clientWidth;
              if (!clientWidth) return;
              if (clientWidth >= 640) {
                  docEl.style.fontSize = '100px';
              } else {
                  docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
              }
          };

      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvt, recalc, false);
      doc.addEventListener('DOMContentLoaded', recalc, false);
  })(document, window);

  function imgChange(obj1, obj2) {
    //获取点击的文本框
    var file = document.getElementById("file");
    //存放图片的父级元素
    var imgContainer = document.getElementsByClassName(obj1)[0];
    var ofile = document.getElementsByClassName("z_file")[0];
    //获取的图片文件
    var fileList = file.files;
    //文本框的父级元素
    var input = document.getElementsByClassName(obj2)[0];
    var imgArr = [];
    //遍历获取到得图片文件
    for (var i = 0; i < fileList.length; i++) {
        var imgUrl = window.URL.createObjectURL(file.files[i]);
        imgArr.push(imgUrl);

        var img = document.createElement("img");
        img.setAttribute("src", imgArr[i]);
        var imgAdd = document.createElement("div");
        imgAdd.setAttribute("class", "z_addImg");
        imgAdd.appendChild(img);
        imgContainer.insertBefore(imgAdd,ofile);

        var w =5*i+i*(i*0.3);
        var delImg = document.createElement("img");
        delImg.setAttribute("class", "z_delImg");
        imgAdd.insertBefore(delImg,img);
        delImg.style.left += w+"rem";

    };
    imgRemove();
  };

  function imgRemove() {
    var imgList = document.getElementsByClassName("z_addImg");
    var mask = document.getElementsByClassName("z_mask")[0];
    var cancel = document.getElementsByClassName("z_cancel")[0];
    var sure = document.getElementsByClassName("z_sure")[0];
    for (var j = 0; j < imgList.length; j++) {
      imgList[j].index = j;
      imgList[j].onclick = function() {
        var t = this;
        mask.style.display = "block";
        cancel.onclick = function() {
            mask.style.display = "none";
        };
        sure.onclick = function() {
            mask.style.display = "none";
            t.style.display = "none";
        };
      }
    };
  };*/