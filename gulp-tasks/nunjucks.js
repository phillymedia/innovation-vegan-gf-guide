var nunjucksRender = require('gulp-nunjucks-html');
var data = require("gulp-data");
var n_order_obj = require("../neighborhood_order.json");
// var photos = require('../app/photo-testing.json')
//
// var byPhotoTag = {};

// photos.forEach(function(p){
//     if(!byPhotoTag[p.keyword]) byPhotoTag[p.keyword] = [];
//     byPhotoTag[p.keyword].push(p)
// })

function formatData(name, resto){
  /*
  @params
  name: namecode for dictionary (alphanumeric, no spaces)
    resto : dictionary of info about one restaurant
    this function changes information in resto
    (address, phone num) to standard format and turns them into google maps and
    cell phone links. it also makes sure that each restaurant has
    at least one address and one phone number, but doesn't throw an error.
  */
  if (resto.Address){
    var address = resto.Address
    resto.DirectionsLink = getMapsLink(address);

    var newaddress = formatAddress(address, "Philadelphia")
    resto.Address = newaddress;
  }
  else{
    console.log("restaurant named", name, "is missing an address");
  }

  if (resto.Address2){
    console.log("Restaurant", resto.Name, "has second address!")
    var address2 = resto.Address2
    resto.DirectionsLink2 = getMapsLink(address2);

    var newaddress2 = formatAddress(address2, "Philadelphia")
    resto.Address2 = newaddress2;
  }

  //format phone number
  if (resto.Phone){

    var phone = resto.Phone;
    var formatted_phone_str = formatPhoneNumber(phone);
    //might add error catching for if formatPhoneNumber returns null
    resto.Phone = formatted_phone_str;
    resto.PhoneLink = parseInt(formatted_phone_str)

  }
  else{
    console.log("restaurant named", name, "is missing a phone num")
  }
  if (resto.Phone2){

    var phone = resto.Phone2;
    var formatted_phone_str = formatPhoneNumber(phone);
    //might add error catching for if formatPhoneNumber returns null
    resto.Phone2 = formatted_phone_str;
    resto.PhoneLink2 = parseInt(formatted_phone_str)

  }
}

function assignPhotos(name, resto, allrestaurantdata){
  /*
  @params
    namecode for dictionary (alphanumeric, no spaces)
    resto: dictionary of info about 1 restaurant
    allrestaurantdata: dictionary of info about all restaurants, keyed by
    name code
  @purpose
    If a restaurant has one location,
    then it will be given only one photo.
    If a restaurant has multiple photos AND multiple locations
     entered into the spreadsheet, this will associate a new photo
     with each new location. If there aren't as many photos as there
     are locations, then extra locations will be given the first (default) photo.
  */
  var id = resto.id;


  if (id != undefined && allrestaurantdata[name].photos != undefined){
    if (parseInt(id) <= allrestaurantdata[name].photos.length){
      resto.photos = [allrestaurantdata[name].photos[id-1]];
    }
    else{
      resto.photos = [allrestaurantdata[name].photos[0]];
    }
}
}

function checkIfFileLoaded(fileName) {
    $.get(fileName, function(data, textStatus) {
        if (textStatus == "success") {
            // execute a success code
            console.log("file loaded!");
        }
    });
}

function formatPhoneNumber(phoneNumberString) {
  /*
  Clean up phone numbers so they're all in this format:
  215-644-9074
  */
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return match[1] + '-' + match[2] + '-' + match[3]
  }
  return null
}

function getMapsLink(address) {
  /*
  Return a link to google maps directions
  */

  //replace spaces with + signs
  var addressurl = address.replace(/[\s]/gi, "+")

  //question - how to test this?
  return "https://www.google.com/maps/dir/" + addressurl
}

function formatAddress(address, city){
  /*
  @params:
  address = full address string (i.e. "801 Market St, Philadelphia, PA"). Can include city name
  city = city name that all addresses share

  Purpose: Give Philly addresses uniform format w/o 'Philadelphia PA'
  so all would be in same format as '801 Market St.'
  */
  address = address.toLowerCase()
  city = city.toLowerCase()
  var pos = address.search(city);
  //taking off end of string (which contains 'Philadelphia, PA')
  var newaddress = address.substring(0, pos)
  //removing commas???
  var newaddress = newaddress.replace(/(^\s*,)|(,\s*$)/g, "").trim();
  return newaddress;
}



///////////// COMBINING DATA FROM ALL GOOTENBERG DOCS
var gallerydata = require("../app/data/photo_sheet.json");
var archiedata = require("../app/data/story.json");
var rdata = require("../app/data/data.json");

var allrestaurantdata = {};

