/**
 * @author Oleg
 */

$(function(){
	/* �������� ������ */
	$('.b-main-menu a').each(function(){
		if ($(this).parents('li').find('span').size() == 0) {
			$(this).after($('<span></span>').append($(this).clone()));
			$(this).remove();
		}
	});
	
	$('.b-main-menu a').each(function(){
		if ($(this).parent().parent().find('.sub').size() > 0) {
			$(this).bind('click', function(){
				$(this).parents('li').siblings().removeClass('active').end().toggleClass('active');
				flag = false;
				return false;
			})
		}
	}).focus(function(){
			this.blur();
		});
	var current_menu_item = $('.b-main-menu').find('.active');
	var flag = true;
	$('*').click(function(){
		if (flag) {
			$('.b-main-menu li').removeClass('active');
			current_menu_item.addClass('active');
		}
		flag = true;
	});
		
	/* ������� */
	$('.slider .open-close').click(function(){
		$(this).parents(".slider").animateClass('toggle', 'slider-closed', 500);
	})
	
	if ($.browser.msie && $.browser.version < 8) {
		$('.slider .open-close').bind('mouseover', function(){$(this).addClass('hover');});
		$('.slider .open-close').bind('mouseout', function(){$(this).removeClass('hover')});
	}
	
	/* ����� */
	$('.b-tip-el').bind('mouseover', function(){
		//alert($(this).offset()['top'])
		var el = $('#'+$(this).attr('rel'));
		var left_margin = ($(window).width() - $(this).parents('.l-item-wrapper').find('img').width()) / 2;
		var coords = $(this).attr('coords').split(/,/);

		//alert(coords);
		if ($(this).attr('rel').indexOf("vag") > -1) {
		
			el.css({'top' : (parseInt(coords[1])-parseInt(coords[2])+100)+"px", 'left' : (left_margin+parseInt(coords[0])+parseInt(coords[2])-250)+"px"})
		  	.addClass('element').css('display', 'block');
		}
		else {
			el.css({'top' : (parseInt(coords[1])-parseInt(coords[2])+50)+"px", 'left' : (left_margin+parseInt(coords[0])+parseInt(coords[2])-50)+"px"})
		  	.addClass('element').css('display', 'block');
		}
	});
	$('.b-tip-el').bind('mouseout', function(){
		var el = $('#'+$(this).attr('rel')).removeClass('element');
		setTimeout(function(){hideTip(el)}, 400);
	});
	$('.b-tip').bind('mouseover', function(){
		$(this).addClass('tip').css('display', 'block');
		//alert(1);
	});
	$('.b-tip').bind('mouseout', function(){
		var el = $(this).removeClass('tip');
		setTimeout(function(){hideTip(el)}, 200);
	});
	
	/* ����������������������� */
	$('.b-catalog li a').click(function(){
		var item;
		if ($(this).parent().hasClass('i')) {
			item = $(this).parent().parent();
		}
		else {
			item = $(this);
		}
		
		if (item.siblings('ul').size() > 0) {
			var li = (item.parent().hasClass('rc5')?item.parent():false);
			item.siblings('ul').slideToggle(function(){
				if (li) {
					rocon.update(li.get(0));
				}
			});
			return false;
		}
	});
	
	$('.b-catalog li ul').css('display', 'none');
	
	$('.b-sub-menu .item > ul').css('display', 'none');
	$('.b-sub-menu .expanded > ul').css('display', 'block');
	
	$('.b-sub-menu .item > a').click(function(){
		$(this).parent().siblings().children('ul:visible').slideToggle();
		$(this).siblings('ul').slideToggle();
		return false;
	}).focus(function(){$(this).blur()});
	
	$('.b-sub-menu .item a').filter(function(){return !$(this).parent().hasClass('item')}).click(function(){
		if ($(this).siblings('ul').size() > 0) {
			$(this).siblings('ul').slideToggle();
			return false;
		}
	});
	
	$('.b-sub-menu li ul').filter(function(){return !$(this).closest('li').hasClass('expanded')}).css('display', 'none');
})

function hideTip(tip){
	if (!tip.hasClass('element') && !tip.hasClass('tip')) {
		tip.css('display', 'none').removeClass('waiting');
	}
}


/**
 * ������� �� ������� ��� �������� ������ "auto"
 * @param {Object} arr
 * @return {Object}
 */

$.removeAutoValues = function(arr){
	var new_arr = new Object();
	for (var i in arr) {
		if (arr[i].indexOf('auto') == -1) {
			new_arr[i] = arr[i]
		}
	}
	return new_arr;
}

/**
 * ����������� �� ������, ����� ����, 2009
 * @param {String} action
 * @param {String} a_class
 * @param {Integer} time
 */
$.fn.animateClass = function(action, a_class, time){
	if (!time) {time = 500}
	switch (action) {
		case "add" : $(this).addClass(a_class); break;
		case "remove" : $(this).removeClass(a_class); break;
		default : $(this).toggleClass(a_class); break;
	}
	
	var parameters = $.removeAutoValues($(this).getPositionImportantParameters());
	$(this).toggleClass(a_class);
	
	var $this_clone = $(this).clone();
	$this = $(this).addClass('g-hidden');
	$this.after($this_clone);
	$this_clone.animate(parameters, time, function(){
		$this_clone.remove();
		$this.removeClass('g-hidden').toggleClass(a_class);
	})
}

/**
 * ������� ���������, �������� �� ����������������
 * @return {Array}
 */
$.fn.getPositionImportantParameters = function(){
	return {
		'top' : $(this).css('top'),
		'right' : $(this).css('right'),
		'bottom' : $(this).css('bottom'),
		'left' : $(this).css('left'),
		'margin-top' : $(this).css('margin-top'),
		'margin-right' : $(this).css('margin-right'),
		'margin-bottom' : $(this).css('margin-bottom'),
		'margin-left' : $(this).css('margin-left'),
		'width' : $(this).css('width'),
		'height' : $(this).css('height')
	}
}