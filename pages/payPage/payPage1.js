$(document).ready(function(){


  //修复ios输入框获取焦点时不支持fixed的bug
  var isIOS=(/iphone|ipad/gi).test(navigator.appVersion);
  if(isIOS){
    $('.js_wrap').on('focus','input',function(){        //js_wrap是中间含有文本框的区域 
      $('body').css("position","relative");                             
    }).on('focusout','input',function(){
      $('body').css("position","fixed");
    });
  }
  /**************************** 键盘核心 *******************************/
  var sd = "";
  var sd1 = "";
  var sd2 = ""; 
  var sd3 = "";
  var returnNumber = toPoint($("#returnNumber").val());

  $("#payMonery").focus(function(){
    $(".inputBox").addClass("active");
    $("html,body").css("overflow-x:","hidden");
    input_val(this,"payMonery");
  });

  $("#payMonery").click(function(){
    $(".nojoinContent").removeClass("active");
  });

  $("#payMonery").blur(function(){
    $(".inputBox ").css("border","1px solid #dedede");
  });
   
  $("#nojoinMonery").focus(function(){ 
    $(".nojoinContent").addClass("active");
    $(".inputBox").removeClass("active"); 
    $("html,body").css("overflow-x:","hidden");  
    input_val(this,"nojoinMonery");
  });

  $("#nojoinMonery").blur(function(){
    $(".nojoinContent ").css("border","1px solid #dedede");
  });

  function input_val(ele,id){
    function getId(id){
      return document.getElementById(id);
    }

    getId("back").onclick = function(){
      ele.value = ele.value.replace(/.$/,'');
      var payMoneryval = $("#payMonery").val();
      if(!payMoneryval){
        getId("returnBox2").style.display = "none";
        getId("returnBox1").style.display="block";
      }

      if(nojoinMonery&&payMonery){
        var payMonery1 = Number($("#payMonery").val());
        var nojoinMonery1 = Number($("#nojoinMonery").val()); 
        var returnValue1 = String(((payMonery1-nojoinMonery1)*returnNumber).toFixed(4));
        getId("return").value = Number(returnValue1.substring(0,returnValue1.lastIndexOf('.')+3));
      }else if(!nojoinMonery&&payMonery){
        var payMonery2 = Number($("#payMonery").val());console.log(payMonery2)
        var nojoinMonery2 = Number($("#nojoinMonery").val()); console.log(nojoinMonery2)
        var returnValue2 = String((payMonery2*returnNumber).toFixed(4));
        getId("return").value = Number(returnValue2.substring(0,returnValue.lastIndexOf('.')+3));

      }

      //输入框为空时，支付按钮状态为不可操作
      if(!payMonery && !nojoinMonery){
        $("#pay").css("background-color","#c8c8c8");
        $("#pay").attr("disabled",true);
        $("#returnBox2").hide();
        $("#returnBox1").show();
      }

      if(payMonery<nojoinMonery){
         //popMask1();
        alert("您的输入有误");
        $("#payMonery").val("");
        $("#nojoinMonery").val("");
        $("#return").val("");
        $("#pay").disabled = true;
        $("#pay").css("background-color","#c8c8c8");
        getId("returnBox2").style.display = "none";
        getId("returnBox1").style.display="block";
      }
    }
    
    for(var i=0;i<11;i++ ){
      getId("btn"+i).onclick = function(){
        if(this.value == "." && ele.value == "") return false;
        if(this.value == "." && ele.value.indexOf(".") != -1) return false;

        if(ele.value == "0"){
          if(this.value == "."){
            ele.value += this.value;
          }
        }else{
          ele.value += this.value; 
        }

        var opayMonery = getId("payMonery");   
        var payMonery = getId("payMonery").value;
        var returnvalue = getId("return").value;
        var oreturnvalue = getId("return");
        var payMoneryValue='';
        var nojoinMoneryValue =getId("nojoinMonery").value;

     

        /* 限制用户输入非两位小数 */
        if(nojoinMoneryValue.indexOf('.')==-1){
            sd1 = nojoinMoneryValue;
         }else{
            sd1 = nojoinMoneryValue.substring(0, nojoinMoneryValue.indexOf('.')+3);
         }

         getId("nojoinMonery").value = sd1;

      
        if(payMonery.indexOf('.')!=-1){
            payMoneryValue = payMonery.substring(0, payMonery.indexOf('.')+3);
         }else{
            payMoneryValue = payMonery;
         }

        opayMonery.value = payMoneryValue;
        /* /限制用户输入非两位小数 */
        /* 返现显示两位小数 */
        var result = String(payMoneryValue*returnNumber);
        var result1 = String((payMoneryValue - nojoinMoneryValue)*returnNumber);

        if(result.indexOf('.')==-1){
          sd2 = result;
        }else{
          sd2 = result.substring(0, result.indexOf('.')+3);
        }

        if(result1.indexOf('.')==-1){
          sd3 = result1;
        }else{
          sd3 = result1.substring(0, result1.indexOf('.')+3);
        }
        
        /* 判断用户是否参与优惠金额 */
        if(nojoinMoneryValue != "" || nojoinMoneryValue != 0){
          getId("return").value= sd3;
        }else{
          getId("return").value= sd2;
        }
        /* /判断用户是否参与优惠金额 */ 

        /* 判断用户输入不参与返现金额不大于支付金额 */
        if(payMoneryValue < Number(nojoinMoneryValue)){
           //popMask1();
           alert("您输入金额不正确");
          $("#payMonery").val("");
          $("#nojoinMonery").val("");
          $("#return").val("");
          $("#pay").disabled = true;
          getId("returnBox2").style.display = "none";
          getId("returnBox1").style.display="block";
        }
        /* /判断用户输入不参与返现金额不大于支付金额 */


        /* 限制用户输入金额最大为100000 */
        if(payMonery<=10000.00){
          getId("pay").style.background = "#E60827";
          getId("pay").disabled = false;
          getId("returnBox1").style.display = "none";
          /*setTimeOut()function(){};*/
          getId("returnBox2").style.display = "block";
        }else{
          //popMask1();
          alert("您输入不得大于10000");
          getId("pay").disabled = true;
          $("#nojoinMonery").val("");
          $("#payMonery").val("");
          $("#return").val("");
          $("#pay").css("background-color","#c8c8c8");
          getId("returnBox2").style.display = "none";
          getId("returnBox1").style.display="block";
        }
        /* /限制用户输入金额最大为9999.99 */
      }
    }
  }

  /**************************** /键盘核心 *******************************/

  //失焦，禁止键盘弹出,弹出模拟
  $("input").click(function(){
    document.activeElement.blur();
    $("#keyboard").slideDown(500);
  });

  //键盘显示隐藏
  $("#xiaq_tb").click(function(){
    $("#keyboard").slideUp(500);
  });

  $("#payMonery").click(function(){
    $("#keyboard").slideDown(500);
  });

  /*点击返现/支付阻止键盘弹出*/
  $("#numb_box>ul>li,#return,#returnNumber,#pay").unbind();

  //余额显示/隐藏
  $("#switchBtn").click(function(){
    $(".balanceContent").toggle();
    var a = $("#number").val();
    var status = $("#balance").css("display");
    if(status =="block"){
      $("#balance").attr("value",a);
    }else{ 
      $("#balance").attr("value",0);
    }
  });


  //滚动至获取焦点下方位置
  // 滚动到底部
  $('#isJoin-txt,#isJoin').on('click', function() {
    var $w = $(window);
    $(".nojoin").slideToggle(300);
    $("#isJoin").toggleClass('bg1').toggleClass('bg2');
    $w.smoothScroll({position: $(document).height() - 120});
    $("#nojoinMonery").focus();
  });
});

