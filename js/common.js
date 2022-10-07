
$(document).ready(function(){
	
	// 메뉴 타이틀 체크 ( 메뉴가 없는 경우 왼쪽 메뉴 갱신 )
//	if($("#sideContent h1").children().length == 0){
	if($("#sideContent h1").length == 0){
		$('#sideContent').append("<h1>"+$('#pageTitle').text()+"</h1>");
		$('#location').html("");
	}
})

/* function valueEmpty */
jQuery.fn.valueEmpty = function() {
    if (jQuery.trim(jQuery(this).val()).length < 1 ) {
        return true;
    } else {
        return false;
    }
};

/* function number and comma */
function numComma(data){
	if (jQuery.trim(data).length > 3 ) {
    	var returnValue = "";
        var commaValue = ""+data;
        for(idx=commaValue.length-1,chk=0;idx>=0;idx--,chk++){
        	if(chk == 3){
        		chk=0;
        		returnValue = commaValue.substr(idx,1) + "," + returnValue;
        	} else {
        		returnValue = commaValue.substr(idx,1) + returnValue;
        	}
        }
        return returnValue;
    } else {
        return data;
    }
}

var nowZoom = 1; 
var maxZoom = 2; 
var minZoom = 1; 
var reduceMinZoom = 0.5;

//화면 키운다.
function zoomIn() {
 if (nowZoom < maxZoom) {
  nowZoom += 0.05;
 } else {
  return;
 }

 document.getElementById("wrap").style.transformOrigin = "50% 0%";
 document.getElementById("wrap").style.transform = "scale("+nowZoom + ")";
}


function zoomOut() {
 if (nowZoom > minZoom) {
  nowZoom -= 0.05; 
 } else {
  return;
 }
	 document.getElementById("wrap").style.transformOrigin = "50% 0%";
	 document.getElementById("wrap").style.transform = "scale("+nowZoom + ")";
}

