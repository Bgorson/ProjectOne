//Begin Javascript
console.log('test')

//Onclick event to redirect to Create Page
document.getElementById("create").onclick = function() {
    location.href = "./create.html";
};

//Onclick event to redirect to Join Page
document.getElementById("join").onclick = function() {

    location.href = "./join.html";
}


// we have the id the group
// make a call to firebase with id 
// we get the group object back