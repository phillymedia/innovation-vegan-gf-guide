(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

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
  if (mw.matches) {
    // If media query matches
    return true;
  } else {
    return false;
  }
}

$(".jump").click(function () {

  var $clicked = $(this); //this is the button

  var link = $clicked.attr('href');
  console.log(link);

  var headerTop = $('.pb-f-global-app-bar').offset().top;
  var windowTop = $(window).scrollTop();
  var headerHeight = $(".pb-f-global-app-bar").outerHeight();
  var bottomHeader = headerTop + headerHeight - windowTop;

  var scrollTo = 0;
  var linkTop = $(link).offset().top;
  var curTop = $clicked.offset().top;
  console.log("button offset", curTop);
  console.log("linktop", linkTop);
  console.log("height of link element", $(link).height());
  var height = $(link).height();

  //if you're about to scroll down
  if (curTop < linkTop) {
    //
    if ($(window).width() < 800) {
      scrollTo = linkTop;
    } else {
      scrollTo = linkTop - height;
    }
  } else {
    //scrolling to top
    //scrollTo = linkTop - bottomHeader - height;
    scrollTo = linkTop - bottomHeader - headerHeight;
  }
  console.log("bottomheader: ", bottomHeader);

  $('html, body').animate({
    'scrollTop': scrollTo
  }, 'slow');
  return false;
  console.log("\n");
});

},{}],2:[function(require,module,exports){
'use strict';

require('./neighborhoods');
require('./sticky');
require('./jumpto');
require('./pushAnalytics');
//  $(".heart-icon").on("click", function(e) {
//   pushAnalytics("favorite-item")
//   e.stopPropagation();
//   addFavorite(this, window.favorites_list)
// });
//require('./map.js')
//using lots of jquery to connect with design (css) of page
var restaurants = $(".list-item"); //array of all restaurant cards
var filters = ['Gluten-free', 'Dairy-free', 'Vegan', 'Carnivore-friendly', 'Clear Filters'];

$(".filter-section").append('' + filters.map(function (f) {
  return '<div class="filter-item ' + f.replace(" ", "") + '">' + f + '</div>';
}).join(' '));

var filtersOn = [];

if ($(".filter-item").length > 0) {
  $(".filter-item").click(function () {

    console.log("filtersOn: ", filtersOn);

    var $this = $(this); //'this' is the html being clicked

    if ($this.html().trim() == "Clear Filters") {
      filtersOn = []; //reset filters

      $(".list-item").show();
      //take all selected filters (all elements) and tell them they're no longer selected
      $(".filter-item").removeClass('selected-filter');
      return; //STOPS the function
    }

    //if user is clicking on an actively applied filter, turn it off
    if ($this.attr('class').includes('selected-filter')) {
      filtersOn = filtersOn.filter(function (filterInList) {
        return filterInList !== $this.html();
      });
    } else {
      filtersOn.push($this.html());
    }
    $this.toggleClass("selected-filter");
    if (filtersOn.length > 0) {
      //if there are any filters on
      $(".list-item").show(); //show all cards
      filtersOn.forEach(function (f) {
        restaurants.each(function () {
          //loop through each restaurant
          if (!$(this).find('.r-filters').attr('data-filter').includes(f)) {
            $(this).hide();
            return;
          }
        });
      });
      //  $("html, body").animate({ scrollTop: 0 }, "slow");
    } else {
      $(".list-item").show();
    }

    // var aTag = $("a[name='"+ aid +"']");
    // $('html,body').animate({scrollTop: aTag.offset().top},'slow');

    //hide neighborhoods with no restaurants ??
  });
}

},{"./jumpto":1,"./neighborhoods":3,"./pushAnalytics":4,"./sticky":5}],3:[function(require,module,exports){
"use strict";

//using lots of jquery to connect with design (css) of page
//var restaurants = $(".neighborhood-name"); //array of all restaurant cards
var hoods = [];

var hood_arrays = $(".neighborhood-name"); //looping through the segments of html
// that are assigned this class name; this is a jquery capability


hood_arrays.each(function (f) {

  //pushing neighborhood names to a list
  if (!hoods.includes($(this).html().trim())) {
    //take the list item and get the content within the tag
    hoods.push($(this).html().trim());
  }
});

// hood_order_obj = {}
//
// //obj maps neighborhood to its order
//
//
// //make a dict so we can give order to categories
// var jsonData = JSON.stringify(hood_order_obj);
// var fs = require('fs');
// fs.writeFile("../../neighborhood_order.json", jsonData, function(err) {
//     if (err) {
//         console.log(err);
//     }
// });
//
//
// console.log(hoods)

// var n_order_obj = require("../neighborhood_order.json");
//
//
// n_code = n.replace(/[^a-z0-9]/gi,'')
// resto.Neighborhood_Order = n_order_obj[n_code]
// console.log("neighborhood:", n, "order: ", n_order_obj[n_code])
//
//
// hoods.sort((a, b) => (a.order > b.order) ? 1 : -1)
// console.log(hoods)


$(".neighborhood-list").append("" + hoods.map(function (hood) {
  return "<div class=\"hood-item\" ><a class='jump' href=\"#" + hood.replace(/[^a-z0-9]/gi, "") + "\">" + hood + "</a></div>";
}).join('|'));

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushAnalytics = pushAnalytics;
function pushAnalytics(misc) {
  if (typeof PMNdataLayer !== 'undefined') {
    PMNdataLayer.push({
      'event': 'misc_event', // not customizable
      'eventAction': 'click', // all lowercase, underscore_separated string
      'eventLabel': 'vegan_gf_guide' + misc
    });
  }
}

},{}],5:[function(require,module,exports){
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
"use strict";

},{}]},{},[2]);
