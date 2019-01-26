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

var eventInfo = localStorage.getItem("joinGroup");
eventInfo = JSON.parse(eventInfo);
if (eventInfo == undefined) {
  eventInfo = [];
}
$(document).on("click", ".joinGroup", function() {
  var info = {
    eventId: $(this).attr("eventId")
  };
  localStorage.setItem("joinGroup", JSON.stringify(eventInfo));
});

$(".getLocal").on("click", function() {
  var storedEvents = localStorage.getItem("joinGroup");
  console.log(storedEvents);
  storedEvents = JSON.parse(storedEvents);
  console.log(storedEvents[0].eventId);
  for (i = 0; i < storedEvents.length; i++) {
    var div = $("<div class= 'btnText'>" + storedEvents[i].eventId + "<div>");
    $(".buttons").append(div);
  }
});

$("#join").on("click", function() {
  var searchLocalStorageName = localStorage.getItem("groupName");
  console.log(searchLocalStorageName);

});