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

// Get a reference to the database service
var database = firebase.database();

//Save data to contact/ path in firebase
var contactRef = database.ref("contact/")

//Function that will write the data inputted by user in all fields of the contact us form to data. 
//.push was used so firebase will generate a unique key to help us differentiate between each contact us submission.
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

//Used to get value of the input text in each field after user clicks the submit button.
$("#submit").on("click", function () {
  event.preventDefault();

  //Sucess message that appears in the success div id when user clicks submit.
  $("#success").text("Thanks! We've received your note and we will be in touch shortly!");

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