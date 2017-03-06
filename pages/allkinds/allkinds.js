
$(document).ready(function(){
  $("#more-food-btn").click(function(){
    $(".hide-food-info").slideToggle(300);
    $(this).hide();
    $("#more-food-btn-up").show();  
  });

  $("#more-food-btn-up").click(function(){
      $("#more-food-btn-up").hide();
      $(".hide-food-info").slideToggle(300);
      $("#more-food-btn").show();
    });


  $("#more-fun-btn").click(function(){
    $(".hide-fun-info").slideDown(300);
    $(this).hide();
    $("#more-fun-btn-up").show();
  });
  
  $("#more-fun-btn-up").click(function(){
      $("#more-fun-btn-up").hide();
      $(".hide-fun-info").slideUp(300);
      $("#more-fun-btn").show();
    });

  $("#more-hotel-btn").click(function(){
    $(".hide-hotel-info").slideDown(300);
    $(this).hide();
    $("#more-hotel-btn-up").show();
    
  });
  $("#more-hotel-btn-up").click(function(){
      $("#more-hotel-btn-up").hide();
      $(".hide-hotel-info").slideUp(300);
      $("#more-hotel-btn").show();
    });

  $("#more-ktv-btn").click(function(){
    $(".hide-ktv-info").slideDown(300);
    $(this).hide();
    $("#more-ktv-btn-up").show();
    
  });
  $("#more-ktv-btn-up").click(function(){
      $("#more-ktv-btn-up").hide();
      $(".hide-ktv-info").slideUp(300);
      $("#more-ktv-btn").show();
    });

  $("#more-jiazhuang-btn").click(function(){
    $(".hide-jiazhuang-info").slideDown(300);
    $(this).hide();
    $("#more-jiazhuang-btn-up").show();
    
  });
  $("#more-jiazhuang-btn-up").click(function(){
      $("#more-jiazhuang-btn-up").hide();
      $(".hide-jiazhuang-info").slideUp(300);
      $("#more-jiazhuang-btn").show();
    });

  $("#more-move-btn").click(function(){
    $(".hide-move-info").slideDown(300);
    $(this).hide();
    $("#more-move-btn-up").show();
    
  });
  $("#more-move-btn-up").click(function(){
      $("#more-move-btn-up").hide();
      $(".hide-move-info").slideUp(300);
      $("#more-move-btn").show();
    });
});