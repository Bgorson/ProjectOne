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
$(document).on("click", ".joinGroup", function () {
  var info = {
    eventId: $(this).attr("eventId")
  };
  localStorage.setItem("joinGroup", JSON.stringify(eventInfo));
});

$(".getLocal").on("click", function () {
  var storedEvents = localStorage.getItem("joinGroup");
  storedEvents = JSON.parse(storedEvents);
  for (i = 0; i < storedEvents.length; i++) {
    var div = $("<div class= 'btnText'>" + storedEvents[i].eventId + "<div>");
    $(".buttons").append(div);
  }
});


//=====User input Group name to pull from Firebase and load in div===============================

$("#join").on("click", function () { // pulls from group object from firebase
  var originalInput = $(".form-control").val();
  var formInput = $(".form-control").val().toLowerCase();
  groupRef.on('value', function (snapshot) {
    var databaseGroup = snapshot.val();
    if (databaseGroup[formInput]) { // checks if input is in firebase
      $("#groupDisplay").css("color", "black")
      var groupSelected = databaseGroup[formInput] // <-- This contains all object information about Group. Can pass to mainhub
      $(".display-groups").html("<button class ='btn btn-info btn-lg'>Click here to access the " + originalInput + " Group</button>");
      var groupName = groupSelected.name
      localStorage.setItem("groupName", groupName)
      $('.display-groups').click(function () {
        window.location.href = 'mainhub.html';
      })

    } else {
      $("#groupDisplay").css("color", "red")
      $("#groupDisplay").text("We can't find your group")
    }
  })


});
//for each for all groups, dynamically create a table of data

groupRef.once('value',function(snapshot){
  snapshot.forEach(function(groupInfo){
    var row = $("<tr class= 'groups' name= '"+groupInfo.val().name+"'></tr>")
    var name= $("<td><button class= btn btn-info>"+groupInfo.val().name+ "</button></td>")
    var date= $("<td>"+groupInfo.val().sDate+ "</td>")
    var city= $("<td>"+groupInfo.val().city+ "</td>")
    $(row).append(name,city,date)
    console.log("group info " + groupInfo.val().name)
    console.log(row)
    $(".tableData").append(row)
  })
})

$(document).on("click", ".groups",function(event){
  event.preventDefault();
  console.log('ready')
    console.log($(this).attr("name"))
    localStorage.setItem("groupName", $(this).attr("name"));
    window.location.href = 'mainhub.html';
})
