


//using lots of jquery to connect with design (css) of page
//var restaurants = $(".neighborhood-name"); //array of all restaurant cards
var hoods = [];


var hood_arrays = $(".neighborhood-name"); //looping through the segments of html
// that are assigned this class name; this is a jquery capability


hood_arrays.each(function(f){

//pushing neighborhood names to a list
  if (!hoods.includes($(this).html().trim())) { //take the list item and get the content within the tag
    hoods.push($(this).html().trim())
  }
})

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


$(".neighborhood-list").append(`${hoods.map(hood => (`<div class="hood-item" ><a class='jump' href="#${hood.replace(/[^a-z0-9]/gi , "")}">${hood}</a></div>`)).join('|')}`)
