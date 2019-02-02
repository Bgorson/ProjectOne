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

function setGroupInfo(groupName, eventCity, eventState, startDate, endDate) {

  database.ref('group/' + groupName).set({
    name: groupName,
    city: eventCity,
    state: eventState,
    sDate: startDate,
    eDate: endDate,
    events: {}
  });
}
// groupRef.once("value",function(snapshot){
//   console.log(snapshot.val())
//  })



//Local Storage
var eventInfo = [];
$('#submit').on("click", function (event) {
  event.preventDefault();

  var name = document.getElementById("name").value.toLowerCase();
  console.log(name)
  //sDate field
  var sDate = document.getElementById("start").value;
  var sMonth = sDate.slice(0, 2)
  var sDay = sDate.slice(3, 5)
  var sYear = sDate.slice(6, 10)
  sDate = sYear + "-" + sMonth + "-" + sDay
  //eDate field 
  var eDate = document.getElementById("end").value;
  eMonth = eDate.slice(0, 2)
  eDay = eDate.slice(3, 5)
  eYear = eDate.slice(6, 10)
  eDate = eYear + "-" + eMonth + "-" + eDay
  //location field
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  if (name == '' || sDate == '' || eDate == '' || city == '' || state == '') {
    $("#error").text("Please complete all fields")
    return false;
  }
  database.ref('group/' + name).on("value", function (snapshot) {
    if (snapshot.exists()) {
      console.log("repeat!")
      $("#error").text("")
      $("#error").text("Duplicate Name!")
      return false;
    } else {
      console.log("unique");
      window.location.href = "./mainhub.html"
      setGroupInfo(name, city, state, sDate, eDate)
      //putting group name in local storage
      localStorage.setItem("groupName", name);
      console.log(window.location.href);
    }
  });

  //submit button

})