(function () {
    "use strict";

    window.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById("navbar") && !document.getElementById("navbar").classList.contains('ph-special-case')) {
            const phNavbar = document.getElementById("navbar");
            if (phNavbar.querySelector('[data-widget_type="nav-menu.default"]')) {
                const phBody = document.querySelector("body");
                const phNavbarInner = phNavbar.querySelector(
                    '[data-widget_type="nav-menu.default"]'
                );

                const phDropdownContainer = phNavbar.querySelector(
                    ".elementor-nav-menu--dropdown.elementor-nav-menu__container"
                );

                const phMenuToggle = phNavbarInner.querySelector(
                    ".elementor-menu-toggle"
                );

                phDropdownContainer.style.maxHeight = `${
                    window.innerHeight - phNavbar.offsetHeight - 20
                }px `;
                phDropdownContainer.style.overflowY = "auto";
                
                screen.orientation.addEventListener("change", () => {
                    phDropdownContainer.style.maxHeight = `${
                        window.innerHeight - phNavbar.offsetHeight - 20
                    }px `;
                });
            }
        }
    });

        //sets all Home nav items on onepagers on Impressum and Datenschutz pages to actual home instead of #phtophook
    // if (
    //     window.location.pathname.includes('impressum') ||
    //     window.location.pathname.includes('datenschutz')
    // ) {
    //     try {
            
        
    //     const phLinks = document.querySelectorAll('a')
    
    //     const phLinkArr = Array.from(phLinks)
    
    //     const phHomeLinks = phLinkArr.filter((link) => link.href.includes('#phtophook'))
    //     if (phHomeLinks.length > 0) {
    //     phHomeLinks.forEach((link) => (link.href = window.location.origin))
    //     }

    // } catch (error) {
    //  console.log('Link replacement in Datenschutz or Impressum did not work.');       
    // }
    // }
  

    function append_warenkorb_to_form(items) {
        var formated = "<table>";
        var text_formated = "";
        for (var item of items) {
            var label = (item.label != "") ? item.label+"<br/>" : "";
            formated += "<tr>";
            formated += "<td>"+item.count+"x</td>";
            formated += "<td>"+label+item.description+"</td>";
            formated += "</tr>";
            text_formated += item.count+"x     "+label+item.description+"\n";
        }
        formated += "</table>"

        jQuery("#shopping_cart_element")[0].innerHTML = formated;
        jQuery("#form-field-shoppingcart").val(text_formated);
    }


    function show_elementor_showroom_form() {
        //jQuery("#elements-show-content-dialog")[0].innerHTML = jQuery("#elements-show-form-content")[0].innerHTML;
        jQuery("#elements-show-form-content").appendTo("#elements-show-content-dialog");

        document.body.classList.add("phg-modal-visible-elementsshow");
    }
    // hide loader in iframe if elementor preview
    function hide_loader_in_elementor_preview() {
        const urlParams = new URLSearchParams(window.location.search);
        const isPreview = urlParams.get("elementor-preview");
        if (isPreview) {
            console.log(
                "hide loading because this is an elementor preview",
                isPreview
            );
            const ppl = document.getElementById("page-preloader");
            if (ppl) {
                ppl.style.display = "none";
            } else {
                console.log("page-preloader already gone...");
            }
        }
    }
    hide_loader_in_elementor_preview();

    window.replacePlatzhirschVariables = function (text) {
        for (var k of Object.keys(window.platzhirsch)) {
            var v = window.platzhirsch[k];
            text = text.replaceAll("{{" + k + "}}", v);
        }

        return text;
    };

    window.phg_close = function (e) {
        document.body.classList.remove("phg-modal-visible-elementsshow");
        document.body.classList.remove("phg-modal-visible-badplaner");
        document.body.classList.remove("phg-modal-visible-notruf");
    };

    window.phg_show = function (e) {
        document.body.classList.add("phg-modal-visible-badplaner");
        e.stopPropagation();
        e.preventDefault();
        return false;
    };

    jQuery("a[href='#showEmergencyContactWarningScreen']").click(function (e) {
        document.body.classList.add("phg-modal-visible-notruf");
        e.stopPropagation();
        e.preventDefault();
        return false;
    });

    jQuery(document).ready(function ($) {
        /// page preloader //////////////////////////////

        if ($) {
            if ($(".wrapper-navbar-full") && $(".wrapper-navbar-full").stickymaker) {
                console.log(
                    "attached sticky maker to wrapper-navbar",
                    $(".wrapper-navbar-full")
                );
                $(".wrapper-navbar-full").stickymaker({});
                console.log(
                    "attached sticky maker to wrapper-navbar",
                    $(".wrapper-navbar-full")
                );
            }
        }

        if ($) {
            $("body").bind("DOMNodeInserted", function () {
                $(".elementor-popup-modal .elementor-image img").each(function (index) {
                    if ($(this).attr("data-src") != null) {
                        $(this).attr("src", $(this).attr("data-src"));
                    }
                });
            });
        }

        $("#cta-hover-dialog").bind("mousemove", function (e) {
            $("#cta-hover-dialog").addClass("sticky-visible");
        });
        $("#cta-hover-dialog").bind("mouseout", function (e) {
            $("#cta-hover-dialog").removeClass("sticky-visible");
        });

        $("[stickydialog=true]").bind("mouseout", function (e) {
            $("#cta-hover-dialog").removeClass("sticky-visible");
        });

        $("[stickydialog=true]").bind("mousemove", function (e) {
            var right = false;
            var target = $(this).closest("[stickydialog=true]")[0];
            var customWidth = $(target).attr("dialog-width");
            var hovertext = $(target).attr("hovertext");
            $("#cta-hover-dialog").addClass("sticky-visible");

            var position = target.getBoundingClientRect();
            var buttonWidth = position.width;
            var width = customWidth ? customWidth : 300;

            if (position.left > window.innerWidth / 2) {
                right = true;
                $("#cta-hover-dialog").addClass("right");
            } else {
                right = false;
                $("#cta-hover-dialog").addClass("left");
            }

            document.getElementById("cta-hover-dialog").style.width = width + "px";
            if (right) {
                document.getElementById("cta-hover-dialog").style.left =
                    position.left - width + "px";
            } else {
                document.getElementById("cta-hover-dialog").style.left =
                    position.left + buttonWidth + "px";
            }
            document.getElementById("cta-hover-dialog").style.top =
                position.top + 5 + "px";
            document.getElementById("cta-hover-dialog-container").innerHTML =
                replacePlatzhirschVariables(hovertext);
        });

        if ($) {
            // if ($('.onePagerMenu') && $('.onePagerMenu').smint) {
            //     $('.onePagerMenu').smint({
            //         'scrollSpeed': 1000
            //     });
            // }
        } else {
            console.log("jquery not loaded properly, at least  $ is not defined.");
        }

        $("[href*='modules/forward/badplaner3d/badplaner3did']").click(function (
            event
        ) {
            event.stopPropagation();
            event.preventDefault();

            window.followUpBadplanerLink = $(this).attr("href");
            document.body.classList.add("phg-modal-visible-badplaner");

            $(".dialog-forward-btn").attr("href", window.followUpBadplanerLink);
            $(".dialog-forward-btn").attr("target", $(this).attr("target"));

            return false;
        });

        // .site-content .elementor-section-wrap >

        var all = $(
            ".site-content .entry-content > div > .elementor-inner > .elementor-section-wrap > section:not(.elecond-hidden)"
        );
        if (all) {
            var odd = all.filter(":odd");
            var even = all.filter(":even");
            if (odd) {
                odd.addClass("ph-elementor-section-odd");
            }
            if (even) {
                even.addClass("ph-elementor-section-even");
            }
        }

        /**
         * This method is hacky but it removes the "elementor-try-safe-mode" Warning outside of the "Elementor Edit Page" because this shows up without any allowance
         */
        try {
            $(
                window.parent.document.getElementById("elementor-try-safe-mode")
                    .parentNode
            ).append(
                jQuery(
                    "<style>#elementor-try-safe-mode {display: none !important; }</style>"
                )
            );
        } catch (e) {}

        window.addEventListener("message", function (d) {
            try {
                if (d != null && d.data) {
                    let data = d.data;
                    // Code for Elements Showroom
                    if (data != null && typeof data.message !== "undefined" &&
                        data.message == "submitWishlist") {
                        append_warenkorb_to_form(data.data);
                        show_elementor_showroom_form();
                        return;
                    }
                    if (data != null && typeof data.redirect !== "undefined") {
                        window.location = data.redirect;
                    }
                    // Code for heizungsplaner and badplaner
                    if (data != null && typeof data.redirect !== "undefined") {
                        window.location = data.redirect;
                    }
                    if (
                        data != null &&
                        typeof data.type !== "undefined" &&
                        data.type == "iframe" &&
                        data.message == "resize"
                    ) {
                        let height = parseFloat(data.height) + 300;
                        document.getElementById("iframe1").style.height = height + "px";
                    }
                    if (
                        data != null &&
                        typeof data.type !== "undefined" &&
                        data.type == "iframe" &&
                        data.message == "scrollTo"
                    ) {
                        window.scrollTo(data.positionx, data.positiony);
                    }
                }
            } catch (e) {}
        });
    });
})(jQuery);
