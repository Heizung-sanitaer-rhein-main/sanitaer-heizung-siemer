/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 */
(function () {
    "use strict";
    var isWebkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1,
        isOpera = navigator.userAgent.toLowerCase().indexOf('opera') > -1,
        isIe = navigator.userAgent.toLowerCase().indexOf('msie') > -1;

    if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
        window.addEventListener('hashchange', function () {
            var id = location.hash.substring(1),
                element;

            if (!(/^[A-z0-9_-]+$/.test(id))) {
                return;
            }

            element = document.getElementById(id);

            if (element) {
                if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
                    element.tabIndex = -1;
                }

                element.focus();
            }
        }, false);
    }
})();

(function () {
    "use strict";
    jQuery(document).ready(function ($) {
        /// page preloader //////////////////////////////
/*
        $(window).on('load', function () {
            setTimeout(function () {
                $('body').addClass('loaded');
            }, 200);

            var $loader = $('#page-preloader');

            setTimeout(function () {
                $loader.addClass("page-animate-close").remove();
                $('body').removeClass('loaded');
            }, 2000);
        });
*/

        /// back to top /////////////////////////////////
        if ($('#back-to-top').length) {
            var scrollTrigger = 200, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
            backToTop();
            $(window).on('scroll', function () {
                backToTop();
            });

            $('#back-to-top').on('click', function (e) {
                e.preventDefault();
                $('html,body').animate({
                    scrollTop: 0
                }, 700);
            });

        }

        /// update menu


        try {
            if ($("#offcanvas-sidebar").length > 0 ) {
                var $button = $("#navbar-toggler-mobile");
                $('#offcanvas-sidebar').offcanvas({
                    modifiers: $button.data('appear'),
                    triggerButton: "#navbar-toggler-mobile"
                });

                var $parent = $("#offcanvas-sidebar");
            }
        }
        catch(eee) {

        }


        /////
        $('.magnific-popup-iframe').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

    });

})(jQuery);