/*take each restaurant in copy doc and create one new entry for each in the
overall data dictionary for that restaurant. this entry
includes all of its copy, and its name. */
console.log("\n\nprocessing copy");
Object.keys(archiedata).forEach(neighborhood => {

  if (neighborhood == 'intro'){
    allrestaurantdata['intro'] == archiedata['intro']['text']
  }
  else{
    rlist = archiedata[neighborhood].restaurants;
    rlist.forEach(r => {
      //squish name into lowercase, only alphanumeric, and without spaces
      name = r.Name.replace(/[^a-z0-9]/gi,'').toLowerCase();
      //console.log(name);
      r.photos = [];
      allrestaurantdata[name] = r;

    })
  }

})

//third: photos
console.log("\n\nprocessing photos");
gallerydata.Sheet1.forEach(photo => {

  //photo is dict of data about the photo; each row has one dict

  if (photo['url'] != undefined && photo['name'] != undefined){ //catch error if no actual photo link in this row (no photo data)

    //is there a way to check if something is really a link in javascript?
    name = photo['name'].replace(/[^a-z0-9]/gi,'').toLowerCase();

    //if this resto is in the big data obj, combine the restaurant data & photo data
    if(allrestaurantdata[name]) {
      // add photo list if it doesn't exist
      if (allrestaurantdata[name].photos == undefined){
          allrestaurantdata[name].photos = {};
      }

      Object.keys(photo).forEach( key => {
        if (photo[key] == undefined || photo[key] == "" && key != 'id'){
          console.log("photo dictionary for " + name + " is missing " + key);
        }
      })

      allrestaurantdata[name].photos.push(photo);
    }
    else{
      console.log("Photo with name", photo['name'], "does not match anything in copy")
    }
  }
//else branch for if photo is missing name or url?
})


console.log("\n\nprocessing masterlist");
var neighborlist = []
// master spreadsheet of all restaurants
rdata.Sheet1.forEach(resto => {    //resto is dict of data about the restaurant

  if (resto.Name){ //catch error if no data in this row

    name = resto.Name.replace(/[^a-z0-9]/gi,'').toLowerCase();
    formatData(name, resto) //formats name, phone number, and address

    if (allrestaurantdata[name]){

      /*Add each detail about a restaurant from the photos and copy docs
      into the individual resto dictionary entry*/

      Object.keys(allrestaurantdata[name]).forEach(key => {
        //add address/phone etc to dictionary if it's not there yet
        val = allrestaurantdata[name][key]
        if (!resto[key] && val != undefined && val.length != 0){
          resto[key] = val;
        }
      })
    }

    else {
      console.log("Warning: No copy found for restaurant name", resto.Name);
      resto.photos = []
      allrestaurantdata[name] = resto;
    }

    assignPhotos(name, resto, allrestaurantdata); //match photos to restaurant

    /*Final step: make sure each restaurant has a neighborhood,
    then insert each restaurant into one giant list. This is what
    goes into the HTML.
    */
    neighborhood_names_lst = []

    if (resto.Neighborhood){

      n = resto.Neighborhood;
      n = n.trim().toLowerCase();
      namecode = n.replace(/[^a-z0-9]/gi,'')
      //if this neighborhood hasn't ever appeared in our data before
      if (! (namecode in n_order_obj)){ //set default order and put into
        //neighborhood order dictionary
        n_order_obj[namecode] = {
          "name" : n,
          "order": 1000
        }
      }
      neighborhood_names_lst.push(n)


      neighborlist.push(resto);
      }

      else{
        err = "neighborhood is missing for this restaurant: " + key;
      throw err;
    }
  }

})

var jsonData = JSON.stringify(neighborlist);
var fs = require('fs');
fs.writeFile("neighborlist.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});

var jsonData = JSON.stringify(n_order_obj);
var fs = require('fs');
fs.writeFile("neighborhood_order.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});

var jsonData = JSON.stringify(allrestaurantdata);
var fs = require('fs');
fs.writeFile("allrestaurantdata.json", jsonData, function(err) {
    if (err) {
        console.log(err);
    }
});


//////////////

module.exports = function(gulp, browserSync) {
    return function nunjucksRenderTask(cb){
        gulp.src('app/**/*.html')
      .pipe(data(function() {

        // var rdata = require('../archie.json');

        return {
          // data:rdata,

          all_data: allrestaurantdata,
          neighborlist: neighborlist
        }
      }))
      .on('error', function(err) {
    console.log(err)
    })
      .pipe(nunjucksRender({
        searchPaths: ['app/templates']
      }))
      .on('error', function(err) {
        console.log(err)
    })
      .pipe(gulp.dest('.tmp'))
      .pipe(browserSync.reload({
        stream: true
      }))
      cb();
  }
};
