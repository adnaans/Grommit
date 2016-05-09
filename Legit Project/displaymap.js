function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 37.444359, lng: -122.159902},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

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
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35
        });
        shape.setMap(map);
        count++;
   }
 }
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
          }
        }
      });

  //   var destination = data[i]; //NEED TO DO CALCULATIONS TO GET CENTER
  //   var duraton;

  //   var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
  //   service.getDistanceMatrix({
  //     origins: [origin],
  //     destinations: [destination],
  //     travelMode: google.maps.TravelMode.BIKING,
  //     unitSystem: google.maps.UnitSystem.METRIC,
  //   }, function(response, status) { //upon completion
  //       if (status == google.maps.DistanceMatrixStatus.OK) {
  //         var origins = response.originAddresses;
  //         var destinations = response.destinationAddresses;
  //         for (var i = 0; i < origins.length; i++) {
  //           var results = response.rows[i].elements;
  //           for (var j = 0; j < results.length; j++) {
  //             duration = element.duration.value; //Goes to location and stores value of seconds into duration variable
  //           }
  //         }
  //       }
  //     });
}

