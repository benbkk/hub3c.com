(function($) {
	// Menu Toggle
	$('#menuToggle').on('click touchstart', function(){
		$(this).toggleClass('is-active');
	});
})(jQuery);