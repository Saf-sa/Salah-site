$(document).ready(function() {
  var $slider = "slider-youtube";
  $(".slider-youtube iframe").each(function (idx) {
    $(this).addClass("data-idx-" + idx).data("idx", idx);
  });

  function getPlayer (iframe, onPlayerReady, clonned) {
      var $iframe = $(iframe);
      if ($iframe.data((clonned ? "clonned-" : "") + "player")) {
        var isReady = $iframe.data((clonned ? "clonned-" : "") + "player-ready");
        if (isReady) {
          onPlayerReady && onPlayerReady($iframe.data((clonned ? "clonned-" : "") + "player"));
        }        	
        return player;
      }
      else {
        var player = new YT.Player($iframe.get(0), {
          events: {
            'onReady': function () {
              $iframe.data((clonned ? "clonned-" : "") + "player-ready", true);
              onPlayerReady && onPlayerReady(player);
            }
          }
        });        
        $iframe.data((clonned ? "clonned-" : "") + "player", player);
        return player;
      }    		
  }

  function updateClonnedFrames () {
    frames = $(".slider-youtube").find(".slick-slide").not(".slick-cloned").find("iframe");
    frames.each(function () {
      var frame = $(this);
      var idx = frame.data("idx");
      clonedFrames = $(".slider-youtube").find(".slick-cloned .data-idx-" + idx);
      console.log("clonedFrames", frame, idx, clonedFrames);
      clonedFrames.each(function () {
        var clonnedFrame = this;
        getPlayer(frame[0], function (player) {
          getPlayer(clonnedFrame, function (clonedPlayer) {         
            console.log("clonnedPlayer", clonedPlayer);
            clonedPlayer.playVideo();  
            clonedPlayer.seekTo(player.getCurrentTime(), true);
            setTimeout(function () {
              clonedPlayer.pauseVideo();         
            }, 0);              
          }, true);
        });
      });        
    });    	    	
  }
  
  //reset iframe of non current slide
  $(".slider-youtube").on('beforeChange', function(event, slick, currentSlide) {
      var currentSlide, iframe, clonedFrame;
      currentSlide = $(slick.$slider).find(".slick-current");
      iframe = currentSlide.find("iframe");        
      getPlayer(iframe, function (player) {   
        player.pauseVideo();
        updateClonnedFrames();
      });          
  });
  $(".slider-youtube").on("click", function(event, slick) {
      var currentSlide;
      currentSlide = $('.slider-youtube').find(".slick-current");
      getPlayer(currentSlide.find("iframe"), function (player) {
        player.playVideo();
        currentSlide.find(".slick-button").css('display','none');
      });
  });
  // start the slider
  $('.slider-youtube').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      asNavFor: '.video-gallery-slider-thumbs'
  });
  $('.video-gallery-slider-thumbs').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-youtube',
      dots: true,
      arrows: false,
      dots: false,
      infinite: false,
      focusOnSelect: true,
      responsive: [
          {
              breakpoint: 768,
              settings: {
                  arrows: false,
                  slidesToShow: 3,
                  slidesToScroll: 1,
              }
          }]
  });
});
