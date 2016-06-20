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

    var origins = [];
    for (var i = 0; i < regions.length; i++){
      var mat = regions[i];
      //console.log(mat)
      var latsum = mat[0]["lat"] + mat[1]["lat"] + mat[2]["lat"] + mat[3]["lat"];
      latsum /= 4;
      var lngsum = mat[0]["lng"] + mat[1]["lng"] + mat[2]["lng"] + mat[3]["lng"];
      lngsum /= 4;
      origins[i] = new google.maps.LatLng(latsum, lngsum);
    }
    //planning on making this more efficient with API calls when actual data comes in
    //but for testing it will call the API once to get all the information

    var destination = {lat: 37.444359, lng: -122.159902};
    var shapes = [];

    var marker = new google.maps.Marker({
      position: destination,
      map: map,
      title: 'Destination'
    });

    google.maps.event.addListener(map, "click", function(e){
      destination = e.latLng;
      console.log(destination.lat() + ", " + destination.lng());

      //marker.setMap(null);
      marker.position = destination;
      marker.setMap(map);

      for (var i = 0; i < origins.length; i++){
        calcTime(destination, origins, i, shapes);
      }
    });

    var colors = [];
    var times = [];
    count = 0;

    for (var i = 0; i < origins.length; i++){
      var datapoints = regions[i];
      shapes[i] = new google.maps.Polygon({
       paths: datapoints,
       map: map,
       tempColor: "",
       window: new google.maps.InfoWindow({
        content: "Loading...",
        position: origins[i]
      }),
       strokeColor: "",
       strokeOpacity: 0.35,
       strokeWeight: 1,
       fillColor: "",
       fillOpacity: 0.35
     });

      var directionsDisplay = new google.maps.DirectionsRenderer({
        preserveViewport: true,
        suppressMarkers: true,
        suppressBicyclingLayer: true
      });
      var directionsService = new google.maps.DirectionsService();

      google.maps.event.addListener(shapes[i],"mouseover",function(){
        this.setOptions({fillColor: "#7723a4"});
        this.window.open(map, this);
        console.log();
        directionsService.route({
          origin: this.window.position,
          destination: destination,
          travelMode: google.maps.TravelMode.BICYCLING
        }, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(result);
          }
          directionsDisplay.setMap(map);
        });
      });
      google.maps.event.addListener(shapes[i],"mouseout",function(){
        this.setOptions({fillColor: this.tempColor});
        this.window.close();
        directionsDisplay.setMap(null);
      });
      google.maps.event.addListener(shapes[i], "click", function(e){
        //console.log(e.latLng.lat() + ", " + e.latLng.lng());
        destination = e.latLng;
        //marker.setMap(null);
        marker.position = e.latLng;
        marker.setMap(map);

        for (var j = 0; j < origins.length; j++){
          calcTime(e.latLng, origins, j, shapes);
        }
      });

      var color;
      var matrix = new google.maps.DistanceMatrixService; //Making distance matrix
      matrix.getDistanceMatrix({
        origins: [origins[i]],
        destinations: [destination],
        travelMode: google.maps.TravelMode.BICYCLING,
        unitSystem: google.maps.UnitSystem.METRIC,
      }, function(response, status) { //upon completion
        if (status == google.maps.DistanceMatrixStatus.OK) {
          var results = response.rows[0].elements;
          var destin = response.destinationAddresses[0];
          times[count] = results[0].duration.text;
          time = results[0].duration.value; //Goes to location and stores value of seconds into duration variable]

          if(time < 200){
            color = "#ff0000";
            colors[count] = color;
          }
          else if(time < 350){
            color = "#66ffff";
            colors[count] = color;
          }
          else if(time < 500){
            color = "#66ff33";
            colors[count] = color;
          }
          else {
            color = "#3333cc";
            colors[count] = color;
          }
          shapes[count].setOptions({
            tempColor: colors[count],
            fillColor: colors[count],
            strokeColor: colors[count]
          })
          shapes[count].window.setOptions({content: "Biking time from " + destin + ": " + times[count]})
          count++;
        }
      });
    }
  }
}
function calcTime(dest, ori, index, shapes){
  var matrix = new google.maps.DistanceMatrixService;
  matrix.getDistanceMatrix({
    origins: [ori[index]],
    destinations: [dest],
    travelMode: google.maps.TravelMode.BICYCLING,
    unitSystem: google.maps.UnitSystem.METRIC,
  }, function(response, status) { //upon completion
    if (status != google.maps.DistanceMatrixStatus.OK) {
      console.log(status);
    }
    if (status == google.maps.DistanceMatrixStatus.OK) {
      var results = response.rows[0].elements;
      var destin = response.destinationAddresses[0];
      if (typeof(results[0].duration) == 'undefined'){
        time = -1 
      } else {
        time = results[0].duration.value; //Goes to location and stores value of seconds into duration variable]
      }

      if (time < 0){
        color = "#ababab"
      }
      else if(time < 200 ){
        color = "#ff0000";
      }
      else if(time < 350){
        color = "#66ffff";
      }
      else if(time < 500){
        color = "#66ff33";
      }
      else {
        color = "#3333cc";
      }

      shapes[index].setOptions({
        tempColor: color,
        strokeColor: color,
        fillColor: color
      });
      if (time >= 0){
        shapes[index].window.setOptions({content: "Biking time from " + destin + ": " + results[0].duration.text});
      } else {
        shapes[index].window.setOptions({content: "No bike route available"});
      }
    } else {
      shapes[index].setOptions({
        tempColor: "#000000",
        strokeColor: "#000000",
        fillColor: "#000000"
      });
      shapes[index].window.setOptions({content: status});
    }
  });
}
