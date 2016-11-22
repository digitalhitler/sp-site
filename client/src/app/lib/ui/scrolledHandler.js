(function() {
  let body = document.body;
  $(window).scroll(function(e) {
    console.log("scrolled to ", e);
  });
  console.info("Loaded scroller");

  window.addEventListener('scroll', function() {
    clearTimeout(timer);
    if(!body.classList.contains('disable-hover')) {
      body.classList.add('disable-hover')
    }

    timer = setTimeout(function(){
      body.classList.remove('disable-hover')
    }, 500);
  }, false);
})(window);
