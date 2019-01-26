function populateTable() {
var location ='denver'
var startDate= '2019-02-20T00%3A00%3A00Z'
var endDate = '2019-02-21T00%3A00%3A00Z'
var QueryURL= 'https://www.eventbriteapi.com/v3/events/search/?q=coding&location.address='+location+'&start_date.range_start='+startDate+'&start_date.range_end='+endDate+'&token=3RS5KP3QRP5LW3OTLAWF'

console.log(QueryURL)
$.ajax({
    url: QueryURL,
    method: "GET"
  }).then(function(response) {
      console.log(response)
    // Create a new table row element
    for (i=0;i<response.events.length;i++){
        
    var tRow = $("<tr>");

    // Methods run on jQuery selectors return the selector they we run on
    // This is why we can create and save a reference to a td in the same statement we update its text
    var Tab1 = $("<td>").text(response.events[i].name.text);
    var Tab2 = $("<td>").text(response.events[i].description.text);
    var Tab3 = $("<td>").text(response.events[i].start.local);
    var Tab4 = $("<td>").text(response.events[i].id);
      
    // Append the newly created table data to the table row
    tRow.append(Tab1,Tab2,Tab3,Tab4);
    // Append the table row to the table body
    $("tbody").append(tRow);
    }
  });
}

populateTable();