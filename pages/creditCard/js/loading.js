//loading特效
var loading =(function(){
    var loadingStart = function(config){

    }

    loadingStart.prototype.bind=function(config){
        var that=this;
        window.onload=function(){
            $(".loading-background").fadeOut(300);
            setTimeout(function(){
                $(that.config.class).fadeIn();
            },300)
        }
    }

    loadingStart.prototype.init = function(config) {
        loadingStart.prototype.config=config;
        this.addLoading(config);
        this.bind(config);
        return this;
    };
    loadingStart.prototype.addLoading=function(){
        var str='<div class="loading-background '+this.config.opacitybg+'"><div class="spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div></div>'
        $("body").append(str);
    }
    loadingStart.prototype.openAlert=function(){
        $(".loading-background").fadeIn(300);
    }
    loadingStart.prototype.closeAlert=function(){
        $(".loading-background").fadeOut(300);
    }
    //返回构造函数
    return loadingStart;
})();