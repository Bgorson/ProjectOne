
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAHx0C7Hk2TJHRI5iL9RMY6YuExixeUCTM",
  authDomain: "project1-1a4da.firebaseapp.com",
  databaseURL: "https://project1-1a4da.firebaseio.com",
  projectId: "project1-1a4da",
  storageBucket: "project1-1a4da.appspot.com",
  messagingSenderId: "803507948503"
};

firebase.initializeApp(config);


var database = firebase.database();
var groupRef = database.ref("group/")


//Retrieves favorite items if available
var eventInfo = localStorage.getItem("joinGroup");
eventInfo = JSON.parse(eventInfo);

//Retrieves favorite items if available
var eventInfo = localStorage.getItem("groupName");

if (eventInfo == undefined) {
  eventInfo = [];
}


// $(document).on("click", ".joinGroup",function(){

//     var info = {
//     eventId: $(this).attr("eventId"),
//   }
//   eventInfo.push(info);
//   localStorage.setItem("groupName",JSON.stringify(eventInfo));
//   })

$("#join").on("click", function() {
  var storedEvents = localStorage.getItem("groupName");
  console.log(storedEvents);

  var div = $("<div class= 'btnText'>" + storedEvents + "<div>");
  $(".buttons").append(div);
});
