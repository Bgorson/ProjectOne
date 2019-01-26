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




// // function setGroupInfo(groupName,location,startDate,endDate) {
// // database.ref('group/').push({
// // name: groupName,
// // loc:location,
// // sDate:startDate,
// // eDate:endDate,
// // events: {}
// // });
// // } 



// // var eventIdUrl= 'https://www.eventbriteapi.com/v3/events/'+ eventId + '/'

// // console.log(eventIdUrl)
// // $.ajax({
// //     url: eventIdUrl,
// //     method: "GET"
// //   }).then(function(response) {
// //     console.log(response)
// //   })


//   //When event's popularity is clicked- add eventID and increment
//   //popularity in firebase