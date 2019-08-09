// var headerTop = 0;
// var windowTop = 0;
// var headerHeight = 0;
// var bottomHeader = 0;

// $(window).on("scroll resize click", function() {
//
//         if ($(window).width() > 800){
//           // console.log('sticky.js just ran a loop');
//           //when header is hidden, relative top position is -76px
//           //and when header is showing, its relative position is 0px
//           var headerCSSposition = $('.pb-f-global-app-bar').position().top;
//           // console.log("header positon", headerCSSposition)
//           var headerTop = $('.pb-f-global-app-bar').offset().top;
//           // console.log("headerTop", headerTop)
//           var windowTop = $(window).scrollTop();
//           // console.log("window top", windowTop)
//           var headerHeight = $(".pb-f-global-app-bar").outerHeight();
//           // console.log("header height: ", headerHeight);
//
//           var bottomHeader = (headerTop + headerHeight) - windowTop;
//          // var bottomHeader = windowTop - headerCSSposition;
//          //  if (headerCSSposition == 0){ //header showing
//          //    var bottomHeader = (headerTop + headerHeight) - windowTop;
//          //
//          //  }
//          //  else {
//          //    var bottomHeader = headerTop - windowTop;
//          //  }
//          //  if (bottomHeader < 0){
//          //    bottomHeader = 0;
//          //  }
//           // console.log("bottomheader: ", bottomHeader);
//
//           //if ($(window).offset.top)
//           $(".sticky").css("position", "sticky");
//           $(".sticky").css("top", bottomHeader + "px");
//           $(".sticky").css("z-index", 100);
//           //console.log('sticky.js just ran a loop');
//         }
//
// })