$(function () {
	/* function onlyNumber */
	$(".onylNum").change(function(){
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
})

//파일 다운로드
function mfn_fileDownload(fileKey){
	if(fileKey != "" || fileKey == null){
		location.href="/common/fileDownload.do?fileKey="+fileKey;	
	}
};

// 인쇄
$(document).on("click", ".btnPrint", function(){
	var initBody = document.body.innerHTML;

	window.onbeforeprint = function () {
		document.body.innerHTML = document.getElementById("subContent").innerHTML;
	}

	window.onafterprint = function () {
		document.body.innerHTML = initBody;
	}

	window.print();
});

$(function(){
	//도움말기능 시작
	$(".adminHpcmIcon").click(function(){
		
		var obj = $(this);
		chk = obj.attr('chk');
		if (chk == null) {
			chk = 1;
		}
		
		if (chk == 1) {
			$.ajax({
				type : "get",
				url : "/apple/hc/hpcm/selectHpcm.do",
				data : {"hpcmSn" : $(this).attr("data-hp")},
				dataType : "json",
				success:function(data){
					obj.popover({
						title : data.hpcmSj,
						container : "body",
						toggle : "popover",
						placement : "right",
						trigger: 'focus',
						html : "true",
						content : data.hpcmDc
					}).popover('show');
					obj.attr('chk','0');
				},
				error : function(error) {
					alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
				}	
			});
		}else{
			obj.attr('chk','1');
		}
	})
	
	//도움말기능 시작(공통)
	$(".hpcmIcon").click(function(){
		
		var obj = $(this);
		chk = obj.attr('chk');
		if (chk == null) {
			chk = 1;
		}
		
		if (chk == 1) {
			$.ajax({
				type : "get",
				url : "/common/hc/hpcm/selectHpcm.do",
				data : {"hpcmSn" : $(this).attr("data-hp")},
				dataType : "json",
				success:function(data){
					obj.popover({
						title : data.hpcmSj,
						container : "body",
						toggle : "popover",
						placement : "right",
						trigger: 'focus',
						html : "true",
						content : data.hpcmDc
					}).popover('show');
					obj.attr('chk','0');
				},
				error : function(error) {
					alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
				}	
			});
		}else{
			obj.attr('chk','1');
		}
	})
	
	
})
//도움말기능 끝

// 메뉴 접근 권한 체크
function menuAccessCheck(mi, sysId){
	var url = "/" + sysId + "/mn/menu/menuAccess.do"
	
	$.ajax({
		type : "post",
		url : url,
		data : { 
			menuId : mi
		},
		dataType : "json",
		success : function(data) {
			var accessVal = JSON.parse(data.accessVal);
			
			if (accessVal == "Y") {
				var accessUrl = JSON.parse(data.menuUrl);
				location.href = accessUrl;
			} else {
				alert("접근 권한이 없습니다.");
				return false;
			}
		},
		error : function(data) {
			alert("오류가 발생하였습니다.\n관리자에게 문의하세요.");
		}		
	});	
}




$(function(){
	// 팝업 닫기(쿠키설정 원하는 기간안에 열람하지 않기)
	$('.pop_close').on('click',function(){ 
	    $('#wrap').removeClass('openPop');
	    
	   	//팝업 일정기간동안 열지 않기(쿠키설정)
	    var popSysId = $(this).attr("data-sysid");
		var cookieNM = "popCookie"+popSysId;
		var closePd = Number($(this).attr("data-closepd"))
	
		setCookie(cookieNM, "hide",closePd);
		//location.reload(); (팝업리스트에서 리스트닫기시 새로고침으로 인 주석처리 : 새로고침 필요없어보임)
	})
	var cookieName = "popCookie"+ $("#pop_close1").attr("data-sysid");
	if( getCookie(cookieName) != "hide"){
		$('.up_pop').removeClass('upPopClose');
		$('.up_pop').addClass('upPopOpen');
	}
	
	if( getCookie(cookieName) == "hide"){
		$('.up_pop').css('display','none');
		$('.popBtn').css('display','none');
		$('#wrap').removeClass('openPop');
		$("link[rel=stylesheet][href*='/00_common/css/up_pop.css']").remove();
	}
})


//팝업 쿠키 저장
function setCookie(cookieName, value,closePd){
    var exdays = Number(closePd);
    var exdate = new Date();
    var day = exdate.getDate() * 1;
    
    exdate.setDate(day + exdays);
//    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toGMTString());
    var cookieValue = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString()); 
    document.cookie = cookieName + "=" + cookieValue;
}

// 쿠키조회
function getCookie(cookieName) {
    cookieName = cookieName + '=';
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = '';
    if(start != -1){
        start += cookieName.length;
        var end = cookieData.indexOf(';', start);
        if(end == -1)end = cookieData.length;
        cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
}

// 팝업 닫기(쿠키설정)
$(document).on('click', '.popupCookieSet', function() {
	var popValue = $(this).attr("data-seq");
	var cookieNM = "popCookie"+popValue;
	
	setCookie(cookieNM, "hide");
	$("#popupNormal"+popValue).parent().remove();
});

/*
// 팝업 닫기(쿠키설정 원하는 기간안에 열람하지 않기)
$(document).on('click', '.pop_close', function() {
	var popValue = $(this).attr("data-seq");
	var cookieNM = "popCookie"+popValue;
	var closePd = Number($(this).attr("data-closepd"));
	

//	setCookie(cookieNM, "hide", "1");
	setCookie(cookieNM, "hide",closePd);
	$("#popupNormal"+popValue).parent().remove();
	$("#popupNormalHide"+popValue).parent().remove();
});
*/

//게시판 rssFeed
function rssFeed(meintext){
	if (window.clipboardData) {
		window.clipboardData.setData("Text", meintext);
		alert("아래주소가 클립보드에 복사되었습니다. Ctrl+V로 붙여넣기해서 사용하세요.\n" + meintext);
	}else {
		temp = prompt("Ctrl+C를 눌러 클립보드로 복사하세요", meintext );
	}
}

// 로그인 시간
var pathname = window.location.pathname;
const arr = pathname.split("/");
var sysId = arr[1];

var iMinute;// 시간 지정 분
var iSecond; //초단위로 환산
var timerchecker = null;

window.onload = function() {
	var timeLimitVal = $("#timeLimit").val() == undefined ? 30 : $("#timeLimit").val();
	
	fncClearTime(timeLimitVal);
	initTimer(); //페이지 로드시 initTimer함수 실행(시간 카운트)
}

Lpad = function(str, len) {
	str = str + "";
	while(str.length < len) {
		str = "0"+str;
	}
	return str;
}

initTimer = function() {
	rMinute = parseInt(iSecond / 60);
	rSecond = iSecond % 60;
	if(iSecond > 0 && rMinute > 1) {
		iSecond--;
		timerchecker = setTimeout("initTimer()", 1000); // 1초 간격으로 체크
	}else if(iSecond > 0 && rMinute < 2){
		kcreTable();
		var addedFormDiv = document.getElementById("timer");
		
		addedFormDiv.innerHTML = ""+Lpad(rMinute, 2)+":"+Lpad(rSecond, 2);
		iSecond--;
		timerchecker = setTimeout("initTimer()", 1000); // 1초 간격으로 체크
		
	}else{
		clearTimeout(timerchecker); //타이머 중지
		location.href = "/" + sysId + "/lo/login/logout.do"; // 세션아웃
		//location.href = "/" + sysId + "/lo/login/timeLogout.do"; // 세션아웃
	}
}

//시간 설정
function fncClearTime(strM) {
	iMinute = strM;
	iSecond = iMinute * 60;
}

// font-family: 'NotoSans', '돋움', 'Dotum', '굴림', 'Gulim', AppleGothic, UnDotum, Arial, Tahoma, Verdana, sans-serif; font-weight: 200; font-size: 0.7rem; color: #666;

//화면 생성
function kcreTable() {
	var addHtml = document.getElementById("timeLoadingView");
	var str1 = ""; 
	str1 += "<div style='position:absolute; background:url(/images/web/common/timeout/pop_bg.png) no-repeat; width:440px; height:300px; top:10%; left:40%; z-index:999999999;'> ";
	str1 += "	<h1 style='font-family:NotoSans, 돋움, Dotum; font-size:17px; color:#fff; line-height:42px; padding-left:20px;'>자동 로그아웃 안내</h1> ";
	str1 += "	<p style='font-family:NotoSans, 돋움, Dotum; font-size:15px; color:#267ab8; font-weight:bold; text-align:center; padding:30px 0 5px 0 ;margin: 10px 0 0 0;'><span id='timer'></span>초 후 자동으로 로그아웃 예정입니다.</p> ";   
	str1 += "	<div style='width:300px; height:24px; line-height:18px; border:1px solid #bedceb; margin:0 auto 15px; text-align:center;'><img src='/images/web/common/timeout/loading_bar.gif' alt='loading' /></div> ";               
	str1 += "	<div style='width:381px; height:70px; padding-top:15px; padding-left:15px; border:1px solid #ddd; background:#fbfbfb; margin:0 auto 20px;'> ";
	str1 += "		<ul style='list-style-type:none; margin:0; padding:0; font-family:NotoSans, 돋움, Dotum; font-size:13px; color:#898989; line-height:20px;'> ";
	str1 += "			<li style='font-weight: 500;'><span style='color:#ff7800;'>로그인 후 60분간</span> 사용이 없으실 경우 자동으로 로그아웃 됩니다.</li> ";
	str1 += "			<li style='font-weight: 500;'>로그아웃을 원하지 않으시면 <span style='color:#ff7800;'>[로그인 연장하기]</span>를 클릭 해 주세요.</li> ";
	str1 += "		</ul> ";
	str1 += "	</div> ";
	str1 += "	<div style='width: 255px; margin:0 auto'> ";
	str1 += "		<a href='#' onClick='javascript:sReset();' style='font-family:NotoSans, 돋움, Dotum; display:inline-block; width: 120px; height:28px; line-height:24px; color:#fff; font-size:14px; text-align:center; background-color:#ff8a00; border:1px solid #ec7913; text-decoration:none'>로그인 연장하기</a>";
	str1 += "		<a href='/" + sysId + "/lo/login/logout.do' style='font-family:NotoSans, 돋움, Dotum; display:inline-block; width: 120px; height:28px; line-height:24px; color:#fff; font-size:14px; text-align:center; background-color:#7c7d82; border:1px solid #6e6e72; margin-left:10px; text-decoration:none'>로그아웃</a>";
	str1 += "	</div>";
	str1 += "	<a href='#' onClick='javascript:kdelTable();' title='닫기' style='position:absolute; width: 20px; height: 20px; padding: 0px; top: 9px;right: 12px;; border:0'><img src='/images/web/common/timeout/btn_close.gif' alt='닫기' style='border:0'></a> ";
	str1 += "</div> ";
	
	addHtml.innerHTML = str1;
}

//화면 삭제
function kdelTable()
{
	if(!confirm("창을 닫으면 자동 로그아웃 됩니다.")) return;
	var addHtml = document.getElementById("timeLoadingView");
	addHtml.parentNode.removeChild(addHtml); // 폼 삭제  
	location.href = "/" + sysId + "/lo/login/logout.do";
}

//로그인 연장
function sReset()
{
	document.location.reload(); 
}


/*
$(function(){
	var pathname = window.location.pathname;
	const arr = pathname.split("/");
	var sysId = arr[1];
	var reqServiceCheck = false;
	
	var timeLimitVal = $("#timeLimit").val() == undefined ? 30 : $("#timeLimit").val();
	var timeLimit = 1000* 60 * timeLimitVal; //자동로그아웃 체크( 'timeLimitVal' 분 )
	var LogOutTimer = function(){	
		var S = {
			timer : null,
			limit : timeLimit ,
			fnc   : function(){},
			start : function(){
				S.timer = window.setTimeout(S.fnc, S.limit);
			},
			reset : function(){
				window.clearTimeout(S.timer);
				S.start();
			}
		};		
		document.onmousemove = function(){ 
			if(reqServiceCheck) S.reset(); 
			//console.log("마우스");
		};
		document.onkeypress = function(){
			if(reqServiceCheck) S.reset(); 
			//console.log("키보드");
		}; 	  
		return S;
	}();

	// 로그아웃 체크시간 설정
	LogOutTimer.limit = timeLimit;

	// 로그아웃 함수 설정
	LogOutTimer.fnc = function(){
		$.ajax({
			type: "POST",
			url: "/"+sysId+"/lo/login/loginChk.do",
			dataType: "json",
			success:function(result){
				//alert("장시간 미사용으로 자동 로그아웃 처리되었습니다.\n지원센터홈페이지로 이동됩니다."); 
				location.href="/"+sysId+"/lo/login/timeLogout.do"; 
			},
			error:function(data){   
				console.log("오류가 발생하였습니다.\n관리자에게 문의하세요.");
			}
		});
	}
	$.ajax({
		type: "POST",
		url: "/"+sysId+"/lo/login/loginChk.do",
		dataType: "json",
		success:function(data){
			//console.log("loginChk[result] : " + data.result);
			if(data.result == "Y"){
				reqServiceCheck = true;
				// 로그아웃 타이머 실행
				LogOutTimer.start();
			}
		},
		error:function(data){   
			console.log("오류가 발생하였습니다.\n관리자에게 문의하세요.");
		}
	});
});

*/

//댓글에 대한 입력 수 제한
$(document).ready(function() {
	$('#answerCn').on('keyup', function() {
		$('#_writedByte').html($(this).val().length);
 
		if($(this).val().length > 500) {
			$(this).val($(this).val().substring(0, 500));
			$('#_writedByte').html("500");
		}
	});
});

//동두천양주 관내지도 페이지 tap 추가 2021-12-28 sms
$('.schoolListType').click(function() {
	var num = $(this).attr('id');
	if(num.indexOf('list') > -1){
		
		$('.tab_st1 li').removeClass('on'); //동두천 지역별(동두천,남면,은현면 등) on 클래스 전체 삭제
		$('.tab_list li').removeClass('on'); //각학교타입(유치원,초등학교,중학교,고등학교,특수학교) on 클래스 전체 삭제
		
		$('#type'+num).addClass('on'); //선택한 지역(동두천,남면,은현면 등) on 클래스 추가
		$('#shsection1').addClass('on'); //유치원 on 클래스 추가 
		
		var type = $('.tab_st1').find('li.on').attr('id'); 
		$('.tbl_st').css('display','none'); //현재 아래에 표출되고있는 데이터를 전부다 display:none 처리
		$("#"+type+"_section1").css('display','block'); //유치원 데이터가 먼저 보이게
	}else{
		$('.tab_list li').removeClass('on'); //각학교타입(유치원,초등학교,중학교,고등학교,특수학교) on 클래스 전체 삭제
		$('#sh'+num).addClass('on'); //선택한 학교타입(유치원,초등학교,중학교,고등학교,특수학교) on 클래스 추가
		var type = $('.tab_st1').find('li.on').attr('id'); 
		$('.tbl_st').css('display','none'); // tbl_st 클래스 전체 display:none 처리
		$("#"+type+"_"+num).css('display','block'); //클릭한 내용에 해당하는 div id찾아서 display:block 처리.
	}
	
});
