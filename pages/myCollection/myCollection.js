echo.init({
  offset: 100,
    throttle: 250,
    unload: false,
    callback: function (element, op) {
    console.log(element, 'has been', op + 'ed');
  }
});

$(document).ready(function(){
  $("#edit").on("click",function(){
    $(".checkWrap").show();
    $(this).hide();
    $("#editFinish").show();
    $(".btnDiv").show();
  });

  $(".am-icon-circle-o").on("click",function(){
    $(this).hasClass("am-icon-circle-o")?$(this).removeClass("am-icon-circle-o").addClass("am-icon-check-circle"):$(this).addClass("am-icon-circle-o").removeClass("am-icon-check-circle");
      var checkedNum = $(".checkWrap .am-icon-check-circle").length;
      $("#merchantsNum").text(checkedNum);
  });
});
