//NEED DATA TO BE DISPLAYED BETTER

//create Map with location
var eLat
var eLng
function initMap() {
  // The location of 
  var location = {lat: eLat, lng: eLng };
  // The map, centered
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: location});
  // The marker, positioned at
  var marker = new google.maps.Marker({position: location, map: map});
};


// firebase Info
var city
var startDate
var endDate
var database = firebase.database();
var name = (localStorage.getItem("groupName"));
console.log(name)
var groupRef = (database.ref('group/'+ name));
//NEED TO CHANGE WHEN POPULATE TABLE IS CALLED
groupRef.on("value", function(snapshot){
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
  // var location ='denver'

  
  // console.log(city);
 
  var QueryURL= 'https://www.eventbriteapi.com/v3/events/search/?q=coding&location.address='+city+'&start_date.range_start='+startDate+'&start_date.range_end='+endDate+'&token=3RS5KP3QRP5LW3OTLAWF'
  
  console.log(QueryURL)

  $.ajax({
      url: QueryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
      // Create a new table row element
      for (i=0;i<2;i++){
          
      var tRow = $("<tr Id= '"+ response.events[i].id + "'>");
  
      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var Tab1 = $("<td>").text(response.events[i].name.text);
      var Tab2 = $("<td>").text(response.events[i].description.text);
      var Tab3 = $("<td>").text(response.events[i].start.local);
      var popular= $("<button class = pop eventId=" + response.events[i].id+"' >").text("Interested?")
   
      
      var mapButton = $("<button class='mapButton' venue=" + response.events[i].venue_id + ">").text("Map");
      // Append the newly created table data to the table row
      tRow.append(Tab3,Tab1,popular);
      
     
      // tRow.append(mapDiv);
      // Append the table row to the table body
      // initMap();
      $("tbody").append(tRow);
      $("tbody").append(mapButton);
      
      
      }

    });
  };
  //Displaying the map
  //NEED TO ONLY APPEND MAP TO CORRECT BUTTONS
  $(document).on('click','.mapButton', function(){
    var mapButtonDiv= this;
    var venueid = $(this).attr("venue");
    var QueryURL= 'https://www.eventbriteapi.com/v3/venues/' + venueid + '/?token=TPQYCAU53IO2TT2FQOOY';
    $.ajax({
      url: QueryURL,
      method: "GET"
    }).then(function(response) {
      var mapDiv = $("<div id='map'>");
      $(mapButtonDiv).replaceWith(mapDiv);
        console.log(mapButtonDiv)
    eLat = parseFloat(response.latitude);
    eLng = parseFloat(response.longitude);
    console.log(eLat);
    console.log(eLng);
    initMap();
  });
});
  
  




$(document).on("click",".pop", function (){
  var eventId= $(this).attr("eventId")
  console.log(eventId)
  var popularity=0

  var eventRef = (database.ref('group/'+ name + '/'+ eventId+'/'));
  eventRef.on('value',function(snapshot){
    console.log(snapshot.val())
    popularity++
  })
  eventRef.set({
    counter: popularity

  })
  
})


// var eventIdUrl= 'https://www.eventbriteapi.com/v3/events/'+ eventId + '/'



  //When event's popularity is clicked- add eventID and increment
  //popularity in firebase