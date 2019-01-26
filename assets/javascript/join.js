console.log("test");
//Retrieves favorite items if available
var eventInfo = localStorage.getItem("groupName");
if (eventInfo == undefined) {
  eventInfo = [];
}

// $(document).on("click", ".joinGroup",function(){

//     var info = {
//     eventId: $(this).attr("eventId"),
//   }
//   eventInfo.push(info);
//   localStorage.setItem("groupName",JSON.stringify(eventInfo));
//   })

$(".getLocal").on("click", function() {
  var storedEvents = localStorage.getItem("groupName");
  console.log(storedEvents);

  var div = $("<div class= 'btnText'>" + storedEvents + "<div>");
  $(".buttons").append(div);
});
