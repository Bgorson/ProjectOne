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

var contactRef = database.ref("contact/")

function collectContact(groupName, yourName, yourEmail, yourNumber, yourComments) {
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

  $("#success").text("Thanks! We've received your note and will be in touch shortly!");

  var gName = document.getElementById("group-name").value;
  var yName = document.getElementById("your-name").value;
  var yEmail = document.getElementById("your-email").value;
  var yNumber = document.getElementById("your-number").value;
  var yComments = document.getElementById("comments").value;

  collectContact(gName, yName, yEmail, yNumber, yComments)

  $("#group-name").val("");
  $("#your-name").val("");
  $("#your-email").val("");
  $("#your-number").val("");
  $("#comments").val("");




})