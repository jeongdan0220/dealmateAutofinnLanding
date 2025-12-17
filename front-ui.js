function pageBack(){
    if(document.referrer) {
        history.go(-1);
    } else {
        location.href = "./";
    }
}

/* **************************************** *
 * userAgent
 * **************************************** */
var userAgentCheck = function(){
	var ua = navigator.userAgent.toString().toLowerCase();
	var agent =  {
			ie : (/msie/i).test(ua) || (/trident/i).test(ua),
			firefox: (/firefox/i).test(ua),
			webkit: (/applewebkit/i).test(ua),
			chrome: (/chrome/i).test(ua),
			opera: (/opera/i).test(ua),
			ios: (/ip(ad|hone|od)/i).test(ua),
			android: (/android/i).test(ua)
		};

		agent.safari = agent.webkit && !agent.chrome;
		agent.mobile = document.ontouchstart !== undefined && ( agent.ios || agent.android );
		agent.desktop = !(agent.ios || agent.android);

		// ie 버전체크
		if(agent.ie){
			var _ieversion = ua.match(/(msie |trident.*rv[ :])([0-9]+)/)[2];
			_ieversion = Math.floor(_ieversion);
			agent.ie = "ie"+_ieversion;
		}                

		agent.os = (navigator.appVersion).match(/(mac|win|linux)/i);
		agent.os =  agent.os ? agent.os[1].toLowerCase() : '';  

		var _html = document.getElementsByTagName('html')[0];
		var _class = '';
		for (var value in agent) {
			  if(agent[value]){                                
					if(value == 'os'){
						_class += agent.os;
					}else if(value == 'ie'){
						_class += agent[value]+' ';
					}else{
						_class += value+' ';
					}
			  }                      
		}
		_html.className += _class;
 }();



/* **************************************** *
 * Scroll Control
 * **************************************** */
$(function(){
	
	//상단으로 스크롤
	$('.toTop').click(function(){
		$( 'html, body' ).animate({"scrollTop": "0"},500);
	});
	
	$(window).scroll(function() {
		var _scrTop = $(window).scrollTop();
		var _scrHeight = $(window).height();
		var _footHeight = $('#footer').outerHeight();
		
		if (_scrTop >= 20) {
			$("body").addClass("scrolled");
		} else {
			$("body").removeClass("scrolled");
		// } if (_scrTop >= $(document).height() - $(window).height() - (_footHeight / 3)) {
		} if (_scrTop >= $(document).height() - $(window).height() - 100) {
			$("body").addClass("lastScroll");
		} else {
			$("body").removeClass("lastScroll");
		}
	});
	
	
	var lastScrollTop = 0, delta = 30;

	$(window).scroll(function(e){
		var st = $(this).scrollTop();

		if(Math.abs(lastScrollTop - st) <= delta)
		return;

		if ((st > lastScrollTop) && (lastScrollTop>0)) {
			// scroll down
			$("body").addClass("scrollDown").removeClass("scrollUp");
		} else {
			// scroll up
			$("body").addClass("scrollUp").removeClass("scrollDown");
		}
		lastScrollTop = st;
	});
	
	//해시태그 스무스 스크롤
	$('a[href^="#"].smoothscroll').bind('click.smoothscroll',function (e)
	{
		e.preventDefault();
		var target = this.hash,
			$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top -80
		}, 600, 'swing', function ()
		{
			// window.location.hash = target;
		});
	});
	
	
});

jQuery(function($){
	var faqItem = $('.compare_area > ul > li');
	faqItem.addClass('hide');
	faqItem.find('.item_dtl').hide();
	$('.compare_area > ul > li:first-child').find('.item_dtl').show();
	$('.compare_area > ul > li:first-child').removeClass('hide').addClass('on');

	$('.compare_area > ul > li > .item_tit ').click(function(){
		var onFaqItem = $(this).parents('.compare_area > ul > li:first');
		if(onFaqItem.hasClass('hide')){
			//faqItem.addClass('hide').removeClass('on');
			//faqItem.find('.item_dtl').slideUp(200);
			onFaqItem.removeClass('hide').addClass('on');
			onFaqItem.find('.item_dtl').slideDown(200, function() {
				//theOffset = $(this).offset();
				//$('body,html').animate({ scrollTop: theOffset.top - 200 });
			});
			
		} else {
			onFaqItem.removeClass('on').addClass('hide');
			onFaqItem.find('.item_dtl').slideUp(300);
		}
		return false;
	});
});


