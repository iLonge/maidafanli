$(document).ready(function(){

  $("#isJoin").addClass("bg1");
  $("#isJoin").click(function(){   
    $(this).toggleClass('bg1').toggleClass('bg2');
    $("#noJoin").slideToggle("fast");
  });
  $("#isJoin-txt").click(function(){
    $("#isJoin").toggleClass('bg1').toggleClass('bg2');
    $("#noJoin").slideToggle("fast");
  });

  $(".icon-circle-hide").click(function(){
    $(".check-circle").show();
    $(".check-circle-count").hide();
  });
 
  $(".check-circle").click(function(){
    $(".check-circle").hide();
    $(".check-circle-count").show();
 
    inputCount = parseFloat($(".inputCount").val());
    balance = balanceN;
    cha = parseFloat(inputCount-balance);
    /*if(cha<0){
      $("#ye-btn").attr("disabled",true);
      $("#msg-input").show();
    }*/
    $("#pay-submit-btn").hide();
    $("#ye-btn").show();
    $(".ye-pay-amount").html(cha.toFixed(2));

    if(inputCount<balance){
      $(".ye-pay-amount").html(inputCount.toFixed(2));
    }
    /*if(cha<0){
    $("#ye-btn").attr("disabled",true);
    $("#msg-input").show();
    }*/
  });
  var cha = parseFloat(inputCount-balance);
  var inputCount = parseFloat($(".inputCount").val());
  var balance = parseFloat($(".balance").val());
  
  $(".inputCount").keyup(function(){
    var discount =$(".discount").text();
    var number = toPoint(discount);
        inputCount = $(".inputCount").val();
        balance = $(".balance").val();
    var cha = parseFloat(inputCount-balance);
   /* num = $(".pay-amount").html(inputCount-balance);*/
    /*var payEnd =$("#pay-submit-btn .pay-amount").html();
    console.log(payEnd);*/
    $(".ye-pay-amount").html(inputCount);
    /*if(cha<0){
      $("#pay-submit-btn").attr("disabled",true);
    }*/
    count = ($(".inputCount").val()-$(".noJoin-preferential").val())*number;
    $(".returnCount").text(count.toFixed(2));   
                
  /*  if($(".inputCount").val()==""||$(".inputCount").val()<1){
      $("#pay-submit-btn").attr("disabled",true);
    }else{
      $("#pay-submit-btn").removeAttr("disabled");
    }*/
    if(inputCount==""){
      $("#pay-submit-btn").attr("disabled",true);
      $("#msg-input").show();
      $(".ye-pay-amount").html("");
    }else{
      $("#pay-submit-btn").attr("disabled",false);
      $("#msg-input").hide();
    }
    $(".pay-amount").html(inputCount); 
    /*判断是否余额支付*/
    if(cha<=0){
      $("#pay-submit-btn").hide();
   /*   var ye = $(".ye-pay-amount").html(inputCount);
      console.log(ye)*/
      $("#ye-btn").show();
    }else if(cha>0){
      $("#pay-submit-btn").show();
      $("#ye-btn").hide();
      $(".pay-amount").html(cha.toFixed(2));
    }
    onlyNonNegative(this);
  });

  /*返现计算*/
  $(".noJoin-preferential").focus(function(){
    $(".returnCount").text("");
  });
  $(".noJoin-preferential").keyup(function(){
    discount =$(".discount").text();
    number = toPoint(discount);
    count = ($(".inputCount").val()-$(".noJoin-preferential").val())*number;
    $(".returnCount").text(count.toFixed(2));
    if(count<0){
      $("#pay-submit-btn").attr("disabled",true);
      $("#msg-input").show();
     /* $(".icon-circle-hide").unbind("click");*/
    }else{
      $("#pay-submit-btn").attr("disabled",false);
      $("#msg-input").hide();
      /*$(".icon-circle-hide").bind("click");*/
    }
  });
 
  /*确认支付金额*/
  var balanceN = parseFloat($(".balance").val());
  $(".icon-circle-hide").click(function(){
    inputCount = $(".inputCount").val();
    $(".pay-amount").html(inputCount);
    $("#pay-submit-btn").show();
    $("#ye-btn").hide();
    $(".balance").val();
    $(".pay-amount").html(inputCount);
  });

  /*
  *输入金额状态判断
  */
  var inputStatus = $("#msg-input").attr("display","block");

  if(inputStatus){
    $("#ye-btn").attr("disabled",true);
    $("#pay-submit-btn").attr("disabled",true);
  }else{
     $("#ye-btn").attr("disabled",false);
     $("#pay-submit-btn").attr("disabled",false);
  }

});

/*用户输入不能小于等于0*/
  function control(e,o){
        var v=o.value|0;
        if(v<=0){
            o.value='';
            o.focus();
        }
    };

  /*返现金额计算*/
  function toPoint(percent){
      var str=percent.replace("%","");
      str= str/100;
      return str;
  }

  //通过2步做到输入的为非负数  
  //1.去掉多余的小数点  
  //2.保证只能输入小数点或数字  
  function onlyNonNegative(obj) {  
   var inputChar = event.keyCode;  
   //alert(event.keyCode);  
     
   //1.判断是否有多于一个小数点  
   if(inputChar==190 ) {//输入的是否为.  
    var index1 = obj.value.indexOf(".") + 1;//取第一次出现.的后一个位置  
    var index2 = obj.value.indexOf(".",index1);  
    while(index2!=-1) {  
     //alert("有多个.");  
       
     obj.value = obj.value.substring(0,index2);  
     index2 = obj.value.indexOf(".",index1);  
    }  
   }  
   //2.如果输入的不是.或者不是数字，替换 g:全局替换  
   obj.value = obj.value.replace(/[^(\d|.)]/g,"");  
  }  