/*返现%转小数*/
function toPoint(percent){
  var str=percent.replace("%","");
  str= str/100;
  return str;
}

function amount(th){
  var regStrs = [
      //['^0(\\d+)$', '$1'],           //禁止录入整数部分两位以上，但首位为0
      ['^(\d+(?:[.]\d{1,2})|[1-9]\d*)$','$1'],
      ['[^\\d\\.]+$', ''],           //禁止录入任何非数字和点
      ['\\.(\\d?)\\.+', '.$1'],      //禁止录入两个以上的点
      ['^(\\d+\\.\\d{2}).+', '$1']   //禁止录入小数点后两位以上
  ];
  
  for(i=0; i<regStrs.length; i++){
      var reg = new RegExp(regStrs[i][0]);
      th.value = th.value.replace(reg, regStrs[i][1]);
  }
}

//err提示模态框
function popMask1(){  
  var cHeight=document.documentElement.clientHeight;
  var cWidth=document.documentElement.clientWidth;

  var oMask1 = document.createElement("div");
    oMask1.id = "mask1";
    oMask1.style.width = cWidth+"px";
    oMask1.style.height = cHeight+"px";
    document.body.appendChild(oMask1);

  var omaskContet1 = document.createElement("div");
    omaskContet1.id = "maskContet1";
    omaskContet1.style.width = cWidth+"px";
    omaskContet1.style.height = cHeight+"px";
    omaskContet1.innerHTML = "<div class='personal-code1'><p>您的输入有误，<br/>请重新填写金额。<br/><span class='am-text-danger'>(单笔金额不得大于10000,且不参与打折金额小于支付金额)</span></p><span class='am-fr' id='know'>知道了</span></div> ";
    document.body.appendChild(omaskContet1); 

    var know = document.getElementById("know");
    know.onclick=function(){
      document.body.removeChild(oMask1);
      document.body.removeChild(omaskContet1);
      //window.location.href="payPage1.html";
      $("#payMonery").val("");
      $("#nojoinMonery").val("");
    }
  }