/* **************************************** *
 * form group interactions
 * **************************************** */
 $(document).ready(function () {
	 // selectric
	$('[class*="selectric_"] select').selectric({
		nativeOnMobile: false,
	});
	
	// input text event
	$('[class*="input_type_"] input').focusin(function(){
		if ($(this).attr('readonly') == 'readonly') {
			$(this).parents('[class*="input_type_"]').removeClass('focus');
		} else {
			$(this).parents('[class*="input_type_"]').addClass('focus');
		}
	});
	$('[class*="input_type_"] input').focusout(function(){
		$(this).parents('[class*="input_type_"]').removeClass('focus');
	});
	
	jQuery.each(jQuery('input[disabled]'), function () {
		$(this).parents('[class*="input_type_"]').addClass('disabled');
	});
	jQuery.each(jQuery('input[readonly]'), function () {
		$(this).parents('[class*="input_type_"]').addClass('readonly');
	});
	jQuery.each(jQuery('input[required]'), function () {
		$(this).parents('[class*="input_type_"]').find('.tit').addClass('bulReq');
	});
	
	
	// textarea event
	$('[class*="textarea_type_"] textarea').focusin(function(){
		$(this).parents('[class*="textarea_type_"]').addClass('focus');
	});
	$('[class*="textarea_type_"] textarea').focusout(function(){
		$(this).parents('[class*="textarea_type_"]').removeClass('focus');
	});
	
	jQuery.each(jQuery('textarea[disabled]'), function () {
		$(this).parents('[class*="textarea_type_"]').addClass('disabled');
	});
	jQuery.each(jQuery('textarea[required]'), function () {
		$(this).parents('[class*="textarea_type_"]').find('.tit').addClass('bulReq');
	});
	 
	//textarea 자동 리사이징
	jQuery.each(jQuery('textarea[data-autoresize]'), function () {
		var offset = this.offsetHeight - this.clientHeight;
		var resizeTextarea = function (el) {
			jQuery(el)
				.css('height', 'auto')
				.css('height', el.scrollHeight + offset);
		};
		jQuery(this)
			.on('keyup input', function () {
				resizeTextarea(this);
			})
			.removeAttr('data-autoresize');
	});
	
	jQuery.each(jQuery('.selectModal_item input[type="radio"]'), function () {
		$('input:not(:checked)').parent().removeClass('checked');
		$('input:checked').parent().addClass('checked');
		$('.selectModal_item input[type="radio"]').click(function() {
			$('input:not(:checked)').parent().removeClass('checked');
			$('input:checked').parent().addClass('checked');
		});
		
		if ($(this).is(':disabled') == true) {
			$('input[type="radio"]:disabled').parent().addClass('disabled');	
		}
	});
	
});

/* **************************************** *
 * dropdown
 * **************************************** */
$(document).ready(function () {
	$(".dropdown_btn").click(function () {
		var dropdown = $(this).parent(".dropdown");
		
		if (dropdown.hasClass("active")) {
			$(".dropdown").removeClass('active');
		} 
		else {
			$(".dropdown").removeClass('active');
			dropdown.addClass('active');
		}
	});
});
$(document).on("click", function (event) {
	var $trigger = $(".dropdown");
	if ($trigger !== event.target && !$trigger.has(event.target).length) {
		$(".dropdown").removeClass('active');
	}
});


/* **************************************** *
 * accordion
 * **************************************** */
jQuery(function($){
	var accoItem = $('.accordion > ul > li');
	accoItem.addClass('hide');
	accoItem.find('.accordion_cont').hide();

	$('.accordion > ul > li > .accordion_head > a').click(function(){
		var onAccoItem = $(this).parents('.accordion > ul > li:first');
		if(onAccoItem.hasClass('hide')){
			accoItem.addClass('hide').removeClass('active');
			accoItem.find('.accordion_cont').slideUp(200);
			onAccoItem.removeClass('hide').addClass('active');
			onAccoItem.find('.accordion_cont').slideDown(200);
			
		} else {
			onAccoItem.removeClass('active').addClass('hide');
			onAccoItem.find('.accordion_cont').slideUp(300);
		}
		return false;
	});
});


/* **************************************** *
 * Input File Customize
 * **************************************** */
$(document).ready(function(){
	$('[class*="inpFile_type_"] .filename').click(function(e){
		e.preventDefault();
		$(this).siblings('label').click();
	});
	
	$('[class*="inpFile_type_"] input[type="file"]').change(function(e){
		$(this).siblings('.filename').val(e.target.files[0].name);
	});
	
	$('.input_type_file .filename').click(function(e){
		e.preventDefault();
		$(this).siblings('label').click();
	});
	
	$('.input_type_file input[type="file"]').change(function(e){
		$(this).siblings('.filename').val(e.target.files[0].name);
	});
});



