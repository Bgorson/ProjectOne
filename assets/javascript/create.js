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

function setGroupInfo(groupName, location, startDate, endDate) {
  database.ref('group/' + groupName).set({
    name: groupName,
    loc: location,
    sDate: startDate,
    eDate: endDate,
    events: {}
  });
}

// setGroupInfo('Group','Chicago','Jan1','Jan2')
// setGroupInfo($("$name".val()), $("#location").val(),$("#sDate".val()),$("#eDate".val()))


//name field
var name = document.getElementById("name").value;
//sDate field
var sDate = document.getElementById("start").value;
//eDate field
var eDate = document.getElementById("end").value;
//location field
var loc = document.getElementById("location").value;

//submit button
$("#create").on("click", function () {
  setGroupInfo(name, loc, sDate,eDate)
})