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

///Need to update for Contact us form
var contactRef = database.ref("contact/")

///ATTTENTION NEED TO UPDATE HERE
function collectContact(groupName, yourName, yourEmail, yourNumber, yourComments) {

  ///Need to update for Contact us form
  database.ref('contact/').push({
    gName: groupName,
    yName: yourName,
    yEmail: yourEmail,
    yNumber: yourNumber,
    yComments: yourComments,
    events: {}
  });
}

//submit button
$("#submit").on("click", function () {
event.preventDefault();
console.log("hi");
  //name field
var gName = document.getElementById("group-name").value;
console.log(gName);
//sDate field
var yName = document.getElementById("your-name").value;
//eDate field
var yEmail = document.getElementById("your-email").value;
//location field
var yNumber = document.getElementById("your-number").value;
var yComments = document.getElementById("comments").value;
 collectContact(gName, yName, yEmail, yNumber, yComments)
}) 