/* **************************************** *
 * 하단 사업자정보
 * **************************************** */
function toggleClassInfo(target) {
	var toggleClass = "active";
	var buttonArea = $(target);
	var infoWrap = buttonArea.parent();
	var infoArea = buttonArea.parent().find(".ft_company_info");
	
	if (infoWrap.hasClass(toggleClass)) {
		infoWrap.removeClass(toggleClass);
	} else {
		infoWrap.addClass(toggleClass);
	}
}

/* **************************************** *
 * 숫자 카운트업 애니메이션
 * **************************************** */
jQuery(document).ready(function($) {
	$('.contUp').counterUp({
		delay: 10,
		time: 1000
	});
});

/* **************************************** *
 * JqueryModal Front
 * https://github.com/kylefox/jquery-modal
 * **************************************** */ 
$(document).ready(function(){
	var openModal = $('a[rel~="modal:open"]');
	
	openModal.click(function(event) {
        $(this).modal({
            fadeDuration: 300,
            fadeDelay: 0.60
        });
		return false;
	});

	// selectModal
	$('[class*="btn_selectModal"]').click(function(event) {
		if($(this).hasClass('disabled') == false){
			$(this).modal({
				fadeDuration: 300,
				fadeDelay: 0.60
			})
			.on($.modal.OPEN, function(event, modal) {
				
				$('.selectModal_item').on('click', function() {
					
				});
			});
		}
		return false;
	});
	
	
	$('.lp_selectModal').on($.modal.BEFORE_BLOCK, function(event, modal) {
		var __anchor = $.modal.getCurrent().anchor;
		
		__anchor.addClass('focus');
		
		modal.elm.find('.selectModal_item').on('click' ,function(){
			if($(this).find('input[type="radio"]').is(':disabled') == false) {
				var itemVal = modal.elm.find('input[type="radio"]:checked').val();
				if($(this).find('input[type="radio"]').is(':checked') == true) {
					$.modal.close();
				}
				
				__anchor.find('.select_text').empty().text(itemVal);
				__anchor.addClass('selected');
			}
		});
		
		$(this).on($.modal.CLOSE, function(event, modal) {
			__anchor.removeClass('focus');
		});
	});
	
	
	// ajax modal
	$('a[rel="ajax:modal"]').click(function(event) {
	
	  $.ajax({
	
		url: $(this).attr('href'),
	
		success: function(newHTML, textStatus, jqXHR) {
			$(newHTML).appendTo('body')
			.modal({
				fadeDuration: 300,
				fadeDelay: 0.60
			})
			.on($.modal.BEFORE_OPEN, function(event, modal) {
				$('[class*="selectric_"] select').selectric({
					nativeOnMobile: false,
				});
				
				if(modal.elm.hasClass('lp_filter_offBiz') === true){
					filterUi();
				}
			})
			.on($.modal.AFTER_CLOSE, function(event, modal) {
				modal.elm.remove();
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
		  
		}
	  });
	
	  return false;
	});
});

/* **************************************** *
 * Filter
 * **************************************** */ 
function filterUi(){
	//필터검색 가격대 | 매매
	$("#rangeSlider_rangePrice1").slider({
		max   : 200,
		min   : 0,
		range : true,
		slide : function (event, ui) {
			$("#rangeSlider_rangePrice1").parent().find(".txt").text(ui.values[0] + "억 ~ " + ui.values[1] + "억");
		},
		values: [0, 200]
	});
	
	//필터검색 가격대 | 보증금/전세
	$("#rangeSlider_rangePrice2").slider({
		max   : 200,
		min   : 0,
		range : true,
		slide : function (event, ui) {
			$("#rangeSlider_rangePrice2").parent().find(".txt").text(ui.values[0] + "억 ~ " + ui.values[1] + "억");
		},
		values: [0, 200]
	});
	
	//필터검색 가격대 | 월세
	$("#rangeSlider_rangePrice3").slider({
		max   : 1000,
		min   : 0,
		range : true,
		slide : function (event, ui) {
			$("#rangeSlider_rangePrice3").parent().find(".txt").text(ui.values[0] + "만원 ~ " + ui.values[1] + "만원");
		},
		values: [0, 1000]
	});
	
	//필터검색 면적
	$("#rangeSlider_rangeArea").slider({
		max   : 1000,
		min   : 0,
		range : true,
		slide : function (event, ui) {
			$("#rangeSlider_rangeArea").parent().find(".txt").text(ui.values[0] + "평 ~ " + ui.values[1] + "평");
		},
		values: [0, 1000]
	});
}
