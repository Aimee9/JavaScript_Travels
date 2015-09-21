

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
  });


  $("ul#places").append("<li><span class='place'>" + newPlace.place + "</span></li>");

  $(".place").last().click(function() {
    $("#show-places").show();

    $("#show-places h2").text(newPlace.place);

    $("ul#attractions").text("");
    newPlace.attractions.forEach(function(attraction) {
      $("ul#attractions").append("<li>" + attraction.landmark + ", " + attraction.date + ", " + attraction.notes + "</li>");
    });
  });

  $("input#new-country-city").val("");
  $("input.new-landmark").val("");
  $("input.new-date").val("");
  $("input.new-notes").val("");
}); // end of new-contact submit

}); // end of document
