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
$('#submit').on("click", function(event){
    event.preventDefault();
    
  var name = document.getElementById("name").value;
  //sDate field
  var sDate = document.getElementById("start").value;
  //eDate field 
  var eDate = document.getElementById("end").value;
  //location field
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  if(name == ''||sDate== ''|| eDate==''|| city==''||state==''){
    $("#error").text("Please complete out all fields")
      return false;
  }
  //submit button
  window.location.href="./mainhub.html"
   setGroupInfo(name, city,state, sDate,eDate)
    //putting group name in local storage
    localStorage.setItem("groupName",name);
  
})




