//Google Map interactions

//Get Lat/Long from AJAX Call

//create Map with location

function initMap() {
  // The location of 
  var location = {lat: 41.8965, lng: -87.6188};
  // The map, centered
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 12, center: location});
  // The marker, positioned at
  var marker = new google.maps.Marker({position: location, map: map});
}



// firebase Info

var database = firebase.database();
var name
var storedEvents = (localStorage.getItem("joinGroup"));
console.log(storedEvents)
storedEvents=(JSON.parse(storedEvents))
name = storedEvents[0].eventId
console.log(name)
//Need to verify that I can connect to correct firebase
var groupRef= database.ref('group/another group')
groupRef.on('value',function(snapshot){
  console.log(snapshot)
})






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