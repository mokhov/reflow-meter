/**
 * @author Mokhov Oleg
 */
$(function(){
	$('.b-photo-changer .l-wrapper-changer').photoGallery({
		animationTime : 2000,
		currentPhoto: 3
	});
	
	// ‘икс бага с неправильными рассчетами ширина объемлющего элемента в IE6, несмотр€ на то, что стоит overflow: hidden
	if ($.browser.msie && $.browser.version < 7) {
		$('.b-photo-changer .l-wrapper-changer .next-button').css({'left': ($(window).width()-58)+"px"});
		$(window).bind('resize', function(){
			$('.b-photo-changer .l-wrapper-changer .next-button').css({'left': ($(window).width()-58)+"px"});
		})
	}
	
	/* ‘иксим баг ие6 с морганием мыши */
	try{
		document.execCommand("BackgroundImageCache", false, true);} 
	
	catch(e) {
		}
});

/**
 * јниматор фоток. ћохов ќлег дл€ студии Ђ“агил¬ебї, 2009
 * @param {Array} callerSettings
 * nextButton Ч селектор или элемент кнопки перехода на следующее фото
 * prevButton Ч селектор или элемент кнопки перехода на предыдущее фото
 * photoContainer Ч контейнер дл€ фотографии
 * currentPhoto Ч фото, которое нужно показывать при входе на страницу
 * animationTime Ч врем€ анимации перехода от одной фотографии к другой
 */
$.fn.photoGallery = function(callerSettings){
	var settings = $.extend({
		nextButton : '.next-button',
		prevButton : '.prev-button',
		photoContainer : '.photo-container',
		currentPhoto : 1,
		animationTime: 500
	}, callerSettings||{});
	
	var prevButtonEl = $(settings.prevButton);
	var nextButtonEl = $(settings.nextButton);
	
	//alert($('.b-photo-changer .l-wrapper-changer .next-button').parent().width());
	var totalPhotos = $(settings.photoContainer).find('li').size();
	
	if (settings.currentPhoto != 1) {
		if (settings.currentPhoto > totalPhotos || settings.currentPhoto < 1) {
			settings.currentPhoto = 1;
		}
		else {
			$(settings.photoContainer).css('margin-left', -(settings.currentPhoto-1)*100+"%");
		}
	}
	
	// ѕровер€ем показывать или скрывать кнопки Ђвпередї, Ђназадї
	var $this = $(this); 
	$(this).change(function(){
		if (totalPhotos > 1) {
			if (settings.currentPhoto == 1) {
				prevButtonEl.css('display', 'none');
			}
			else {
				prevButtonEl.css('display', 'block');
			}
			
			if (settings.currentPhoto == totalPhotos) {
				nextButtonEl.css('display', 'none');
			}
			else {
				nextButtonEl.css('display', 'block');
			}
		}
	}).change();
	
	nextButtonEl.click(function(){
		var currMargin = parseInt($(settings.photoContainer).css('margin-left'));
		var newMargin = currMargin - 100; 
		
		//alert(currMargin+"::::"+newMargin);
		if ($.browser.msie) {
			$(settings.photoContainer).animate({marginLeft: newMargin+"%"}, settings.animationTime);
		}
		else {
			$(settings.photoContainer).animate({marginLeft: "-=100%"}, settings.animationTime);
		}
		settings.currentPhoto += 1;
		$this.change();
	});
	prevButtonEl.click(function(){
		var currMargin = parseInt($(settings.photoContainer).css('margin-left'));
		var newMargin = currMargin + 100;
		
		// ¬ IE глючит переход от -100% к 0, это что-то типа заплатки, когда мы переходим от процентов к пиксел€м и обратно
		if (settings.currentPhoto == 2 && $.browser.msie) {
			var w_width = -$(window).width()+"px";
			$(settings.photoContainer).css('margin-left', w_width);
			$(settings.photoContainer).animate({marginLeft: "0"}, settings.animationTime, function(){
				$(settings.photoContainer).css('margin-left', '0%');
			});
		}
		else {
			//alert(currMargin+"::::"+newMargin);
			if ($.browser.msie) {
				$(settings.photoContainer).animate({marginLeft: newMargin+"%"}, settings.animationTime);
			}
			else {
				$(settings.photoContainer).animate({marginLeft: "+=100%"}, settings.animationTime);
			}
		}
		settings.currentPhoto -= 1;
		$this.change();
	});
}
