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

//sDate field

//eDate field

//location field


//submit button

$("#create").on("click", function () {
  setGroupInfo(document.getElementById("name").value, document.getElementById("location").value, document.getElementById("start").value, document.getElementById("end").value)
})