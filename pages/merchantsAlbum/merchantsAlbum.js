$(document).ready(function(){
    $(".dishes").click(function(){
      $(".dishes-info").show();
      $(".environment-info").hide();
      $(".all-info").hide();
      $(".doorHeader-info").hide();
      $(".dishes").addClass("active");
      $(".environment").removeClass("active");
      $(".doorHeader").removeClass("active");
      $(".all").removeClass("active");
    });
    $(".environment").click(function(){
      $(".dishes-info").hide();
      $(".environment-info").show();
      $(".all-info").hide();
      $(".doorHeader-info").hide();
      $(".dishes").removeClass("active");
      $(".environment").addClass("active");
      $(".doorHeader").removeClass("active");
      $(".all").removeClass("active");
    });
    $(".doorHeader").click(function(){
      $(".dishes-info").hide();
      $(".environment-info").hide();
      $(".all-info").hide();
      $(".doorHeader-info").show();
      $(".dishes").removeClass("active");
      $(".environment").removeClass("active");
      $(".doorHeader").addClass("active");
      $(".all").removeClass("active");
    });
    $(".all").click(function(){
      $(".dishes-info").hide();
      $(".environment-info").hide();
      $(".all-info").show();
      $(".doorHeader-info").hide();
      $(".dishes").removeClass("active");
      $(".environment").removeClass("active");
      $(".doorHeader").removeClass("active");
      $(".all").addClass("active");
    });
  }
);