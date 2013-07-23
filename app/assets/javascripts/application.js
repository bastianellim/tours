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
            var container = element.parent(".controls");
            $(".latitude", container).val(results[0].geometry.location.lat());
            $(".longitude", container).val(results[0].geometry.location.lng());
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
    cityInput.val('');
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




