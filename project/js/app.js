(function($){
	console.log('We take over from here');
	$('#menuToggle').on('click', function(){
		$(this).toggleClass('is-active');
	});
})(jQuery);