function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.444359, lng: -122.159902},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Define the LatLng coordinates for the polygon's path.
  var data = [[ //we need data for each section here
    {lat: 37.468876, lng: -122.155271},
    {lat: 37.449333, lng: -122.173628},
    {lat: 37.428431, lng: -122.139875},
    {lat: 37.448189, lng: -122.120452},
    {lat: 37.468876, lng: -122.155271}
  ], [
    {lat: 25.774, lng: -80.190},
    {lat: 18.466, lng: -66.118},
    {lat: 32.321, lng: -64.757},
    {lat: 25.774, lng: -80.190}
  ]
  ];
  var origin = {lat: 37.444359, lng: -122.159902};
  var testdestination = {lat: 37.468876, lng: -122.155271};
  var destinations = [testdestination];

  console.log(destinations);

  var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
  matrix.getDistanceMatrix({
    origins: [origin],
    destinations: destinations,
    travelMode: google.maps.TravelMode.BICYCLING,
    unitSystem: google.maps.UnitSystem.METRIC,
  }, function(response, status) { //upon completion
      if (status == google.maps.DistanceMatrixStatus.OK) {
        var originsx = response.originAddresses;
        var destinationsx = response.destinationAddresses;
        for (var i = 0; i < originsx.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            duration = results[j].duration.value; //Goes to location and stores value of seconds into duration variable

            //starting the grid

            var color;
 
            if(duration < 300){
              color = "#FF0000";
            }
            else if(duration < 600){
              color = "#FF1A1A";
            }
            else if(duration < 900){
              color = "#FF3333";
            }
            else{
              color = "#FF4D4D";
            }

            var shape = new google.maps.Polygon({
              paths: data[i],
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: color,
              fillOpacity: 0.35
            });
            shape.setMap(map);
          }
        }
      }
    });

}

