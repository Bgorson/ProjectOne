//Google Map interactions

//Get Lat/Long from AJAX Call

//create Map with location
var eLat=41.8965
var eLng= -87.6188
function initMap() {
  // The location of 
  var location = {lat: eLat, lng: eLng };
  // The map, centered
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: location});
  // The marker, positioned at
  var marker = new google.maps.Marker({position: location, map: map});
}



// firebase Info

var database = firebase.database();
var name = (localStorage.getItem("groupName"));
console.log(name)

console.log(database.ref('group/'+ name))

//Put in response.Lat.long variable and line them uo  
function populateTable() {
  var location ='denver'
  var startDate= '2019-02-20T00%3A00%3A00Z'
  var endDate = '2019-02-21T00%3A00%3A00Z'
  var QueryURL= 'https://www.eventbriteapi.com/v3/events/search/?q=coding&location.address='+location+'&start_date.range_start='+startDate+'&start_date.range_end='+endDate+'&token=3RS5KP3QRP5LW3OTLAWF'
  
  console.log(QueryURL)
  $.ajax({
      url: QueryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response)
      // Create a new table row element
      for (i=0;i<response.events.length;i++){
          
      var tRow = $("<tr>");
  
      // Methods run on jQuery selectors return the selector they we run on
      // This is why we can create and save a reference to a td in the same statement we update its text
      var Tab1 = $("<td>").text(response.events[i].name.text);
      var Tab2 = $("<td>").text(response.events[i].description.text);
      var Tab3 = $("<td>").text(response.events[i].start.local);
      var Tab4 = $("<td>").text(response.events[i].id);
        
      // Append the newly created table data to the table row
      tRow.append(Tab1,Tab2,Tab3,Tab4);
      // Append the table row to the table body
      $("tbody").append(tRow);
      }
    });
  }
  
  populateTable();



// function setGroupInfo(groupName,location,startDate,endDate) {
// database.ref('group/').push({
// name: groupName,
// loc:location,
// sDate:startDate,
// eDate:endDate,
// events: {}
// });
// } 



// var eventIdUrl= 'https://www.eventbriteapi.com/v3/events/'+ eventId + '/'

// console.log(eventIdUrl)
// $.ajax({
//     url: eventIdUrl,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response)
//   })


//   //When event's popularity is clicked- add eventID and increment
//   //popularity in firebase