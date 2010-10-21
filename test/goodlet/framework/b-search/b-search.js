;(function($){
	$(function(){
		var bSearch = $('.b-search');
		var bSearchHint = bSearch.find('.b-search__hint');
		var bSearchInput = bSearch.find('.b-search__input');
		
		bSearchInput
			.focus(function(){
				bSearchHint.hide();
			})
			.blur(function(){
				if ($.trim(bSearchInput.val()) == "") {
					bSearchHint.show();
				}
			}).blur();
	});
})(jQuery);