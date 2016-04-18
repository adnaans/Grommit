function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: {lat: 37.444359, lng: -122.159902},
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });

  // Define the LatLng coordinates for the polygon's path.
  var data = [ //we need data for each section here
    {lat: 37.44, lng: -122.16},
    {lat: 37.44, lng: -122.15},
    {lat: 37.43, lng: -122.15},
    {lat: 37.43, lng: -122.16}
  ];

  //need to set color here. i will set the var for now
  var color = '#FF0000';

  // for loop not working so we need to display each shape
  var shape = new google.maps.Polygon({
    paths: data,
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: color,
    fillOpacity: 0.35
  });
  shape.setMap(map);
}