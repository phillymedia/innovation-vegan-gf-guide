// $('jump-to-top').on("click", function() {
//         var headerTop = $('.pb-f-global-app-bar').offset().top;
//         var windowTop = $(window).scrollTop();
//         var headerHeight = $(".pb-f-global-app-bar").outerHeight();
//         var bottomHeader = (headerTop + headerHeight) - windowTop;
//         $(".sticky").css("top", bottomHeader + "px");

// $("a[href='#restaurant_top']").click(function() {
//   $("html, body").animate({ scrollTop:  }, "slow");
//   return false;
// });
function isMobile(mw) {
  var mw = window.matchMedia("(max-width: 800px)");
  if (mw.matches) { // If media query matches
    return true
  } else {
    return false
  }
}


$(".jump").click(function() {

  var $clicked = $(this); //this is the button

  var link = $clicked.attr('href')
  console.log(link)

  var headerTop = $('.pb-f-global-app-bar').offset().top;
  var windowTop = $(window).scrollTop();
  var headerHeight = $(".pb-f-global-app-bar").outerHeight();
  var bottomHeader = (headerTop + headerHeight) - windowTop;

  var scrollTo = 0;
  var linkTop = $(link).offset().top
  var curTop = $clicked.offset().top
  console.log("button offset", curTop)
  console.log("linktop", linkTop)
  console.log("height of link element", $(link).height())
  var height = $(link).height();

  //if you're about to scroll down
  if (curTop < linkTop){
    //
    if ($(window).width() < 800){
      scrollTo = linkTop;

    }
    else{
      scrollTo = linkTop - height;
    }

  }
  else { //scrolling to top
    //scrollTo = linkTop - bottomHeader - height;
    scrollTo = linkTop - bottomHeader - headerHeight;
  }
  console.log("bottomheader: ", bottomHeader)





  $('html, body').animate({
      'scrollTop':   (scrollTo)
  }, 'slow');
  return false;
  console.log("\n")
});
