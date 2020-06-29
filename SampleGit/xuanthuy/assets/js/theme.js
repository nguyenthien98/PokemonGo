/*-----------------------------------------------------------------
/*    Project         : Ashton - Resume / vCard / Portfolio Template*/
/*    Version         : v1.0*/
/*    Last update     : N/A*/
/*    Author          : design-path*/
/*    Support email   : https://themeforest.net/user/design-path*/
/*-----------------------------------------------------------------*/
$.noConflict();
jQuery(function ($) {
    'use strict';
    //preloader + Malihu scroll
    //=================================
    $(window).ready(function () {
        setTimeout(function () {
            $('#spinner').fadeOut('slow', function () {});
        }, 800);
        $("header.header").mCustomScrollbar({
            theme: "dark-thin",
            mouseWheelPixels: 80,
            setTop: 0,
            setLeft: 0,
            axis: "y",
            scrollbarPosition: "inside",
            scrollInertia: 200,
            autoDraggerLength: !0,
            alwaysShowScrollbar: 0,
            snapOffset: 0
        });
    });
    /*
    Imag loaded
    ==============*/
    $('#portfolio').imagesLoaded()
        .progress(function (instance, image) {
            var result = image.isLoaded ? 'loaded' : 'broken';
        });
    /*
    awesome hover
    ================*/
    $('#da-thumbs .portfolio-item').each(function () {
        $(this).hoverdir({
            speed: 500,
            easeing: 'ease-in-out',
            hoverDelay: 50,
            inverse: false
        });
    });
    /*
    form validate
    ===================*/
    $(".contact_form").validate();
    /*
    full-screen layout
    ===================*/
    $('ul.navbar-nav li.nav-item a.nav-link, .home a.btn').on('click', function () {
        $('ul.navbar-nav li.nav-item a.nav-link').removeClass('active');
        $(this).addClass('active');
        var tagid = $(this).attr('href');
        $('.page').removeClass('page-current');
        $('' + tagid).addClass('page-current');
    });
    /*
    Count-up
    ==========*/
    $('.count-up, .progress-bar .label').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-count');
        $({
            countNum: $this.text()
        }).animate({
            countNum: countTo
        }, {
            duration: 5000,
            easing: 'linear',
            step: function () {
                $this.text(Math.floor(this.countNum));
            },
            complete: function () {
                $this.text(this.countNum);
                //alert('finished');
            }
        });
    });
    /*
    Magnific popup for image
    =========================*/
    var groups = {};
    $('.image-link').each(function () {
        var id = parseInt($(this).attr('data-group'), 9);
        if (!groups[id]) {
            groups[id] = [];
        }
        groups[id].push(this);
    });
    $.each(groups, function () {
        $(this).magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            closeBtnInside: true,
            gallery: {
                enabled: true
            },
            zoom: {
                enabled: true,
                duration: 300 // don't foget to change the duration also in CSS
            }
        });
    });
    /*
    Magnific popup video
    ======================*/
    $('.video-link').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com',
                    id: function (url) {
                        var m = url.match(/^.+youtube.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/);
                        if (m !== null) {
                            if (m[4] !== undefined) {
                                return m[4];
                            }
                            return m[2];
                        }
                        return null;
                    },
                    src: 'https://www.youtube.com/embed/8qdN3OQf9CU?autoplay=1'
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: 'https://player.vimeo.com/video/206015824?autoplay=1'
                }
            }
        }
    });
    /*
    gallery isotope
    ================*/
    $('.filter').isotope({
        itemSelector: '.filter-item',
        stagger: 30,
        transitionDuration: 500
    });
    // Add isotope click function
    $('.filter-btn').on('click', 'li', function () {
        $('.filter-btn li').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).attr('data-filter');
        $('.filter').isotope({
            filter: filterValue,
            animationDuration: 750,
            easing: 'linear'
        });
        $('.filter .filter-item').css({
            position: 'absolute'
        });
    });
    $('.filter .filter-item').css({
        position: 'relative'
    });
        $('#da-thumbs').css({
        height: '100%'
    });
    /*
    ajax contact form
    ===================*/
    var form = $('.contact_form'),
        message = $('.contact_msg'),
        form_data;
    // Success function
    function done_func(response) {
        message.fadeIn().removeClass('alert-danger').addClass('alert-success');
        message.text(response);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
        form.find('input:not([type="submit"]), textarea').val('');
    }
    // fail function
    function fail_func(data) {
        message.fadeIn().removeClass('alert-success').addClass('alert-success');
        message.text(data.responseText);
        setTimeout(function () {
            message.fadeOut();
        }, 2000);
    }
    form.submit(function (e) {
        e.preventDefault();
        form_data = $(this).serialize();
        $.ajax({
                type: 'POST',
                url: form.attr('action'),
                data: form_data
            })
            .done(done_func)
            .fail(fail_func);
    });
});