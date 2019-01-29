//NEED DATA TO BE DISPLAYED BETTER

//create Map with location


var eLat
var eLng


function initMap() {
  // Get all map canvas with ".maps" and store them to a variable.
  var maps = document.getElementsByClassName("maps");

  var ids, gps, mapId = '';

  // Loop: Explore all elements with ".maps" and create a new Google Map object for them
  for (var i = 0; i < maps.length; i++) {

    // Get ID of single div
    mapId = document.getElementById(maps[i].id);
    console.log(mapId)

    // Get LatLng stored in data attribute. 
    // !!! Make sure there is no space in data-attribute !!!
    // !!! and the values are separated with comma !!!
    gps = mapId.getAttribute('data-gps');
    console.log(gps)

    // Convert LatLng to an array
    gps = gps.split(",");

    // Create new Google Map object for single canvas 
    map = new google.maps.Map(mapId, {
      zoom: 15,
      // Use our LatLng array bellow
      center: new google.maps.LatLng(parseFloat(gps[0]), parseFloat(gps[1])),
      mapTypeId: 'roadmap',
      mapTypeControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP
      }
    });

    // Create new Google Marker object for new map
    var marker = new google.maps.Marker({
      // Use our LatLng array bellow
      position: new google.maps.LatLng(parseFloat(gps[0]), parseFloat(gps[1])),
      map: map
    });
  }
}


// firebase Info
var city
var startDate
var endDate
var database = firebase.database();
var name = (localStorage.getItem("groupName"));
console.log(name)
var groupRef = (database.ref('group/' + name));
//NEED TO CHANGE WHEN POPULATE TABLE IS CALLED
groupRef.once("value", function (snapshot) {
  city = (snapshot.val().city);
  startDate = (snapshot.val().sDate) + "T00%3A00%3A00Z";
  endDate = (snapshot.val().eDate) + "T00%3A00%3A00Z";
  console.log(city);
  console.log(startDate);
  console.log(endDate);
  populateTable();
});


//Put in response.Lat.long variable and line them uo  
function populateTable() {


  var QueryURL = 'https://www.eventbriteapi.com/v3/events/search/?q=&location.address=' + city + '&start_date.range_start=' + startDate + '&start_date.range_end=' + endDate + '&token=3RS5KP3QRP5LW3OTLAWF'

  console.log(QueryURL)

  $.ajax({
    url: QueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // Create a new table row element
    for (i = 0; i < 10; i++) {

      var tRow = $("<tr Id= '" + response.events[i].id + "'>");

      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var Tab1 = $("<td>").text(response.events[i].name.text);
      var Tab2 = $("<td>").text(response.events[i].description.text);
      var Tab3 = $("<td>").text(response.events[i].start.local);
      var popular = $("<button class='popular' eventId=" + response.events[i].id + "'>").text("Interested?")
     

      var mapButton = $("<button class='mapButton' venue=" + response.events[i].venue_id + ">").text("Map");
      var calendarButton = $("<button class='calendarButton' eventId=" + response.events[i].id + "' >").text("Add to Calendar");
      // Append the newly created table data to the table row
      tRow.append(Tab3, Tab1, popular);


      // tRow.append(mapDiv);
      // Append the table row to the table body
      // initMap();
      $("tbody").append(tRow);
      $("tbody").append(mapButton);
      $("tbody").append(calendarButton);
    }

  });
};
//Displaying the map
//NEED TO ONLY APPEND MAP TO CORRECT BUTTONS
$(document).on('click', '.mapButton', function () {
  var mapButtonDiv = this;
  var venueid = $(this).attr("venue");
  console.log(mapButtonDiv)
  var QueryURL = 'https://www.eventbriteapi.com/v3/venues/' + venueid + '/?token=TPQYCAU53IO2TT2FQOOY';
  var mapDiv = $("<div id='maps" + venueid + "'class='maps'>")
  $.ajax({
    url: QueryURL,
    method: "GET"
  }).then(function (response) {
    eLat = parseFloat(response.latitude);
    eLng = parseFloat(response.longitude);
    mapDiv.attr("data-gps", eLat + ',' + eLng)
    $(mapButtonDiv).replaceWith(mapDiv);
    initMap()
  });

});

//Adding the Calendar
// document.getElementsByClassName('calendarButton')[0].appendChild(createCalendar({data:{title:"this is the title of my event", start: new Date(), duration: 90}}));



//When popularity is clicked
$(document).on('click', '.popular', function () {

  var eventId = $(this).attr("eventId")
  console.log(eventId)
  var popularity;
  database.ref('group/' + name + '/' + eventId + '/').set({
    counter:0
  })
  // eventRef.on('value', function (snapshot) {
  //   console.log(snapshot.val())
  //   popularity++
  // })
  // eventRef.set({
  //   counter: popularity

  // })
})


// var eventIdUrl= 'https://www.eventbriteapi.com/v3/events/'+ eventId + '/'



//When event's popularity is clicked- add eventID and increment
//popularity in firebase