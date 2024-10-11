/*

By Conny...

SMINT V1.0 by Robert McCracken
SMINT V2.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)
SMINT V3.0 by robert McCracken with some awesome help from Ryan Clarke (@clarkieryan) and mcpacosy ‏(@mcpacosy)

SMINT is my first dabble into jQuery plugins!

http://www.outyear.co.uk/smint/

If you like Smint, or have suggestions on how it could be improved, send me a tweet @rabmyself

*/


(function () {

    jQuery(document).ready(function ($) {

        const classToLookFor = "ph-sticky-header";
        const activeClass = "ph-sticky-header-active";

        $.fn.stickymaker = function (options) {
            // alert("hello from sticky maker");
            // $(this).addClass('stickymaker');

            //Set the variables needed
            var optionLocs = {},
                navItems = new Array(),
                lastScrollTop = 0,
                menuHeight = ($("." + classToLookFor).height() * -1) - 100,
                menuWidth = $("." + classToLookFor).width(),
                stickymaker = $('.' + classToLookFor),
                myOffset = stickymaker.height(),
                direction = undefined;

            if (stickymaker.length == 0) {
                return; // no element with activeClass found.
            }

            // get initial top offset for the menu
            var stickyTop = stickymaker.offset().top;

            // check position and make sticky if needed
            var stickyMenu = function (direction) {
                // current distance top
                var scrollTop = $(window).scrollTop() + myOffset;

                // if we scroll more than the navigation, change its position to fixed and add class 'fxd', otherwise change it back to absolute and remove the class
                if (scrollTop > stickyTop + myOffset) {
                    stickymaker
                    // .css({'position': 'fixed', 'top': 0, 'left': 0})
                        .addClass('fixed');

                    var hasLeftSideBar = $('.ph-nav-left').length > 0;

                    if (hasLeftSideBar) {
                        // add padding to the body to make up for the loss in heigt when the menu goes to a fixed position.
                        // When an item is fixed, its removed from the flow so its height doesnt impact the other items on the page
                        $('body').css('padding-left', menuWidth);
                    }else{
                        $('body').css('padding-top', menuHeight);
                    }
                } else {
                    stickymaker
                    // .css('position', 'relative')
                        .removeClass('fixed');
                    //remove the padding we added.
                    $('body').css('padding-top', '0');
                    $('body').css('padding-left', '0');
                }

            };

            // run functions
            stickyMenu();

            var lastNav = null;
            var initSetActive = function () {
                // 1. get all nav items
                navItems = jQuery('#main-navigation li').filter(function (i) {
                    var a = jQuery(this).children('a').attr('href');
                    if (a && (a.startsWith('#') || a.startsWith('/#'))) {
                        if (a.split('#')[1]) {
                            if ($("#" + a.split('#')[1]).length > 0) {// hook exists?
                                return true;
                            }
                        }
                    }
                    return false;
                }).each(function (i) {
                    var a = jQuery(this).children('a').attr('href');
                    var id = a.split('#')[1];
                    const selector = "#" + id;

                    var start = $(selector).offset().top + menuHeight;
                    var end = 0; // wenn i == 0
                    if (lastNav != null) {
                        optionLocs[i-1].end = start; 
                    }
                    lastNav = $(selector);
                    
                    optionLocs[i] = {
                        start: start,
                        end: end, id: id
                    };

                });


            };

            initSetActive();

            var isActive = false;
            var setActive = function (direction) {
                var anyActive = false;
                // iterate items ans set "active" class if they are active
                navItems.each(function (index) {
                    const navItem = $(this);
                    // which one is active?
                    var scrollTop = $(window).scrollTop() + myOffset;
                    var anchorLocationStart = optionLocs[index].start;
                    var anchorLocationEnd = optionLocs[index].end;
                    //if (anchorLocationStart <= scrollTop && scrollTop <= anchorLocationEnd) {
                    if (scrollTop > anchorLocationStart) {
                        // if (direction == "up") {
                        //     isActive = true;
                        // } else if (index > 0) {
                        //     isActive = true;
                        // } else if (direction == undefined) {
                        //     isActive = true;
                        // }
                        isActive = navItem;
                    }

                    navItem.removeClass(activeClass);
                  /*  // if last and no other active, set this one active.
                    if (index === navItems.length - 1 && !anyActive
                    ) {
                        isActive = true;
                    }

                    if (isActive) {
                        navItem.addClass(activeClass);
                    } else {
                        navItem.removeClass(activeClass);
                    }

                    anyActive = anyActive || isActive;*/
                });
            };
            
            

            setActive(direction);
            
            if (isActive != false) {
                $(isActive).addClass(activeClass);
            }
            

            // run function every time you scroll
            $(window).scroll(function () {
                //Get the direction of scroll
                var st = $(this).scrollTop() + myOffset;
                if (st > lastScrollTop) {
                    direction = "down";
                } else if (st < lastScrollTop) {
                    direction = "up";
                }
                lastScrollTop = st;
                stickyMenu(direction);
                setActive(direction);

                if (isActive != false) {
                    $(isActive).addClass(activeClass);
                }
                // Check if at bottom of page, if so, add class to last <a> as sometimes the last div
                // isnt long enough to scroll to the top of the page and trigger the active state.
                // if ($(window).scrollTop() + $(window).height() == $(document).height()) {
                //     stickymaker.removeClass('active');
                //     $(".stickymaker a:not('.extLink'):last").addClass('active')
                //
                // } else {
                //     stickymaker.last().removeClass('active')
                // }
            });
        };


        /**
         *  look for the class ph-sticky-header and add stickymaker
         */
        const elements = $(classToLookFor);
        if (elements && elements.length > 0) {
            elements.stickymaker({});
            // console.log("attached sticky maker to classToLookFor", elements);
        }

    });


})(jQuery);