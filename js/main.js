/**
 * Created by yacmed on 12/11/2015.
 */
/**
 *Sets the map on all markers in the array.
 */

function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}
/**
 * Removes the markers from the map, but keeps them in the array.
 */
function clearMarkers() {
    setMapOnAll(null);
}
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
    url: 'imgs/feuRouge.png'
};
var feuOrange = {
    url: 'imgs/feuOrange.png'
};
var feuVert = {
    url: 'imgs/feuVert.png'
};
addMarker(center, feuVert, "Yacine");
var watchTimer = setInterval(refreshMapState, 1000);
function refreshMapState() {
    deleteMarkers();
    $.ajax({
        url: "api/getAllNetwork",
        statusCode: {
            301: function () {
                alert('redirection, respectivement permanente et temporaire');
            },
            302: function () {
                alert('redirection, respectivement permanente et temporaire');
            },
            403: function () {
                alert('accès refusé');
            },
            404: function () {
                alert('url non trouvée');
            },
            500: function () {
                alert('erreur serveur');
            },
            503: function () {
                alert('erreur serveur');
            }
        }
    }).success(function(data, textStatus ) {
        if (data.error){
            alert(data.error);
        } else {
            var marquers = data;
            for (var i=0; i<marquers.length;i++) {
                var marker = marquers[i];
                var positionMarker =new google.maps.LatLng(marker.lat, marker.lng);
                switch (marker.state){
                    case 'G' :{addMarker(positionMarker, feuVert, marker.id);break;}
                    case 'R' :{addMarker(positionMarker, feuRouge, marker.id);break;}
                    case 'O' :{addMarker(positionMarker, feuOrange, marker.id);break;}
                    case 'OC' :{addMarker(positionMarker, feuOrangeClignotant, marker.id);break;}
                    case 'OFF' :{addMarker(positionMarker, feuEteint, marker.id);break;}
                }
            }
        }
    }).error(function(data, textStatus ) {
        console.log(textStatus);
        //if (data.readyState == 4) {
            // HTTP error (can be checked by XMLHttpRequest.status and XMLHttpRequest.statusText) handled in the ajax config part
        //}
        if (data.readyState == 0) {
            // Network error (i.e. connection refused, access denied due to CORS, etc.)
            alert('Connexion refusée');
        }
        else {
            // something weird is happening
        }
    });
}
