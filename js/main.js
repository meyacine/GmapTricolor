/**
 * Created by yacmed on 12/11/2015.
 */
/**
* Deletes all markers in the array by removing references to them.
*/
function deleteMarkers() {
    clearMarkers();
    markers = [];
}
/**
 * Add a marker to the map and push to the array.
 */
function addMarker(location, icone, texte) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: icone,
        text: texte
    });
    markers.push(marker);
}


var markers = [];
var center = new google.maps.LatLng(45.751544, 4.824498);
var mapProp = {
    center: center,
    zoom:19,
    mapTypeId:google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById('map'), mapProp);
var feuRouge = {
    url: 'imgs/red.png'
};
var feuOrange = {
    url: 'imgs/orange.png'
};
var feuVert = {
    url: 'imgs/green.png'
};
addMarker(center, feuRouge, "Yacine");

