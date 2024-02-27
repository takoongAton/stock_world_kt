'use strict';


/* ********************

이하 전체 테스트 스크립트입니다.
개발에 용이하도록 새로 작성해서 적용 부탁드립니다.

******************** */

var $window,
	$body;

var pos;
window.addEventListener('scroll', function(){
	pos = window.scrollY;
	goTop.check(pos);
	header.header_set(pos);
	layout.active(pos)
});



var header;
header = {
	item : document.querySelector('.header'),
	inner : document.querySelector('.header .inner'),
	header_set : function(pos){
		if(pos > header.item.offsetHeight) {
			header.item.classList.add('active')
		} else {
			header.item.classList.remove('active')
		}
	},
	header_height : function(){
		header.item.style.height = header.inner.offsetHeight + 'px';
		
	}
}
header.header_height();



var layout;
layout = {
	load : function(){
		var wrap = $(".wrap");
		if(wrap.outerHeight() < window.innerHeight) {
			$("html").addClass("flexCol");
		} else {
			$("html").removeClass("flexCol");
		}
	},
	active : function(pos){
		var wrap = $(".wrap");
		if(wrap.outerHeight() < window.innerHeight) {
			console.log("작다")
			$("html").addClass("flexCol");
		} else {
			$("html").removeClass("flexCol");
		}
	}
}
layout.load();





// 툴팁 도움말
function layer_tooltip(ele) {
	$(".layer.help").hide();
	$(".layer.help").removeClass("active");
	let thisOffset  = ele.offset().top;
	let $targetHref = ele.attr("href");
	let targetId = $targetHref;
	let viewportHeight = $(window).innerHeight();
	if(viewportHeight / 2 < ((pos - thisOffset) * -1)) {
		/* 버튼의 높이값이 **보다 크면 버튼 위에 */
		let targetHeight = ( $(targetId).outerHeight() + (ele.outerHeight() / 3) )* -1; // 도움말 팝업의 높이값
		$(targetId).css({
			top : thisOffset,
			marginTop : targetHeight
		});
	} else {
		/* 버튼의 높이값이 **보다 작으면 버튼 아래 */
		$(targetId).css({
			top : thisOffset,
			marginTop : ele.outerHeight() + (ele.outerHeight() / 3)
		});
	}
	$(targetId).show();
	$(targetId).addClass("active");
	return false;
}
$(".tooltip .help").on("click", function(){
	layer_tooltip($(this));
	return false;
})
// 툴팁 도움말 end


// 메인배너 레이어 테스트
function layer_page(ele) {
	$(".layer.bnrPage").hide();
	let $targetHref = ele.attr("href");
	let targetId = $targetHref;
	$(targetId).show();
	return false;
}
$(".bnrLink").on("click", function(){
	layer_page($(this));
	return false;
})
// 메인배너 레이어 테스트 end



// css 새로고침
/*
function cssRefresh(){
	let d = new Date();
	const cssLinks = document.querySelectorAll("link");
	for(var i = 0; i < cssLinks.length; i++) {
		if((cssLinks[i]).getAttribute('rel') == 'stylesheet') {
			let href = cssLinks[i].getAttribute('href');
			let newHref = href + "?v" + d.getMilliseconds();
			cssLinks[i].setAttribute('href', newHref);
		}
	}
}
cssRefresh();
*/
// css 새로고침 end


/*
var $window = $(window);
$window.on('scroll', function(){
	var pos = $(this).scrollTop();
	if(pos >= $(".header").height()){
		$(".header").addClass("on");
	} else {
		$(".header").removeClass("on");
	}
	if(pos >= $window.height()){
		$(".goTop").addClass("on");
	} else {
		$(".goTop").removeClass("on");
	}
});
*/



