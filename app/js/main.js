require('./neighborhoods')
require('./sticky')
require('./jumpto')
require('./pushAnalytics')
//  $(".heart-icon").on("click", function(e) {
  //   pushAnalytics("favorite-item")
  //   e.stopPropagation();
  //   addFavorite(this, window.favorites_list)
  // });
//require('./map.js')
//using lots of jquery to connect with design (css) of page
var restaurants = $(".list-item"); //array of all restaurant cards
var filters = ['Gluten-free', 'Dairy-free',  'Vegan', 'Carnivore-friendly', 'Clear Filters'];


$(".filter-section").append(`${filters.map(f => (`<div class="filter-item ${f.replace(" ", "")}">${f}</div>`)).join(' ')}`)

var filtersOn = [];

if($(".filter-item").length > 0) {
  $(".filter-item").click(function(){

    console.log("filtersOn: ", filtersOn)

    var $this = $(this); //'this' is the html being clicked

    if ($this.html().trim() == "Clear Filters"){
      filtersOn = []; //reset filters

      $(".list-item").show();
      //take all selected filters (all elements) and tell them they're no longer selected
      $(".filter-item").removeClass('selected-filter');
      return; //STOPS the function
    }

      //if user is clicking on an actively applied filter, turn it off
      if($this.attr('class').includes('selected-filter')) {
        filtersOn = filtersOn.filter(filterInList => filterInList !== $this.html())
      }
      else {
        filtersOn.push($this.html())
      }
      $this.toggleClass("selected-filter")
      if(filtersOn.length > 0) { //if there are any filters on
          $(".list-item").show(); //show all cards
          filtersOn.forEach(f => {
              restaurants.each(function(){ //loop through each restaurant
                if(!$(this).find('.r-filters').attr('data-filter').includes(f)) {
                  $(this).hide();
                  return;
                }
              })
            })
        //  $("html, body").animate({ scrollTop: 0 }, "slow");
          }
      else {
          $(".list-item").show();
      }

    // var aTag = $("a[name='"+ aid +"']");
    // $('html,body').animate({scrollTop: aTag.offset().top},'slow');

    //hide neighborhoods with no restaurants ??
  })
}
