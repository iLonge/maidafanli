

function createdCard() {

	this.fns = [];

}

createdCard.prototype = {

	html5Gps:function(){



		if (window.navigator.geolocation) {

			var options = {

				enableHighAccuracy: false

			}

			window.navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options);

		} else {

			alert("浏览器不支持定位");

			handleError();

		}

		function handleSuccess(position){



			var lng = position.coords.longitude;

			var lat = position.coords.latitude;

			$.ajax({
				async:false,
				url: "/Index/gps",
				type: 'POST',
				datatype: 'json',
				data: {'lng': lng,'lat':lat},
				success: function (res) {
					var cityname = $("#cityname").text();
					if (res) {
						if(!sessionStorage.getItem("isload")){
	                        if (cityname!=res) {
	                             sessionStorage.setItem("isload","1")
	                            if(confirm('您当前的定位城市在'+res+'，确定切换到'+res+'吗？')){
	                                window.location.href="http://banka.51kahui.com";
	                            }
	                        }
	                    }
					}
				}
			})

		}

		function handleError(error){



			window.lng="0"

		}

	},

	addclick:function(){
		var that=this;
		$("#bk-moreCard").click(function(){
			var dataBank = $('.bkL_head_ol li').eq(0).find("span").attr("data-bank");
			var dataFeature = $('.bkL_head_ol li').eq(1).find("span").attr("data-feature");
			var dataLevel = $('.bkL_head_ol li').eq(2).find("span").attr("data-level");

			_data = {
				"bank" : dataBank,
				"feature" : dataFeature,
				"level" : dataLevel,
				"page" : window.calc
			};

			$.ajax({
				url:"/card/append",
				type:"post",
				dataType:"json",
				data:_data,
				success:function(obj){
					$("#bk-moreCard").attr('data-page', window.calc += 1);
					if (obj == 0) {
						// 如果没有新数据隐藏按钮
						$("#bk-moreCard").hide();
						return;
					}

					// 追加数据
					$(".bk-cardList").append(obj);
					that.applyNum();

				}

			});

		});

	},

	subscribe: function (fn) {

		this.fns.push(fn);

	},

	unsubscribe: function (fn) {

		this.fns = this.fns.filter(

			function (el) {

				if (el !== fn) {

					return el;

				}

			}

		);

	},

	update: function (o, thisObj) {

		var scope = thisObj || window;

		this.fns.forEach(

			function (el) {

				el.call(scope, o);

			}

		);

	},

	applyNum: function () {
		$(".apply").on("click", function () {
			var bankname = $(this).data("name");//获取银行名称
            $(".bk-load").show();//loading图
            $(".bankname").text(bankname);
			//懒加载及loading
			var loadingO=new loading;
			new loading().init({class:".wrap", opacitybg:"loading-opacity"});

			event.preventDefault();
			var _url = $(this).data("apply");
			var _id = $(this).data("id");
			$.ajax({
				url: "/card/addNum/id/" + _id,
				type: "post",
				dataType: "json",
				data: '',
				success:function(){

					// 关闭loading
					loadingO.closeAlert();
					// 在新页面打开
					setTimeout(function() {
                        $(".bk-detail-wrap").hide();
                        window.location.href = _url;
                    },2000);
				}
			});
		});
	}

};