/* 위로가기 버튼 */
var goTop;
goTop = {
	btn : document.querySelector(".toTop"),
	check : function(pos){
		if(pos > window.innerHeight) {
			goTop.btn.classList.add("active")
		} else {
			goTop.btn.classList.remove("active")
		}
	},
	action : function(pos){
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}
goTop.btn.addEventListener("click", function(){
	goTop.action();
})



/* 텍스트 크기 줄이기 */
function fn_txtSmall(){
	var xx = $("div.tit span");
	xx.each(function(){
		var td = $(this).closest("div");
		if($(this).outerWidth() > td.outerWidth()) {
			$(this).addClass("small")
		}
	})
}
fn_txtSmall();




/* 셀렉트 아이콘 변경 */
$(".sectionTitle div.title select").on("focus",function(){
	$(this).addClass("active")
})
$(".sectionTitle div.title select").on("blur change", function(){
	$(this).removeClass("active");
	$(this).blur();
})
$(".sectionTitle div.title select").blur(function(){
	$(this).removeClass("active");
})


/* 임의 */
$('.bnr_list .slide_wrap').slick({
	dots: true,
	dotsClass: "bnr_dots",
	infinite: true,
	arrows: false
});


/* 목록 블라인드 처리 */
function fn_blind(num){
	var itemHeight = $(".item-list .item").outerHeight();
	$(".item-list .blind").css({
		top : itemHeight * num + 1
	})
	$(".item-list .blind").show();
}
fn_blind(1);


/* 목록 블라인드 처리 */
function fn_itemBlind(num){
	let itemList = $(".item-list");
	let itemHeight = $(".item-list .item").outerHeight();
	$(".itemBlind").css({
		top : itemList.offset().top + (itemHeight * num) + 2,
		height : itemList.outerHeight(true) - (itemHeight * num)
	})
	$(".itemBlind").show();
}
// fn_itemBlind(1);


/* 아코디언 */
$(".toggle-tri").on("click", function(){
	$(this).toggleClass("active");
	$(this).find("button").toggleClass("active")
	$(this).closest(".item").children(".toggle-con").toggle();
})




function openFull(){
	$("div.layer.full").scroll(function(event){ 
		var layer_pos = $(this).scrollTop();
		if(layer_pos > 0){
			$(this).find("header").addClass("active")
		} else {
			$(this).find("header").removeClass("active")
		}
	});
}
openFull();




$(".item-list .item input").on('click',function(){
	var chkAll = $(this).prop('checked');
	if(chkAll){
		$(this).closest(".item").addClass("active")
	}else{
		$(this).closest(".item").removeClass("active")
	}
})


/* 팝업 닫기 클릭시 스크롤 원위치 */
$('.layer .close').on("click", function(){
	$(this).parents('.layer').hide();
	$(this).parents('.layer').removeClass("active");
	let has = $(this).parents('.layer').attr('class');
	if(has.indexOf("full") > 0 || has.indexOf("modal") > 0) {
		scrollRevert();
	} else {
		// scrollRevert();
	}
})



/* 전체팝업 시 기존 위치 고정 */
var dkdkdk;
function scrollFixed(params) {
	console.log("scrollFixed 실행")
	/* 스크롤 값 가져오기 */
	dkdkdk = pos;

	/* 스크롤 값을 마진으로 바꿔서 적용하기 */
	$(".wrap").css({
		position : 'fixed',
		marginTop : dkdkdk * -1,
		opacity:0
	});
}

/* 전체팝업 시 기존 위치 고정 해제 */
function scrollRevert(){
	console.log("scrollRevert 실행")
	dkdkdk = dkdkdk * -1; // 마진값을 스크롤 값으로 바꾸기
	/* 스크롤 값만큼 화면 움직이기 */
	$(".wrap").css({
		position : 'static',
		marginTop : 0,
		opacity:1
	})
	$(window).scrollTop(dkdkdk * -1)
}
function openLayer(ele){
	scrollFixed();
	$(ele).show();
}


/* 딤 클릭시 팝업 닫기 */
$(".layer .layer_dim").on("click", function(){
	$(this).parents('.layer').hide();
})

function fn_searchList(){
	let searchDate = $(".search_result .item-group");
	if(searchDate.length > 0) {
		$(searchDate).css({
			top : $(".wrap header.header").height()
		})
	}
}
fn_searchList();



/* 홈인 경우 footer 내 유료안내 버튼 하단 고정하기 샘플 */
function home(){
	var getUrl = window.location.href;
	if(getUrl.indexOf("SFH") > 0) {
		document.querySelector("footer .btn").classList.add('fixed')
	}
}
home();

/* 페이지에 footer .btn이 있는 경우 유료안내 버튼 하단 고정하기 샘플 */
let joinCharged = document.querySelector("footer .btn");
if(joinCharged != null) {
	joinCharged.classList.add("fixed")
}