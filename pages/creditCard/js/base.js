/**
 * Created by Arthur on 16/6/17.
 */
$(function(){

    //返回顶部按钮显示隐藏
    $(window).scroll(function(){
        if($(window).scrollTop() > $(window).height()){
            $(".bk-gotop").show(300);
        }else{
            $(".bk-gotop").hide(300);
        }
    })
    /*返回顶部按钮点击*/
    $(".bk-gotop").click(function(){
        $("body,html").stop().animate({"scrollTop":0},500);
    });


    // 申请按钮
    var card = new createdCard();

    // 加载更多
    card.addclick();
    // 申请计数
    card.applyNum();


});