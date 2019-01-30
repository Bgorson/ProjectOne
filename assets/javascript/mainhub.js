//NEED DATA TO BE DISPLAYED BETTER

//create Map with location


var eLat
var eLng
var filter='';

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
      zoom: 14,
      // Use our LatLng array bellow
      center: new google.maps.LatLng(parseFloat(gps[0]), parseFloat(gps[1])),
      mapTypeId: 'roadmap',
      mapTypeControl: false,
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
  populateTable('');
});


//Put in response.Lat.long variable and line them uo  
function populateTable(queryFilter) {


  var QueryURL = 'https://www.eventbriteapi.com/v3/events/search/?q='+queryFilter+'&location.address=' + city + '&start_date.range_start=' + startDate + '&start_date.range_end=' + endDate + '&token=3RS5KP3QRP5LW3OTLAWF'

  console.log(QueryURL)

  $.ajax({
    url: QueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // Create a new table row element
    for (i = 0; i < response.events.length; i++) {

      var tRow = $("<tr Id= '" + response.events[i].id + "'>");

      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var Tab1 = $("<td>").text(response.events[i].name.text);
      var Tab2 = $("<td>").text(response.events[i].description.text);
      var Tab3 = $("<td>").text(response.events[i].start.local);
      var popular = $("<button class='popular' eventId='" + response.events[i].id + "'>").text("Interested?")
      var calendarButton = $("<button class='calendarButton' eventId='" + response.events[i].id + "'venue=" + response.events[i].venue_id + ">").text("Add to Calendar");
      var mapButton = $("<button class='mapButton' venue=" + response.events[i].venue_id + ">").text("Map");
      var popNumber=$("<td id='vote"+ response.events[i].id+ "'eventId='" + response.events[i].id + "'></td>")
      database.ref('group/' + name + '/' + response.events[i].id + '/').set({
        startDate: response.events[i].start.local,
        title: response.events[i].name.text,
        description: response.events[i].description.text,
        endDate: response.events[i].end.local
      });



      // Append the newly created table data to the table row
      tRow.append(mapButton, calendarButton, Tab3, Tab1, popular,popNumber);

      $("tbody").append(tRow);

    
      database.ref('group/' + name + '/voting/'+ response.events[i].id).on("value", function (snapshot) {
        console.log("Key"+ snapshot.key)
        console.log("count"+snapshot.val().counter)
      
        var vote = document.getElementById("vote"+snapshot.key)
        $(vote).text(snapshot.val().counter)
      
      })
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



$(document).on('click', '.calendarButton', function () {
  var calendarButtonDiv = this;
  var venueid = $(this).attr("venue");
  var eventId = $(this).attr("eventid");
  var QueryURL = 'https://www.eventbriteapi.com/v3/venues/' + venueid + '/?token=TPQYCAU53IO2TT2FQOOY';
  var calendarDiv = $("<div id='calendar" + venueid + "'class='calendar'>")

  database.ref('group/' + name + '/' + eventId + '/').once("value", function (snapshot) {
    console.log(snapshot.val());
    eventTitle = snapshot.val().title;
    eventDescription = snapshot.val().description;
  });


  $.ajax({
    url: QueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    var eventTitle
    var eventDescription
    var eventDate
    var eventTime
    var eventLocation
    var eventEnd

    database.ref('group/' + name + '/' + eventId + '/').once("value", function (snapshot) {
      console.log(snapshot.val());
      eventTitle = snapshot.val().title;
      eventDescription = snapshot.val().description;
      eventDate = snapshot.val().startDate;
      eventLocation = response.address.localized_address_display
      eventEnd = snapshot.val().endDate;
      console.log(eventTitle);
      console.log(response);
      console.log(eventLocation);
      var myCalendar = createCalendar({
        options: {
          class: 'my-class',

          // You can pass an ID. If you don't, one will be generated for you
          id: 'calendar' + venueid
        },
        data: {
          // Event title
          title: eventTitle,

          // Event start date
          start: new Date(eventDate),

          // You can also choose to set an end time
          // If an end time is set, this will take precedence over duration
          end: new Date(eventEnd),

          // Event Address
          address: eventLocation,

          // Event Description
          description: eventDescription
        }
      });
      $(calendarButtonDiv).replaceWith(calendarDiv);
      document.querySelector('#calendar' + venueid).appendChild(myCalendar);
    });



  });

});


var popularity;

//When popularity is clicked
$(document).on('click', '.popular', function () {
  var button=$(this)
  var eventId = $(this).attr("eventId")
  console.log(eventId)

  database.ref('group/' + name + '/voting/' + eventId + '/').once("value", function (snapshot) {

    //Checks if button has ever been clicked
    if (snapshot.child("counter").exists()) {
      button.html("")
      popularity = snapshot.val().counter;
      console.log(popularity)
      popularity++
      database.ref('group/' + name + '/voting/' + eventId + '/').set({
        counter: popularity
      });
      
  
    } else {
      button.html("")
      popularity = 1;
      database.ref('group/' + name + '/voting/' + eventId + '/').set({
        counter: popularity
      })
      
   
    }

  });

})
//sorting by most popular items
function sortTable() {
 
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    console.log(rows)
    
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[2];
      y = rows[i + 1].getElementsByTagName("TD")[2];
      //check if the two rows should switch place:
      if (Number(x.innerHTML) < Number(y.innerHTML)) {
        //if so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
      
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}
//Filter Button
$('#submit').on("click", function(event){
  $("tbody").empty()
  event.preventDefault();
  filter= document.getElementById("filter").value;
  console.log(filter)
  populateTable(filter)
})