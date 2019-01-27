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

//========Firebase Info & Local Storage===========================================================
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

//=====User input Group name to pull from Firebase and load in div===============================

$("#join").on("click", function() { // pulls from group object from firebase
 var formInput = $(".form-control").val();
 groupRef.on('value',function(snapshot){
   //console.log(snapshot.val());
   var databaseGroup = snapshot.val();
   if (databaseGroup[formInput]) { // checks if input is in firebase
     var groupSelected = databaseGroup[formInput] // <-- This contains all object information about Group. Can pass to mainhub
     $(".display-groups").text(groupSelected.name)

     $('.display-groups').click(function(){
      window.location.href='mainhub.html';
   })
     console.log(groupSelected);
    //console.log("here")
     
   } else {
     console.log("not here")
   }
 })
  var searchLocalStorageName = localStorage.getItem("groupName");
  console.log(searchLocalStorageName);

});