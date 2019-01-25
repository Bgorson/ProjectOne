
console.log("test")

//Google Map interactions

//Get Lat/Long from AJAX Call

//create Map with location

var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 41.8965, lng: -87.6188},
          zoom: 15
        });
      }
