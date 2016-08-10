(function($) {
	// Menu Toggle
	$('#menuToggle').on('click touchstart', function(){
		$(this).toggleClass('is-active');
	});
	// Modal Video

	$('.popup-vimeo').magnificPopup({type: 'iframe'});

})(jQuery);