console.log("test")
//Retrieves favorite items if available
var eventInfo = (localStorage.getItem("groupName"));
eventInfo=(JSON.parse(eventInfo))
if (eventInfo == undefined){
  eventInfo = [];
}

$(document).on("click", ".joinGroup",function(){
  
    var info = {
    eventId: $(this).attr("eventId"),
  }
  eventInfo.push(info);
  localStorage.setItem("groupName",JSON.stringify(eventInfo));
  })


$(".getLocal").on("click",function(){
    var storedEvents = (localStorage.getItem("groupName"));
    console.log(storedEvents)
    storedEvents=(JSON.parse(storedEvents))
    console.log(storedEvents[0].groupName)
    for (i=0;i<storedEvents.length;i++){
      var div= $("<div class= 'btnText'>"+storedEvents[i].groupName+  "<div>");
        $(".buttons").append(div)
    }
  
  })