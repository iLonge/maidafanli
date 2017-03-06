;(function($){
	function getPageList(nowPage, totalPage){
		var pageList = new Array();
		if(totalPage <= 5){
			for (var i = 0; i<totalPage; i++) {
				pageList[i] = i + 1;
			}
		} else {
			if (nowPage <= 2) {
				for (var i = 0; i < 5; i++) {
					pageList[i] = i + 1;
				}
			} else if(nowPage > totalPage - 2){
				for (var i = 0;i < 5; i++) {
					pageList[i] = totalPage - 4 + i;
				}
			} else {
				for (var i = 0;i < 5; i++) {
					pageList[i] = nowPage - 2 + i;
				}
			}

		}
		return pageList;
	};

	function getPageHtml(nowPage, totalPage, pageList, totalBranch){
		var strHtml = '';
		    strHtml = "<ul id='page-ul' class='page-ul'>";
		if (totalBranch) {
			strHtml += '<li class="totalbranch"><span total-page-num='+ totalBranch +'>共'+ totalBranch +'条记录</span></li>';
		}
			strHtml += "<li class='page font-page' data-page-num='1'><span>首页</span></li>";
		if (nowPage != '1') {
			strHtml += "<li class='page forward-page'><span>&lt;</span></li>";
		}
			for(var i = 0; i < pageList.length; i++){
				strHtml += "<li class='page page-"+ pageList[i] +"'><span>"+ pageList[i] +"</span></li>";
			}
		if (nowPage != totalPage) {
			strHtml += "<li class='page forward-page'><span>&gt;</span></li>";
		}
		    strHtml += "<li class='page last-page' data-page-num="+ totalPage +"><span>尾页</span></li>";
		    strHtml += "<li class='page-record'></li>";
		    strHtml += "<li class='jump-page'>转到<input type='text' class='page-text'>页 <a href='javascript:void(0);'>Go</a> </li></ul>";
		return strHtml;
	}

	function setPage($this, nowPage, totalPage, totalBranch){
		$this.empty();
		var pageList = getPageList(nowPage, totalPage);
		$this.append(getPageHtml(nowPage, totalPage, pageList, totalBranch));

		$this.find(".page-" + nowPage).addClass("active");
		$this.find(".page-record").text(nowPage+"/" + totalPage);


	};

	$.fn.initPage = function(data){
		var pageDefault = {
			totalPage: 10,
			nowPage: 1,
			pageSize: 5,
			totalBranch: "",
			callback: function($parent_page, nowPage){
				console.log(nowPage);
			}
		};
		var pageData = $.extend(pageDefault, data);

		
		
		setPage($(this), pageData.nowPage, pageData.totalPage, pageData.totalBranch);

		$(this).on('click', '.page', function(event) {
			var parent_page = $(this).parent().parent();
			//var text = $(this).text().trim();
			var text = $(this).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			switch(text){
				case "首页": 
					nowPage = 1;
					break;
				case "尾页":
					nowPage = parseInt($(this).attr("data-page-num"));
					break;
				case "<":
					nowPage = parseInt(parent_page.find('.active').text().replace(/^\s\s*/, '').replace(/\s\s*$/, '')) - 1;
					break;
				case ">":
					nowPage = parseInt(parent_page.find('.active').text().replace(/^\s\s*/, '').replace(/\s\s*$/, '')) + 1;
					break;
				default:
					nowPage = parseInt(text);
					break;
			}
			var oldpage = parseInt(parent_page.find('.active').text().replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
			if(nowPage == oldpage){
				return;
			}
			var totalPage = parseInt($(this).parent().find(".last-page").attr("data-page-num").replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
			var totalBranch = $(this).parent().find('.totalbranch span').text().replace(/[^0-9]/ig,"");
			pageData.callback($(this), nowPage);
			setPage(parent_page, nowPage, totalPage, totalBranch);
		});

		$(this).on('click', '.jump-page a', function(event) {
			var jumppage = parseInt($(this).prev().val().replace(/^\s\s*/, '').replace(/\s\s*$/, ''));
			var totalPage = $(this).parents(".page-ul").find(".last-page").attr("data-page-num").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
			if(jumppage > 0 && jumppage <= totalPage){
				var totalBranch = $(this).find('.totalbranch span').text().replace(/[^0-9]/ig,"");
				setPage($(this).parents(".page-ul").parent(), jumppage, totalPage, totalBranch);
				pageData.callback($(this).parents(".page-ul").parent(), jumppage);
			}
		});

		$(this).on("keydown",".page-text",function(e){
			if(e.keyCode == 13){
				$(this).next().trigger("click");
			}
		})
	}

})(jQuery)