function is_mobile(){return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))}
	
	if(is_mobile()){
		$('html').css('width', window.innerWidth + 'px');
		$('header, section, footer').css('backgroundAttachment', 'scroll');
		$( window ).on( "orientationchange", function( event ) {
			$('html').css('width', window.innerWidth + 'px');
		});
	}
	else { 
        // создадим элемент с прокруткой
        var div = document.createElement('div');

        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';

        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        var scrollWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);  
        
		var gw_width = (!/MSIE [6-8]/i.test(navigator.userAgent)) ? window.innerWidth : $(window).width();
		$('body').width(gw_width);
		$(window).on('resize', function(){
			gw_width = (!/MSIE [6-8]/i.test(navigator.userAgent)) ? window.innerWidth : $(window).width();
		$('body').width(gw_width);
		});	
    }
	$(window).on('resize', function(){
        $(".areas_list li").each(function(){
            $(this).height($(this).width());
        });
    });
if("ontouchstart" in window){
    document.documentElement.className = document.documentElement.className + " touch";
}
if(!$("html").hasClass("touch")){
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix(){
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function(i){
        if($(this).innerHeight() > h){ $(this).closest(".fullscreen").addClass("overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize(){
    var windowH = $(window).height();
    $(".background").each(function(i){
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if(path.hasClass("parallax") && !$("html").hasClass("touch")){
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if(contW > imgW){
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e){
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function(i){
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if(bottomWindow > top && topWindow < bottom){
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = - imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if(!$("html").hasClass("touch")){
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}

$('.carousel').owlCarousel({
    center: true,
    items:3,
    loop:true,
    dots:false,
    autoplay:true,
    autoplayTimeout:3000,
    autoWidth:true,
    smartSpeed:1500,
    nav:true
});

$('.slider').flexslider({
    directionNav:false,
    animation:"slide",
    pauseOnAction: false,
    slideshowSpeed:4000
});
    
$('.video_slider').flexslider({
    controlNav:false,
    directionNav:true,
    animation:"slide",
    pauseOnAction: false,
    slideshow:false
});


$(".areas_list li").each(function(){
    $(this).height($(this).width());
});
var scrolled = 0;
$(window).load(function(){
    $( "#tabs" ).tabs({
    active:0,
    hide: { effect: "fade", duration: 300 },
    show : { effect: "fade", duration: 300 },
    heightStyle:"auto"
});

var menu = $(".ui-tabs-nav");
menu.append("<li id='magic-line'></li>");
var $magicLine = $("#magic-line");

function refreshLine(){
    $(".ui-tabs-nav li").removeClass("white");
    $(".ui-tabs-nav .ui-tabs-active").addClass("white");
    $magicLine
    .width($(".ui-tabs-nav .ui-tabs-active").width())
    .data("origLeft", $magicLine.position().left)
    .data("origWidth", $magicLine.width());
    if ($(".ui-tabs-nav li").is(".ui-tabs-active")){
         $magicLine.css("left", $(".ui-tabs-nav .ui-tabs-active").position().left)
    }
    else
        $magicLine.css("opacity", 0);
}
        refreshLine();
    $(".ui-tabs-nav li").hover(function() {
        $el = $(this);
        leftPos = $el.position().left;
        newWidth = $el.width();

        $magicLine.css("opacity", 1).stop().animate({
            left: leftPos,
            width: newWidth
        });
        
        if ($el.hasClass(".ui-tabs-active")){
            $(".ui-tabs-nav .ui-tabs-active").addClass("white");
        }
        else{
            $(".ui-tabs-nav .ui-tabs-active").removeClass("white");
        }
    }, function() {
        if ($(".ui-tabs-nav li").is(".ui-tabs-active")){
            $magicLine.stop().animate({
                left: $(".ui-tabs-nav .ui-tabs-active").position().left,
                width: $magicLine.data("origWidth")
            });  
        }
        else
            $magicLine.css("opacity", 0);
        $(".ui-tabs-nav li").removeClass("white");
        $(".ui-tabs-nav .ui-tabs-active").addClass("white");
    });
var i = 1;var j = 1;
    var layer1 = $(document).find(".layer1");
    var layer2 = $(document).find(".layer2");
    var layer3 = $(document).find(".layer3");
    var scrollPos = 0;
    var max_scale = 50;
    var scale = 0;
    var maxi = 1.075;
    var maxj = 1.125;
    if ($(this).scrollTop()>$(".top_block").height()-1){
        scale = max_scale;
        TweenMax.to( layer2, 1, 
            {
                scale:maxj,
            });

            TweenMax.to( layer3, 1, 
            {
                scale:maxj
            });

            TweenMax.to( layer1, 1, 
            {
                scale:maxi
            });
    }
    $(document).scroll(function(){
        var st = $(this).scrollTop();
        if ($(this).scrollTop()<$(".top_block").height()){
            if ((st > scrollPos)&&(j<maxj)&&(i<maxi)){
                j+=0.0025;
                i+=0.0015;
            } else if ((j>1)&&(i>1)){
                j-=0.0025;
                i-=0.0015;
            }
            if ($(this).scrollTop()==0) scale=0;
            TweenMax.to( layer2, 1, 
            {
                scale:j
            });

            TweenMax.to( layer3, 1, 
            {
                scale:j
            });

            TweenMax.to( layer1, 1, 
            {
                scale:i
            });
            scrollPos = st;
        }
        else{
            j=maxj;
            i=maxi;
        }

    });
    
    

});


$("#scene").parallax();

    function isIntoView(elem) { 
    
        if(!$(elem).length) return false; 
    
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
    
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        
        return ((elemBottom < (docViewBottom + ($(elem).height() / 2)) && (elemTop + ($(elem).height() / 2)) > docViewTop));
        
	}

    if ($(window).width()>980){
        if (isIntoView($(".presentation"))){
            $(".options_list li").each(function(i){
                $(this).delay(i*500).fadeIn().addClass("animated fadeInUp");
            });
        }
    }

    $('.mouse').click(function (event) {
        $("html,body").animate({scrollTop:$(".top_block").height()},"slow");
    });

    $(".vertical_scroll").mCustomScrollbar({
        axis:"y",
        scrollbarPosition:"outside"
    });

	$('.open_callback').click(function (event) {
		$("#modal_callback").arcticmodal({
            beforeClose: function(data, el) {
               $('body').css("overflow-y","scroll");
            }
        });
	});
	
	$('.open_confidence').click(function (event) {
        $.arcticmodal('close');
		$("#modal_confidence").arcticmodal({
            beforeClose: function(data, el) {
               $('body').css("overflow-y","scroll");
            }
        });
	});

	$('.open_order').click(function (event) {
		$("#modal_order").arcticmodal({
            beforeClose: function(data, el) {
               $('body').css("overflow-y","scroll");
            }
        });
	});

	$('.open_thanks').click(function (event) {
		$("#modal_thanks").arcticmodal({
            beforeClose: function(data, el) {
               $('body').css("overflow-y","scroll");
            }
        });
	});
    $('#datepicker').datepicker($.extend({
        inline: true,
        beforeShow:function(textbox, instance){
            $('#ui-datepicker-div').css({
                position: 'absolute',
                top:-20,
                left:5                   
            });
            $('#datepicker_wrap').append($('#ui-datepicker-div'));
            $('#ui-datepicker-div').hide();
        }
    },
        $.datepicker.regional['ru']
    ));
    $.datepicker.regional['ru'] = {
        closeText: 'Закрыть',
        prevText: '&#x3c;Пред',
        nextText: 'След&#x3e;',
        currentText: 'Сегодня',
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
        dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
        dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        weekHeader: 'Нед',
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['ru']);

	$(document).ready(function(){
           $("#loader").rotator({
                starting: 0,
                ending: 100,
                percentage:true,
                color: '#00aeef',
                lineWidth: 3,
                timer: 10,
               radius: 50,

               fontStyle: 'MuseoSansCyrl-100',
               fontColor: '#000',
                fontSize: '20px',
                callback: function () {
                    $("#loader").fadeOut(500);
                }
            });  
    });  
	$(document).scroll(function(){
        
        
    if ($(window).width()>980){
            if (isIntoView($(".presentation"))){            
                $(".options_list li").each(function(i){
                    $(this).delay(i*500).fadeIn().addClass("animated fadeInUp");
                });
            }
        }
    
		if ($(this).scrollTop() > 300) {
			$('.scroll_up').fadeIn(300);
		} else {
			$('.scroll_up').fadeOut(300);
		}
	});

	$('.scroll_up').click(function (event) {
		$('body').stop().animate({
			scrollTop:0
		}, 800,'linear');
		event.preventDefault();
	});
    

var tiltSettings = [
			{},
			{
				movement: {
					imgWrapper : {
						translation : {x: 10, y: 10, z: 30},
						rotation : {x: 0, y: -10, z: 0},
						reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
					},
					lines : {
						translation : {x: 10, y: 10, z: [0,70]},
						rotation : {x: 0, y: 0, z: -2},
						reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
					},
					caption : {
						rotation : {x: 0, y: 0, z: 2},
						reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
					},
					overlay : {
						translation : {x: 10, y: -10, z: 0},
						rotation : {x: 0, y: 0, z: 2},
						reverseAnimation : {duration : 2000, easing : 'easeOutExpo'}
					},
					shine : {
						translation : {x: 100, y: 100, z: 0},
						reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
					}
				}
			},
			{
				movement: {
					imgWrapper : {
						rotation : {x: -5, y: 10, z: 0},
						reverseAnimation : {duration : 900, easing : 'easeOutCubic'}
					},
					caption : {
						translation : {x: 30, y: 30, z: [0,40]},
						rotation : {x: [0,15], y: 0, z: 0},
						reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
					},
					overlay : {
						translation : {x: 10, y: 10, z: [0,20]},
						reverseAnimation : {duration : 1000, easing : 'easeOutExpo'}
					},
					shine : {
						translation : {x: 100, y: 100, z: 0},
						reverseAnimation : {duration : 900, easing : 'easeOutCubic'}
					}
				}
			},
			{
				movement: {
					imgWrapper : {
						rotation : {x: -5, y: 10, z: 0},
						reverseAnimation : {duration : 50, easing : 'easeOutQuad'}
					},
					caption : {
						translation : {x: 20, y: 20, z: 0},
						reverseAnimation : {duration : 200, easing : 'easeOutQuad'}
					},
					overlay : {
						translation : {x: 5, y: -5, z: 0},
						rotation : {x: 0, y: 0, z: 6},
						reverseAnimation : {duration : 1000, easing : 'easeOutQuad'}
					},
					shine : {
						translation : {x: 50, y: 50, z: 0},
						reverseAnimation : {duration : 50, easing : 'easeOutQuad'}
					}
				}
			},
			{
				movement: {
					imgWrapper : {
						translation : {x: 0, y: -8, z: 0},
						rotation : {x: 3, y: 3, z: 0},
						reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
					},
					lines : {
						translation : {x: 15, y: 15, z: [0,15]},
						reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
					},
					overlay : {
						translation : {x: 0, y: 8, z: 0},
						reverseAnimation : {duration : 600, easing : 'easeOutExpo'}
					},
					caption : {
						translation : {x: 10, y: -15, z: 0},
						reverseAnimation : {duration : 900, easing : 'easeOutExpo'}
					},
					shine : {
						translation : {x: 50, y: 50, z: 0},
						reverseAnimation : {duration : 1200, easing : 'easeOutExpo'}
					}
				}
			},
			{
				movement: {
					lines : {
						translation : {x: -5, y: 5, z: 0},
						reverseAnimation : {duration : 1000, easing : 'easeOutExpo'}
					},
					caption : {
						translation : {x: 15, y: 15, z: 0},
						rotation : {x: 0, y: 0, z: 3},
						reverseAnimation : {duration : 1500, easing : 'easeOutElastic', elasticity : 700}
					},
					overlay : {
						translation : {x: 15, y: -15, z: 0},
						reverseAnimation : {duration : 500,easing : 'easeOutExpo'}
					},
					shine : {
						translation : {x: 50, y: 50, z: 0},
						reverseAnimation : {duration : 500, easing : 'easeOutExpo'}
					}
				}
			},
			{
				movement: {
					imgWrapper : {
						translation : {x: 5, y: 5, z: 0},
						reverseAnimation : {duration : 800, easing : 'easeOutQuart'}
					},
					caption : {
						translation : {x: 10, y: 10, z: [0,50]},
						reverseAnimation : {duration : 1000, easing : 'easeOutQuart'}
					},
					shine : {
						translation : {x: 50, y: 50, z: 0},
						reverseAnimation : {duration : 800, easing : 'easeOutQuart'}
					}
				}
			},
			{
				movement: {
					lines : {
						translation : {x: 40, y: 40, z: 0},
						reverseAnimation : {duration : 1500, easing : 'easeOutElastic'}
					},
					caption : {
						translation : {x: 20, y: 20, z: 0},
						rotation : {x: 0, y: 0, z: -5},
						reverseAnimation : {duration : 1000, easing : 'easeOutExpo'}
					},
					overlay : {
						translation : {x: -30, y: -30, z: 0},
						rotation : {x: 0, y: 0, z: 3},
						reverseAnimation : {duration : 750, easing : 'easeOutExpo'}
					},
					shine : {
						translation : {x: 100, y: 100, z: 0},
						reverseAnimation : {duration : 750, easing : 'easeOutExpo'}
					}
				}
			}];

			function init() {
				var idx = 0;
				[].slice.call(document.querySelectorAll('.area')).forEach(function(el, pos) { 
					new TiltFx(el, tiltSettings[0]);
				});
			}
            init();