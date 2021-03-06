/* ===================================================================
 * AskMe.- Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://facebook.us8.list-manage.com/subscribe/post?u=cdb7b577e41181934ed6a6a44&amp;id=e6957d85dc'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);


   /* Preloader
    * -------------------------------------------------- */
    var clPreloader = function(time) {
        
		
        $("html").addClass('cl-preload');

        $WIN.on('load', function() {

            //force page scroll position to top at page refresh
            // $('html, body').animate({ scrollTop: 0 }, 'normal');

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(time).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('cl-preload');
            $("html").addClass('cl-loaded');
        
        });
    };


   /* Menu on Scrolldown
    * ------------------------------------------------------ */
    var clMenuOnScrolldown = function() {
        
        var menuTrigger = $('.header-menu-toggle');

        $WIN.on('scroll', function() {

            if ($WIN.scrollTop() > 150) {
                menuTrigger.addClass('opaque');
            }
            else {
                menuTrigger.removeClass('opaque');
            }

        });
    };


   /* OffCanvas Menu
    * ------------------------------------------------------ */
    var clOffCanvas = function() {

        var menuTrigger     = $('.header-menu-toggle'),
            nav             = $('.header-nav'),
            closeButton     = nav.find('.header-nav__close'),
            siteBody        = $('body'),
            mainContents    = $('section, footer');

        // open-close menu by clicking on the menu icon
        menuTrigger.on('click', function(e){
            e.preventDefault();
            // menuTrigger.toggleClass('is-clicked');
            siteBody.toggleClass('menu-is-open');
        });

        // close menu by clicking the close button
        closeButton.on('click', function(e){
            e.preventDefault();
            menuTrigger.trigger('click');	
        });

        // close menu clicking outside the menu itself
        siteBody.on('click', function(e){
            if( !$(e.target).is('.header-nav, .header-nav__content, .header-menu-toggle, .header-menu-toggle span') ) {
                // menuTrigger.removeClass('is-clicked');
                siteBody.removeClass('menu-is-open');
            }
        });

    };


   /* photoswipe
    * ----------------------------------------------------- */
    var clPhotoswipe = function() {
        var items = [],
            $pswp = $('.pswp')[0],
            $folioItems = $('.item-folio');

            // get items
            $folioItems.each( function(i) {

                var $folio = $(this),
                    $thumbLink =  $folio.find('.thumb-link'),
                    $title = $folio.find('.item-folio__title'),
                    $caption = $folio.find('.item-folio__caption'),
                    $titleText = '<h4>' + $.trim($title.html()) + '</h4>',
                    $captionText = $.trim($caption.html()),
                    $href = $thumbLink.attr('href'),
                    $size = $thumbLink.data('size').split('x'),
                    $width  = $size[0],
                    $height = $size[1];
         
                var item = {
                    src  : $href,
                    w    : $width,
                    h    : $height
                }

                if ($caption.length > 0) {
                    item.title = $.trim($titleText + $captionText);
                }

                items.push(item);
            });

            // bind click event
            $folioItems.each(function(i) {

                $(this).on('click', function(e) {
                    e.preventDefault();
                    var options = {
                        index: i,
                        showHideOpacity: true
                    }

                    // initialize PhotoSwipe
                    var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
                    lightBox.init();
                });

            });

    };
    

   /* Stat Counter
    * ------------------------------------------------------ */
    var clStatCount = function() {
        
        var statSection = $(".about-stats"),
            stats = $(".stats__count");

        statSection.waypoint({

            handler: function(direction) {

                if (direction === "down") {

                    stats.each(function () {
                        var $this = $(this);

                        $({ Counter: 0 }).animate({ Counter: $this.text() }, {
                            duration: 4000,
                            easing: 'swing',
                            step: function (curValue) {
                                $this.text(Math.ceil(curValue));
                            }
                        });
                    });

                } 

                // trigger once only
                this.destroy();

            },

            offset: "90%"

        });
    };


   /* slick slider
    * ------------------------------------------------------ */
    var clSlickSlider = function() {

        $('.clients').slick({
            arrows: false,
            dots: true,
            infinite: true,
            slidesToShow: 6,
            slidesToScroll: 2,
            //autoplay: true,
            pauseOnFocus: false,
            autoplaySpeed: 1000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 5
                    }
                },
                {
                    breakpoint: 1000,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 500,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }

            ]
        });

        $('.testimonials').slick({
            arrows: true,
            dots: false,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            pauseOnFocus: false,
            autoplaySpeed: 1500,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        arrows: false,
                        dots: true
                    }
                }
            ]
        });
    
    };

   /* Smooth Scrolling
    * ------------------------------------------------------ */
    var clSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            var target = this.hash,
            $target    = $(target);
            
                e.preventDefault();
                e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {

                // check if menu is open
                if ($('body').hasClass('menu-is-open')) {
                    $('.header-menu-toggle').trigger('click');
                }

                window.location.hash = target;
            });
        });

    };


   /* Placeholder Plugin Settings
    * ------------------------------------------------------ */
    var clPlaceholder = function() {
        $('input, textarea, select').placeholder();  
    };


   /* Alert Boxes
    * ------------------------------------------------------ */
    var clAlertBoxes = function() {

        $('.alert-box').on('click', '.alert-box__close', function() {
            $(this).parent().fadeOut(500);
        }); 

    };


   /* Contact Form
    * ------------------------------------------------------ */
    var clContactForm = function() {
        
        /* local validation */
        $('#contactForm').validate({
        
            /* submit via ajax */
            submitHandler: function(form) {
    
                var sLoader = $('.submit-loader');
    
                $.ajax({
    
                    type: "POST",
                    url: "inc/sendEmail.php",
                    data: $(form).serialize(),
                    beforeSend: function() { 
    
                        sLoader.slideDown("slow");
    
                    },
                    success: function(msg) {
    
                        // Message was sent
                        if (msg == 'OK') {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').fadeOut();
                            $('#contactForm').fadeOut();
                            $('.message-success').fadeIn();
                        }
                        // There was an error
                        else {
                            sLoader.slideUp("slow"); 
                            $('.message-warning').html(msg);
                            $('.message-warning').slideDown("slow");
                        }
    
                    },
                    error: function() {
    
                        sLoader.slideUp("slow"); 
                        $('.message-warning').html("Something went wrong. Please try again.");
                        $('.message-warning').slideDown("slow");
    
                    }
    
                });
            }
    
        });
    };


   /* Animate On Scroll
    * ------------------------------------------------------ */
    var clAOS = function() {
        
        AOS.init( {
            offset: 200,
            duration: 600,
            easing: 'ease-in-sine',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };


   /* AjaxChimp
    * ------------------------------------------------------ */
    var clAjaxChimp = function() {
        
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fa fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fa fa-warning"></i> You must enter a valid e-mail address.',
            2: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            3: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            4: '<i class="fa fa-warning"></i> E-mail address is not valid.',
            5: '<i class="fa fa-warning"></i> E-mail address is not valid.'
        } 

    };


   /* Back to Top
    * ------------------------------------------------------ */
    var clBackToTop = function() {
        
        var pxShow  = 500,         // height on which the button will show
        fadeInTime  = 400,         // how slow/fast you want the button to show
        fadeOutTime = 400,         // how slow/fast you want the button to hide
        scrollSpeed = 300,         // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
        goTopButton = $(".go-top")
        
        // Show or hide the sticky footer button
        $(window).on('scroll', function() {
            if ($(window).scrollTop() >= pxShow) {
                goTopButton.fadeIn(fadeInTime);
            } else {
                goTopButton.fadeOut(fadeOutTime);
            }
        });
    };

   /* Initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        clPreloader(400);
        clMenuOnScrolldown();
        clOffCanvas();
        clPhotoswipe();
        clStatCount();
        clSlickSlider();
        clSmoothScroll();
        clPlaceholder();
        clAlertBoxes();
        clContactForm();
        clAOS();
        clAjaxChimp();
        clBackToTop();
    })();
        
    //Event trigger when done typing   
	$.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
		
})(jQuery);

$('#input_passage').donetyping(textAreaAdjust);

$(document).ready(function() {
	console.log("started");
    document.body.onload = function(){
		viewPredefinedPassages();
		$("#question").hide();
		divloaderHide();//$("#divloader").hide();
		setEvents();
	}
});

//GLOBALS
var userFileName = "User's File";
var textAreaElem = document.getElementById("input_passage");
		

	/* set events: input question:
    * ------------------------------------------------------ */
    function setEvents(){
			$("#question").on('keyup' , updateQuestion);
			$("#go").on('click' , callApp1Backend);
			//$("#passage-file").on('change', startRead)
			//predefinedPassages click insertPassage
			//$("#input_passage").on('keyup' , textAreaAdjust);
			
	}
	
	/* Call backend to run Sentence Simplification and Question Generation
    * ------------------------------------------------------ */    
	function callApp1Backend(event){
		fileContent = $("#input_passage").val();
		textobj = { file_path: 'C:/Software/xampp/htdocs/glint/resources/passage.txt' , file_content: fileContent }
		$.post("php/file_services.php" , textobj , displayQuestion);
		divloaderShow();
		$("#go").hide();
		hideQuestion();
	}
	
	/* input question:
    * ------------------------------------------------------ */
	function hideQuestion(){
		$("#question").hide();
	}
	function clearQuestion(){
		$("#question").val('');
	}
	function displayQuestion(){
		$("#question").show()
	}
	
	
	/* send input question:
    * ------------------------------------------------------ */
    function updateQuestion(event){
		if(event.keyCode == 13){
			//UI side
			divloaderShow();//$("#divloader").show();
			
			writequestionFile('C:/Software/xampp/htdocs/glint/resources/question.txt', event.target.value);
			
		} else{
			removeAnswerDiv();
			divloaderHide();
		}
	}
	
	/* remove answer div:
    * ------------------------------------------------------ */
	function removeAnswerDiv(){
		var section = document.getElementById("question_answer");
		if(section.querySelector("#answer") != null) 
			section.removeChild(document.getElementById("answer"));
		
	}
	/* get output of question:
    * ------------------------------------------------------ */
    function updateAnswer(data){
		
		var section = document.getElementById("question_answer");
		
		removeAnswerDiv();
		
		divloaderHide();//$("#divloader").hide();
			
		var p2 = document.createElement('p');
		p2.className = "col-full";
		p2.innerHTML = data;
		p2.id = "answer";
		section.appendChild(p2);
		
	}
	/* write to question file: 
    * ------------------------------------------------------ */   
	function writequestionFile(filePath, fileContent)
	{
		
		if(fileContent == "")
		{
			return;
		}
		else
		{
			textobj = { file_path: filePath , file_content: fileContent};
			$.post("php/file_services.php", textobj, updateAnswer);
		}
		
	}
	
	/* insert passages:
    * ------------------------------------------------------ */
    function insertPassage(passageValue, imgUrl,passagetitle, filePath, event) {
		$("#input_passage").val(passageValue);
		
		//textAreaAdjust:
		var textAreaElem = document.getElementById("input_passage");
		textAreaElem.style.height = "1px";
		textAreaElem.style.height = (3+textAreaElem.scrollHeight)+"px";
		
		//Remove answer div
		removeAnswerDiv();
		//Clear question value
		clearQuestion();
		
		var img_url = 'http://localhost/glint/images/examples/'+imgUrl;
		$("#input_passage_title").text(passagetitle);
		//$("#input_passage_div").css("background-image", "url('"+img_url+"')");
		
		if(filePath){
			displayQuestion();
			//readonly textarea
			textAreaElem.readOnly = true;
			//remove start button
			$("#go").hide();
			//replace pkl file as per selected passage:
			filePath = "C:/Software/xampp/htdocs/glint/resources/qa_pkl/" + filePath;
			textobj = { file_path: filePath , prefilled: true};
			$.post("php/file_services.php", textobj, success);
		}else{//when user input case
			
			document.getElementById("works_link").click();
			hideQuestion();
			textAreaElem.readOnly = false;
			$("#go").show();
			
		}
	}
	
	function success(data){
		
		console.log( data)
	}
	
   /* view passages:
    * ------------------------------------------------------ */
    function viewPredefinedPassages() {
		console.log("predefinedPassages");
		d3.csv("resources/passage_details.csv").then(function(data) {
			  console.log(data); 
			
			num_rows = data.length/5;
			
			for(var i=0;i<num_rows;++i) {
				var row_id = i+1;
				$("#passages").append("<div class=\"row block-1-5 block-m-1-2 block-mob-full\" data-aos=\"fade-up\" data-aos=\"fade-up\" id='passage-row"+row_id+ "' ></div>");		
				for(var j=0;j<5;++j) {
					var img_id = i*5+j;
					
					$("#passage-row"+row_id).append("<div class='col-block' id='passage"+data[img_id].id+"' ><a href='#works' class='scroll-link smoothscroll'><img class='img-fluid' src='images/examples/"+data[img_id].image_url+"' alt='"+data[img_id].title+ "' /><p class='col-full' >"+data[img_id].title+"</p></a>"+"</div>");
					
					document.getElementById("passage"+data[img_id].id).addEventListener('click' , insertPassage.bind(null, data[img_id].passage , data[img_id].image_url, data[img_id].title, data[img_id].pkl_file_url) , false);
				
				}
			}

		});
		
		
	};
	
	/* Event handler on user's passage:
    * ------------------------------------------------------ */
    function startRead() {
	  // obtain input element through DOM
	  var file = document.getElementById('passage-file').files[0];
	  if(file){
		getAsText(file);
		}
	}
	
	/* Read user's passage file:
    * ------------------------------------------------------ */
	function getAsText(readFile) {

	  var reader = new FileReader();

	  reader.readAsText(readFile, "UTF-8");
	userFileName = readFile.name;
	  // Handle progress, success, and errors
	  // reader.addEventListener('load' , insertPassage.bind(event, event.target.result ,"" , readFile.name, null) , false);
	  
	  reader.onload = loaded;
	  reader.onerror = failure;
	}
	
	/* Read user's passage file contents into try section and move to try:
    * ------------------------------------------------------ */
	function loaded(event){
		console.log( event.target.result)
		insertPassage(event.target.result , "" , userFileName , null);
		
	}
	
	function failure(){
		alert("Failed")
	}
	
	/* Loading gif of Div
    * ------------------------------------------------------ */
    function divloaderShow() {
		$("#divloader").show();
		$("#input_passage").css('color', 'white'); 
		textAreaElem.readOnly = true;				
	}
	function divloaderHide() {
		$("#divloader").hide();
		$("#input_passage").css('color', 'black'); 
		textAreaElem.readOnly = false;	
	}
	
	function textAreaAdjust() {
		this.style.height = "1px";
		this.style.height = (3+this.scrollHeight)+"px";
	
	}
	
	/* Progress bar move
    * ------------------------------------------------------ 
    function mybarmove() {
	  var elem = document.getElementById("myBar");   
	  var width = 1;
	  var id = setInterval(frame, 10000);
	  function frame() {
		if (width >= 100) {
		  clearInterval(id);
		} else {
		  width++; 
		  elem.style.width = width + '%'; 
		}
	  }
	}*/
