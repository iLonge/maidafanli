	$(document).ready(function(){
	$(".withdrawal-makeSure").click(function(){
	  $(".withdrawal-content").hide();
	  $(".withdrawal-content2").show();
	  var a =$("#withdrawal").val();
	  alert(a)
	});  
	 var count = $(".prompt-count").text();
	$(".withdrawal-all").click(function(){
	    var num =  parseFloat($("#withdrawal").val(count));
    	var input = $("#withdrawal").val();	

		if(input<10||input==""||num<10){
			$(".withdrawal-makeSure").attr("disabled",true);
		}else{
			$(".withdrawal-makeSure").attr("disabled",false);
		}	
	});

	
	$("#withdrawal").keyup(function(){	
		var input = Number($("#withdrawal").val());
		var valid = /^(0(?:[.](?:[1-9]\d?|0[1-9]))|[1-9]\d*(?:[.]\d{1,2}|$))$/.test(this.value);
		console.log(valid)
		var promptCount = Number($(".prompt-count").text()).toFixed(2);
		 var val = this.value;
		    
	    if(!valid){
	        console.log("Invalid input!");
	        this.value = val.substring(0, val.length - 1);
	    }

		if(input<10||input==""){
			$(".withdrawal-makeSure").attr("disabled",true);
		}else{
			$(".withdrawal-makeSure").attr("disabled",false);
		}	


		if(input>promptCount){
			$(".withdrawal-makeSure").attr("disabled",true);
		}else{
			$(".withdrawal-makeSure").attr("disabled",false);
		}	

		
	});

	$(".withdrawal-finish-btn").click(function(){
	  $("#toast").show();
	});		
});

/*
-----------------金额验证-------------------
alert(/^(\d+(?:[.]\d{1,2})|[1-9]\d*)$/.test("1.23"));//缺点0.0与0.00也能匹配 
alert(/^(0(?:[.](?:[1-9]\d?|0[1-9]))|[1-9]\d*(?:[.]\d{1,2}|$))$/.test("0.00"));//完全满足问题要求 

思路:以0打头的则后面必须接小数点且小数点后面必然为01-99,
以大于0的数打头则小数可为1至2位任意数字或无小数部分. 

*/