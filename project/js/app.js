(function ($) {
	console.log('We take over from here');
	// Sticky Elements Width & Height
	// There's gotta be some other ways that more make sense than this :D
	var 
		$sidebarMain 		 		= $('#sidebarMain'), 
		$sidebarHeader 	 		= $('#sidebarHeader'),
		$sidebarFooter	 		= $('#sidebarFooter'),
		$sidebarContacts 		= $('#sidebarContacts'),
		$footerMainStage    = $('#footerMainStage'),
		$headerMainStage    = $('#headerMainStage'),
		$windowHeader       = $('#windowHeader');

	stickyElements();
	$(window).on('resize', function(){
		stickyElements();
	});
	
	function stickyElements() {
		var 
			sidebarWidth = $sidebarMain.outerWidth(),
			sidebarHeaderHeight = $sidebarHeader.outerHeight(),
			windowWidth = $(window).width();

		
		$sidebarHeader.css('width', sidebarWidth + 'px');
		$sidebarFooter.css('width', sidebarWidth + 'px');
		$sidebarContacts.css('margin-top', sidebarHeaderHeight + 'px');
		$footerMainStage.css('width', windowWidth - sidebarWidth + 'px');
		$headerMainStage.css('width', windowWidth - sidebarWidth + 'px');
	}
	
})(jQuery);