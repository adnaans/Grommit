# Grommit
Forked from original repository that I worked on: https://github.com/AShiTheCoder/Grommit
WARNING: The UI for the page is still in development!

Grommit is a project that I am doing with Palantir and a few other friends at my school. This project uses the Google Maps API to display travel times to various locations in Palo Alto from your pinned location through a color-coded map.

The map is on a html page. On the map, there is an inital marker placed on City Hall, with 80 tiles on Downtown Palo Alto in 10x8 pattern. 
Each tile is colored based on the time it takes to get from the marker (initially on City Hall) to the center of the tile. We used simple math to determine the point at the center of each tile, since the corner points are used as parameters in the Google Maps API to create the tiles. There is a legend at the side of the map to show the time ranges that each color represents. In addition, if you hover over any tile, a info window will pop up and show the exact time it takes to go from the marker to the center of that tile, and a polyline will show up that displays the best route from the marker to the center of that tile.
You can click anywhere on the map (even outside the 10x8 grid of tiles) and the marker will go to that location, and each tile will change color based on the amount of time it takes to go from the location of the marker to the center of the tile. The legend will also update to show the new range of times that each color represents.
There is also a drop-down bar with various forms of transit. You can select the form of transit you want to look at and the map will refresh, along with the legend. You can choose between driving, public transit, walking, and bicycling.
