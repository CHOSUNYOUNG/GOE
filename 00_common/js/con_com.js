$(function(){	
	//tab
	if($('div[class^="tab_st"]').length > 0){
		reactTab();
	}
});

var check = false;

$(window).resize(function() {
	this.resizeTO = setTimeout(function() {
		$(this).trigger('resizeEnd');
	}, 150 );
}).resize();

$(window).on('resizeEnd', function() {
	$w_w = $(window).innerWidth();
	resetImgZoom();
});

/** 이미지 확대보기 **/
function resetImgZoom(){
	var win_w = $(window).innerWidth();
	var zwObj =  $('.rsp_img');
	
	if(win_w<=768){
		zwObj.each(function(){
			var this_s = $(this);
			var zwObjImg = this_s.children("img");
			var zwObjUrl = zwObjImg.attr("src");

			if(check == false){
				this_s.append("<a href='" + zwObjUrl + "' class='btn-zoom' target='_blank' title='새창열림'><span class='blind'>이미지 확대보기</span></a>");
				zwObjImg.addClass("zoom");
			}
		});
		check = true;
	} else {
		zwObj.each(function(){
			var this_s = $(this);
			var zwObjImg = this_s.children("img");
			if(check == true){
				$(".btn-zoom, .btn-down", $(this).parent()).remove();
				zwObjImg.removeClass("zoom");
			}
		});
		check = false;
	}
}

// tab
function reactTab(){
	var $tab = $('div[class^="tab_st"]');

	$(window).resize(function() {
		this.resizeTO = setTimeout(function() {
			$(this).trigger('resizeEnd');
		},100 );
	}).resize();
	
	$(window).on('resizeEnd', function() {
		$tab.each(function(){
			if($(window).width() < 1241){
				$(this).addClass('reactTab');
			}else{
				$(this).removeClass('reactTab').find('> ul').removeAttr('style');
			}
		});
	});


	$tab.each(function(idx){
		var $link = $(this).find(' > ul > li.on > a');
		var $linkCopy = $link.addClass('select').clone();

		$link.attr('title', '선택된 페이지');
		$(this).find('> ul').before($linkCopy);
	});

	$(document).on('click', '.reactTab > a.select', function (e) {

		var $tabBox = $(this).next('ul');
		$tabBox.slideToggle();

		return false;
	});
}



