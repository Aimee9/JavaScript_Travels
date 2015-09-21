var geocoder;
var map;
function initialize() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(45.542, -122.654);
  var mapOptions = {
    zoom: 3,
    center: latlng
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
}

function codeAddress() {
  var address = document.getElementById("new-country-city").value;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}



$(document).ready(function() {

  $("#add-attraction").click(function() {
    $("#new-attractions").append('<div class="new-attraction">' +
                                 '<div class="form-group">' +
                                   '<label for="new-landmark">Landmark</label>' +
                                   '<input type="text" class="form-control new-landmark">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-date">Date</label>' +
                                   '<input type="date" class="form-control new-date">' +
                                 '</div>' +
                                 '<div class="form-group">' +
                                   '<label for="new-notes">Notes</label>' +
                                   '<textarea class="form-control new-notes"></textarea>' +
                                 '</div>' +
                               '</div>');
  });



  $("form#new-places").submit(function(event) {
  event.preventDefault();

  var inputtedPlace = $("input#new-country-city").val();

  var newPlace = { place: inputtedPlace, attractions: [] };


  $(".new-attraction").each(function() {
    var inputtedLandmark = $(this).find("input.new-landmark").val();
    var inputtedDate = $(this).find("input.new-date").val();
    var inputtedNotes = $(this).find("textarea.new-notes").val();

    var newAttraction = { landmark: inputtedLandmark, date: inputtedDate, notes: inputtedNotes };
    newPlace.attractions.push(newAttraction);
  }); // end of new-attraction.each function

  $("ul#places").append("<li><span class='place'>" + newPlace.place + "</span></li>");

    $(".place").last().click(function() {
      $("#show-places").show();

      $("#show-places h2").text(newPlace.place);

      $("ul#attractions").text("");

      newPlace.attractions.forEach(function(attraction) {

        $("ul#attractions").append("<li> Landmark:  " + attraction.landmark + "<br>Date:  " + attraction.date + "<br>Note:  " + attraction.notes + "</li>");

      }); // end of newPlace.attractions.forEach

    $("input#new-country-city").val("");
    $("input.new-landmark").val("");
    $("input.new-date").val("");
    $("input.new-notes").val("");

    }); // end of places last() click

}); // end of new-places submit


}); // end of document
