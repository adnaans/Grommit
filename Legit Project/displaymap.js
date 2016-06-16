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
        destinations[i]= new google.maps.LatLng(latsum, lngsum);
       }
  //planning on making this more efficient with API calls when actual data comes in
  //but for testing it will call the API once to get all the information
  for(var i = 0; i < data.length; i++){
    var origin = {lat: 37.444359, lng: -122.159902};
    var destination = new google.maps.LatLng(data[i][0],data[i][1]); //NEED TO DO CALCULATIONS TO GET CENTER
    var duration = 0;
    var color;
    var count = 0;

    var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
    matrix.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.BICYCLING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }, function(response, status) { //upon completion
        if (status == google.maps.DistanceMatrixStatus.OK) {
          console.log(status);
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
            var results = response.rows[0].elements;
            for (var j = 0; j < results.length; j++) {
              var datapoints = data[count];
              duration = results[0].duration.value; //Goes to location and stores value of seconds into duration variable]
              duration = results[0].duration.value; //Goes to location and stores value of seconds into duration variable]

              if(duration <200){
                color = "#ff0000";
              }
              else if(duration < 350){
                color = "#66ffff";
              }
              else if(duration < 500){
                color = "#66ff33";
              }
              else{
                color = "#3333cc";
              }
              console.log(color);
              console.log(duration);
              console.log(datapoints);
              var shape = new google.maps.Polygon({
                 paths: datapoints,
                 strokeColor: color,
                 strokeOpacity: 0.35,
                 strokeWeight: 1,
                 fillColor: color,
                 fillOpacity: 0.35
               });
               shape.setMap(map);
               console.log(count);
               count++;
          }
        }
      });
  }
  // var origin = new google.maps.LatLng(37.444359, -122.159902);
  // var destination = new google.maps.LatLng(38.000002, -122.000002);
  // var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
  //   matrix.getDistanceMatrix({
  //     origins: [origin],
  //     destinations: [destination],
  //     travelMode: google.maps.TravelMode.BICYCLING,
  //     unitSystem: google.maps.UnitSystem.METRIC,
  //   }, function(response, status) { //upon completion
  //       if (status == google.maps.DistanceMatrixStatus.OK) {
  //         console.log(status);
  //         var origins = response.originAddresses;
  //         var destinations = response.destinationAddresses;
  //         for (var i = 0; i < origins.length; i +) {
  //           var results = response.rows[i].elements;
  //           for (var j = 0; j < results.length; j++) {
  //             console.log(response);
  //             var duration = results[0].duration.value; //Goes to location and stores value of seconds into duration variable]
  //             console.log(duration);
  //           }
  //         }
  //       }
  //     });


}
