$(document).ready(function(){
  $("#share").click(function(){
    $("body").css("position","fixed");
    popMask();
  });

  

  $(".collect").click(function(){
    $(this).hide();
    $(".collected").show();
    $(".collected-success").html("收藏成功"); 
    setInterval(function(){
      $(".collected-success").fadeOut(1500); 
    },1000);
  });

  //显示评价星星数，优化优化！！！
  var oStar = $(".am-icon-star");
  var stars = $("#inputNumber").val()-1;

  switch(stars){
    case 0:
      oStar[0].style.color="yellow";
    case 1:
      oStar[0].style.color="yellow";
      oStar[stars].style.color="yellow";
    break;
    case 2:
      oStar[0].style.color="yellow";
      oStar[1].style.color="yellow";
      oStar[stars].style.color="yellow";
    break;
    case 3:
      oStar[0].style.color="yellow";
      oStar[1].style.color="yellow";
      oStar[2].style.color="yellow";
      oStar[stars].style.color="yellow";
    break;
    case 4:
      oStar[0].style.color="yellow";
      oStar[1].style.color="yellow";
      oStar[2].style.color="yellow";
      oStar[3].style.color="yellow";
      oStar[stars].style.color="yellow";
    break;
  }

  // 商品图轮播

  var sliderslen = $(".slides>li>img").length-2;console.log(sliderslen)
  $("#sliderslen").text(sliderslen);

});


function popMask(){ 
  var cHeight=document.documentElement.clientHeight;
  var cWidth=document.documentElement.clientWidth;

  var oMask = document.createElement("div");
    oMask.id = "mask";
    oMask.style.width = cWidth+"px";
    oMask.style.height = cHeight+"px";
    document.body.appendChild(oMask);

  var omaskContet = document.createElement("div");
    omaskContet.id = "maskContet";
    omaskContet.style.width = cWidth+"px";
    omaskContet.style.height = cHeight+"px";
    omaskContet.innerHTML = "<img src='../../images/share.png' class='img-responsive'>";
    document.body.appendChild(omaskContet);

     omaskContet.onclick=function(){
      document.body.removeChild(oMask);
      document.body.removeChild(omaskContet);
      document.body.style.position="relative";
    }
}