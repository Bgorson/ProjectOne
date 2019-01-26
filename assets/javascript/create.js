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

function setGroupInfo(groupName, eventCity,eventState, startDate, endDate) {
  database.ref('group/' + groupName).set({
    name: groupName,
    city: eventCity,
    state: eventState,
    sDate: startDate,
    eDate: endDate,
    events: {}
  });
}

//Local Storage
var eventInfo = [];

//name field
var name = document.getElementById("name").value;
//sDate field
var sDate = document.getElementById("start").value;
//eDate field
var eDate = document.getElementById("end").value;
//location field
var city = document.getElementById("city").value;
var state = document.getElementById("state").value;
//submit button

$("#create").on("click", function () {
  console.log(name)
  setGroupInfo(name, city,state, sDate,eDate)
  

  var info = {
    groupName: name,
  }
  eventInfo.push(info);
  localStorage.setItem("groupName",JSON.stringify(eventInfo));
})


