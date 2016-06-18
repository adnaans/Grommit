var load = 0
function initMap() {
  load++
  if (load == 2){
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: 37.444359, lng: -122.159902},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    var regions = [];
    var baseLat = 37.449333, baseLong = -122.173628;
    var endSElat = 37.428431, endSElong = -122.139875, endNElat = 37.468876, endNElong = -122.155271;
    var SElatchange = endSElat - baseLat, SElongchange = endSElong - baseLong;
    var NElatchange = endNElat - baseLat, NElongchange = endNElong - baseLong;
    var SEdiv = 10, NEdiv = 8
    var count = 0;

    for (var i = 0; i < SEdiv; i++){
      for (var j = 0; j < NEdiv; j++){
        var startLat = baseLat + (SElatchange * i/SEdiv) + (NElatchange * j/NEdiv);
        var startLong = baseLong + (SElongchange * i/SEdiv) + (NElongchange * j/NEdiv);
        regions[count] = [
        {lat: startLat, lng: startLong},
        {lat: startLat + (SElatchange/SEdiv), lng: startLong + (SElongchange/SEdiv)},
        {lat: startLat + (SElatchange/SEdiv) + (NElatchange/NEdiv), lng: startLong + (SElongchange/SEdiv) + (NElongchange/NEdiv)},
        {lat: startLat + (NElatchange/NEdiv), lng: startLong + (NElongchange/NEdiv)},
        {lat: startLat, lng: startLong}
        ]
        count++;
      }
    }
    var destinations = [];
    for (var i = 0; i < regions.length; i++){
      var mat = regions[i];
      //console.log(mat)
      var latsum = mat[0]["lat"] + mat[1]["lat"] + mat[2]["lat"] + mat[3]["lat"];
      latsum /= 4;
      var lngsum = mat[0]["lng"] + mat[1]["lng"] + mat[2]["lng"] + mat[3]["lng"];
      lngsum /= 4;
      //console.log("latsum: " + latsum)
      //console.log("lngsum: " + lngsum)
      destinations[i] = new google.maps.LatLng(latsum, lngsum);
    }
    //planning on making this more efficient with API calls when actual data comes in
    //but for testing it will call the API once to get all the information
    var counter = 0;
    var origin = {lat: 37.444359, lng: -122.159902};

    for(var i = 0; i < destinations.length; i++){
      var destination = destinations[i];
      var duration = 0;
      var color;
      var colors = [];

      var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
      matrix.getDistanceMatrix({
        origins: [origin],
        destinations: [destination],
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.METRIC,
      }, function(response, status) { //upon completion
        if (status == google.maps.DistanceMatrixStatus.OK) {
          var origins = response.originAddresses;
          var dest = response.destinationAddresses;
          console.log(destinations[0]);
          var results = response.rows[0].elements;
          var datapoints = regions[counter];
          var duration = results[0].duration.value; //Goes to location and stores value of seconds into duration variable]

          if(duration < 200){
            color = "#ff0000";
            colors[counter] = color;
          }
          else if(duration < 350){
            color = "#66ffff";
            colors[counter] = color;
          }
          else if(duration < 500){
            color = "#66ff33";
            colors[counter] = color;
          }
          else {
            color = "#3333cc";
            colors[counter] = color;
          }
          
          var shape = new google.maps.Polygon({
           paths: datapoints,
           tempColor: color,
           window: new google.maps.InfoWindow({
            content: "Biking time from Palo Alto City Hall: " + duration + " seconds",
            position: destinations[counter] //{lat: coordinate.lat(), lng: coordinate.lng()}
          }),
           strokeColor: color,
           strokeOpacity: 0.35,
           strokeWeight: 1,
           fillColor: color,
           fillOpacity: 0.35
         });

          google.maps.event.addListener(shape,"mouseover",function(){
            this.setOptions({fillColor: "#7723a4"});
            this.window.open(map, this)
          });
          google.maps.event.addListener(shape,"mouseout",function(){
            this.setOptions({fillColor: this.tempColor});
            this.window.close()
          });
          shape.setMap(map);
          counter++;
        }
      });
      //Places a marker on city hall
      var marker = new google.maps.Marker({
        position: {lat: 37.444359, lng: -122.159902},
        map: map,
        title: 'City Hall'
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
}
