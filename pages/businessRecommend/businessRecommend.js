$(document).ready(function(){
  $(".nextStep").click(function(){
    $(".scanCode").hide();
    $(".step2").show();
    $(".progress1").show();
    $(".businessInformation").show();
  });

  // 选择区域
  $("#province").click(function(){
    $("#provinceList").slideToggle();
  });

  $("#city").click(function(){
    $("#cityList").slideToggle();
  });

  $("#provinceList>li").click(function(){
    var provinceName = $(this).text();
    $("#province").text(provinceName);
    $("#provinceList").hide();
  });

  $("#cityList>li").click(function(){
    var cityName = $(this).text();
    $("#city").text(cityName);
    $("#cityList").hide();
  });

  $(".finished-btn").click(function(){
    $(".businessInformation").hide();
    $(".step3").show();
    $(".progress2").show();
    $(".makeMonery").show();
  });

  $(".am-form input").focus(function(){
    $(".am-navbar").hide();
  });
  $(".am-form input").blur(function(){
    $(".am-navbar").show("500");
  });

});