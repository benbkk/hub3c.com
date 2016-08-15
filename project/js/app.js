'use strict';

(function ($) {
  // Menu Toggle
  $('#menuToggle').on('click touchstart', function () {
    $(this).toggleClass('is-active');
  });
  // Page Header Bg
  if ($('.page--header-bg').length) {
    $('.page--header-bg').imagefill();
  }
  // Modal Video
  $('.popup-vimeo').magnificPopup({ type: 'iframe' });

  $(".animsition").animsition({
    inClass: 'fade-in-down-sm',
    outClass: 'fade-out-down-sm',
    inDuration: 1500,
    outDuration: 800,
    linkElement: '.animsition-link',
    // e.g. linkElement: 'a:not([target="_blank"]):not([href^="#"])'
    loading: true,
    loadingParentElement: 'body', //animsition wrapper element
    loadingClass: 'animsition-loading',
    loadingInner: '', // e.g '<img src="loading.svg" />'
    timeout: false,
    timeoutCountdown: 5000,
    onLoadEvent: true,
    browser: ['animation-duration', '-webkit-animation-duration'],
    // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
    // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
    overlay: false,
    overlayClass: 'animsition-overlay-slide',
    overlayParentElement: 'body',
    transition: function transition(url) {
      window.location.href = url;
    }
  });
})(jQuery);