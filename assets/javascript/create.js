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
  var sMonth= sDate.slice(0,2)
  var sDay=sDate.slice(3,5)
  var sYear=sDate.slice(6,10)
  sDate= sYear+"-"+sMonth+"-"+sDay
  //eDate field 
  var eDate = document.getElementById("end").value;
  eMonth= eDate.slice(0,2)
  eDay=eDate.slice(3,5)
  eYear=eDate.slice(6,10)
  eDate= eYear+"-"+eMonth+"-"+eDay
  //location field
  var city = document.getElementById("city").value;
  var state = document.getElementById("state").value;
  
  database.ref('group/'+name).once("value",function(snapshot){
    if (snapshot.exists()){
      console.log("original!")
      alert("STOP")
    }
    else {
      console.log("unique")
      alert("Good")
    }
    })
    
  if(name == ''||sDate== ''|| eDate==''|| city==''||state==''){
    $("#error").text("Please complete all fields")
      return false;
  }
 
  //submit button
  window.location.href="./mainhub.html"
   setGroupInfo(name, city,state, sDate,eDate)
    //putting group name in local storage
    localStorage.setItem("groupName",name);
  
})




