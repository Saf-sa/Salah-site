// If not iPhone, play the first video and set up event handlers for carousel rotations
if (!/iPhone/i.test(navigator.userAgent)) {
    $('.active > div > video').get(0).play();
  
    $('#carousel').on('slide.bs.carousel', function (e) {
      $(e.relatedTarget).find('video').get(0).play();
    });
  
    $('#carousel').on('slid.bs.carousel', function (e) {
      $('video').not('.active > div > video').each(function () {
        $(this).get(0).pause();
      });
    });
  }
  