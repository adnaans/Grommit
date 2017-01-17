var map;
var geocoder;
function initMap() {
	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(38.4292, -122.1381);  
	var myLatlng = new google.maps.LatLng(37.4292, -122.1381);
	var mapOptions = {
	  zoom: 15,
	  center: myLatlng,
	  mapTypeId: google.maps.MapTypeId.SATELLITE
	};
	var map = new google.maps.Map(document.getElementById("map"),
	mapOptions);
	var myLatLng = {lat: 37.4292, lng: -122.1381};
	var marker = new google.maps.Marker({
	    position: myLatLng,
	    map: map,
 	   title: 'Hello World!'
 	});
}
/*
function codeAddress() {
	console.log("yo")
	alert("successful");
    var address = document.getElementById("address").value;
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

window.onload = function() {
	document.getElementById("encode").addEventListener("click", codeAddress);
}
*/