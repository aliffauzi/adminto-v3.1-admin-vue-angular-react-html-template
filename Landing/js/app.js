/* Template Name: Adminto - Bootstrap 4 Landing Page Tamplate
   Author: CoderThemes
   File Description: Main JS file of the template
*/


! function($) {
    "use strict";

    var Adminto = function() {};

    Adminto.prototype.initStickyMenu = function() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop();
        
            if (scroll >= 50) {
                $(".sticky").addClass("nav-sticky");
            } else {
                $(".sticky").removeClass("nav-sticky");
            }
        });
    },

    Adminto.prototype.initSmoothLink = function() {
        $('.navbar-nav a').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 50
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    },

    Adminto.prototype.initScrollspy = function() {
        $("#navbarCollapse").scrollspy({
            offset: 50
        });
    },

    Adminto.prototype.initMfpvideo = function() {
        $('.video-play-icon').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    },

    Adminto.prototype.initContact = function() {
        
        $('#contact-form').submit(function() {

            var action = $(this).attr('action');
        
            $("#message").slideUp(750, function() {
                $('#message').hide();
        
                $('#submit')
                    .before('')
                    .attr('disabled', 'disabled');
        
                $.post(action, {
                        name: $('#name').val(),
                        email: $('#email').val(),
                        comments: $('#comments').val(),
                    },
                    function(data) {
                        document.getElementById('message').innerHTML = data;
                        $('#message').slideDown('slow');
                        $('#cform img.contact-loader').fadeOut('slow', function() {
                            $(this).remove()
                        });
                        $('#submit').removeAttr('disabled');
                        if (data.match('success') != null) $('#cform').slideUp('slow');
                    }
                );
        
            });
        
            return false;
        
        });

    },

    Adminto.prototype.initBacktoTop = function() {
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('.back-to-top').fadeIn();
            } else {
                $('.back-to-top').fadeOut();
            }
        }); 
        $('.back-to-top').click(function(){
            $("html, body").animate({ scrollTop: 0 }, 1000);
            return false;
        });
    },


    Adminto.prototype.init = function() {
        this.initStickyMenu();
        this.initSmoothLink();
        this.initScrollspy();
        this.initMfpvideo();
        this.initContact();
        this.initBacktoTop();
    },
    //init
    $.Adminto = new Adminto, $.Adminto.Constructor = Adminto
}(window.jQuery),

//initializing
function($) {
    "use strict";
    $.Adminto.init();
}(window.jQuery);