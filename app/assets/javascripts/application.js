// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require jasny-bootstrap
//= require_tree .

$(document).ready(function() {



var service = new google.maps.places.AutocompleteService();
var geocoder = new google.maps.Geocoder();

//Typeahead for citites
$(".typehead-cities").typeahead({
  
  source: function(query, process) {
    var e = $('.typehead-cities');
    service.getPlacePredictions({ input: query, types: ['(cities)'], componentRestrictions: {country: e.data('refCountry')} }, function(predictions, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        process($.map(predictions, function(prediction) {
          return prediction.description;
        }));
      }
    });
  },
  //matcher:function(){return true;},
  updater: function (item) {
    geocoder.geocode({ address: item }, function(results, status) {
      if (status != google.maps.GeocoderStatus.OK) {
        alert('Cannot find address');
        return;
      }
      //alert('Selected');
      //map.setCenter(results[0].geometry.location);
      //map.setZoom(12); 
    });
    return item;
  }
});

//Clear text field onfocus
$(".clear-onfocus").focus(function(){
    //$(this).val('');
});



});
