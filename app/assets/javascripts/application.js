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
//= require jquery-ui
//= require bootstrap
//= require jasny-bootstrap
//= require bootstrap-datepicker
//= require_tree .

var service = new google.maps.places.AutocompleteService();
var geocoder = new google.maps.Geocoder();

//Clear input text end relative hidden fields
function clearCityValue(cityInput){
  cityInput.val('');
  var container = cityInput.closest(".controls");
  $(".latitude", container).val('');
  $(".longitude", container).val('');
  hideMap(cityInput);
}

//Show map when selected a city
function showMapForCity(cityInput, lat, lon){
  var point = new google.maps.LatLng(lat, lon);
  
  // Create map and add controls
  var mapOptions = {
    center: point,
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false,
    scaleControl: false
  };
  //Add map to container
  var mapContainer = $(".map",cityInput.closest(".tab-pane"));
  var map = new google.maps.Map(mapContainer[0],mapOptions);
	//Add a draggable marker
  marker = new google.maps.Marker({
    map: map,
    draggable: true,
    animation: google.maps.Animation.DROP,
    position: point
  });
  var defaultImage = new google.maps.MarkerImage(
      "http://maps.gstatic.com/mapfiles/place_api/icons/geocode-71.png",
      new google.maps.Size(71, 71),
      new google.maps.Point(0, 0),
      new google.maps.Point(17, 34),
      new google.maps.Size(35, 35));
  marker.setIcon(defaultImage);
  
  
  mapContainer.show("fade");
}

function hideMap(cityInput){
  var mapContainer = $(".map",cityInput.closest(".tab-pane"));
  mapContainer.hide( "fade");
}

function setupPageEvents(){
    
  //Typeahead for citites
  $(".typehead-cities").each(function(){
    var element = $(this);
    
    $(this).typeahead({
      source: function(query, process) {
        var e = $('.typehead-cities');
        service.getPlacePredictions({ input: query, types: ['(regions)'], language: "it", componentRestrictions: {country: e.data('refCountry')} }, function(predictions, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            process($.map(predictions, function(prediction) {
              if($.inArray(prediction.types[0],["locality","administrative_area_level_1","administrative_area_level_2","administrative_area_level_3"]) >= 0){
                return prediction.description;
              }
              return "";
            }));
          }
        });
      },
      matcher:function(item){
        return (item);
      },
      updater: function (item) {
        geocoder.geocode({ address: item }, function(results, status) {
          if (status != google.maps.GeocoderStatus.OK) {
            alert('Cannot find address');
            return;
          } else {
            //Set latitude end longitude in hidden fields
            var container = element.closest(".controls");
            var lat = results[0].geometry.location.lat();
            var lon = results[0].geometry.location.lng();
            //Set hidden field
            $(".latitude", container).val(lat);
            $(".longitude", container).val(lon);
            //Show map
            showMapForCity(element, lat, lon);
          }
          //alert('Selected');
          //map.setCenter(results[0].geometry.location);
          //map.setZoom(12); 
        });
        return item;
      }
    });
  });

  //Clear text field onfocus
  $(".clear-onfocus").click(function(){
      $(this).val('');
      //If typehead cities clear hidden fields also
      if($(this).hasClass("typehead-cities")){
        clearCityValue($(this));
      }
  });

  //When country selection change:
  //  -reset city refCountry value
  //  -Enable/Disable city field
  //  -Clear city field
  $(".country-for-city").change(function(){
    var f = $(this).closest("form");
    var cityInput = $(".typehead-cities", f);
    if($(this).val()){
      cityInput.data('refCountry', $(this).val())
      cityInput.removeAttr('disabled');
    }else{
      cityInput.data('refCountry', '')
      cityInput.attr('disabled', 'disabled');
    }
    clearCityValue(cityInput);
  });

  //Date picker
  //Setup
  $(".date-picker").datepicker({
    autoclose: true
  }).on('changeDate', function(e){
    $('#'+$(this).data('altFieldName')).val(e.format('yyyy-mm-dd'));
  });
  
  //Select for transferBy
  $(".transfer-by").change(function(){
    var val = $(this).val();
    var container = $(this).parent(".controls");
    $("input", container).addClass("hidden");
    $("." + val, container).removeClass("hidden");
  });
  
  //Hide alert with fadeout after 2 seconds
  $(".remove-delayed").delay(2000).fadeOut("slow");
  
  
}

$(document).ready(function() {
  setupPageEvents();
});




