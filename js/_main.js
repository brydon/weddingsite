/*! viewportSize | Author: Tyson Matanich, 2013 | License: MIT */
(function(n){n.viewportSize={},n.viewportSize.getHeight=function(){return t("Height")},n.viewportSize.getWidth=function(){return t("Width")};var t=function(t){var f,o=t.toLowerCase(),e=n.document,i=e.documentElement,r,u;return n["inner"+t]===undefined?f=i["client"+t]:n["inner"+t]!=i["client"+t]?(r=e.createElement("body"),r.id="vpw-test-b",r.style.cssText="overflow:scroll",u=e.createElement("div"),u.id="vpw-test-d",u.style.cssText="position:absolute;top:-1000px",u.innerHTML="<style>@media("+o+":"+i["client"+t]+"px){body#vpw-test-b div#vpw-test-d{"+o+":7px!important}}<\/style>",r.appendChild(u),i.insertBefore(r,e.head),f=u["offset"+t]==7?i["client"+t]:n["inner"+t],i.removeChild(r)):f=n["inner"+t],f}})(this);

 /**
 * This demo was prepared for you by Petr Tichy - Ihatetomatoes.net
 * Want to see more similar demos and tutorials?
 * Help by spreading the word about Ihatetomatoes blog.
 * Facebook - https://www.facebook.com/ihatetomatoesblog
 * Twitter - https://twitter.com/ihatetomatoes
 * Google+ - https://plus.google.com/u/0/109859280204979591787/about
 * Article URL: http://ihatetomatoes.net/how-to-create-a-parallax-scrolling-website-part-2/
 */

( function( $ ) {
	
	// Setup variables
	$window = $(window);
	$slide = $('.homeSlide');
	$slideTall = $('.homeSlideTall');
	$slideTall2 = $('.homeSlideTall2');
	$body = $('body');
	htmlbody = $('html,body');
	var duration = 500;
	
    //FadeIn all sections   
	$body.imagesLoaded( function() {
		setTimeout(function() {
		      
		      // Resize sections
		      adjustWindow();
		      
		      // Init navigation
		      initHomepageNav();
		      
		      // Fade in sections
			  $body.removeClass('loading').addClass('loaded');
			  
		}, 800);
	});
	
	function adjustWindow(){
		
		// Init Skrollr
		var s = skrollr.init({
		    forceHeight: false,
		    render: function(data) {
		    
		        //Debugging - Log the current scroll position.
		        //console.log(data.curTop);
		    }
		});
		
		// Get window size
	    winH = $window.height();
	    
	    // Keep minimum height 550
	    if(winH <= 550) {
			winH = 550;
		} 
	    
	    // Resize our slides
	    $slide.height(winH);
	    $slideTall.height(winH*2);
	    $slideTall2.height(winH*3);
	    
	    // Refresh Skrollr after resizing our sections
	    s.refresh($('.homeSlide'));
	    
	}

	function initHomepageNav(){
		
		var homeSlides = $('.homeSlide');
		var $slideContent = $('.hsContainer');
		var slidesCount = $(homeSlides).length;
		var activeSlide = 1;
		
		// Build HTML for Nav
		$('<div/>', {
		    'id' : 'slideNav'
		}).append($('<ul><li class="slideNavPrev"><a class="disabled" href="#" title="Go to previous slide"><span class="ico ico-up">↑</span></a></li><li><span id="activeSlide">'+activeSlide+'</span>/<span id="maxSlides">'+slidesCount+'</span></li><li class="slideNavNext"><a href="#" title="Go to next slide"><span class="ico ico-down">↓</span></a></li></ul>')).appendTo('body').delay(1200).fadeIn(duration);
		

		// Navigation highligting
		var $activeSlide = $('#activeSlide');
		var $maxSlides = $('#maxSlides');
		var $numberOfSlides = parseInt($maxSlides.text());
		var slideNavPrev = $('');
		var $slideNavNext = $('.slideNavNext');
		var $slideNavPrev = $('.slideNavPrev');	
		var $slideNavNextA = $('.slideNavNext a');
		var $slideNavPrevA = $('.slideNavPrev a');	
		
		// Highlight the section currently scrolling DOWN
		homeSlides.waypoint(function(direction) {
		  if (direction === 'down') {
		    var index = $(this).index();
			var index = index+1;
			$activeSlide.text(index);
			showHideNavItems();
		  }
		}, { offset: '50%' });
		
		// Highlight the section currently scrolling UP
		homeSlides.waypoint(function(direction) {
		  if (direction === 'up') {
			var index = $(this).index();
			var index = index+1;
			$activeSlide.text(index);
			showHideNavItems();
		  }
		}, {
		  offset: function() {
		    // This is the calculation that would give you
		    // "bottom of element hits middle of window"
		    return $.waypoints('viewportHeight') / 2 - $(this).outerHeight();
		  }
		});
		
		//Fade out unnecesary nav items
		function showHideNavItems(){
			var $activeSlideNumber = parseInt($activeSlide.text());
			
			if($activeSlideNumber == 1){
			
				$slideNavNextA.removeAttr('class');
				$slideNavPrev.animate({opacity: 0.25}).find('a').addClass('disabled');
				
			} else if ($activeSlideNumber == $numberOfSlides) {
			
				$slideNavPrevA.removeAttr('class');
				$slideNavNext.animate({opacity: 0.25}).find('a').addClass('disabled');
				
			} else {
			
				$slideNavNext.add($slideNavPrev).animate({opacity: 1});
				$slideNavNextA.add($slideNavPrevA).removeAttr('class');
				
			}
		}	
		
		//Next slide
		$slideNavNext.click(function (e) {
		    e.preventDefault();
		    var index = parseInt($activeSlide.text());
		    index++;
		    if(index <= $numberOfSlides){
		        
				scrollToSlide(index);
		        
		    }
		});
		
		//Prev slide
		$slideNavPrev.click(function (e) {
		    e.preventDefault();
		    var index = parseInt($activeSlide.text());
		    index--;
		    if(index > 0){
		        
		        scrollToSlide(index);
		        
		    }
		});
	    
	    
		function scrollToSlide(slideId){
			
			// Custom slide content offset
		    var customSlideOffset = $("#slide-"+slideId).attr('data-content-offset');
		    
		    
		    // Scroll to the top of a container if it doesn't have custom offset defined
		    if(typeof customSlideOffset === 'undefined'){
		        
		        htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top) + 'px'},'slow');
		        
		    } else {
		        
		        // Convert percentage 'eg. 25p' into pixels
		        if(customSlideOffset.indexOf('p')!=-1) {
			       
			       var customSlideOffset = parseInt(customSlideOffset.split('p')[0]);
				   var slideHeight = $slide.height();
				   
				   customSlideOffset = Math.ceil((slideHeight/100) * customSlideOffset);
				   
				   //console.log(slideHeight +' '+ customSlideOffset);
				   
				   htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        } else {
			       
			       var customSlideOffset = parseInt(customSlideOffset);
			       
			       htmlbody.animate({scrollTop: ($("#slide-"+slideId).offset().top + customSlideOffset) + 'px'},'slow');
			        
		        }
		    
		    }
		}
	    
	    
	}
		
} )( jQuery );
