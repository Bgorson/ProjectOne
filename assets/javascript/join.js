console.log("test")
//Retrieves favorite items if available
var eventInfo = (localStorage.getItem("joinGroup"));
eventInfo=(JSON.parse(eventInfo))
if (eventInfo == undefined){
  eventInfo = [];
}

$(document).on("click", ".joinGroup",function(){
  
    var info = {
    eventId: $(this).attr("eventId"),
  }
  eventInfo.push(info);
  localStorage.setItem("joinGroup",JSON.stringify(eventInfo));
  })


$(".getLocal").on("click",function(){
    var storedEvents = (localStorage.getItem("joinGroup"));
    console.log(storedEvents)
    storedEvents=(JSON.parse(storedEvents))
    console.log(storedEvents[0].eventId)
    for (i=0;i<storedEvents.length;i++){
      var div= $("<div>"+storedEvents[i].eventId+  "<div>");
        $("body").append(div)
    }
  
  })