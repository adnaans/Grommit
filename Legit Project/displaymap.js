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
  var destinations[]=new [data.length];
    for (var i=0;i<data.length;i++){
      var mat[][]=data[i];
      var latsum=mat[0][0]+mat[0][1];
      latsum/=2;
      var lngsum=mat[1][1]+mat[1][2];
      lngsum/=2;
      destinations[i]={latsum, lngsum};
  }
  var data = [];
  var baseLat = 37.449333, baseLong = -122.173628;
  var endSElat = 37.428431, endSElong = -122.139875, endNElat = 37.468876, endNElong = -122.155271;
  var SElatchange = endSElat - baseLat, SElongchange = endSElong - baseLong;
  var NElatchange = endNElat - baseLat, NElongchange = endNElong - baseLong;
  var SEdiv = 10, NEdiv = 8, count = 0;

  for (var i = 0; i < SEdiv; i++){
    for (var j = 0; j < NEdiv; j++){
       //var color = "#FF0000"; //WE NEED TO DECIDE COLOR SCHEMES BASED ON CORE SECONDS HERE USING THE DURATION VARIABLE
       var startLat = baseLat + (SElatchange * i/SEdiv) + (NElatchange * j/NEdiv);
       var startLong = baseLong + (SElongchange * i/SEdiv) + (NElongchange * j/NEdiv);
       data[count] = [
       {lat: startLat, lng: startLong},
       {lat: startLat + (SElatchange/SEdiv), lng: startLong + (SElongchange/SEdiv)},
       {lat: startLat + (SElatchange/SEdiv) + (NElatchange/NEdiv), lng: startLong + (SElongchange/SEdiv) + (NElongchange/NEdiv)},
       {lat: startLat + (NElatchange/NEdiv), lng: startLong + (NElongchange/NEdiv)},
       {lat: startLat, lng: startLong},
       ]

       var shape = new google.maps.Polygon({
          paths: data[count],
          strokeColor: '#00ff00',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#99ff99',
          fillOpacity: 0.35
        });
        shape.setMap(map);
        count++;
   }
 }
    var destinations = [];
      for (var i=0;i<data.length;i++){
        var mat =data[i];
        var latsum=mat[0][0]+mat[0][1];
        latsum/=2;
        var lngsum=mat[1][1]+mat[1][2];
        lngsum/=2;
        destinations[i]={latsum, lngsum};
       }

  //planning on making this more efficient with API calls when actual data comes in
  //but for testing it will call the API once to get all the information
  for(var i = 0; i < data.length; i++){
    var origin = {lat: 37.444359, lng: -122.159902};
    var destination = data[i]; //NEED TO DO CALCULATIONS TO GET CENTER
    var duraton;

    var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
    matrix.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.BIKING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }, function(response, status) { //upon completion
        if (status == google.maps.DistanceMatrixStatus.OK) {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            for (var j = 0; j < results.length; j++) {
              duration = element.duration.value; //Goes to location and stores value of seconds into duration variable
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
      });
  }
}
